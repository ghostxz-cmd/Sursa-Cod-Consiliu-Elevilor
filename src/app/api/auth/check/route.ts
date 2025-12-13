import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../../lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('admin_session')?.value;

    if (!sessionToken) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

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
