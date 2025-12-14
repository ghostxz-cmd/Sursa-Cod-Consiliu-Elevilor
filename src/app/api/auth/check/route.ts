import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('admin_session')?.value;

    if (!sessionToken) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    // Verificare pentru sesiunea hard-codată
    if (sessionToken.startsWith('hardcoded-session-')) {
      const adminUser = {
        id: 'hardcoded-admin-id',
        email: 'ctgc.pn@gmail.com',
        nume: 'Admin',
        prenume: 'CTGC',
        rol: 'super_admin',
        activ: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      return NextResponse.json({
        authenticated: true,
        user: adminUser
      });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Verificăm sesiunea în baza de date
    const { data: session, error } = await supabase
      .from('admin_sessions')
      .select(`
        *,
        admin_users (*)
      `)
      .eq('session_token', sessionToken)
      .eq('activ', true)
      .gte('expira_la', new Date().toISOString())
      .single();

    if (error || !session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: session.admin_users
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
