"use client";

import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';

export default function LandingPage() {
  const { t } = useLanguage();

  return (
    <div className="bg-[#050505] text-neutral-100 font-sans selection:bg-white selection:text-black">
      <section className="py-32 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white">
          {t.hero.title} <br/> {t.hero.title2}
        </h1>
        <p className="text-neutral-400 mb-10 max-w-2xl mx-auto text-lg">
          {t.hero.desc}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register" className="bg-white text-black font-medium px-8 py-3 rounded-lg hover:bg-neutral-200 transition-colors">{t.hero.startBtn}</Link>
          <Link href="#pricing" className="bg-[#0a0a0a] border border-neutral-800 text-white font-medium px-8 py-3 rounded-lg hover:bg-neutral-900 transition-colors">{t.hero.priceBtn}</Link>
        </div>
      </section>

      <section id="pricing" className="py-24 px-6 border-t border-neutral-800/60 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-12 text-center text-white">{t.pricing.title}</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="p-8 rounded-xl bg-[#0a0a0a] border border-neutral-800 flex flex-col">
            <h3 className="text-lg font-medium text-neutral-200 mb-2">{t.pricing.starter}</h3>
            <div className="text-3xl font-bold text-white mb-6">$0<span className="text-sm text-neutral-500 font-normal">{t.pricing.month}</span></div>
            <ul className="text-neutral-400 space-y-3 mb-8 text-sm flex-1">
              <li>• {t.pricing.feature1}</li>
              <li>• {t.pricing.feature2}</li>
              <li>• {t.pricing.feature3}</li>
            </ul>
          </div>
          <div className="p-8 rounded-xl bg-[#0a0a0a] border border-neutral-500 flex flex-col relative">
            <div className="absolute -top-3 left-8 bg-white text-black text-xs font-bold px-3 py-1 rounded-full">{t.pricing.popular}</div>
            <h3 className="text-lg font-medium text-neutral-200 mb-2">{t.pricing.pro}</h3>
            <div className="text-3xl font-bold text-white mb-6">$9.99<span className="text-sm text-neutral-500 font-normal">{t.pricing.month}</span></div>
            <ul className="text-neutral-400 space-y-3 mb-8 text-sm flex-1">
              <li>• {t.pricing.feature4}</li>
              <li>• {t.pricing.feature5}</li>
              <li>• {t.pricing.feature6}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}