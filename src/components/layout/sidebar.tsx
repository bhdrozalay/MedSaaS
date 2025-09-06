'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: '🏠'
  },
  {
    title: 'Kullanıcı Yönetimi',
    href: '/dashboard/users',
    icon: '👥'
  },
  {
    title: 'Departmanlar',
    href: '/dashboard/departments', 
    icon: '🏢'
  },
  {
    title: 'Roller',
    href: '/dashboard/roles',
    icon: '🔑'
  },
  {
    title: 'Abonelik',
    href: '/dashboard/billing',
    icon: '💳'
  },
  {
    title: 'Ayarlar',
    href: '/dashboard/settings',
    icon: '⚙️'
  }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold">
          Med<span className="text-primary">SaaS</span>
        </h1>
        <p className="text-sm text-gray-600">Admin Panel</p>
      </div>
      
      <nav className="mt-6">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center px-6 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors',
              pathname === item.href && 'bg-primary/10 text-primary border-r-2 border-primary'
            )}
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  )
}