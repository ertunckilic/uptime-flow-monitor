import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import https from 'https';

const checkSSLExpiry = (url: string): Promise<number | null> => {
  return new Promise((resolve) => {
    try {
      const hostname = new URL(url).hostname;
      const req = https.request({ host: hostname, port: 443, method: 'HEAD', timeout: 5000 }, (res) => {
        const cert = (res.socket as any).getPeerCertificate();
        if (cert && cert.valid_to) {
          const daysLeft = Math.floor((new Date(cert.valid_to).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
          resolve(daysLeft);
        } else resolve(null);
      });
      req.on('timeout', () => { req.destroy(); resolve(null); });
      req.on('error', () => resolve(null));
      req.end();
    } catch {
      resolve(null);
    }
  });
};

export async function GET(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY!);

  // Güvenlik Duvarı Aktif: Sadece yetkili Vercel Cron tetikleyebilir
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  
  const { data: sites } = await supabase.from('websites').select('*').order('created_at', { ascending: true });
  const { data: subs } = await supabase.from('subscriptions').select('*');
  
  if (!sites || sites.length === 0) return NextResponse.json({ message: 'İzlenecek sistem bulunamadı.' });

  const userSites: Record<string, any[]> = {};
  sites.forEach(site => {
    if (!userSites[site.user_id]) userSites[site.user_id] = [];
    userSites[site.user_id].push(site);
  });

  const sitesToCheck: any[] = [];
  for (const userId in userSites) {
    const isPremium = subs?.find(s => s.user_id === userId)?.is_premium || false;
    const targetSites = isPremium ? userSites[userId] : userSites[userId].slice(0, 3);
    sitesToCheck.push(...targetSites);
  }

  const checks = sitesToCheck.map(async (site) => {
    let isOffline = false;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const res = await fetch(site.url, { 
        method: 'GET', 
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5'
        },
        cache: 'no-store',
        signal: controller.signal 
      });
      
      if (!res.ok && res.status !== 403 && res.status !== 503) {
        isOffline = true;
      }
    } catch {
      isOffline = true;
    } finally {
      clearTimeout(timeoutId);
    }

    const currentStatus = isOffline ? 'Error' : 'Online';
    const sslDays = await checkSSLExpiry(site.url);

    if (currentStatus !== site.status) {
      try {
        const { data: { user } } = await supabase.auth.admin.getUserById(site.user_id);
        if (user?.email) {
          const isDown = currentStatus === 'Error';
          await resend.emails.send({
            from: 'UptimeFlow <noreply@uptimeflow.xyz>', // Kendi profesyonel alan adın
            to: user.email,
            subject: isDown ? `ACIL: ${site.url} Coktu!` : `DUZELDI: ${site.url} Yeniden Aktif!`,
            html: `<div style="font-family: monospace; color: #333;">
              <h2 style="color: ${isDown ? '#e11d48' : '#10b981'};">${isDown ? 'Sistem Cokusu Algilandi' : 'Sistem Tekrar Cevrimici'}</h2>
              <p><strong>${site.url}</strong> hedefine su an ${isDown ? 'ulasilamiyor.' : 'erisim tekrar saglandi.'}</p>
            </div>`,
          });
        }
      } catch (error) {
        console.error('Mail gonderim hatasi:', error);
      }
    }

    await supabase.from('websites').update({ status: currentStatus, ssl_days_left: sslDays }).eq('id', site.id);
  });

  await Promise.allSettled(checks);

  return NextResponse.json({ success: true, message: 'Tarama tamamlandi.', checked: sitesToCheck.length });
}