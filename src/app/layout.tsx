import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { GlobalHeader } from '@/components/layout/global-header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MedSaaS - Medikal Sektör İşletme Yönetimi',
  description: 'Medikal sektör için kapsamlı saha satış ve işletme yönetimi SaaS sistemi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <GlobalHeader />
        {children}
      </body>
    </html>
  )
}