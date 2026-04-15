import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import DashboardClient from '@/components/DashboardClient';
import { revalidatePath } from 'next/cache';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { error?: string; success?: string };
}) {
  const supabase = await createClient();

  // 1. Kapı Kontrolü
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return redirect('/login');
  }

  // 2. Verileri Çek ('websites' tablosundan)
  const { data: sites } = await supabase
    .from('websites') 
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  // 3. Ekleme Fonksiyonu
  async function addSite(formData: FormData) {
    'use server';
    const url = formData.get('url') as string;
    if (!url) return;

    const supabaseServer = await createClient();
    const { data: { user } } = await supabaseServer.auth.getUser();
    if (!user) return;

    // URL Geçerlilik Kontrolü
    try {
      new URL(url);
    } catch {
      return redirect('/dashboard?error=invalid');
    }

    // Çift kayıt kontrolü
    const { data: existing } = await supabaseServer
      .from('websites')
      .select('id')
      .eq('user_id', user.id)
      .eq('url', url)
      .single();

    if (existing) {
      return redirect('/dashboard?error=duplicate');
    }

    // Limit Kontrolü
    const { count } = await supabaseServer
      .from('websites')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    if (count !== null && count >= 3) {
      return redirect('/dashboard?error=limit');
    }

    // VERİTABANINA EKLEME
    const { error } = await supabaseServer.from('websites').insert({
      user_id: user.id,
      url: url,
      status: 'Pending',
      ssl_days_left: null
    });

    // RADAR: EĞER SUPABASE HATA VERİRSE, BUNU URL'YE YAPIŞTIR
    if (error) {
      return redirect(`/dashboard?error=${encodeURIComponent(error.message)}`);
    }

    revalidatePath('/dashboard');
    return redirect('/dashboard'); // Başarılıysa URL'deki eski hataları temizle
  }

  async function deleteSite(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    if (!id) return;

    const supabaseServer = await createClient();
    const { data: { user } } = await supabaseServer.auth.getUser();
    if (!user) return;

    await supabaseServer
      .from('websites')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    revalidatePath('/dashboard');
  }

  async function logout() {
    'use server';
    const supabaseServer = await createClient();
    await supabaseServer.auth.signOut();
    redirect('/');
  }

  return (
    <DashboardClient
      sites={sites || []}
      onAdd={addSite}
      onDelete={deleteSite}
      onLogout={logout}
      error={searchParams.error}
      success={searchParams.success}
    />
  );
}