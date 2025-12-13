import { NextRequest, NextResponse } from 'next/server'
import { supabase } from './lib/supabase'

// ===============================
// MIDDLEWARE PENTRU SECURITATE
// ===============================

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Rute care necesită autentificare admin
  const protectedAdminRoutes = [
    '/admin',
    '/ctgc-management-portal-2024',
    '/ctgc-management-portal-2025'
  ]

  // Verificăm dacă ruta necesită autentificare admin
  const isAdminRoute = protectedAdminRoutes.some(route => 
    pathname.startsWith(route)
  )

  if (isAdminRoute) {
    return await handleAdminAuth(request)
  }

  // Pentru toate celelalte rute, continuăm normal
  return NextResponse.next()
}

/**
 * Gestionează autentificarea pentru rutele admin
 */
async function handleAdminAuth(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Obținem token-ul din cookie sau header
  const sessionToken = request.cookies.get('admin_session')?.value || 
                      request.headers.get('Authorization')?.replace('Bearer ', '')

  if (!sessionToken) {
    return redirectToLogin(request)
  }

  try {
    // Verificăm sesiunea în baza de date
    const { data: session, error } = await supabase
      .from('admin_sessions')
      .select(`
        *,
        admin:admin_users(*)
      `)
      .eq('session_token', sessionToken)
      .eq('activa', true)
      .gt('expires_at', new Date().toISOString())
      .single()

    if (error || !session || !session.admin) {
      return redirectToLogin(request)
    }

    const user = session.admin

    // Verificări suplimentare de securitate
    if (!user.activ) {
      return redirectToLogin(request, 'Contul este dezactivat')
    }

    // Verificăm permisiunile pentru rute specifice
    const routePermissions = checkRoutePermissions(pathname, user.rol)
    if (!routePermissions.allowed) {
      return NextResponse.json(
        { error: routePermissions.message },
        { status: 403 }
      )
    }

    // Actualizăm informațiile sesiunii (prelungim sesiunea cu fiecare request)
    await updateSessionActivity(sessionToken, request)

    // Logăm accesul pentru audit
    await logAccess(user.id, pathname, request)

    // Adăugăm headerele de securitate
    const response = NextResponse.next()
    
    // Security headers
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
    
    // CSP Header pentru securitate împotriva XSS
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.jsdelivr.net; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "font-src 'self' https://fonts.gstatic.com; " +
      "img-src 'self' data: https: blob:; " +
      "connect-src 'self' https://api.supabase.co wss://realtime.supabase.co; " +
      "frame-src 'none'; " +
      "object-src 'none';"
    )

    return response

  } catch (error) {
    console.error('Middleware auth error:', error)
    return redirectToLogin(request, 'Eroare de autentificare')
  }
}

/**
 * Verifică permisiunile pentru o anumită rută
 */
function checkRoutePermissions(pathname: string, userRole: string): {
  allowed: boolean
  message?: string
} {
  // Rute care necesită super admin
  const superAdminRoutes = [
    '/admin/users',
    '/admin/settings',
    '/admin/logs',
    '/admin/system'
  ]

  // Rute care necesită doar admin sau moderator
  const adminRoutes = [
    '/admin/anunturi',
    '/admin/galerie',
    '/admin/evenimente'
  ]

  if (superAdminRoutes.some(route => pathname.startsWith(route))) {
    if (userRole !== 'super_admin') {
      return {
        allowed: false,
        message: 'Accesul necesită drepturi de super administrator'
      }
    }
  }

  if (adminRoutes.some(route => pathname.startsWith(route))) {
    if (!['admin', 'super_admin', 'moderator'].includes(userRole)) {
      return {
        allowed: false,
        message: 'Accesul necesită drepturi administrative'
      }
    }
  }

  return { allowed: true }
}

/**
 * Actualizează activitatea sesiunii
 */
async function updateSessionActivity(sessionToken: string, request: NextRequest) {
  try {
    // Prelungim sesiunea cu 1 oră de fiecare dată când este accesată
    const newExpiresAt = new Date()
    newExpiresAt.setHours(newExpiresAt.getHours() + 1)

    await supabase
      .from('admin_sessions')
      .update({
        expires_at: newExpiresAt.toISOString(),
        ip_address: getClientIP(request),
        user_agent: request.headers.get('user-agent') || 'unknown'
      })
      .eq('session_token', sessionToken)
  } catch (error) {
    console.error('Update session activity error:', error)
  }
}

/**
 * Logează accesul pentru audit
 */
async function logAccess(userId: string, pathname: string, request: NextRequest) {
  try {
    await supabase
      .from('admin_logs')
      .insert({
        admin_id: userId,
        actiune: 'PAGE_ACCESS',
        detalii: {
          pathname,
          method: request.method,
          timestamp: new Date().toISOString()
        },
        ip_address: getClientIP(request),
        user_agent: request.headers.get('user-agent') || 'unknown'
      })
  } catch (error) {
    console.error('Log access error:', error)
  }
}

/**
 * Obține IP-ul clientului din request
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const real = request.headers.get('x-real-ip')
  const clientIP = request.headers.get('x-client-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (real) {
    return real
  }
  
  if (clientIP) {
    return clientIP
  }
  
  return request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
}

/**
 * Redirecționează către pagina de login
 */
function redirectToLogin(request: NextRequest, message?: string) {
  const loginUrl = new URL('/admin/login', request.url)
  
  if (message) {
    loginUrl.searchParams.set('error', message)
  }
  
  // Salvăm URL-ul curent pentru redirect după login
  loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
  
  return NextResponse.redirect(loginUrl)
}

// ===============================
// RATE LIMITING
// ===============================

// Map pentru a stoca numărul de request-uri per IP
const requestCounts = new Map<string, { count: number; resetTime: number }>()

/**
 * Verifică rate limiting pentru un IP
 */
export function checkRateLimit(ip: string, limit: number = 100, windowMs: number = 60000): boolean {
  const now = Date.now()
  const windowStart = now - windowMs
  
  const current = requestCounts.get(ip)
  
  if (!current || current.resetTime < windowStart) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (current.count >= limit) {
    return false
  }
  
  current.count++
  return true
}

/**
 * Curăță înregistrările expirate de rate limiting
 */
function cleanupRateLimitData() {
  const now = Date.now()
  for (const [ip, data] of requestCounts.entries()) {
    if (data.resetTime < now) {
      requestCounts.delete(ip)
    }
  }
}

// Curăță datele la fiecare 5 minute
setInterval(cleanupRateLimitData, 5 * 60 * 1000)

// ===============================
// CONFIGURARE MATCHER
// ===============================

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/public (API routes publice)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!api/public|_next/static|_next/image|favicon.ico|public).*)',
  ],
}