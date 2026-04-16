"use client";

import Link from 'next/link';
import { updatePassword } from '@/app/actions';
import { useSearchParams } from 'next/navigation';
import { Command } from 'lucide-react';
import { Suspense } from 'react';

function ResetContent() {
  const searchParams = useSearchParams();
  const errorMsg = searchParams.get('error');

  return (
    <div className="bg-[#050505] text-neutral-100 min-h-screen flex flex-col font-sans selection:bg-white selection:text-black">
      <header className="w-full p-6 flex justify-center shrink-0">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="p-1.5 bg-neutral-900 border border-neutral-800 rounded-md">
            <Command className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">UptimeFlow</span>
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center p-6 pb-12">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Yeni Şifre Belirle</h1>
          <p className="text-neutral-500 text-sm mb-8">Lütfen güçlü ve yeni bir şifre girin.</p>

          {errorMsg && <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-sm">Şifre güncellenemedi. Linkin süresi dolmuş olabilir.</div>}

          <form action={updatePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-2">Yeni Şifre</label>
              <input type="password" name="password" required minLength={6} className="block w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:border-white focus:ring-1 focus:ring-white focus:outline-none transition-colors sm:text-sm" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-neutral-200 transition-colors mt-2 active:scale-[0.98]">Şifreyi Güncelle</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
      <ResetContent />
    </Suspense>
  );
}