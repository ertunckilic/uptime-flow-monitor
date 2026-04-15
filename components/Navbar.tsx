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
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LOGO (Tıklayınca Ana Sayfaya Döner) */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="p-1.5 bg-neutral-900 border border-neutral-700 rounded-md">
            <Command className="w-5 h-5 text-neutral-100" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">UptimeFlow</span>
        </Link>
        
        {/* SAĞ KONTROLLER */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-white transition-colors p-2"
          >
            <Languages className="w-4 h-4" />
            {lang === 'tr' ? 'EN' : 'TR'}
          </button>
          
          <div className="hidden sm:flex items-center gap-4">
            {pathname !== '/login' && (
              <Link href="/login" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
                {t.nav.login}
              </Link>
            )}
            {pathname !== '/register' && (
              <Link href="/register" className="bg-white text-black px-4 py-2 rounded-lg font-medium text-sm hover:bg-neutral-200 transition-colors">
                {t.nav.register}
              </Link>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}