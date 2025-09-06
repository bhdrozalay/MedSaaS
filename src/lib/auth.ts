import bcrypt from 'bcryptjs'
import { prisma } from './prisma'
import { User, Tenant } from '@prisma/client'

export interface AuthUser {
  id: string
  name: string
  email: string
  tenantId: string
  tenantName: string
  departmentId: string | null
  roleId: string | null
  isActive: boolean
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function authenticateUser(email: string, password: string): Promise<AuthUser | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        tenant: true,
        department: true,
        role: true
      }
    })

    if (!user || !user.isActive) {
      return null
    }

    // Check if tenant is active
    if (user.tenant.status === 'CANCELLED') {
      throw new Error('Hesap iptal edilmiş')
    }

    const isPasswordValid = await verifyPassword(password, user.password)
    if (!isPasswordValid) {
      // Increment failed login attempts
      await prisma.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: user.failedLoginAttempts + 1,
          accountLockedUntil: user.failedLoginAttempts >= 4 
            ? new Date(Date.now() + 15 * 60 * 1000) // Lock for 15 minutes
            : null
        }
      })
      return null
    }

    // Check if account is locked
    if (user.accountLockedUntil && user.accountLockedUntil > new Date()) {
      throw new Error('Hesap geçici olarak kilitlendi')
    }

    // Reset failed attempts on successful login
    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: 0,
        accountLockedUntil: null,
        lastLogin: new Date()
      }
    })

    // Log audit entry
    await prisma.auditLog.create({
      data: {
        tenantId: user.tenantId,
        userId: user.id,
        action: 'USER_LOGIN',
        details: {
          email: user.email,
          timestamp: new Date().toISOString()
        }
      }
    })

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      tenantId: user.tenantId,
      tenantName: user.tenant.name,
      departmentId: user.departmentId,
      roleId: user.roleId,
      isActive: user.isActive
    }
  } catch (error) {
    console.error('Authentication error:', error)
    throw error
  }
}

export async function createTenant(data: {
  // Company info
  companyName: string
  companyType: string
  taxNumber: string
  taxOffice: string
  
  // Contact info
  address: string
  city: string
  district: string
  phone: string
  website?: string
  
  // Business info
  industryType: string
  employeeCount: string
  businessDescription?: string
  
  // Admin user
  adminName: string
  adminEmail: string
  adminPhone?: string
  password: string
}) {
  try {
    // Check if tenant with same tax number exists
    const existingTenant = await prisma.tenant.findUnique({
      where: { taxNumber: data.taxNumber }
    })
    
    if (existingTenant) {
      throw new Error('Bu vergi numarası ile kayıtlı bir şirket bulunmaktadır')
    }

    // Check if admin email exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.adminEmail }
    })
    
    if (existingUser) {
      throw new Error('Bu e-posta adresi ile kayıtlı bir kullanıcı bulunmaktadır')
    }

    const hashedPassword = await hashPassword(data.password)

    const result = await prisma.$transaction(async (tx) => {
      // Create tenant
      const tenant = await tx.tenant.create({
        data: {
          name: data.companyName,
          type: data.companyType,
          taxNumber: data.taxNumber,
          taxOffice: data.taxOffice,
          address: data.address,
          city: data.city,
          district: data.district,
          phone: data.phone,
          website: data.website,
          industryType: data.industryType,
          employeeCount: data.employeeCount,
          businessDescription: data.businessDescription,
          status: 'DEMO',
          demoEndDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) // 15 days
        }
      })

      // Create default departments
      const managementDept = await tx.department.create({
        data: {
          tenantId: tenant.id,
          name: 'Yönetici',
          description: 'Genel yönetim ve tüm modül erişimi',
          isCustom: false
        }
      })

      // Create admin role
      const adminRole = await tx.role.create({
        data: {
          tenantId: tenant.id,
          departmentId: managementDept.id,
          name: 'Admin',
          permissions: { modules: ['*'], actions: ['*'] },
          isCustom: false
        }
      })

      // Create admin user
      const adminUser = await tx.user.create({
        data: {
          name: data.adminName,
          email: data.adminEmail,
          phone: data.adminPhone,
          password: hashedPassword,
          tenantId: tenant.id,
          departmentId: managementDept.id,
          roleId: adminRole.id,
          isActive: true,
          emailVerified: false
        }
      })

      // Get professional plan
      const proPlan = await tx.subscriptionPlan.findFirst({
        where: { name: 'Profesyonel Plan' }
      })

      if (proPlan) {
        // Create demo subscription
        await tx.tenantSubscription.create({
          data: {
            tenantId: tenant.id,
            planId: proPlan.id,
            status: 'DEMO',
            userCount: 1,
            demoEndDate: tenant.demoEndDate!,
            currentPeriodStart: new Date(),
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          }
        })
      }

      return { tenant, adminUser }
    })

    return result
  } catch (error) {
    console.error('Tenant creation error:', error)
    throw error
  }
}