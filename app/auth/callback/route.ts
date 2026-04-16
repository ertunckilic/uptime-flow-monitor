import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // Kimlik doğrulandı, şifre sıfırlama sayfasına geçiş izni verildi
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Kod hatalıysa veya süresi dolmuşsa
  return NextResponse.redirect(`${origin}/login?error=Linkin_suresi_dolmus_veya_gecersiz`);
}