'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SimpleSelect as Select } from '@/components/ui/select'

interface User {
  id: string
  name: string
  email: string
  phone?: string
  department: string
  role: string
  status: 'active' | 'pending' | 'inactive'
  lastLogin?: string
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    email: 'ahmet@abcmedikal.com',
    phone: '+90 555 123 45 67',
    department: 'Yönetici',
    role: 'Admin',
    status: 'active',
    lastLogin: '2 saat önce'
  },
  {
    id: '2',
    name: 'Ayşe Demir',
    email: 'ayse@abcmedikal.com',
    phone: '+90 555 234 56 78',
    department: 'Satış',
    role: 'Satış Temsilcisi',
    status: 'active',
    lastLogin: '1 gün önce'
  },
  {
    id: '3',
    name: 'Mehmet Öz',
    email: 'mehmet@abcmedikal.com',
    department: 'Depo',
    role: 'Depo Sorumlusu',
    status: 'pending'
  },
  {
    id: '4',
    name: 'Fatma Kaya',
    email: 'fatma@abcmedikal.com',
    phone: '+90 555 345 67 89',
    department: 'Muhasebe',
    role: 'Mali Müşavir',
    status: 'inactive',
    lastLogin: '1 hafta önce'
  }
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !statusFilter || user.status === statusFilter
    const matchesDepartment = !departmentFilter || user.department === departmentFilter
    
    return matchesSearch && matchesStatus && matchesDepartment
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Aktif</span>
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Beklemede</span>
      case 'inactive':
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Pasif</span>
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Bilinmeyen</span>
    }
  }

  const handleStatusToggle = (userId: string, newStatus: 'active' | 'inactive') => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: newStatus }
        : user
    ))
  }

  const handleUserDelete = (userId: string) => {
    if (confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      setUsers(users.filter(user => user.id !== userId))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kullanıcı Yönetimi</h1>
          <p className="text-gray-600">Şirket çalışanlarını yönetin</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/users/invite">
            👤 Kullanıcı Davet Et
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">12</div>
            <p className="text-sm text-gray-600">Toplam Kullanıcı</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">5</div>
            <p className="text-sm text-gray-600">Aktif</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">3</div>
            <p className="text-sm text-gray-600">Beklemede</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">4</div>
            <p className="text-sm text-gray-600">Pasif</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtreler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Arama</label>
              <Input
                placeholder="Ad, soyad veya e-posta..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Durum</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <option value="">Tüm durumlar</option>
                <option value="active">Aktif</option>
                <option value="pending">Beklemede</option>
                <option value="inactive">Pasif</option>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Departman</label>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <option value="">Tüm departmanlar</option>
                <option value="Yönetici">Yönetici</option>
                <option value="Satış">Satış</option>
                <option value="Depo">Depo</option>
                <option value="Muhasebe">Muhasebe</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User List */}
      <Card>
        <CardHeader>
          <CardTitle>Kullanıcı Listesi ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Kullanıcı</th>
                  <th className="text-left py-3 px-4">Departman</th>
                  <th className="text-left py-3 px-4">Rol</th>
                  <th className="text-left py-3 px-4">Durum</th>
                  <th className="text-left py-3 px-4">Son Giriş</th>
                  <th className="text-left py-3 px-4">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-600">{user.email}</div>
                        {user.phone && (
                          <div className="text-sm text-gray-500">{user.phone}</div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
                        {user.department}
                      </span>
                    </td>
                    <td className="py-3 px-4">{user.role}</td>
                    <td className="py-3 px-4">{getStatusBadge(user.status)}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {user.lastLogin || 'Hiç giriş yapmadı'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        {user.status === 'active' ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusToggle(user.id, 'inactive')}
                          >
                            Pasifleştir
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusToggle(user.id, 'active')}
                          >
                            Aktifleştir
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUserDelete(user.id)}
                        >
                          Sil
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}