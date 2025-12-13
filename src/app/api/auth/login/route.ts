import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '../../../../../lib/auth/authService';

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

    const result = await AuthService.login({ email, password });

    if (result.success && result.session) {
      const response = NextResponse.json({
        success: true,
        user: result.user
      });

      // Setăm cookie-ul de sesiune
      response.cookies.set('admin_session', result.session.session_token, {
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
