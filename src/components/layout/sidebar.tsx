'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard,
  Users,
  Building,
  Shield,
  CreditCard,
  Settings,
  LogOut
} from 'lucide-react'

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'Kullanıcı Yönetimi',
    href: '/dashboard/users',
    icon: Users
  },
  {
    title: 'Departmanlar',
    href: '/dashboard/departments', 
    icon: Building
  },
  {
    title: 'Roller',
    href: '/dashboard/roles',
    icon: Shield
  },
  {
    title: 'Abonelik',
    href: '/dashboard/billing',
    icon: CreditCard
  },
  {
    title: 'Ayarlar',
    href: '/dashboard/settings',
    icon: Settings
  }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col h-full">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-bold text-gray-900">
          Med<span className="text-blue-600">SaaS</span>
        </h1>
        <p className="text-xs text-gray-500 mt-1">ABC Medikal Ltd.</p>
      </div>
      
      <nav className="flex-1 mt-4 space-y-1 px-3">
        {sidebarItems.map((item) => {
          const IconComponent = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <IconComponent className="mr-3 w-5 h-5 flex-shrink-0" />
              {item.title}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors">
          <LogOut className="mr-3 w-5 h-5" />
          Çıkış Yap
        </button>
      </div>
    </div>
  )
}