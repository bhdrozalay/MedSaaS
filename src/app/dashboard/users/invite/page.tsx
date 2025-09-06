'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SimpleSelect as Select } from '@/components/ui/select'

export default function InviteUserPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    role: ''
  })

  const departments = [
    { id: 'sales', name: 'Satış', roles: ['Satış Temsilcisi', 'Satış Müdürü'] },
    { id: 'warehouse', name: 'Depo', roles: ['Depo Sorumlusu', 'Depo İşçisi'] },
    { id: 'accounting', name: 'Muhasebe', roles: ['Mali Müşavir', 'Muhasebeci'] },
    { id: 'management', name: 'Yönetici', roles: ['Admin', 'Genel Müdür'] }
  ]

  const selectedDepartment = departments.find(dept => dept.name === formData.department)
  const availableRoles = selectedDepartment?.roles || []

  const handleDepartmentChange = (department: string) => {
    setFormData({
      ...formData,
      department,
      role: '' // Reset role when department changes
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: API call to send invitation
      console.log('Sending invitation:', formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      alert('Davetiye başarıyla gönderildi!')
      router.push('/dashboard/users')
    } catch (error) {
      console.error('Error sending invitation:', error)
      alert('Davetiye gönderilirken hata oluştu.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Kullanıcı Davet Et</h1>
        <p className="text-gray-600">Yeni çalışan davet edin</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Davetiye Bilgileri</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Ad Soyad *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Örn: Ahmet Yılmaz"
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
            </div>

            <div>
              <Label htmlFor="email">E-posta *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="ahmet@sirket.com"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="department">Departman *</Label>
                <Select 
                  value={formData.department} 
                  onValueChange={handleDepartmentChange}
                  required
                >
                  <option value="">Departman seçiniz</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.name}>{dept.name}</option>
                  ))}
                </Select>
              </div>
              
              <div>
                <Label htmlFor="role">Rol *</Label>
                <Select 
                  value={formData.role} 
                  onValueChange={(role) => setFormData({...formData, role})}
                  disabled={!formData.department}
                  required
                >
                  <option value="">Rol seçiniz</option>
                  {availableRoles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => router.push('/dashboard/users')}
              >
                İptal
              </Button>
              
              <Button 
                type="submit" 
                disabled={isLoading || !formData.name || !formData.email || !formData.department || !formData.role}
                className="bg-green-600 hover:bg-green-700"
              >
                {isLoading ? 'Gönderiliyor...' : 'Davetiye Gönder'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">ℹ️ Davetiye Süreci</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-blue-700 space-y-2 text-sm">
            <li>• Davetiye e-postası belirtilen adrese gönderilecek</li>
            <li>• Kullanıcı 48 saat içinde davetiyeyi kabul etmelidir</li>
            <li>• Davetiyeyi kabul eden kullanıcı şifre oluşturarak hesabını aktif edecek</li>
            <li>• Kullanıcı seçilen departman ve rol yetkilerine sahip olacak</li>
          </ul>
        </CardContent>
      </Card>

      {/* Department Permissions Preview */}
      {formData.department && (
        <Card>
          <CardHeader>
            <CardTitle>{formData.department} Departmanı Yetkileri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {formData.department === 'Satış' && (
                <>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Ziyaret Takibi Modülü - Tam Erişim</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Tender Yönetimi Modülü - Tam Erişim</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    <span>Müşteri CRM - Okuma/Yazma</span>
                  </div>
                </>
              )}
              
              {formData.department === 'Depo' && (
                <>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Envanter Yönetimi - Tam Erişim</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    <span>Sipariş İşlemleri - Okuma/Güncelleme</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Tedarikçi Yönetimi - Sadece Okuma</span>
                  </div>
                </>
              )}
              
              {formData.department === 'Muhasebe' && (
                <>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Finansal Raporlar - Tam Erişim</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Fatura ve Ödeme İşlemleri - Tam Erişim</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Bütçe Planlama - Tam Erişim</span>
                  </div>
                </>
              )}
              
              {formData.department === 'Yönetici' && (
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Tüm Modüller - Tam Erişim</span>
                </div>
              )}
            </div>
            
            <div className="mt-4 text-xs text-gray-500">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>Tam Erişim
              <span className="w-2 h-2 bg-yellow-500 rounded-full inline-block mr-2 ml-4"></span>Kısıtlı Erişim
              <span className="w-2 h-2 bg-blue-500 rounded-full inline-block mr-2 ml-4"></span>Sadece Okuma
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}