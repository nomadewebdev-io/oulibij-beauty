'use server'

import { createClient } from '@/lib/supabase/server'
import { SALON_INFO } from '@/lib/constants'

export interface ContactActionResult {
  success: boolean
  error?: string
  message?: string
}

export async function sendMessageContactAction(
  _prevState: ContactActionResult | null,
  formData: FormData
): Promise<ContactActionResult> {
  const nom = (formData.get('nom') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const telephone = (formData.get('telephone') as string)?.trim() || null
  const sujet = (formData.get('sujet') as string)?.trim() || null
  const message = (formData.get('message') as string)?.trim()
  const salonId = (formData.get('salonId') as string)?.trim() || SALON_INFO.id

  if (!nom || !email || !message) {
    return {
      success: false,
      error: 'Veuillez remplir tous les champs obligatoires (nom, email, message).',
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      error: 'Veuillez saisir une adresse e-mail valide.',
    }
  }

  try {
    const supabase = await createClient()

    const { error } = await supabase.from('messages_contact').insert([
      {
        salon_id: salonId,
        nom,
        email,
        telephone,
        sujet,
        message,
        lu: false,
      },
    ] as any)

    if (error) {
      console.error('Error inserting into messages_contact:', error)
      return {
        success: false,
        error: "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer ou nous contacter directement.",
      }
    }

    return {
      success: true,
      message: 'Votre message a été envoyé avec succès ! Notre équipe vous répondra sous 24h ouvrées.',
    }
  } catch (err) {
    console.error('Error submitting contact form:', err)
    return {
      success: false,
      error: "Une erreur inattendue est survenue. Veuillez réessayer plus tard.",
    }
  }
}
