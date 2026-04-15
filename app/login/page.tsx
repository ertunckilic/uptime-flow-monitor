import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Command } from 'lucide-react';

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  
  async function login(formData: FormData) {
    'use server';
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return redirect('/login?error=true');
    redirect('/dashboard');
  }

  return (
    <div className="bg-[#050505] text-neutral-100 min-h-screen font-sans selection:bg-white selection:text-black relative">
      <header className="absolute top-0 w-full p-6 flex justify-center">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="p-1.5 bg-neutral-900 border border-neutral-700 rounded-md">
            <Command className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">UptimeFlow</span>
        </Link>
      </header>

      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">Tekrar hoş geldin</h1>
          <p className="text-neutral-500 text-sm mb-8">Sistemlerini izlemeye devam etmek için giriş yap.</p>

          {searchParams.error && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-sm">
              E-posta veya şifre hatalı. Lütfen tekrar dene.
            </div>
          )}

          <form action={login} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-2">E-posta</label>
              <input 
                type="email" 
                name="email"
                required
                className="block w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:border-white focus:ring-1 focus:ring-white focus:outline-none transition-colors sm:text-sm"
                placeholder="isim@sirket.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-2">Şifre</label>
              <input 
                type="password" 
                name="password"
                required
                className="block w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:border-white focus:ring-1 focus:ring-white focus:outline-none transition-colors sm:text-sm"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-neutral-200 transition-colors mt-2">
              Giriş Yap
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-neutral-500">
            Hesabın yok mu? <Link href="/register" className="text-white hover:underline">Ücretsiz kaydol</Link>
          </p>
        </div>
      </div>
    </div>
  );
}