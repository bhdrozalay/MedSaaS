import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createTenant } from '@/lib/auth'

const registerSchema = z.object({
  // Step 1 - Company Info
  companyName: z.string().min(2, 'Şirket adı en az 2 karakter olmalı'),
  companyType: z.string().min(1, 'Şirket türü seçilmeli'),
  taxNumber: z.string().regex(/^\d{10}$/, 'Vergi numarası 10 haneli olmalı'),
  taxOffice: z.string().min(2, 'Vergi dairesi belirtilmeli'),
  
  // Step 2 - Contact Info
  address: z.string().min(10, 'Adres en az 10 karakter olmalı'),
  city: z.string().min(2, 'İl belirtilmeli'),
  district: z.string().min(2, 'İlçe belirtilmeli'),
  phone: z.string().regex(/^[\+]?[0-9\s\-\(\)]+$/, 'Geçerli telefon numarası giriniz'),
  website: z.string().url().optional().or(z.literal('')),
  
  // Step 3 - Admin User
  adminName: z.string().min(2, 'Ad soyad en az 2 karakter olmalı'),
  adminEmail: z.string().email('Geçerli e-posta adresi giriniz'),
  adminPhone: z.string().optional(),
  password: z.string().min(8, 'Şifre en az 8 karakter olmalı'),
  confirmPassword: z.string(),
  
  // Step 4 - Business Info
  industryType: z.string().min(1, 'Sektör seçilmeli'),
  employeeCount: z.string().min(1, 'Çalışan sayısı seçilmeli'),
  businessDescription: z.string().optional(),
  targetModules: z.array(z.string()),
  
  // Terms
  termsAccepted: z.boolean().refine(val => val === true, 'Kullanım koşulları kabul edilmeli'),
  gdprAccepted: z.boolean().refine(val => val === true, 'KVKK aydınlatma metni kabul edilmeli')
}).refine(data => data.password === data.confirmPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmPassword"]
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request data
    const validatedData = registerSchema.parse(body)
    
    // Create tenant and admin user
    const result = await createTenant({
      // Company info
      companyName: validatedData.companyName,
      companyType: validatedData.companyType,
      taxNumber: validatedData.taxNumber,
      taxOffice: validatedData.taxOffice,
      
      // Contact info
      address: validatedData.address,
      city: validatedData.city,
      district: validatedData.district,
      phone: validatedData.phone,
      website: validatedData.website || undefined,
      
      // Business info
      industryType: validatedData.industryType,
      employeeCount: validatedData.employeeCount,
      businessDescription: validatedData.businessDescription,
      
      // Admin user
      adminName: validatedData.adminName,
      adminEmail: validatedData.adminEmail,
      adminPhone: validatedData.adminPhone,
      password: validatedData.password
    })
    
    // TODO: Send verification email
    // TODO: Generate JWT token for demo period
    
    return NextResponse.json({
      success: true,
      message: 'Kayıt başarılı! E-posta doğrulama linki gönderildi.',
      tenant: {
        id: result.tenant.id,
        name: result.tenant.name,
        status: result.tenant.status,
        demoEndDate: result.tenant.demoEndDate
      },
      user: {
        id: result.adminUser.id,
        name: result.adminUser.name,
        email: result.adminUser.email
      },
      redirectTo: '/verify-email'
    }, { status: 201 })
    
  } catch (error) {
    console.error('Registration error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Form verilerinde hata var',
        errors: error.errors
      }, { status: 400 })
    }
    
    // Handle specific auth errors
    if (error instanceof Error) {
      return NextResponse.json({
        success: false,
        message: error.message
      }, { status: 400 })
    }
    
    return NextResponse.json({
      success: false,
      message: 'Kayıt işlemi başarısız oldu'
    }, { status: 500 })
  }
}