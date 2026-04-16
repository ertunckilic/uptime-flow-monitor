import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Paddle'dan gelen olayın türü ve verisi
    const eventType = body.event_type;
    const data = body.data;

    // Sadece başarılı abonelik işlemlerini yakalıyoruz
    if (eventType === 'subscription.created' || eventType === 'subscription.updated' || eventType === 'transaction.completed') {
      
      // Dashboard'dan Paddle'a fısıldadığımız o gizli kullanıcı ID'sini alıyoruz
      const userId = data.custom_data?.user_id;

      if (userId) {
        // Kullanıcıyı veritabanında bul ve doğrudan Premium yap
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