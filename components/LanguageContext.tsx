"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const dicts = {
  tr: {
    nav: { login: 'Giriş Yap', register: 'Ücretsiz Başla', home: 'Ana Sayfa' },
    hero: { title: 'Sistemlerini 7/24 İzle.', title2: 'Kesintileri Anında Gör.', desc: 'Karmaşık ekranlara veda et. Sade, modern ve pratik altyapımızla web sitelerinin uptime ve SSL durumlarını tek merkezden yönet.', startBtn: 'Hemen Başla', priceBtn: 'Fiyatlandırma' },
    pricing: { title: 'Şeffaf Planlar', starter: 'Başlangıç', pro: 'Pro', month: '/ay', free: 'Ücretsiz', feature1: '3 Adet Web Sitesi', feature2: '5 Dakika Kontrol Aralığı', feature3: 'E-posta Bildirimleri', feature4: 'Sınırsız Web Sitesi', feature5: 'Öncelikli Kontrol & SSL Analizi', feature6: '7/24 Destek', popular: 'POPÜLER' },
    auth: { welcome: 'Tekrar hoş geldin', continue: 'Sistemlerini izlemeye devam etmek için giriş yap.', email: 'E-POSTA', pass: 'ŞİFRE', name: 'AD SOYAD', loginBtn: 'Giriş Yap', regBtn: 'Kayıt Ol', noAccount: 'Hesabın yok mu?', hasAccount: 'Zaten hesabın var mı?', create: 'Hesabını oluştur', start: 'Sadece 30 saniyede izlemeye başla.', errLogin: 'E-posta veya şifre hatalı. Lütfen tekrar dene.', errReg: 'Kayıt olurken hata oluştu. Şifrenin en az 6 karakter olduğuna emin ol.', placeholderEmail: 'isim@sirket.com', placeholderPass1: '••••••••', placeholderPass2: 'Minimum 6 karakter', placeholderName: 'Adınız Soyadınız' },
    footer: { rights: '© 2026 UptimeFlow. Tüm hakları saklıdır.', terms: 'Kullanım Koşulları', privacy: 'Gizlilik Politikası', refund: 'İade Politikası' },
    legal: {
      updateDate: 'Son güncellenme: 15 Nisan 2026',
      termsTitle: 'Kullanım Koşulları',
      termsDesc: 'UptimeFlow platformuna hoş geldin. Bu siteyi kullanarak aşağıdaki şartları kabul etmiş sayılırsın.',
      termsH1: '1. Hizmet Tanımı',
      termsP1: 'UptimeFlow, kullanıcıların web sitelerinin erişilebilirliğini ve SSL sertifika sürelerini takip etmelerine olanak sağlayan bir SaaS platformudur.',
      termsH2: '2. Hesap Güvenliği',
      termsP2: 'Hesap bilgilerinin gizliliğinden ve hesabın üzerinden yapılan tüm işlemlerden bizzat sen sorumlusun. Şüpheli bir durum fark edersen hemen bize bildirmelisin.',
      termsH3: '3. Abonelik ve Ödemeler',
      termsP3: 'Premium özelliklere erişim için belirlenen ücretler Paddle aracılığıyla tahsil edilir. Fiyatlarda değişiklik yapma hakkımız saklıdır.',
      privacyTitle: 'Gizlilik Politikası',
      privacyDesc: 'Gizliliğin bizim için çok önemli. Verilerini nasıl koruduğumuzu aşağıda açıkladım.',
      privacyH1: '1. Toplanan Veriler',
      privacyP1: 'Kayıt sırasında verdiğin e-posta adresi ve izlemek istediğin web sitesi URL\'lerini sistemimizde güvenle saklıyoruz.',
      privacyH2: '2. Veri Kullanımı',
      privacyP2: 'E-posta adresini sadece sistem çökmelerinde sana bildirim göndermek ve hesabınla ilgili güncellemeleri iletmek için kullanıyoruz. Asla üçüncü taraflara satmıyoruz.',
      privacyH3: '3. Ödeme Güvenliği',
      privacyP3: 'Ödeme bilgilerin doğrudan Paddle tarafından işlenir. Biz senin kart bilgilerini asla sunucularımızda tutmuyoruz.',
      refundTitle: 'İade Politikası',
      refundDesc: 'Müşteri memnuniyeti bizim için her şeyden önce gelir. Eğer hizmetten memnun kalmazsan süreci çok basit tuttuk.',
      refundH1: '1. İade Hakkı',
      refundP1: 'Satın alma tarihinden itibaren 14 gün içerisinde hiçbir gerekçe göstermeksizin tam iade talep edebilirsin.',
      refundH2: '2. İade Süreci',
      refundP2: 'İade talebini destek ekibimize ilettiğinde, Paddle üzerinden işlemin başlatılır ve bankana bağlı olarak 5-10 iş günü içinde tutar hesabına yansır.',
      refundH3: '3. İstisnalar',
      refundP3: '14 günü geçen taleplerde maalesef iade yapamıyoruz ancak aboneliğini istediğin an iptal edip dönem sonunda sonlandırabilirsin.'
    }
  },
  en: {
    nav: { login: 'Sign In', register: 'Get Started', home: 'Home' },
    hero: { title: 'Monitor Systems 24/7.', title2: 'Spot Downtime Instantly.', desc: 'Say goodbye to complex screens. Manage your website uptime and SSL statuses from a single, modern, and clean dashboard.', startBtn: 'Start Now', priceBtn: 'Pricing' },
    pricing: { title: 'Transparent Pricing', starter: 'Starter', pro: 'Pro', month: '/mo', free: 'Free', feature1: '3 Websites', feature2: '5 Minute Checks', feature3: 'Email Alerts', feature4: 'Unlimited Websites', feature5: 'Priority Checks & SSL', feature6: '24/7 Support', popular: 'POPULAR' },
    auth: { welcome: 'Welcome back', continue: 'Sign in to continue monitoring your systems.', email: 'EMAIL', pass: 'PASSWORD', name: 'FULL NAME', loginBtn: 'Sign In', regBtn: 'Sign Up', noAccount: "Don't have an account?", hasAccount: 'Already have an account?', create: 'Create an account', start: 'Start monitoring in 30 seconds.', errLogin: 'Invalid email or password. Please try again.', errReg: 'Registration failed. Make sure password is at least 6 characters.', placeholderEmail: 'name@company.com', placeholderPass1: '••••••••', placeholderPass2: 'Min. 6 characters', placeholderName: 'Name Surname' },
    footer: { rights: '© 2026 UptimeFlow. All rights reserved.', terms: 'Terms of Service', privacy: 'Privacy Policy', refund: 'Refund Policy' },
    legal: {
      updateDate: 'Last updated: April 15, 2026',
      termsTitle: 'Terms of Service',
      termsDesc: 'Welcome to UptimeFlow. By using this site, you agree to the following conditions.',
      termsH1: '1. Service Description',
      termsP1: 'UptimeFlow is a SaaS platform that allows users to track their websites\' accessibility and SSL certificate expiration dates.',
      termsH2: '2. Account Security',
      termsP2: 'You are personally responsible for the confidentiality of your account information and all activities under your account.',
      termsH3: '3. Subscription and Payments',
      termsP3: 'Fees for premium features are collected via Paddle. We reserve the right to change prices.',
      privacyTitle: 'Privacy Policy',
      privacyDesc: 'Your privacy is critical to us. Here is how we protect your data.',
      privacyH1: '1. Collected Data',
      privacyP1: 'We securely store the email address you provide during registration and the website URLs you want to monitor.',
      privacyH2: '2. Data Usage',
      privacyP2: 'We use your email only to send crash alerts and account updates. We never sell your data to third parties.',
      privacyH3: '3. Payment Security',
      privacyP3: 'Your payment info is processed directly by Paddle. We never store your card details on our servers.',
      refundTitle: 'Refund Policy',
      refundDesc: 'Customer satisfaction is everything to us. If you are not satisfied, the process is simple.',
      refundH1: '1. Right to Refund',
      refundP1: 'You can request a full refund within 14 days of purchase without providing any reason.',
      refundH2: '2. Refund Process',
      refundP2: 'When you submit a request, the refund is initiated via Paddle and reflects in your account within 5-10 business days.',
      refundH3: '3. Exceptions',
      refundP3: 'We cannot process refunds after 14 days, but you can cancel your subscription anytime before the next billing cycle.'
    }
  }
};

const LanguageContext = createContext<any>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<'tr' | 'en'>('tr');

  useEffect(() => {
    const saved = localStorage.getItem('lang');
    if (saved) setLang(saved as 'tr' | 'en');
  }, []);

  const handleSetLang = (newLang: 'tr' | 'en') => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t: dicts[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);