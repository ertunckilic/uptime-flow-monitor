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

  // 1. Kapı Kontrolü: Kullanıcı gerçekten giriş yapmış mı?
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return redirect('/login');
  }

  // 2. Verileri Çek: Sadece bu kullanıcıya ait siteleri getir
  const { data: sites } = await supabase
    .from('sites') 
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  // 3. Sunucu Aksiyonları (Ekleme, Silme, Çıkış)
  async function addSite(formData: FormData) {
    'use server';
    const url = formData.get('url') as string;
    if (!url) return;

    const supabaseServer = await createClient();
    const { data: { user } } = await supabaseServer.auth.getUser();
    if (!user) return;

    try {
      new URL(url); // URL geçerliliğini kontrol et
    } catch {
      redirect('/dashboard?error=invalid');
    }

    // Çift kayıt kontrolü
    const { data: existing } = await supabaseServer
      .from('sites')
      .select('id')
      .eq('user_id', user.id)
      .eq('url', url)
      .single();

    if (existing) {
      redirect('/dashboard?error=duplicate');
    }

    // Limit Kontrolü (Şimdilik ücretsiz planda 3 sınırını baz alıyoruz)
    const { count } = await supabaseServer
      .from('sites')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    if (count !== null && count >= 3) {
      redirect('/dashboard?error=limit');
    }

    // Veritabanına Ekle
    await supabaseServer.from('sites').insert({
      user_id: user.id,
      url: url,
      status: 'Pending',
      ssl_days_left: null
    });

    revalidatePath('/dashboard');
  }

  async function deleteSite(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    if (!id) return;

    const supabaseServer = await createClient();
    const { data: { user } } = await supabaseServer.auth.getUser();
    if (!user) return;

    await supabaseServer
      .from('sites')
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