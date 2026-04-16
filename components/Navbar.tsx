"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Command, Languages } from "lucide-react";
import { useLanguage } from '@/components/LanguageContext';

export default function Navbar() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();

  // Dashboard'da kendi menüsü olduğu için orada bu menüyü gizliyoruz.
  if (pathname.startsWith('/dashboard')) return null;

  return (
    <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-md border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        
        {/* LOGO (Tıklayınca Ana Sayfaya Döner) */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity shrink-0">
          <div className="p-1 sm:p-1.5 bg-neutral-900 border border-neutral-700 rounded-md shrink-0">
            <Command className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-100" />
          </div>
          {/* Çok küçük ekranlarda (<380px) sadece ikon kalır, metin gizlenir ki butonlara yer kalsın */}
          <span className="text-base sm:text-lg font-semibold tracking-tight text-white whitespace-nowrap hidden min-[380px]:block">
            UptimeFlow
          </span>
        </Link>
        
        {/* SAĞ KONTROLLER */}
        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          <button 
            onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-white transition-colors py-2"
          >
            <Languages className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">{lang === 'tr' ? 'EN' : 'TR'}</span>
          </button>
          
          {/* hidden sınıfını kaldırdık, mobilde daralıp PC'de genişleyecek şekilde ayarladık */}
          <div className="flex items-center gap-3 sm:gap-4">
            {pathname !== '/login' && (
              <Link href="/login" className="text-xs sm:text-sm font-medium text-neutral-400 hover:text-white transition-colors whitespace-nowrap">
                {t.nav.login}
              </Link>
            )}
            {pathname !== '/register' && (
              <Link href="/register" className="bg-white text-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium text-xs sm:text-sm hover:bg-neutral-200 transition-colors whitespace-nowrap shrink-0 shadow-sm">
                {t.nav.register}
              </Link>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}