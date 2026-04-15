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
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('fullName') as string;
  
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email, password, options: { data: { full_name: fullName } }
  });

  if (error) {
    // Gerçek hata mesajını URL'ye ekliyoruz
    return redirect(`/register?error=${encodeURIComponent(error.message)}`);
  }
  redirect('/dashboard');
}