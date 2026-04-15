"use client";

import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';
import { loginUser } from '@/app/actions';

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  const { t } = useLanguage();

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-6 selection:bg-white selection:text-black">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">{t.auth.welcome}</h1>
        <p className="text-neutral-500 text-sm mb-8">{t.auth.continue}</p>

        {searchParams.error && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-sm">
             {searchParams.error === 'true' 
              ? t.auth.errLogin 
              : searchParams.error === 'Invalid login credentials'
                ? (lang === 'tr' ? 'E-posta veya şifre hatalı.' : 'Invalid email or password.')
                : searchParams.error}
          </div>
        )}

<form action={loginUser} className="space-y-4">
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
                type="password" name="password" required
                className="block w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:border-white focus:ring-1 focus:ring-white focus:outline-none transition-colors sm:text-sm"
                placeholder={t.auth.placeholderPass1}
              />
            </div>
            <button type="submit" className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-neutral-200 transition-colors mt-2">
              {t.auth.loginBtn}
            </button>
          </form>

        <p className="text-center mt-8 text-sm text-neutral-500">
          {t.auth.noAccount} <Link href="/register" className="text-white hover:underline">{t.auth.regBtn}</Link>
        </p>
      </div>
    </div>
  );
}