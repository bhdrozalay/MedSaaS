import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { authenticateUser } from '@/lib/auth'

const loginSchema = z.object({
  email: z.string().email('Geçerli e-posta adresi giriniz'),
  password: z.string().min(1, 'Şifre boş olamaz'),
  rememberMe: z.boolean().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request data
    const validatedData = loginSchema.parse(body)
    
    // Authenticate user
    const user = await authenticateUser(validatedData.email, validatedData.password)
    
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'E-posta veya şifre hatalı'
      }, { status: 401 })
    }
    
    // TODO: Generate JWT token/session
    // TODO: Set secure cookies
    
    return NextResponse.json({
      success: true,
      message: 'Giriş başarılı',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        tenantId: user.tenantId,
        tenantName: user.tenantName,
        role: 'admin' // TODO: Get from role data
      },
      redirectTo: '/dashboard'
    }, { status: 200 })
    
  } catch (error) {
    console.error('Login error:', error)
    
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
      }, { status: 401 })
    }
    
    return NextResponse.json({
      success: false,
      message: 'Giriş işlemi başarısız oldu'
    }, { status: 500 })
  }
}