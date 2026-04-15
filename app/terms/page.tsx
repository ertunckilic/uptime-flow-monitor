"use client";
import { useLanguage } from '@/components/LanguageContext';

export default function TermsPage() {
  const { t } = useLanguage();
  return (
    <div className="max-w-4xl mx-auto py-20 px-6 text-neutral-400 selection:bg-white selection:text-black">
      <h1 className="text-4xl font-bold mb-8 text-white">{t.legal.termsTitle}</h1>
      <p className="mb-6">{t.legal.termsDesc}</p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">{t.legal.termsH1}</h2>
      <p className="mb-4">{t.legal.termsP1}</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">{t.legal.termsH2}</h2>
      <p className="mb-4">{t.legal.termsP2}</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">{t.legal.termsH3}</h2>
      <p className="mb-4">{t.legal.termsP3}</p>

      <p className="mt-12 text-sm text-neutral-600">{t.legal.updateDate}</p>
    </div>
  );
}