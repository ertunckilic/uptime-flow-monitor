import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Üst kısımdaki tanımlamayı sildik, POST içine aldık
export async function POST(request: Request) {
  // Stripe artık sadece biri ödeme yapmak istediğinde uyanacak
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { 
    apiVersion: '2023-10-16' as any 
  });
  
  // Kodunun geri kalanı...
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: user.email,
      client_reference_id: user.id,
      line_items: [
        {
          price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}