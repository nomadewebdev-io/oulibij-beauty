'use server'

import { siteConfig } from '@/config/site'

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
  const telephone = (formData.get('telephone') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const message = (formData.get('message') as string)?.trim()

  if (!nom || !message) {
    return {
      success: false,
      error: 'Veuillez renseigner votre nom ainsi que votre message.',
    }
  }

  if (!telephone && !email) {
    return {
      success: false,
      error: 'Veuillez indiquer votre numéro de téléphone ou une adresse e-mail pour vous recontacter.',
    }
  }

  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: 'Veuillez saisir une adresse e-mail valide.',
      }
    }
  }

  return {
    success: true,
    message: `Merci ${nom}, votre demande est enregistrée auprès d'${siteConfig.brandName}. Pour une prise en charge immédiate (9h-21h), cliquez sur le bouton WhatsApp au ${siteConfig.whatsappDisplay}.`,
  }
}
