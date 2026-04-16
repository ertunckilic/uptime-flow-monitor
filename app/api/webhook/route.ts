import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    // Güvenlik Duvarı: URL sonuna eklenecek gizli şifre kontrolü
    const url = new URL(req.url);
    const secret = url.searchParams.get('secret');
    
    if (secret !== process.env.PADDLE_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Yetkisiz islem' }, { status: 401 });
    }

    const body = await req.json();
    const eventType = body.event_type;
    const data = body.data;

    if (eventType === 'subscription.created' || eventType === 'subscription.updated' || eventType === 'transaction.completed') {
      const userId = data.custom_data?.user_id;

      if (userId) {
        await supabaseAdmin.from('subscriptions').upsert({
          user_id: userId,
          is_premium: true,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Webhook hatasi' }, { status: 400 });
  }
}