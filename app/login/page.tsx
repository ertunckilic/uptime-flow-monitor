import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Command, Languages } from 'lucide-react'
import Link from 'next/link'
import AuthButton from '@/components/AuthButton'

const dicts = {
  tr: {
    title: "UptimeFlow",
    subtitle: "Sistem ağına güvenli erişim.",
    emailLabel: "E-POSTA",
    passLabel: "ŞİFRE",
    emailPlaceholder: "admin@sistem.com",
    passPlaceholder: "••••••••",
    loginBtn: "Oturum Aç",
    signupBtn: "Yeni Kayıt",
    langCode: "en",
    langName: "EN"
  },
  en: {
    title: "UptimeFlow",
    subtitle: "Secure access to network grid.",
    emailLabel: "EMAIL",
    passLabel: "PASSWORD",
    emailPlaceholder: "admin@system.com",
    passPlaceholder: "••••••••",
    loginBtn: "Sign In",
    signupBtn: "Register",
    langCode: "tr",
    langName: "TR"
  }
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string; lang?: string }>
}) {
  const resolvedParams = await searchParams;
  const lang = (resolvedParams.lang === 'en' ? 'en' : 'tr') as 'tr' | 'en';
  const t = dicts[lang];

  const login = async (formData: FormData) => {
    'use server'
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = await createClient()
    
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return redirect(`/login?lang=${lang}&message=${error.message}`)
    return redirect('/')
  }

  const signup = async (formData: FormData) => {
    'use server'
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = await createClient()
    
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) return redirect(`/login?lang=${lang}&message=${error.message}`)
    return redirect('/')
  }

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 flex items-center justify-center p-6 font-sans selection:bg-white selection:text-black relative">
      
      <div className="absolute top-8 right-8">
        <Link 
          href={`/login?lang=${t.langCode}`}
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-white transition-colors p-2"
        >
          <Languages className="w-4 h-4" />
          {t.langName}
        </Link>
      </div>

      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="p-2 bg-neutral-900 border border-neutral-700 rounded-lg mb-4">
            <Command className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">{t.title}</h1>
          <p className="text-neutral-500 text-sm mt-2 text-center">{t.subtitle}</p>
        </div>
        
        {resolvedParams?.message && (
          <div className="mb-6 p-3 bg-[#0a0a0a] border border-rose-900/50 rounded-lg text-rose-500 text-sm font-medium text-center">
            {resolvedParams.message}
          </div>
        )}

        <form className="flex flex-col gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">{t.emailLabel}</label>
            <input 
              name="email" 
              type="email" 
              placeholder={t.emailPlaceholder} 
              required 
              className="block w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:border-white focus:ring-1 focus:ring-white focus:outline-none transition-colors sm:text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">{t.passLabel}</label>
            <input 
              name="password" 
              type="password" 
              placeholder={t.passPlaceholder} 
              required 
              minLength={6}
              className="block w-full px-4 py-3 bg-[#0a0a0a] border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:border-white focus:ring-1 focus:ring-white focus:outline-none transition-colors sm:text-sm"
            />
          </div>
          <div className="flex flex-col gap-3 mt-2">
            <AuthButton text={t.loginBtn} formAction={login} isPrimary={true} />
            <AuthButton text={t.signupBtn} formAction={signup} isPrimary={false} />
          </div>
        </form>
      </div>
    </div>
  )
}