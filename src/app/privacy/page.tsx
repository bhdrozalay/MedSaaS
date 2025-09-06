import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-gray-900 hover:text-primary">
            Med<span className="text-primary">SaaS</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">
            Kişisel Verilerin Korunması ve Gizlilik Politikası
          </h1>
          <p className="text-gray-600 mt-2">
            KVKK Aydınlatma Metni - Son güncelleme: 6 Eylül 2025
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>1. Veri Sorumlusu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              MedSaaS platformu, kişisel verilerinizin işlenmesinde veri sorumlusu sıfatıyla hareket etmektedir. 
              6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca kişisel verileriniz aşağıda 
              açıklanan kapsamda işlenecektir.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>2. İşlenen Kişisel Veri Kategorileri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Kimlik Verileri:</h4>
                <p className="text-gray-700">Ad, soyad, e-posta adresi, telefon numarası</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">İletişim Verileri:</h4>
                <p className="text-gray-700">Adres, telefon, e-posta bilgileri</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Mesleki Deneyim Verileri:</h4>
                <p className="text-gray-700">Çalışılan şirket, departman, pozisyon bilgileri</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">İşlem Güvenliği Verileri:</h4>
                <p className="text-gray-700">IP adresi, çerez bilgileri, log kayıtları</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>3. Kişisel Verilerin İşlenme Amaçları</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-700">
              <li>• Hizmet sunumu ve platform işletimi</li>
              <li>• Kullanıcı hesabı yönetimi ve kimlik doğrulama</li>
              <li>• İletişim kurulması ve bilgilendirme</li>
              <li>• Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>• Platform güvenliğinin sağlanması</li>
              <li>• Analiz ve raporlama faaliyetleri</li>
              <li>• Müşteri destek hizmetleri</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>4. İşleme Hukuki Sebepleri</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-700">
              <li>• KVKK md. 5/2(a) - Açık rıza</li>
              <li>• KVKK md. 5/2(c) - Sözleşme ilişkisi</li>
              <li>• KVKK md. 5/2(e) - Yasal yükümlülük</li>
              <li>• KVKK md. 5/2(f) - Meşru menfaat</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>5. Kişisel Verilerin Paylaşım Durumları</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Kişisel verileriniz, hizmet sunumu için gerekli olan durumlarda ve yasal zorunluluklar 
              çerçevesinde aşağıdaki taraflarla paylaşılabilir:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• İş ortakları ve hizmet sağlayıcıları</li>
              <li>• Yasal merciler ve kamu otoriteleri</li>
              <li>• Teknik altyapı sağlayıcıları</li>
              <li>• Ödeme hizmet sağlayıcıları</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>6. Veri Saklama Süreleri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Kişisel verileriniz, işlenme amacının gerektirdiği süre boyunca ve yasal saklama 
              yükümlülükleri gözetilerek saklanacaktır:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Hesap verileri: Hesap aktif olduğu süre boyunca</li>
              <li>• İşlem kayıtları: 10 yıl (Vergi mevzuatı gereği)</li>
              <li>• Log kayıtları: 2 yıl (Siber güvenlik mevzuatı gereği)</li>
              <li>• İletişim kayıtları: 3 yıl</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>7. KVKK Hakları</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>KVKK md. 11 uyarınca sahip olduğunuz haklar:</p>
            <ul className="space-y-2 text-gray-700">
              <li>• Kişisel verilerin işlenip işlenmediğini öğrenme</li>
              <li>• İşlenmişse buna ilişkin bilgi talep etme</li>
              <li>• İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>• Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
              <li>• Eksik veya yanlış işlenmişse bunların düzeltilmesini isteme</li>
              <li>• Silinmesini veya yok edilmesini isteme</li>
              <li>• Düzeltme, silme ve yok edilme işlemlerinin paylaşıldığı üçüncü kişilere bildirilmesini isteme</li>
              <li>• İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhine bir sonuç ortaya çıkmasına itiraz etme</li>
              <li>• Kanuna aykırı işleme nedeniyle zarara uğraması halinde zararın giderilmesini talep etme</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>8. Başvuru Yolları</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              KVKK haklarınızı kullanmak için aşağıdaki yollarla başvurabilirsiniz:
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p><strong>E-posta:</strong> kvkk@medsaas.com</p>
              <p><strong>Posta:</strong> MedSaaS KVKK Birimi, [Adres Bilgisi]</p>
              <p><strong>Başvuru Formu:</strong> Web sitemizdeki KVKK başvuru formunu kullanabilirsiniz</p>
            </div>
            <p className="text-sm text-gray-600">
              Başvurularınız 30 gün içinde ücretsiz olarak yanıtlanacaktır. Başvurunuzun 
              kimliğinizi doğrulayacak belgeler ile birlikte yapılması gerekmektedir.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>9. Güvenlik Önlemleri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Kişisel verilerinizin güvenliği için alınan önlemler:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• SSL/TLS şifreleme teknolojisi</li>
              <li>• Erişim kontrolü ve yetkilendirme sistemi</li>
              <li>• Düzenli güvenlik denetimleri</li>
              <li>• Veri yedekleme ve kurtarma sistemleri</li>
              <li>• Çalışan eğitimleri ve gizlilik sözleşmeleri</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>10. Değişiklikler</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Bu gizlilik politikası gerektiğinde güncellenebilir. Önemli değişiklikler 
              e-posta yoluyla veya platform üzerinden bildirilecektir. Politikayı 
              düzenli olarak gözden geçirmenizi öneriyoruz.
            </p>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="text-primary hover:underline">
              ← Kayıt sayfasına dön
            </Link>
            <Link href="/terms" className="text-primary hover:underline">
              Kullanım Koşulları
            </Link>
            <Link href="/contact" className="text-primary hover:underline">
              İletişim
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}