'use server'

import { createClient } from '@/lib/supabase/server'
import { Profile } from '@/types'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

function checkSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  if (!url || url.includes('your-project-id') || !anonKey || anonKey.includes('your-anon-key')) {
    return 'Configuration Supabase requise : veuillez renseigner votre véritable URL et clé anon Supabase dans le fichier .env.local.'
  }
  return null
}

export async function loginAction(formData: FormData) {
  const configError = checkSupabaseConfig()
  if (configError) {
    return { error: configError }
  }

  const email = (formData.get('email') as string)?.trim()
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Veuillez saisir votre adresse e-mail et votre mot de passe.' }
  }

  try {
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      if (error.message.toLowerCase().includes('invalid login credentials')) {
        return { error: 'Identifiants incorrects. Veuillez vérifier votre e-mail et mot de passe.' }
      }
      return { error: `Erreur de connexion : ${error.message}` }
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Erreur réseau inconnue'
    return {
      error: `Impossible de contacter le serveur Supabase (${msg}). Vérifiez votre URL Supabase dans .env.local et votre connexion Internet.`,
    }
  }

  revalidatePath('/', 'layout')
  redirect('/compte/mes-rendez-vous')
}

export async function registerAction(formData: FormData) {
  const configError = checkSupabaseConfig()
  if (configError) {
    return { error: configError }
  }

  const email = (formData.get('email') as string)?.trim()
  const password = formData.get('password') as string
  const fullName = (formData.get('fullName') as string)?.trim()
  const phone = (formData.get('phone') as string)?.trim()

  if (!email || !password || !fullName) {
    return { error: 'Veuillez remplir tous les champs obligatoires.' }
  }

  try {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          telephone: phone,
        },
      },
    })

    if (error) {
      return { error: `Erreur d'inscription : ${error.message}` }
    }

    // If email confirmation is required by Supabase
    if (data?.user && !data.session) {
      return {
        successMessage:
          'Compte créé avec succès ! Un e-mail de confirmation vous a été envoyé. Veuillez cliquer sur le lien dans votre boîte mail pour finaliser votre inscription.',
      }
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Erreur réseau inconnue'
    return {
      error: `Impossible de contacter le serveur Supabase (${msg}). Vérifiez vos clés dans .env.local.`,
    }
  }

  revalidatePath('/', 'layout')
  redirect('/compte/mes-rendez-vous')
}

export async function signOutAction() {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
  } catch {
    // ignore
  }
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function getCurrentUser() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    const { data: profileData } = await (supabase
      .from('profiles') as any)
      .select('*')
      .eq('id', user.id)
      .single()

    const profile = (profileData as Profile) || null

    return {
      user,
      profile,
    }
  } catch {
    return null
  }
}
