import Link from 'next/link';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans antialiased">
      {/* --- NAVBAR --- */}
      <nav className="border-b border-white/5 py-4 px-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-xl font-bold tracking-tighter">UPTIME<span className="text-emerald-500">FLOW</span></div>
        <div className="flex gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-emerald-400 transition-colors py-2 px-4">Giriş Yap</Link>
          <Link href="/register" className="text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-4 rounded-lg transition-all">Ücretsiz Başla</Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">
          Sistemlerinizi 7/24 <br/> Güvende Tutun
        </h1>
        <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Web sitelerinizin erişilebilirliğini ve SSL sertifika sürelerini otomatik takip edin. Kesintilerden müşterilerinizden önce haberdar olun.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register" className="bg-white text-black font-bold py-4 px-8 rounded-xl hover:bg-neutral-200 transition-all text-lg">Hemen İzlemeye Başla</Link>
          <Link href="#pricing" className="bg-neutral-900 border border-white/10 text-white font-bold py-4 px-8 rounded-xl hover:bg-neutral-800 transition-all text-lg">Fiyatlandırmayı Gör</Link>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-8 border-t border-white/5">
        <div className="p-8 rounded-2xl bg-neutral-900/50 border border-white/5">
          <div className="text-emerald-500 mb-4 text-3xl">📡</div>
          <h3 className="text-xl font-bold mb-2">Anlık Uptime Takibi</h3>
          <p className="text-neutral-400">Sistemleriniz çöktüğü an haberdar olun. Her 5 dakikada bir otomatik kontrol.</p>
        </div>
        <div className="p-8 rounded-2xl bg-neutral-900/50 border border-white/5">
          <div className="text-blue-500 mb-4 text-3xl">🔒</div>
          <h3 className="text-xl font-bold mb-2">SSL Sertifika Analizi</h3>
          <p className="text-neutral-400">Sertifika sürenizin dolmasına kaç gün kaldığını takip edin, sürpriz kesintileri engelleyin.</p>
        </div>
        <div className="p-8 rounded-2xl bg-neutral-900/50 border border-white/5">
          <div className="text-yellow-500 mb-4 text-3xl">📧</div>
          <h3 className="text-xl font-bold mb-2">Akıllı Bildirimler</h3>
          <p className="text-neutral-400">Hata durumunda anında e-posta bildirimi alarak müdahale sürenizi kısaltın.</p>
        </div>
      </section>

      {/* --- PRICING SECTION (CRITICAL FOR PADDLE) --- */}
      <section id="pricing" className="py-24 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Şeffaf Fiyatlandırma</h2>
          <p className="text-neutral-400 mb-16">Gizli ücret yok, sadece ihtiyacınız olanı ödeyin.</p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="p-10 rounded-3xl border border-white/10 bg-black flex flex-col items-center">
              <h3 className="text-xl font-medium mb-2">Başlangıç</h3>
              <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-neutral-500">/ay</span></div>
              <ul className="text-neutral-400 space-y-4 mb-10 text-left w-full">
                <li className="flex items-center gap-2">✅ 3 Adet Web Sitesi</li>
                <li className="flex items-center gap-2">✅ 5 Dakika Kontrol Aralığı</li>
                <li className="flex items-center gap-2">✅ E-posta Bildirimleri</li>
                <li className="flex items-center gap-2 text-neutral-600">❌ Sınırsız Web Sitesi</li>
              </ul>
              <Link href="/register" className="w-full py-3 rounded-xl border border-white/20 hover:bg-white/5 transition-all font-bold">Ücretsiz Dene</Link>
            </div>

            {/* Premium Plan */}
            <div className="p-10 rounded-3xl border-2 border-emerald-500 bg-emerald-500/5 flex flex-col items-center relative overflow-hidden">
              <div className="absolute top-4 right-[-35px] bg-emerald-500 text-black text-[10px] font-bold py-1 px-10 rotate-45">POPÜLER</div>
              <h3 className="text-xl font-medium mb-2 text-emerald-400">Pro</h3>
              <div className="text-4xl font-bold mb-6">$19<span className="text-lg text-neutral-500">/ay</span></div>
              <ul className="text-neutral-400 space-y-4 mb-10 text-left w-full">
                <li className="flex items-center gap-2">✅ Sınırsız Web Sitesi</li>
                <li className="flex items-center gap-2 text-emerald-400">✅ Öncelikli Kontrol</li>
                <li className="flex items-center gap-2 text-emerald-400">✅ Gelişmiş SSL Analizi</li>
                <li className="flex items-center gap-2 text-emerald-400">✅ 7/24 Öncelikli Destek</li>
              </ul>
              <Link href="/register" className="w-full py-3 rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 transition-all font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)]">Hemen Yükselt</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}