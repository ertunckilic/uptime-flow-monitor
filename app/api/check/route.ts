import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import https from 'https';

export const dynamic = 'force-dynamic';

const checkSSL = (url: string): Promise<number | null> => {
  return new Promise((resolve) => {
    try {
      const hostname = new URL(url).hostname;
      const req = https.request({
        host: hostname,
        port: 443,
        method: 'GET',
        rejectUnauthorized: false,
        agent: new https.Agent({ maxCachedSessions: 0 })
      }, (res) => {
        const cert = (res.socket as any).getPeerCertificate();
        if (cert && cert.valid_to) {
          const validTo = new Date(cert.valid_to);
          const now = new Date();
          const daysLeft = Math.floor((validTo.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
          resolve(daysLeft);
        } else {
          resolve(null);
        }
      });

      req.on('error', () => resolve(null));
      req.setTimeout(5000, () => {
        req.destroy();
        resolve(null);
      });
      req.end();
    } catch {
      resolve(null);
    }
  });
};

export async function GET(request: Request) {
  // Cloud Security Dokunuşu: Sadece Vercel Cron yetkili
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Yetkisiz erisim' }, { status: 401 });
  }

  const { data: sites } = await supabase.from('websites').select('*');
  
  if (!sites || sites.length === 0) {
    return NextResponse.json({ message: 'Kontrol edilecek sistem bulunamadı.' });
  }

  const results = [];

  for (const site of sites) {
    let currentStatus = 'Offline';
    let currentSslDays = null;

    try {
      const response = await fetch(site.url, { 
        method: 'GET', 
        cache: 'no-store',
        headers: { 'User-Agent': 'UptimeFlow-Security-Bot/1.0' } 
      });
      
      if (response.ok) {
        currentStatus = 'Online';
      }
      
      if (site.url.startsWith('https')) {
        currentSslDays = await checkSSL(site.url);
      }
    } catch (error) {
      currentStatus = 'Offline';
    }

    await supabase
      .from('websites')
      .update({ status: currentStatus, ssl_days_left: currentSslDays })
      .eq('id', site.id);

    results.push({ url: site.url, status: currentStatus, sslDays: currentSslDays });
  }

  return NextResponse.json({ success: true, totalChecked: results.length, details: results });
}