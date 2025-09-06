import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-gray-900 hover:text-primary">
            Med<span className="text-primary">SaaS</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">
            Kullanım Koşulları ve Hizmet Sözleşmesi
          </h1>
          <p className="text-gray-600 mt-2">
            Son güncelleme: 6 Eylül 2025
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>1. Genel Hükümler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Bu sözleşme, MedSaaS platformunu kullanan şirketler ("Kullanıcı", "Müşteri") ile 
              hizmet sağlayıcısı ("MedSaaS", "Platform") arasındaki ilişkileri düzenler.
            </p>
            <p>
              Platform'u kullanmaya başladığınızda bu koşulları kabul etmiş sayılırsınız.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>2. Hizmet Tanımı</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              MedSaaS, medikal sektördeki şirketler için aşağıdaki hizmetleri sunar:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Tender Yönetimi:</strong> İhale takibi ve yönetimi</li>
              <li>• <strong>Ziyaret Takibi:</strong> Saha çalışanı ziyaret yönetimi</li>
              <li>• <strong>Envanter Yönetimi:</strong> Stok ve ürün takibi</li>
              <li>• <strong>Müşteri Yönetimi:</strong> CRM özellikleri</li>
              <li>• <strong>Finansal Raporlama:</strong> Analiz ve raporlama araçları</li>
              <li>• <strong>Mobil Uygulama:</strong> iOS ve Android uygulamalar</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>3. Abonelik ve Ücretlendirme</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">3.1 Abonelik Planları:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Temel Plan:</strong> $20/ay/çalışan (çekirdek modüller)</li>
                <li>• <strong>Profesyonel Plan:</strong> $35/ay/çalışan (gelişmiş modüller)</li>
                <li>• <strong>Enterprise Plan:</strong> $50/ay/çalışan (tüm modüller + AI)</li>
                <li>• <strong>Kurulum Ücreti:</strong> $500 (tek seferlik)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">3.2 Demo Period:</h4>
              <p className="text-gray-700">
                Yeni müşteriler 15 gün ücretsiz deneme süresine sahiptir. Bu süre sonunda 
                abonelik planı seçilmediği takdirde hesap askıya alınır.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">3.3 Ödeme Koşulları:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Ödemeler aylık olarak peşin tahsil edilir</li>
                <li>• KDV dahil fiyatlandırma (%20)</li>
                <li>• Ödeme Stripe güvenli ödeme sistemi ile alınır</li>
                <li>• Başarısız ödemeler için 3 gün ek süre tanınır</li>
                <li>• Yıllık ödemede %10 indirim uygulanır</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>4. Kullanıcı Yükümlülükleri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Kullanıcı, platform kullanımında aşağıdaki kurallara uymayı kabul eder:</p>
            <ul className="space-y-2 text-gray-700">
              <li>• Doğru ve güncel bilgi sağlamak</li>
              <li>• Güvenlik önlemlerini almak (güçlü şifre, 2FA vb.)</li>
              <li>• Hesap bilgilerini korumak ve paylaşmamak</li>
              <li>• Yasalara ve etik kurallara uymak</li>
              <li>• Sistem kaynaklarını kötüye kullanmamak</li>
              <li>• Telif haklarına saygı göstermek</li>
              <li>• Spam veya zararlı içerik göndermeyi</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>5. Veri Güvenliği ve Gizlilik</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">5.1 Veri Koruma:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• TLS 1.3 şifreleme ile veri iletimi</li>
                <li>• AES-256 ile veri saklama</li>
                <li>• ISO 27001 uyumlu güvenlik önlemleri</li>
                <li>• Düzenli güvenlik denetimleri</li>
                <li>• Çalışan erişim kontrolü</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">5.2 Veri Sahipliği:</h4>
              <p className="text-gray-700">
                Platform'a yüklenen tüm veriler müşteriye aittir. MedSaaS, sadece hizmet 
                sunumu amacıyla bu verilere erişir ve işler.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">5.3 Yedekleme:</h4>
              <p className="text-gray-700">
                Veriler günlük olarak yedeklenir ve 30 gün süreyle saklanır. Müşteri 
                istediğinde veri export'u sağlanır.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>6. Hizmet Seviyesi (SLA)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-gray-700">
              <li>• <strong>Uptime Garantisi:</strong> %99.9 (aylık)</li>
              <li>• <strong>Yanıt Süreleri:</strong>
                <ul className="ml-6 mt-2 space-y-1">
                  <li>- Kritik: 2 saat</li>
                  <li>- Yüksek: 8 saat</li>
                  <li>- Orta: 24 saat</li>
                  <li>- Düşük: 72 saat</li>
                </ul>
              </li>
              <li>• <strong>Destek Kanalları:</strong> E-posta, chat, telefon</li>
              <li>• <strong>Destek Saatleri:</strong> 09:00-18:00 (Pazartesi-Cuma)</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>7. Sorumluluk Sınırları</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">7.1 Platform Sorumluluğu:</h4>
              <p className="text-gray-700">
                MedSaaS, hizmet sunumunda makul özenin gösterilmesini taahhüt eder. 
                Ancak, hizmet kesintileri veya veri kayıplarından dolayı sorumluluğu, 
                ödenen abonelik bedeliyle sınırlıdır.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">7.2 Müşteri Sorumluluğu:</h4>
              <p className="text-gray-700">
                Müşteri, platform üzerinde oluşturduğu içerik ve yaptığı işlemlerden 
                sorumludur. Yasal yükümlülüklerini yerine getirmekle yükümlüdür.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>8. Sözleşme Süresi ve Fesih</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">8.1 Süre:</h4>
              <p className="text-gray-700">
                Sözleşme, hesap oluşturulduğu tarihte başlar ve taraflardan biri 
                feshedene kadar devam eder.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">8.2 Fesih Koşulları:</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Müşteri istediği zaman 30 gün önceden haber vererek feshedebilir</li>
                <li>• Ödeme yapılmaması durumunda hesap askıya alınır</li>
                <li>• Kullanım koşullarının ihlali durumunda hesap kapatılabilir</li>
                <li>• Fesih sonrası veriler 90 gün süreyle saklanır, sonra silinir</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>9. Fikri Mülkiyet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              MedSaaS platform'una ait tüm yazılım, tasarım, içerik ve ticari markalar 
              MedSaaS'in mülkiyetindedir. Müşteri, sadece hizmet kapsamında kullanım 
              hakkına sahiptir.
            </p>
            <p>
              Müşterinin platform'a yüklediği veriler ve içerikler müşterinin mülkiyetinde 
              kalır. MedSaaS sadece hizmet sunumu için gerekli hakları kullanır.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>10. Uyuşmazlık Çözümü</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Bu sözleşmeden doğacak uyuşmazlıklar öncelikle dostane yollarla çözülmeye 
              çalışılır. Çözülemeyen durumlar İstanbul Mahkemelerinin yetkisindedir.
            </p>
            <p>
              Türk Hukuku uygulanır. Tüketici işlemleri için Tüketici Hakem Heyetleri 
              ve Tüketici Mahkemeleri yetkilidir.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>11. Değişiklikler</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              MedSaaS, bu kullanım koşullarını önceden bildirimde bulunarak değiştirebilir. 
              Değişiklikler web sitesinde yayınlanır ve e-posta ile bildirilir. 
              Değişikliklere itiraz eden müşteri sözleşmeyi feshedebilir.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">İletişim Bilgileri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-blue-700">
              <p><strong>E-posta:</strong> legal@medsaas.com</p>
              <p><strong>Telefon:</strong> +90 212 XXX XX XX</p>
              <p><strong>Adres:</strong> [Şirket adresi]</p>
              <p><strong>Destek:</strong> support@medsaas.com</p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="text-primary hover:underline">
              ← Kayıt sayfasına dön
            </Link>
            <Link href="/privacy" className="text-primary hover:underline">
              KVKK Politikası
            </Link>
            <Link href="/contact" className="text-primary hover:underline">
              İletişim
            </Link>
          </div>
          
          <p className="text-sm text-gray-500 mt-8">
            Bu sözleşmeyi kabul ederek MedSaaS hizmetlerini kullanmaya başlayabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  )
}