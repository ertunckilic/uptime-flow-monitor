"use client";

import { initializePaddle, Paddle } from '@paddle/paddle-js';
import { useState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { Command, Globe, Clock3, LogOut, Plus, Trash2, Languages, Zap, Sparkles } from "lucide-react";
import Favicon from "@/components/Favicon";

const dicts = {
  tr: {
    title: "Ağ İzleme Merkezi",
    description: "Sistemlerin erişilebilirliğini ve güvenlik sertifikalarını gerçek zamanlı olarak denetle.",
    inputPlaceholder: "https://hedef-sunucu.com",
    addButton: "Sistemi Ekle",
    statusHeader: "Bağlantı Durumu",
    sslHeader: "SSL Sertifikası",
    targetHeader: "Hedef Bağlantı",
    online: "Operasyonel",
    pending: "Doğrulanıyor",
    error: "Erişim Yok",
    empty: "İzleme havuzunda aktif bir hedef bulunmuyor.",
    days: "gün",
    logout: "Çıkış",
    idLabel: "ID",
    addedLabel: "Eklenme",
    analyzing: "Analiz ediliyor",
    deleteConfirm: "Bu hedefi izleme ağından kaldırmak istediğine emin misin?",
    errLimit: "Ücretsiz planda sınırına ulaştın. Sınırsız takip için Premium'a geç.",
    errDuplicate: "Bu hedef sistem zaten izleme ağınızda mevcut.",
    errInvalid: "Lütfen geçerli bir http veya https bağlantısı girin.",
    upgradeBtn: "Premium'a Yükselt",
    successTitle: "Aramıza Hoş Geldin!",
    successDesc: "Premium aboneliğin başarıyla aktifleştirildi. Artık sınırsız sistem izleyebilirsin."
  },
  en: {
    title: "Network Command Center",
    description: "Monitor system availability and security certificates in real-time.",
    inputPlaceholder: "https://target-server.com",
    addButton: "Add System",
    statusHeader: "Connection Status",
    sslHeader: "SSL Certificate",
    targetHeader: "Target Identifier",
    online: "Operational",
    pending: "Verifying",
    error: "No Access",
    empty: "No active targets in the monitoring pool.",
    days: "days",
    logout: "Logout",
    idLabel: "ID",
    addedLabel: "Added",
    analyzing: "Analyzing",
    deleteConfirm: "Are you sure you want to remove this target from the monitoring network?",
    errLimit: "Free plan limit reached. Upgrade to Premium for unlimited monitoring.",
    errDuplicate: "This target system is already in your monitoring grid.",
    errInvalid: "Please enter a valid http or https connection.",
    upgradeBtn: "Upgrade to Premium",
    successTitle: "Welcome Aboard!",
    successDesc: "Your Premium subscription is now active. You can monitor unlimited systems."
  }
};

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-medium text-sm hover:bg-neutral-200 transition-colors active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Plus className="w-4 h-4" />
      {pending ? "..." : text}
    </button>
  );
}

function StatusIndicator({ status, t }: { status: string, t: any }) {
  const isOnline = status === 'Online';
  const isPending = status === 'Pending';
  
  return (
    <div className="flex items-center gap-2">
      <span className={`relative flex h-2.5 w-2.5 rounded-full ${
        isOnline ? 'bg-emerald-500' : isPending ? 'bg-amber-500' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]'
      }`}>
        {isOnline && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40" />}
      </span>
      <span className="text-sm font-medium text-neutral-200">
        {isOnline ? t.online : isPending ? t.pending : t.error}
      </span>
    </div>
  );
}

export default function DashboardClient({ userId, sites, onAdd, onLogout, onDelete }: any) {
  const [lang, setLang] = useState<'tr' | 'en'>('tr');
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [paddle, setPaddle] = useState<Paddle>(); // PADDLE STATE'İ EKLENDİ

  const t = dicts[lang];
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const success = searchParams.get('success');

  // PADDLE'I BAŞLATIYORUZ
  useEffect(() => {
    initializePaddle({
      environment: 'sandbox', // Canlıya geçince 'production' olacak
      token: 'SENIN_PADDLE_CLIENT_TOKENIN' // Paddle'dan onay alınca buraya token gireceksin
    }).then((paddleInstance: Paddle | undefined) => {
      if (paddleInstance) {
        setPaddle(paddleInstance);
      }
    });
  }, []);

  // Sayfa yenileme efekti
  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
    }, 30000);
    return () => clearInterval(interval);
  }, [router]);

  // YEPYENİ PADDLE ÖDEME FONKSİYONU
  const handleUpgrade = async () => {
    setIsUpgrading(true);

    if (!paddle?.Checkout) {
      alert(lang === 'tr' 
        ? "Paddle ödeme altyapısı onay aşamasındadır. Yakında aktif edilecektir." 
        : "Paddle billing integration is pending approval.");
      setIsUpgrading(false);
      return;
    }

    try {
      paddle.Checkout.open({
        items: [
          {
            priceId: 'pri_xxxxxxxxxxxx',
            quantity: 1,
          }
        ],
        customData: {
          user_id: userId // PADDLE'A KULLANICIYI BURADA TANITIYORUZ
        },
        settings: {
          theme: 'dark',
          locale: lang === 'tr' ? 'tr' : 'en'
        }
      });
    } catch (err) {
      console.error("Paddle Hatası:", err);
    } finally {
      setIsUpgrading(false);
    }
  };

  // ... (Aşağıdaki return () kısmı tamamen aynı kalacak, dokunma) ...
  
  const listVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.04 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-100 font-sans selection:bg-white selection:text-black">
      <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-md border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-neutral-900 border border-neutral-700 rounded-md">
              <Command className="w-5 h-5 text-neutral-100" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">UptimeFlow</span>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-white transition-colors p-2"
            >
              <Languages className="w-4 h-4" />
              {lang === 'tr' ? 'EN' : 'TR'}
            </button>

            <form action={onLogout}>
              <button type="submit" className="flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors">
                <LogOut className="w-4 h-4" />
                {t.logout}
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="mb-12 max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">{t.title}</h1>
          <p className="text-neutral-400 text-base">{t.description}</p>
        </section>

        <section className="mb-12">
          {success === 'true' && (
            <div className="mb-6 p-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-4">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <Sparkles className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-emerald-400 font-semibold mb-1">{t.successTitle}</h3>
                <p className="text-sm text-neutral-400">{t.successDesc}</p>
              </div>
            </div>
          )}
          {error === 'limit' && (
            <div className="mb-6 p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-indigo-400 font-semibold mb-1 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> UptimeFlow Premium
                </h3>
                <p className="text-sm text-neutral-400">{t.errLimit}</p>
              </div>
              <button 
                onClick={handleUpgrade}
                disabled={isUpgrading}
                className="whitespace-nowrap bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
              >
                {isUpgrading ? "..." : t.upgradeBtn}
              </button>
            </div>
          )}
          {error === 'duplicate' && (
            <div className="mb-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400 text-sm font-medium">
              {t.errDuplicate}
            </div>
          )}
          {error === 'invalid' && (
            <div className="mb-4 p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-sm font-medium">
              {t.errInvalid}
            </div>
          )}

          <form 
            ref={formRef}
            action={async (formData) => {
              await onAdd(formData);
              formRef.current?.reset();
            }} 
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1 max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Globe className="w-5 h-5 text-neutral-500" />
              </div>
              <input 
                name="url"
                type="url" 
                placeholder={t.inputPlaceholder} 
                required
                className="block w-full pl-12 pr-4 py-3 bg-[#0a0a0a] border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:border-white focus:ring-1 focus:ring-white focus:outline-none transition-colors sm:text-sm"
              />
            </div>
            <SubmitButton text={t.addButton} />
          </form>
        </section>

        <section>
          <div className="grid grid-cols-12 gap-4 px-4 pb-3 border-b border-neutral-800 text-xs font-semibold text-neutral-500 uppercase tracking-wide hidden md:grid">
            <div className="col-span-6">{t.targetHeader}</div>
            <div className="col-span-3">{t.statusHeader}</div>
            <div className="col-span-3 text-right">{t.sslHeader}</div>
          </div>

          <motion.div variants={listVariants} initial="hidden" animate="show" className="divide-y divide-neutral-800/60">
            {!sites || sites.length === 0 ? (
              <motion.div variants={itemVariants} className="py-16 text-center">
                <p className="text-neutral-500 text-sm">{t.empty}</p>
              </motion.div>
            ) : (
              sites.map((site: any) => (
                <motion.div 
                  key={site.id} 
                  variants={itemVariants}
                  className="group grid grid-cols-12 gap-4 items-center py-4 px-4 hover:bg-[#0a0a0a] transition-colors rounded-lg -mx-4"
                >
                  <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                    <div className="w-8 h-8 bg-neutral-900 border border-neutral-800 rounded flex items-center justify-center overflow-hidden shrink-0">
                      <Favicon url={site.url} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-neutral-100 truncate">{site.url}</p>
                      <p className="text-xs text-neutral-500 mt-0.5 font-mono">
                        {t.idLabel}: {site.id.split('-')[0]} • {t.addedLabel}: {new Date(site.created_at).toISOString().split('T')[0]}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-6 md:col-span-3">
                    <StatusIndicator status={site.status || 'Pending'} t={t} />
                  </div>

                  <div className="col-span-6 md:col-span-3 flex md:justify-end items-center gap-4">
                    {site.ssl_days_left !== null ? (
                      <div className="text-right">
                        <span className={`font-mono text-base font-medium ${site.ssl_days_left > 10 ? 'text-neutral-100' : 'text-rose-500'}`}>
                          {site.ssl_days_left}
                        </span>
                        <span className="text-xs text-neutral-500 ml-1">{t.days}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-neutral-500 font-mono">{t.analyzing}</span>
                    )}
                    
                    <form 
                      action={onDelete} 
                      onSubmit={(e) => { if(!window.confirm(t.deleteConfirm)) e.preventDefault(); }}
                    >
                      <input type="hidden" name="id" value={site.id} />
                      <button type="submit" className="p-2 text-neutral-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-md transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </section>
      </main>
    </div>
  );
}