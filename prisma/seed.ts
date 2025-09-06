import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create subscription plans
  const basicPlan = await prisma.subscriptionPlan.upsert({
    where: { id: 'basic-plan' },
    update: {},
    create: {
      id: 'basic-plan',
      name: 'Temel Plan',
      monthlyPricePerUser: 20.0,
      yearlyPricePerUser: 18.0, // %10 indirim
      maxUsers: 50,
      features: {
        modules: ['tender', 'visit', 'inventory'],
        features: ['basic_reporting', 'user_management', 'mobile_app']
      },
      isActive: true
    }
  })

  const proPlan = await prisma.subscriptionPlan.upsert({
    where: { id: 'professional-plan' },
    update: {},
    create: {
      id: 'professional-plan',
      name: 'Profesyonel Plan',
      monthlyPricePerUser: 35.0,
      yearlyPricePerUser: 31.5, // %10 indirim
      maxUsers: 200,
      features: {
        modules: ['tender', 'visit', 'inventory', 'crm', 'financial'],
        features: ['advanced_reporting', 'user_management', 'mobile_app', 'api_access']
      },
      isActive: true
    }
  })

  const enterprisePlan = await prisma.subscriptionPlan.upsert({
    where: { id: 'enterprise-plan' },
    update: {},
    create: {
      id: 'enterprise-plan',
      name: 'Enterprise Plan',
      monthlyPricePerUser: 50.0,
      yearlyPricePerUser: 45.0, // %10 indirim
      maxUsers: 500,
      features: {
        modules: ['tender', 'visit', 'inventory', 'crm', 'financial', 'ai'],
        features: ['advanced_reporting', 'user_management', 'mobile_app', 'api_access', 'ai_features', 'priority_support']
      },
      isActive: true
    }
  })

  // Create default departments
  const departments = [
    { name: 'Yönetici', description: 'Genel yönetim ve tüm modül erişimi' },
    { name: 'Satış', description: 'Satış ve müşteri ilişkileri yönetimi' },
    { name: 'Depo', description: 'Envanter ve stok yönetimi' },
    { name: 'Muhasebe', description: 'Finansal işlemler ve raporlama' }
  ]

  // Create a demo tenant
  const demoTenant = await prisma.tenant.upsert({
    where: { taxNumber: '1234567890' },
    update: {},
    create: {
      name: 'ABC Medikal Ltd.',
      type: 'ltd',
      taxNumber: '1234567890',
      taxOffice: 'Kadıköy Vergi Dairesi',
      address: 'Atatürk Mah. Medikal Sok. No:123',
      city: 'İstanbul',
      district: 'Kadıköy',
      phone: '+90 212 555 01 23',
      website: 'https://abcmedikal.com',
      industryType: 'Medikal Cihaz Distribütörü',
      employeeCount: '11-50',
      businessDescription: 'Medikal cihaz satışı ve teknik destek hizmetleri',
      status: 'DEMO',
      demoEndDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) // 15 days
    }
  })

  // Create departments for demo tenant
  const createdDepartments = []
  for (const dept of departments) {
    const department = await prisma.department.upsert({
      where: { 
        tenantId_name: {
          tenantId: demoTenant.id,
          name: dept.name
        }
      },
      update: {},
      create: {
        tenantId: demoTenant.id,
        name: dept.name,
        description: dept.description,
        isCustom: false
      }
    })
    createdDepartments.push(department)
  }

  // Create default roles
  const managementDept = createdDepartments.find(d => d.name === 'Yönetici')!
  const salesDept = createdDepartments.find(d => d.name === 'Satış')!
  const warehouseDept = createdDepartments.find(d => d.name === 'Depo')!
  const accountingDept = createdDepartments.find(d => d.name === 'Muhasebe')!

  const roles = [
    {
      name: 'Admin',
      departmentId: managementDept.id,
      permissions: { modules: ['*'], actions: ['*'] }
    },
    {
      name: 'Satış Temsilcisi',
      departmentId: salesDept.id,
      permissions: { modules: ['tender', 'visit', 'crm'], actions: ['read', 'write'] }
    },
    {
      name: 'Satış Müdürü',
      departmentId: salesDept.id,
      permissions: { modules: ['tender', 'visit', 'crm', 'reports'], actions: ['read', 'write', 'delete'] }
    },
    {
      name: 'Depo Sorumlusu',
      departmentId: warehouseDept.id,
      permissions: { modules: ['inventory', 'orders'], actions: ['read', 'write'] }
    },
    {
      name: 'Mali Müşavir',
      departmentId: accountingDept.id,
      permissions: { modules: ['financial', 'reports', 'billing'], actions: ['read', 'write'] }
    }
  ]

  for (const role of roles) {
    await prisma.role.upsert({
      where: {
        tenantId_departmentId_name: {
          tenantId: demoTenant.id,
          departmentId: role.departmentId,
          name: role.name
        }
      },
      update: {},
      create: {
        tenantId: demoTenant.id,
        departmentId: role.departmentId,
        name: role.name,
        permissions: role.permissions,
        isCustom: false
      }
    })
  }

  // Create demo admin user
  const adminRole = await prisma.role.findFirst({
    where: {
      tenantId: demoTenant.id,
      name: 'Admin'
    }
  })

  if (adminRole) {
    await prisma.user.upsert({
      where: { email: 'admin@abcmedikal.com' },
      update: {},
      create: {
        name: 'Demo Admin',
        email: 'admin@abcmedikal.com',
        phone: '+90 555 123 45 67',
        password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        tenantId: demoTenant.id,
        departmentId: managementDept.id,
        roleId: adminRole.id,
        isActive: true,
        emailVerified: true
      }
    })
  }

  // Create demo subscription
  await prisma.tenantSubscription.upsert({
    where: { id: 'demo-subscription' },
    update: {},
    create: {
      id: 'demo-subscription',
      tenantId: demoTenant.id,
      planId: proPlan.id,
      status: 'DEMO',
      userCount: 1,
      demoEndDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    }
  })

  console.log('✅ Seeding completed successfully!')
  console.log('📊 Created:')
  console.log('  - 3 subscription plans')
  console.log('  - 1 demo tenant (ABC Medikal Ltd.)')
  console.log('  - 4 departments')
  console.log('  - 5 roles')
  console.log('  - 1 admin user (admin@abcmedikal.com / password)')
  console.log('  - 1 demo subscription')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })