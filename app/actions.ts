'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return redirect('/login?error=true');
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

  if (error) return redirect('/register?error=true');
  redirect('/dashboard');
}