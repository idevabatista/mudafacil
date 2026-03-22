import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Módulo leve (Edge) como recomendado no boilerplate.
// Retorna o session token direto no cookie.
export function proxy(request: NextRequest) {
  const sessionToken = request.cookies.get("authjs.session-token") || request.cookies.get("__Secure-authjs.session-token")
  
  const isProtectedPath = request.nextUrl.pathname.startsWith('/app') || 
                          request.nextUrl.pathname.startsWith('/dashboard') ||
                          request.nextUrl.pathname.startsWith('/settings');

  if (isProtectedPath && !sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Previne acesso à página de login se já estiver logado
  if (request.nextUrl.pathname.startsWith('/login') && sessionToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
