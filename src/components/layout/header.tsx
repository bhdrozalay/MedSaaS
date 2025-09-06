'use client'

import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="bg-white border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
          <p className="text-sm text-gray-600">ABC Medikal Ltd.</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
              AY
            </div>
            <div>
              <p className="text-sm font-medium">Ahmet Yılmaz</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
          
          <Button variant="outline" size="sm">
            Çıkış
          </Button>
        </div>
      </div>
    </header>
  )
}