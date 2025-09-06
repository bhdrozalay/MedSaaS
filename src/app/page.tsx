import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Medikal Sektör için<br />
            <span className="text-primary">Akıllı İşletme Yönetimi</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Medikal sektör için kapsamlı saha satış ve işletme yönetimi sistemi
          </p>
          <p className="text-lg text-gray-500 mb-12">
            Şirket kayıt sürecinden modüler yapıya kadar tüm iş süreçlerinizi dijitalleştirin
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="text-lg px-8 py-3">
              <Link href="/register">
                Ücretsiz Demo Başlat
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
              <Link href="/login">
                Giriş Yap
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">🏢 Şirket Yönetimi</h3>
              <p className="text-gray-600">
                Multi-tenant yapı ile şirket kayıt, onboarding ve kullanıcı yönetimi
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">💰 Abonelik Sistemi</h3>
              <p className="text-gray-600">
                Esnek fiyatlandırma, otomatik faturalandırma ve ödeme yönetimi
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">📊 Modüler Yapı</h3>
              <p className="text-gray-600">
                İhtiyaçlarınıza göre özelleştirilebilir modül sistemi
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}