"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Command, Languages } from "lucide-react";

export default function LandingPage() {
  const [lang, setLang] = useState<'tr' | 'en'>('tr');

  return (
    <div className="bg-[#050505] text-neutral-100 min-h-screen font-sans selection:bg-white selection:text-black">
      {/* BİREBİR DASHBOARD HEADER KOPYASI */}
      <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-md border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-neutral-900 border border-neutral-700 rounded-md">
              <Command className="w-5 h-5 text-neutral-100" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">UptimeFlow</span>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-white transition-colors p-2"
            >
              <Languages className="w-4 h-4" />
              {lang === 'tr' ? 'EN' : 'TR'}
            </button>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">Giriş Yap</Link>
              <Link href="/register" className="bg-white text-black px-4 py-2 rounded-lg font-medium text-sm hover:bg-neutral-200 transition-colors">Ücretsiz Başla</Link>
            </div>
          </div>
        </div>
      </header>

      {/* MİNİMALİST HERO KISMI */}
      <section className="py-32 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white">
          Sistemlerini 7/24 İzle. <br/> Kesintileri Anında Gör.
        </h1>
        <p className="text-neutral-400 mb-10 max-w-2xl mx-auto text-lg">
          Karmaşık ekranlara veda et. Sade, modern ve pratik altyapımızla web sitelerinin uptime ve SSL durumlarını tek merkezden yönet.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register" className="bg-white text-black font-medium px-8 py-3 rounded-lg hover:bg-neutral-200 transition-colors">Hemen Başla</Link>
          <Link href="#pricing" className="bg-[#0a0a0a] border border-neutral-800 text-white font-medium px-8 py-3 rounded-lg hover:bg-neutral-900 transition-colors">Fiyatlandırma</Link>
        </div>
      </section>

      {/* MİNİMALİST FİYATLANDIRMA (PADDLE İÇİN) */}
      <section id="pricing" className="py-24 px-6 border-t border-neutral-800/60 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-12 text-center text-white">Şeffaf Planlar</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="p-8 rounded-xl bg-[#0a0a0a] border border-neutral-800 flex flex-col">
            <h3 className="text-lg font-medium text-neutral-200 mb-2">Başlangıç</h3>
            <div className="text-3xl font-bold text-white mb-6">$0<span className="text-sm text-neutral-500 font-normal">/ay</span></div>
            <ul className="text-neutral-400 space-y-3 mb-8 text-sm flex-1">
              <li>• 3 Adet Web Sitesi</li>
              <li>• 5 Dakika Kontrol Aralığı</li>
              <li>• E-posta Bildirimleri</li>
            </ul>
          </div>
          <div className="p-8 rounded-xl bg-[#0a0a0a] border border-neutral-500 flex flex-col relative">
            <div className="absolute -top-3 left-8 bg-white text-black text-xs font-bold px-3 py-1 rounded-full">POPÜLER</div>
            <h3 className="text-lg font-medium text-neutral-200 mb-2">Pro</h3>
            <div className="text-3xl font-bold text-white mb-6">$9.99<span className="text-sm text-neutral-500 font-normal">/ay</span></div>
            <ul className="text-neutral-400 space-y-3 mb-8 text-sm flex-1">
              <li>• Sınırsız Web Sitesi</li>
              <li>• Öncelikli Kontrol & SSL Analizi</li>
              <li>• 7/24 Destek</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}