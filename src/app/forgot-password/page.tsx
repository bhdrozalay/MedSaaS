'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<'email' | 'sent' | 'reset'>('email')
  const [email, setEmail] = useState('')
  const [resetCode, setResetCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendResetEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // TODO: API call to send reset email
      console.log('Sending reset email to:', email)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setStep('sent')
    } catch (error) {
      console.error('Error sending reset email:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // TODO: API call to verify reset code
      console.log('Verifying reset code:', resetCode)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setStep('reset')
    } catch (error) {
      console.error('Error verifying code:', error)
      alert('Geçersiz kod. Lütfen tekrar deneyin.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (newPassword !== confirmPassword) {
      alert('Şifreler eşleşmiyor!')
      return
    }
    
    setIsLoading(true)
    
    try {
      // TODO: API call to reset password
      console.log('Resetting password')
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      alert('Şifreniz başarıyla değiştirildi!')
      // Redirect to login
      window.location.href = '/login'
    } catch (error) {
      console.error('Error resetting password:', error)
      alert('Şifre sıfırlama başarısız oldu. Lütfen tekrar deneyin.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {step === 'email' && 'Şifremi Unuttum'}
            {step === 'sent' && 'E-posta Gönderildi'}
            {step === 'reset' && 'Yeni Şifre Belirle'}
          </CardTitle>
          <CardDescription>
            {step === 'email' && 'E-posta adresinizle şifrenizi sıfırlayın'}
            {step === 'sent' && 'Sıfırlama talimatları gönderildi'}
            {step === 'reset' && 'Güvenli yeni şifre oluşturun'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {step === 'email' && (
            <form onSubmit={handleSendResetEmail} className="space-y-4">
              <div className="text-center text-sm text-gray-600 mb-6">
                E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.
              </div>
              
              <div>
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@sirket.com"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || !email}
              >
                {isLoading ? 'Gönderiliyor...' : 'Sıfırlama Bağlantısı Gönder'}
              </Button>
              
              <div className="text-center">
                <Link href="/login" className="text-sm text-primary hover:underline">
                  ← Giriş sayfasına dön
                </Link>
              </div>
            </form>
          )}

          {step === 'sent' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">📧</span>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  E-posta gönderildi
                </h3>
                <p className="text-gray-600 text-sm">
                  <strong>{email}</strong> adresine şifre sıfırlama talimatları gönderdik.
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  E-postayı görmüyorsanız spam klasörünüzü kontrol edin.
                </p>
              </div>

              {/* Manual code entry option */}
              <div className="border-t pt-6">
                <p className="text-sm text-gray-600 mb-4">
                  E-postadaki 6 haneli kodu buraya girebilirsiniz:
                </p>
                
                <form onSubmit={handleVerifyCode} className="space-y-4">
                  <div>
                    <Label htmlFor="code">Sıfırlama Kodu</Label>
                    <Input
                      id="code"
                      value={resetCode}
                      onChange={(e) => setResetCode(e.target.value)}
                      placeholder="123456"
                      maxLength={6}
                      className="text-center text-lg font-mono"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading || resetCode.length !== 6}
                  >
                    {isLoading ? 'Doğrulanıyor...' : 'Kodu Doğrula'}
                  </Button>
                </form>
              </div>
              
              <div className="space-y-2 text-sm">
                <button 
                  onClick={handleSendResetEmail}
                  className="text-primary hover:underline block mx-auto"
                  disabled={isLoading}
                >
                  E-postayı tekrar gönder
                </button>
                <Link href="/login" className="text-gray-500 hover:underline block">
                  Giriş sayfasına dön
                </Link>
              </div>
            </div>
          )}

          {step === 'reset' && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="text-center text-sm text-gray-600 mb-6">
                <strong>{email}</strong> için yeni şifre belirleyin.
              </div>
              
              <div>
                <Label htmlFor="newPassword">Yeni Şifre</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 8 karakter"
                  minLength={8}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="confirmPassword">Yeni Şifre Tekrar</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Şifreyi tekrarlayın"
                  minLength={8}
                  required
                />
              </div>
              
              {/* Password strength indicator */}
              <div className="text-xs text-gray-500 space-y-1">
                <p className={newPassword.length >= 8 ? 'text-green-600' : ''}>
                  ✓ En az 8 karakter
                </p>
                <p className={/[A-Z]/.test(newPassword) ? 'text-green-600' : ''}>
                  ✓ En az 1 büyük harf
                </p>
                <p className={/[0-9]/.test(newPassword) ? 'text-green-600' : ''}>
                  ✓ En az 1 rakam
                </p>
                <p className={/[!@#$%^&*]/.test(newPassword) ? 'text-green-600' : ''}>
                  ✓ En az 1 özel karakter (!@#$%^&*)
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700" 
                disabled={isLoading || newPassword !== confirmPassword || newPassword.length < 8}
              >
                {isLoading ? 'Şifre değiştiriliyor...' : 'Şifreyi Değiştir'}
              </Button>
              
              <div className="text-center">
                <Link href="/login" className="text-sm text-primary hover:underline">
                  ← Giriş sayfasına dön
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
      
      {/* Info card */}
      <div className="absolute bottom-4 left-4 right-4 max-w-md mx-auto">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-4">
            <div className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">ℹ️</span>
              <div className="text-xs text-blue-800">
                <p className="font-medium mb-1">Güvenlik İpuçları:</p>
                <ul className="space-y-1">
                  <li>• Şifre sıfırlama e-postası 15 dakika içinde gelmezse spam klasörünü kontrol edin</li>
                  <li>• Sıfırlama bağlantısı güvenlik nedeniyle 1 saat geçerlidir</li>
                  <li>• Güçlü şifre kullanın: büyük/küçük harf, rakam ve özel karakter</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}