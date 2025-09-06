'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState<'verifying' | 'success' | 'expired' | 'setup'>('verifying')
  const [inviteData, setInviteData] = useState({
    companyName: '',
    inviterName: '',
    email: '',
    department: '',
    role: ''
  })
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    phone: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const token = searchParams?.get('token')
  const type = searchParams?.get('type') // 'invite' | 'verification'

  useEffect(() => {
    if (token) {
      verifyToken()
    }
  }, [token])

  const verifyToken = async () => {
    try {
      // TODO: API call to verify token
      console.log('Verifying token:', token, 'type:', type)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      if (type === 'invite') {
        // Mock invite data
        setInviteData({
          companyName: 'ABC Medikal Ltd.',
          inviterName: 'Ahmet Yılmaz',
          email: 'yeni.calisan@abcmedikal.com',
          department: 'Satış',
          role: 'Satış Temsilcisi'
        })
        setStep('setup')
      } else {
        setStep('success')
      }
    } catch (error) {
      console.error('Token verification failed:', error)
      setStep('expired')
    }
  }

  const handleCompleteSetup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('Şifreler eşleşmiyor!')
      return
    }
    
    setIsLoading(true)
    
    try {
      // TODO: API call to complete user setup
      console.log('Completing user setup:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setStep('success')
    } catch (error) {
      console.error('Setup completion failed:', error)
      alert('Hesap kurulumu başarısız oldu. Lütfen tekrar deneyin.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {step === 'verifying' && 'Doğrulanıyor...'}
            {step === 'setup' && 'Hesap Kurulumu'}
            {step === 'success' && 'Başarılı!'}
            {step === 'expired' && 'Bağlantı Geçersiz'}
          </CardTitle>
          <CardDescription>
            {step === 'verifying' && 'E-posta doğrulaması kontrol ediliyor'}
            {step === 'setup' && 'Hesabınızı tamamlayın'}
            {step === 'success' && 'Hesabınız başarıyla oluşturuldu'}
            {step === 'expired' && 'Doğrulama bağlantısının süresi dolmuş'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {step === 'verifying' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <span className="text-2xl">⏳</span>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Doğrulanıyor
                </h3>
                <p className="text-gray-600 text-sm">
                  {type === 'invite' ? 'Davetiye bağlantınız kontrol ediliyor...' : 'E-posta adresiniz doğrulanıyor...'}
                </p>
              </div>
            </div>
          )}

          {step === 'setup' && (
            <div className="space-y-6">
              {/* Invitation info */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-green-800 mb-2">
                  🎉 Davet Detayları
                </h3>
                <div className="text-sm text-green-700 space-y-1">
                  <p><strong>Şirket:</strong> {inviteData.companyName}</p>
                  <p><strong>Davet Eden:</strong> {inviteData.inviterName}</p>
                  <p><strong>E-posta:</strong> {inviteData.email}</p>
                  <p><strong>Departman:</strong> {inviteData.department}</p>
                  <p><strong>Rol:</strong> {inviteData.role}</p>
                </div>
              </div>

              <form onSubmit={handleCompleteSetup} className="space-y-4">
                <div>
                  <Label htmlFor="name">Ad Soyad *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Örn: Mehmet Özkan"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+90 555 123 45 67"
                  />
                </div>
                
                <div>
                  <Label htmlFor="password">Şifre *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Minimum 8 karakter"
                    minLength={8}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="confirmPassword">Şifre Tekrar *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    placeholder="Şifreyi tekrarlayın"
                    minLength={8}
                    required
                  />
                </div>
                
                {/* Password strength */}
                <div className="text-xs text-gray-500 space-y-1">
                  <p className={formData.password.length >= 8 ? 'text-green-600' : ''}>
                    ✓ En az 8 karakter
                  </p>
                  <p className={/[A-Z]/.test(formData.password) ? 'text-green-600' : ''}>
                    ✓ En az 1 büyük harf
                  </p>
                  <p className={/[0-9]/.test(formData.password) ? 'text-green-600' : ''}>
                    ✓ En az 1 rakam
                  </p>
                  <p className={/[!@#$%^&*]/.test(formData.password) ? 'text-green-600' : ''}>
                    ✓ En az 1 özel karakter
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700" 
                  disabled={isLoading || !formData.name || !formData.password || formData.password !== formData.confirmPassword}
                >
                  {isLoading ? 'Hesap oluşturuluyor...' : 'Hesabımı Oluştur'}
                </Button>
              </form>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">✅</span>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {type === 'invite' ? 'Hesabınız Oluşturuldu!' : 'E-posta Doğrulandı!'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {type === 'invite' 
                    ? `${inviteData.companyName} bünyesinde hesabınız başarıyla oluşturuldu.`
                    : 'E-posta adresiniz başarıyla doğrulandı.'
                  }
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-800 mb-2">
                  🚀 Sırada Ne Var?
                </h4>
                <ul className="text-sm text-blue-700 space-y-1 text-left">
                  <li>• Giriş yaparak dashboard'unuza erişin</li>
                  <li>• Profilinizi tamamlayın</li>
                  <li>• Departmanınızın modüllerini keşfedin</li>
                  <li>• Ekibinizle çalışmaya başlayın</li>
                </ul>
              </div>
              
              <Button asChild className="w-full">
                <Link href="/login">
                  Giriş Yap
                </Link>
              </Button>
            </div>
          )}

          {step === 'expired' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">⚠️</span>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Bağlantı Geçersiz
                </h3>
                <p className="text-gray-600 text-sm">
                  {type === 'invite' 
                    ? 'Bu davet bağlantısının süresi dolmuş veya geçersiz. Lütfen yeni bir davet isteyin.'
                    : 'Bu doğrulama bağlantısının süresi dolmuş veya geçersiz.'
                  }
                </p>
              </div>

              <div className="space-y-3">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/login">
                    Giriş Sayfasına Git
                  </Link>
                </Button>
                
                <div className="text-sm text-gray-500">
                  Yardıma mı ihtiyacınız var?{' '}
                  <Link href="/contact" className="text-primary hover:underline">
                    İletişime geçin
                  </Link>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Help info */}
      <div className="absolute bottom-4 left-4 right-4 max-w-md mx-auto">
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="pt-4">
            <div className="flex items-start space-x-2">
              <span className="text-gray-600 mt-1">💡</span>
              <div className="text-xs text-gray-700">
                <p className="font-medium mb-1">Sorun mu yaşıyorsunuz?</p>
                <p>E-posta gelmiyorsa spam klasörünüzü kontrol edin. Hala sorun yaşıyorsanız şirket admininizie başvurun.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}