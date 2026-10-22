import { NextResponse, type NextRequest } from 'next/server'

/**
 * Middleware stub (Mode autonome sans Supabase)
 * Le code complet de production est archivé dans @/lib/supabase-archive/middleware.ts
 */
export async function updateSession(_request: NextRequest) {
  return NextResponse.next()
}
