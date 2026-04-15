"use client";
import { useLanguage } from '@/components/LanguageContext';

export default function PrivacyPage() {
  const { t } = useLanguage();
  return (
    <div className="max-w-4xl mx-auto py-20 px-6 text-neutral-400 selection:bg-white selection:text-black">
      <h1 className="text-4xl font-bold mb-8 text-white">{t.legal.privacyTitle}</h1>
      <p className="mb-6">{t.legal.privacyDesc}</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">{t.legal.privacyH1}</h2>
      <p className="mb-4">{t.legal.privacyP1}</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">{t.legal.privacyH2}</h2>
      <p className="mb-4">{t.legal.privacyP2}</p>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">{t.legal.privacyH3}</h2>
      <p className="mb-4">{t.legal.privacyP3}</p>

      <p className="mt-12 text-sm text-neutral-600">{t.legal.updateDate}</p>
    </div>
  );
}