import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DashboardPage() {
  const stats = [
    {
      title: 'Toplam Kullanıcı',
      value: '12',
      subtitle: '5 aktif, 7 beklemede',
      icon: '👥'
    },
    {
      title: 'Departman',
      value: '4',
      subtitle: 'Satış, Depo, Muhasebe, Yönetici',
      icon: '🏢'
    },
    {
      title: 'Demo Süresi',
      value: '8 gün',
      subtitle: 'Kalan süre',
      icon: '⏱️'
    },
    {
      title: 'Plan',
      value: 'Demo',
      subtitle: 'Tüm özellikler aktif',
      icon: '⭐'
    }
  ]

  const quickActions = [
    {
      title: 'Kullanıcı Ekle',
      description: 'Yeni çalışan davet et',
      href: '/dashboard/users/invite',
      icon: '👤➕'
    },
    {
      title: 'Departman Oluştur',
      description: 'Yeni departman tanımla',
      href: '/dashboard/departments/create',
      icon: '🏢➕'
    },
    {
      title: 'Abonelik Yükselt',
      description: 'Planınızı geliştirin',
      href: '/dashboard/billing',
      icon: '⬆️'
    },
    {
      title: 'Ayarlar',
      description: 'Şirket bilgilerini düzenle',
      href: '/dashboard/settings',
      icon: '⚙️'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Şirketinizin genel durumu</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <span className="text-2xl">{stat.icon}</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Demo Warning */}
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="text-amber-800 flex items-center">
            ⚠️ Demo Süresi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-amber-700 mb-4">
            Demo süreniz 8 gün sonra sona erecek. Kesintisiz hizmet almak için aboneliğinizi başlatın.
          </p>
          <Button asChild className="bg-amber-600 hover:bg-amber-700">
            <Link href="/dashboard/billing">
              Abonelik Başlat
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Hızlı İşlemler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Card key={action.title} className="hover:shadow-md transition-shadow cursor-pointer">
              <Link href={action.href}>
                <CardHeader className="text-center">
                  <div className="text-3xl mb-2">{action.icon}</div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 text-center">{action.description}</p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Son Aktiviteler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <div>
                <p className="text-sm font-medium">Şirket kaydı tamamlandı</p>
                <p className="text-xs text-gray-500">2 saat önce</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm">👤</span>
              </div>
              <div>
                <p className="text-sm font-medium">Admin kullanıcı oluşturuldu</p>
                <p className="text-xs text-gray-500">2 saat önce</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-sm">🎉</span>
              </div>
              <div>
                <p className="text-sm font-medium">15 günlük demo başlatıldı</p>
                <p className="text-xs text-gray-500">2 saat önce</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}