import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth/authService';

export async function POST(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('admin_session')?.value;

    if (sessionToken) {
      await AuthService.logout(sessionToken);
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
