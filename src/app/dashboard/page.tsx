'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DashboardPage() {
  const stats = [
    {
      title: 'Toplam Kullanıcı',
      value: '12',
      subtitle: '5 aktif, 7 beklemede',
      icon: '👥',
      trend: '+2 bu ay',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Departman',
      value: '4',
      subtitle: 'Satış, Depo, Muhasebe, Yönetici',
      icon: '🏢',
      trend: 'Yeni eklenen yok',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Demo Süresi',
      value: '8 gün',
      subtitle: 'Kalan süre',
      icon: '⏰',
      trend: 'Demo bitişi: 14 Eylül',
      color: 'bg-amber-50 text-amber-600'
    },
    {
      title: 'Plan',
      value: 'Demo',
      subtitle: 'Tüm özellikler aktif',
      icon: '⭐',
      trend: 'Profesyonel Plan öneriliyor',
      color: 'bg-green-50 text-green-600'
    }
  ]

  const quickActions = [
    {
      title: 'Kullanıcı Ekle',
      description: 'Yeni çalışan davet et',
      href: '/dashboard/users/invite',
      icon: '👤',
      color: 'bg-blue-50 text-blue-600 hover:bg-blue-100'
    },
    {
      title: 'Departman Oluştur',
      description: 'Yeni departman tanımla',
      href: '/dashboard/departments/create',
      icon: '🏢',
      color: 'bg-purple-50 text-purple-600 hover:bg-purple-100'
    },
    {
      title: 'Abonelik Yükselt',
      description: 'Planınızı geliştirin',
      href: '/dashboard/billing',
      icon: '📈',
      color: 'bg-green-50 text-green-600 hover:bg-green-100'
    },
    {
      title: 'Ayarlar',
      description: 'Şirket bilgilerini düzenle',
      href: '/dashboard/settings',
      icon: '⚙️',
      color: 'bg-gray-50 text-gray-600 hover:bg-gray-100'
    }
  ]

  const recentActivities = [
    {
      title: 'Şirket kaydı tamamlandı',
      time: '2 saat önce',
      icon: '✅',
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Admin kullanıcı oluşturuldu',
      time: '2 saat önce',
      icon: '👤',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: '15 günlük demo başlatıldı',
      time: '2 saat önce',
      icon: '🎉',
      color: 'bg-purple-50 text-purple-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">ABC Medikal Ltd. - Genel Bakış</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <span className="mr-2">📊</span>
                Rapor Al
              </Button>
              <Button size="sm">
                <span className="mr-2">➕</span>
                Yeni Kayıt
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{stat.subtitle}</p>
                    <p className="text-xs mt-2 font-medium text-gray-600">{stat.trend}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold">Hızlı İşlemler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action) => (
                    <Link key={action.title} href={action.href}>
                      <div className={`group p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer ${action.color}`}>
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg">
                            <span className="text-xl">{action.icon}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">
                              {action.title}
                            </h3>
                            <p className="text-sm text-gray-600">{action.description}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Demo Warning */}
          <div>
            <Card className="border-0 shadow-sm bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-l-amber-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-amber-800 flex items-center">
                  <span className="mr-2 text-xl">⚠️</span>
                  Demo Süresi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700 text-sm mb-4">
                  Demo süreniz 8 gün sonra sona erecek. Kesintisiz hizmet almak için aboneliğinizi başlatın.
                </p>
                <Button asChild size="sm" className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                  <Link href="/dashboard/billing">
                    <span className="mr-2">📈</span>
                    Abonelik Başlat
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-sm mt-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold">Son Aktiviteler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${activity.color}`}>
                        <span className="text-sm">{activity.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}