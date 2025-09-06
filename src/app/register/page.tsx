'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { SimpleSelect as Select } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1 - Company Info
    companyName: '',
    companyType: '',
    taxNumber: '',
    taxOffice: '',
    
    // Step 2 - Contact Info
    address: '',
    city: '',
    district: '',
    phone: '',
    website: '',
    
    // Step 3 - Admin User
    adminName: '',
    adminEmail: '',
    adminPhone: '',
    password: '',
    confirmPassword: '',
    
    // Step 4 - Business Info
    industryType: '',
    employeeCount: '',
    businessDescription: '',
    targetModules: [] as string[],
    
    // Terms
    termsAccepted: false,
    gdprAccepted: false
  })

  const industryTypes = [
    'Medikal Cihaz Üreticisi',
    'Medikal Cihaz Distribütörü',
    'Medikal Cihaz Bayii',
    'Sağlık Hizmet Sağlayıcısı',
    'Diğer'
  ]

  const employeeCounts = [
    '1-10',
    '11-50',
    '51-100',
    '101-250',
    '251-500'
  ]

  const availableModules = [
    { id: 'tender', name: 'Tender Modülü' },
    { id: 'visit', name: 'Ziyaret Takibi' },
    { id: 'inventory', name: 'Envanter Yönetimi' },
    { id: 'crm', name: 'Müşteri Yönetimi' },
    { id: 'financial', name: 'Finansal Raporlar' }
  ]

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        console.log('Registration successful:', data)
        // Redirect to verify-email page
        window.location.href = data.redirectTo || '/verify-email'
      } else {
        console.error('Registration failed:', data.message)
        alert(data.message || 'Kayıt işlemi başarısız oldu')
      }
    } catch (error) {
      console.error('Registration error:', error)
      alert('Bir hata oluştu. Lütfen tekrar deneyin.')
    }
  }

  const handleModuleToggle = (moduleId: string) => {
    setFormData(prev => ({
      ...prev,
      targetModules: prev.targetModules.includes(moduleId)
        ? prev.targetModules.filter(id => id !== moduleId)
        : [...prev.targetModules, moduleId]
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            Ücretsiz Hesap Oluşturun
          </CardTitle>
          <CardDescription>
            Adım {step}/4: {
              step === 1 ? 'Şirket Bilgileri' :
              step === 2 ? 'İletişim Bilgileri' :
              step === 3 ? 'Admin Kullanıcı' :
              'İş Bilgileri'
            }
          </CardDescription>
          
          {/* Progress bar */}
          <div className="flex space-x-2 mt-4">
            {[1, 2, 3, 4].map(i => (
              <div 
                key={i}
                className={`flex-1 h-2 rounded-full ${
                  i <= step ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {step === 1 && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Şirket Adı *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    placeholder="ABC Medikal Ltd."
                  />
                </div>
                <div>
                  <Label htmlFor="companyType">Şirket Türü *</Label>
                  <Select value={formData.companyType} onValueChange={(value) => setFormData({...formData, companyType: value})}>
                    <option value="">Seçiniz</option>
                    <option value="ltd">Limited Şirket</option>
                    <option value="as">Anonim Şirket</option>
                    <option value="kol">Kolektif Şirket</option>
                    <option value="komandit">Komandit Şirket</option>
                    <option value="sahis">Şahıs Şirketi</option>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="taxNumber">Vergi Numarası *</Label>
                  <Input
                    id="taxNumber"
                    value={formData.taxNumber}
                    onChange={(e) => setFormData({...formData, taxNumber: e.target.value})}
                    placeholder="1234567890"
                  />
                </div>
                <div>
                  <Label htmlFor="taxOffice">Vergi Dairesi *</Label>
                  <Input
                    id="taxOffice"
                    value={formData.taxOffice}
                    onChange={(e) => setFormData({...formData, taxOffice: e.target.value})}
                    placeholder="Kadıköy Vergi Dairesi"
                  />
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <Label htmlFor="address">Adres *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Tam adres"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">İl *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    placeholder="İstanbul"
                  />
                </div>
                <div>
                  <Label htmlFor="district">İlçe *</Label>
                  <Input
                    id="district"
                    value={formData.district}
                    onChange={(e) => setFormData({...formData, district: e.target.value})}
                    placeholder="Kadıköy"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Telefon *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+90 212 345 67 89"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    placeholder="https://ornek.com"
                  />
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="adminName">Ad Soyad *</Label>
                  <Input
                    id="adminName"
                    value={formData.adminName}
                    onChange={(e) => setFormData({...formData, adminName: e.target.value})}
                    placeholder="Ahmet Yılmaz"
                  />
                </div>
                <div>
                  <Label htmlFor="adminPhone">Telefon</Label>
                  <Input
                    id="adminPhone"
                    value={formData.adminPhone}
                    onChange={(e) => setFormData({...formData, adminPhone: e.target.value})}
                    placeholder="+90 555 123 45 67"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="adminEmail">E-posta *</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={formData.adminEmail}
                  onChange={(e) => setFormData({...formData, adminEmail: e.target.value})}
                  placeholder="admin@sirket.com"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">Şifre *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="Minimum 8 karakter"
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
                  />
                </div>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="industryType">Sektör *</Label>
                  <Select value={formData.industryType} onValueChange={(value) => setFormData({...formData, industryType: value})}>
                    <option value="">Sektör seçiniz</option>
                    {industryTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Label htmlFor="employeeCount">Çalışan Sayısı *</Label>
                  <Select value={formData.employeeCount} onValueChange={(value) => setFormData({...formData, employeeCount: value})}>
                    <option value="">Çalışan sayısı</option>
                    {employeeCounts.map(count => (
                      <option key={count} value={count}>{count}</option>
                    ))}
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="businessDescription">İş Açıklaması</Label>
                <textarea
                  id="businessDescription"
                  className="w-full p-3 border rounded-md"
                  rows={3}
                  value={formData.businessDescription}
                  onChange={(e) => setFormData({...formData, businessDescription: e.target.value})}
                  placeholder="Şirketinizin iş alanı ve faaliyetleri hakkında kısa bilgi"
                />
              </div>
              
              <div>
                <Label>İlgilendiğiniz Modüller</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {availableModules.map(module => (
                    <div key={module.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={module.id}
                        checked={formData.targetModules.includes(module.id)}
                        onCheckedChange={() => handleModuleToggle(module.id)}
                      />
                      <Label htmlFor={module.id} className="text-sm">{module.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => setFormData({...formData, termsAccepted: checked as boolean})}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    <Link href="/terms" className="text-primary hover:underline">Kullanım Koşulları</Link>'nı okudum ve kabul ediyorum *
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="gdpr"
                    checked={formData.gdprAccepted}
                    onCheckedChange={(checked) => setFormData({...formData, gdprAccepted: checked as boolean})}
                  />
                  <Label htmlFor="gdpr" className="text-sm">
                    <Link href="/privacy" className="text-primary hover:underline">KVKK Aydınlatma Metni</Link>'ni okudum ve kişisel verilerimin işlenmesini kabul ediyorum *
                  </Label>
                </div>
              </div>
            </>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handleBack} 
            disabled={step === 1}
          >
            Geri
          </Button>
          
          {step < 4 ? (
            <Button onClick={handleNext}>İleri</Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={!formData.termsAccepted || !formData.gdprAccepted}
              className="bg-green-600 hover:bg-green-700"
            >
              15 Gün Ücretsiz Demo Başlat
            </Button>
          )}
        </CardFooter>
        
        <div className="text-center text-sm text-gray-500 pb-4">
          Zaten hesabınız var mı? <Link href="/login" className="text-primary hover:underline">Giriş yapın</Link>
        </div>
      </Card>
    </div>
  )
}