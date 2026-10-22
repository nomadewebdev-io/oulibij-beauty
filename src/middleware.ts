import { NextResponse, type NextRequest } from 'next/server'

/**
 * Middleware Oulibij Beauty (Mode Vitrine Autonome)
 * Fonctionne à 100% sans aucune dépendance réseau Supabase.
 */
export async function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
