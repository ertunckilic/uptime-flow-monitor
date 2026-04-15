"use client";

import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { registerUser } from '@/app/actions';

export default function RegisterPage({ searchParams }: { searchParams: { error?: string } }) {
  const { t, lang } = useLanguage();

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-6 selection:bg-white selection:text-black">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">{t.auth.create}</h1>
        <p className="text-neutral-500 text-sm mb-8">{t.auth.start}</p>

        {searchParams.error && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-sm">
            {searchParams.error === 'true' 
              ? t.auth.errReg 
              : searchParams.error === 'User already registered'
                ? (lang === 'tr' ? 'Bu e-posta adresi zaten kullanımda. Lütfen giriş yapın.' : 'This email is already registered. Please sign in.')
                : searchParams.error}
          </div>
        )}

<form action={registerUser} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-2">{t.auth.name}</label>
              <input 
                type="text" name="fullName" required
                className="block w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:border-white focus:ring-1 focus:ring-white focus:outline-none transition-colors sm:text-sm"
                placeholder={t.auth.placeholderName}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-2">{t.auth.email}</label>
              <input 
                type="email" name="email" required
                className="block w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:border-white focus:ring-1 focus:ring-white focus:outline-none transition-colors sm:text-sm"
                placeholder={t.auth.placeholderEmail}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-2">{t.auth.pass}</label>
              <input 
                type="password" name="password" required minLength={6}
                className="block w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:border-white focus:ring-1 focus:ring-white focus:outline-none transition-colors sm:text-sm"
                placeholder={t.auth.placeholderPass2}
              />
            </div>
            <button type="submit" className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-neutral-200 transition-colors mt-2">
              {t.auth.regBtn}
            </button>
          </form>

        <p className="text-center mt-8 text-sm text-neutral-500">
          {t.auth.hasAccount} <Link href="/login" className="text-white hover:underline">{t.auth.loginBtn}</Link>
        </p>
      </div>
    </div>
  );
}