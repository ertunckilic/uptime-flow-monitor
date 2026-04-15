"use client";

import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-neutral-800/60 mt-20 py-10 bg-[#050505] text-neutral-500">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm">
          {t.footer.rights}
        </div>
        
        <div className="flex gap-8 text-sm">
          <Link href="/terms" className="hover:text-white transition-colors">
            {t.footer.terms}
          </Link>
          <Link href="/privacy" className="hover:text-white transition-colors">
            {t.footer.privacy}
          </Link>
          <Link href="/refund" className="hover:text-white transition-colors">
            {t.footer.refund}
          </Link>
        </div>
      </div>
    </footer>
  );
}