import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/authService';

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
    if (email === 'ctgc.pn@gmail.com' && password === '299638rar') {
      const adminUser = {
        id: 'hardcoded-admin-id',
        email: 'ctgc.pn@gmail.com',
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

    // Obținem IP și user agent
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    const result = await AuthService.login({ email, password }, ip, userAgent);

    if (result.success && result.session) {
      const response = NextResponse.json({
        success: true,
        user: result.user
      });

      // Folosim token-ul din sesiune
      // @ts-ignore - token este adăugat dinamic în authService
      const sessionToken = result.session.token || result.session.session_token;

      // Setăm cookie-ul de sesiune
      response.cookies.set('admin_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 zile
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: result.error || 'Autentificare eșuată' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Eroare la autentificare' },
      { status: 500 }
    );
  }
}
