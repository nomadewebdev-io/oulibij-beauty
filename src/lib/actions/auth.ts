'use server'

import { Profile } from '@/types'
import { redirect } from 'next/navigation'

/**
 * Actions d'authentification (Mode vitrine & réservation directe WhatsApp)
 * Le code complet Supabase Auth est conservé dans @/lib/supabase-archive/auth-actions.ts
 */

export async function loginAction(_formData: FormData) {
  return {
    error: 'La réservation et les échanges se font désormais directement sur WhatsApp sans besoin de créer un compte.',
  }
}

export async function registerAction(_formData: FormData) {
  return {
    error: 'L’inscription est désactivée : réservez vos séances directement et instantanément via notre WhatsApp.',
  }
}

export async function signOutAction() {
  redirect('/')
}

export async function getCurrentUser(): Promise<{ user: any; profile: Profile | null } | null> {
  return null
}
