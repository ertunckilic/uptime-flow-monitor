'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // Gerçek hata mesajını URL'ye ekliyoruz
    return redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }
  redirect('/dashboard');
}

export async function registerUser(formData: FormData) {
  'use server';
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('fullName') as string;

  const supabase = await createClient();
  // data değişkenini de alıyoruz ki oturum açılıp açılmadığını kontrol edebilelim
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/dashboard`,
    }
  });

  if (error) {
    return redirect(`/register?error=${encodeURIComponent(error.message)}`);
  }

  // ÇÖZÜM BURADA: Eğer Supabase kullanıcıyı anında içeri aldıysa (oturum açıldıysa)
  // Onu login'e gönderip middleware'i kitlemek yerine direkt dashboard'a alıyoruz.
  if (data.session) {
    return redirect('/dashboard');
  }

  // Eğer e-posta onayı gerekiyorsa ve oturum açılmadıysa normal akışa devam et
  return redirect(`/login?error=${encodeURIComponent('Kayıt başarılı! Lütfen e-posta adresinize gelen onay linkine tıklayın.')}`);
}

export async function resetPassword(formData: FormData) {
  'use server';
  const email = formData.get('email') as string;
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    // Yönlendirmeyi direkt reset sayfasına değil, gümrük kapısına (callback) yapıyoruz
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/reset-password`,
  });
  if (error) return redirect('/forgot-password?error=true');
  return redirect('/forgot-password?success=true');
}

export async function updatePassword(formData: FormData) {
  'use server';
  const password = formData.get('password') as string;
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  
  if (error) {
    return redirect('/reset-password?error=true');
  }
  
  // Kullanıcı zaten doğrulandığı için direkt dashboard'a, temiz bir başlangıca gönderiyoruz
  return redirect('/dashboard');
}