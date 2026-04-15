import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default function RegisterPage({ searchParams }: { searchParams: { error?: string } }) {
  
  async function register(formData: FormData) {
    'use server';
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;
    
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    });

    if (error) {
      return redirect('/register?error=true');
    }
    
    redirect('/dashboard');
  }

  return (
    <div className="bg-[#050505] text-white min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md p-8 rounded-3xl border border-white/5 bg-neutral-900/50 backdrop-blur-xl">
        <div className="text-center mb-10">
          <Link href="/" className="text-2xl font-bold tracking-tighter inline-block mb-4">
            UPTIME<span className="text-emerald-500">FLOW</span>
          </Link>
          <h1 className="text-2xl font-bold">Hesabını oluştur</h1>
          <p className="text-neutral-400 mt-2">Sadece 30 saniyede izlemeye başla.</p>
        </div>

        {searchParams.error && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-sm text-center">
            Kayıt olurken bir hata oluştu. Şifrenin en az 6 karakter olduğuna emin ol.
          </div>
        )}

        <form action={register} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-neutral-300">Ad Soyad</label>
            <input 
              type="text" 
              name="fullName"
              required
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-all"
              placeholder="Adınız"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-neutral-300">E-posta</label>
            <input 
              type="email" 
              name="email"
              required
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-all"
              placeholder="isim@sirket.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-neutral-300">Şifre</label>
            <input 
              type="password" 
              name="password"
              required
              minLength={6}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 transition-all"
              placeholder="Minimum 6 karakter"
            />
          </div>
          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all">
            Hesabımı Oluştur
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-neutral-400">
          Zaten hesabın var mı? <Link href="/login" className="text-emerald-500 hover:underline">Giriş yap</Link>
        </p>
      </div>
    </div>
  );
}