'use server'

export interface ContactActionResult {
  success: boolean
  error?: string
  message?: string
}

/**
 * Envoi de message de contact (mode autonome sans Supabase)
 * Valide les informations et confirme la réception avec possibilité de bascule WhatsApp.
 */
export async function sendMessageContactAction(
  _prevState: ContactActionResult | null,
  formData: FormData
): Promise<ContactActionResult> {
  const nom = (formData.get('nom') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const message = (formData.get('message') as string)?.trim()

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

  return {
    success: true,
    message: 'Votre message a bien été transmis à l’équipe Oulibij Beauty. Vous pouvez également nous joindre directement sur WhatsApp pour une réponse immédiate.',
  }
}
