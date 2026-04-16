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
  
      // URL format kontrolü
      try {
        new URL(url);
      } catch {
        return redirect('/dashboard?error=invalid');
      }
  
      // Mükerrer kayıt kontrolü
      const { data: existing } = await supabaseServer
        .from('websites')
        .select('id')
        .eq('user_id', user.id)
        .eq('url', url)
        .single();
  
      if (existing) {
        return redirect('/dashboard?error=duplicate');
      }
  
      // Ücretsiz plan limit kontrolü
      const { count } = await supabaseServer
        .from('websites')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);
  
      if (count !== null && count >= 3) {
        return redirect('/dashboard?error=limit');
      }
  
      // Anlık hızlı tarama (Initial Ping)
      let initialStatus = 'Pending';
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        
        const res = await fetch(url, { 
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5'
          },
          cache: 'no-store',
          signal: controller.signal 
        });
        
        clearTimeout(timeoutId);
        initialStatus = res.ok ? 'Online' : 'Error';
      } catch {
        initialStatus = 'Error';
      }
  
      // Veritabanına kayıt işlemi
      const { error } = await supabaseServer.from('websites').insert({
        user_id: user.id,
        url: url,
        status: initialStatus,
        ssl_days_left: null // SSL analizi arka plandaki Cron Job tarafından yapılacak
      });
  
      if (error) {
        return redirect(`/dashboard?error=${encodeURIComponent(error.message)}`);
      }
  
      revalidatePath('/dashboard');
      return redirect('/dashboard'); 
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
        userId={user.id}
        sites={sites || []}
        onAdd={addSite}
        onDelete={deleteSite}
        onLogout={logout}
      />
    </Suspense>
  );
}