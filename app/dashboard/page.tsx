import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import DashboardClient from '@/components/DashboardClient';
import { revalidatePath } from 'next/cache';
import { Suspense } from 'react';

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return redirect('/login');

  const { data: sites } = await supabase
    .from('websites') 
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  async function addSite(formData: FormData) {
    'use server';
    const url = formData.get('url') as string;
    if (!url) return;

    const supabaseServer = await createClient();
    const { data: { user } } = await supabaseServer.auth.getUser();
    if (!user) return;

    try { new URL(url); } catch { redirect('/dashboard?error=invalid'); }

    const { data: existing } = await supabaseServer
      .from('websites')
      .select('id')
      .eq('user_id', user.id)
      .eq('url', url)
      .single();

    if (existing) redirect('/dashboard?error=duplicate');

    const { count } = await supabaseServer
      .from('websites')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    if (count !== null && count >= 3) {
      redirect('/dashboard?error=limit');
    }

    const { error } = await supabaseServer.from('websites').insert({
      user_id: user.id,
      url: url,
      status: 'Pending',
      ssl_days_left: null
    });

    if (error) redirect(`/dashboard?error=${encodeURIComponent(error.message)}`);

    revalidatePath('/dashboard');
    redirect('/dashboard'); 
  }

  async function deleteSite(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    if (!id) return;

    const supabaseServer = await createClient();
    const { data: { user } } = await supabaseServer.auth.getUser();
    if (!user) return;

    await supabaseServer.from('websites').delete().eq('id', id).eq('user_id', user.id);
    revalidatePath('/dashboard');
    redirect('/dashboard');
  }

  async function logout() {
    'use server';
    const supabaseServer = await createClient();
    await supabaseServer.auth.signOut();
    redirect('/');
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505] flex items-center justify-center text-neutral-500">Yükleniyor...</div>}>
      <DashboardClient
        sites={sites || []}
        onAdd={addSite}
        onDelete={deleteSite}
        onLogout={logout}
      />
    </Suspense>
  );
}