import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email și parola sunt obligatorii' },
        { status: 400 }
      );
    }

    // Verificare hard-codată pentru admin principal
    if (email === 'cse.ctgc@colegiulcartianu.ro' && password === '299638rar') {
      const adminUser = {
        id: 'hardcoded-admin-id',
        email: 'cse.ctgc@colegiulcartianu.ro',
        nume: 'Admin',
        prenume: 'CTGC',
        rol: 'super_admin' as const,
        activ: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const response = NextResponse.json({
        success: true,
        user: adminUser
      });

      // Generăm un token simplu pentru sesiune
      const sessionToken = 'hardcoded-session-' + Date.now();

      response.cookies.set('admin_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 zile
      });

      return response;
    }

    // Crează client Supabase în interiorul handler-ului
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zcihffxzqmyayfxfmesu.supabase.co';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjaWhmZnh6cW15YXlmeGZtZXN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3MDgxODAsImV4cCI6MjA1MjI4NDE4MH0.FxZxWvUQvKYxD7OVOWrDMTp-lnU21F3C3bx7PkXzVsw';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Obținem IP și user agent
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Verificăm utilizatorul în baza de date
    const { data: adminUser, error: userError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .eq('activ', true)
      .single();

    if (userError || !adminUser) {
      return NextResponse.json(
        { success: false, error: 'Email sau parolă invalide' },
        { status: 401 }
      );
    }

    // Verificăm parola
    const bcrypt = require('bcrypt');
    const isValidPassword = await bcrypt.compare(password, adminUser.parola_hash);

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: 'Email sau parolă invalide' },
        { status: 401 }
      );
    }

    // Generăm un token de sesiune
    const sessionToken = crypto.randomBytes(32).toString('hex');
    
    // Creăm sesiunea în baza de date
    const { error: sessionError } = await supabase
      .from('admin_sessions')
      .insert({
        admin_id: adminUser.id,
        session_token: sessionToken,
        activ: true,
        expira_la: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      });

    if (sessionError) {
      console.error('Session creation error:', sessionError);
      return NextResponse.json(
        { success: false, error: 'Eroare la crearea sesiunii' },
        { status: 500 }
      );
    }

    // Logăm acțiunea
    await supabase
      .from('admin_logs')
      .insert({
        admin_id: adminUser.id,
        actiune: 'LOGIN',
        tabel_afectat: 'admin_users',
        record_id: adminUser.id,
        ip_address: ip,
        user_agent: userAgent
      });

    const response = NextResponse.json({
      success: true,
      user: {
        id: adminUser.id,
        email: adminUser.email,
        nume: adminUser.nume,
        prenume: adminUser.prenume,
        rol: adminUser.rol,
        activ: adminUser.activ
      }
    });

    response.cookies.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 zile
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Eroare la autentificare' },
      { status: 500 }
    );
  }
}
