"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const dicts = {
  tr: {
    nav: { login: 'Giriş Yap', register: 'Ücretsiz Başla', home: 'Ana Sayfa' },
    hero: { title: 'Sistemlerini 7/24 İzle.', title2: 'Kesintileri Anında Gör.', desc: 'Karmaşık ekranlara veda et. Sade, modern ve pratik altyapımızla web sitelerinin uptime ve SSL durumlarını tek merkezden yönet.', startBtn: 'Hemen Başla', priceBtn: 'Fiyatlandırma' },
    pricing: { title: 'Şeffaf Planlar', starter: 'Başlangıç', pro: 'Pro', month: '/ay', free: 'Ücretsiz', feature1: '3 Adet Web Sitesi', feature2: '5 Dakika Kontrol Aralığı', feature3: 'E-posta Bildirimleri', feature4: 'Sınırsız Web Sitesi', feature5: 'Öncelikli Kontrol & SSL Analizi', feature6: '7/24 Destek', popular: 'POPÜLER' },
    auth: { welcome: 'Tekrar hoş geldin', continue: 'Sistemlerini izlemeye devam etmek için giriş yap.', email: 'E-POSTA', pass: 'ŞİFRE', name: 'AD SOYAD', loginBtn: 'Giriş Yap', regBtn: 'Kayıt Ol', noAccount: 'Hesabın yok mu?', hasAccount: 'Zaten hesabın var mı?', create: 'Hesabını oluştur', start: 'Sadece 30 saniyede izlemeye başla.', errLogin: 'E-posta veya şifre hatalı. Lütfen tekrar dene.', errReg: 'Kayıt olurken hata oluştu. Şifrenin en az 6 karakter olduğuna emin ol.' }
  },
  en: {
    nav: { login: 'Sign In', register: 'Get Started', home: 'Home' },
    hero: { title: 'Monitor Systems 24/7.', title2: 'Spot Downtime Instantly.', desc: 'Say goodbye to complex screens. Manage your website uptime and SSL statuses from a single, modern, and clean dashboard.', startBtn: 'Start Now', priceBtn: 'Pricing' },
    pricing: { title: 'Transparent Pricing', starter: 'Starter', pro: 'Pro', month: '/mo', free: 'Free', feature1: '3 Websites', feature2: '5 Minute Checks', feature3: 'Email Alerts', feature4: 'Unlimited Websites', feature5: 'Priority Checks & SSL', feature6: '24/7 Support', popular: 'POPULAR' },
    auth: { welcome: 'Welcome back', continue: 'Sign in to continue monitoring your systems.', email: 'EMAIL', pass: 'PASSWORD', name: 'FULL NAME', loginBtn: 'Sign In', regBtn: 'Sign Up', noAccount: "Don't have an account?", hasAccount: 'Already have an account?', create: 'Create an account', start: 'Start monitoring in 30 seconds.', errLogin: 'Invalid email or password. Please try again.', errReg: 'Registration failed. Make sure password is at least 6 characters.' }
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