import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('admin_session')?.value;

    if (sessionToken && !sessionToken.startsWith('hardcoded-session')) {
      // Crează client Supabase în interiorul handler-ului
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zcihffxzqmyayfxfmesu.supabase.co';
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjaWhmZnh6cW15YXlmeGZtZXN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3MDgxODAsImV4cCI6MjA1MjI4NDE4MH0.FxZxWvUQvKYxD7OVOWrDMTp-lnU21F3C3bx7PkXzVsw';
      const supabase = createClient(supabaseUrl, supabaseKey);

      // Dezactivăm sesiunea în baza de date
      await supabase
        .from('admin_sessions')
        .update({ activ: false })
        .eq('session_token', sessionToken);

      // Logăm acțiunea
      const { data: session } = await supabase
        .from('admin_sessions')
        .select('admin_id')
        .eq('session_token', sessionToken)
        .single();

      if (session) {
        await supabase
          .from('admin_logs')
          .insert({
            admin_id: session.admin_id,
            actiune: 'LOGOUT',
            tabel_afectat: 'admin_users',
            record_id: session.admin_id,
            ip_address: request.headers.get('x-forwarded-for') || 'unknown',
            user_agent: request.headers.get('user-agent') || 'unknown'
          });
      }
    }

    const response = NextResponse.json({ success: true });
    response.cookies.delete('admin_session');

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Eroare la deconectare' },
      { status: 500 }
    );
  }
}
