'use client'

import React, { useActionState, useEffect, useRef, useState } from 'react'
import { sendMessageContactAction, ContactActionResult } from '@/lib/actions/contact'
import { siteConfig, getWhatsAppBookingUrl } from '@/config/site'
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  WhatsAppBrand,
} from '@/components/ui/Icons'

interface ContactFormProps {
  salonId?: string
}

export function ContactForm({ salonId }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [nom, setNom] = useState('')
  const [sujet, setSujet] = useState('')
  const [messageText, setMessageText] = useState('')

  const [state, formAction, isPending] = useActionState<ContactActionResult | null, FormData>(
    sendMessageContactAction,
    null
  )

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset()
    }
  }, [state])

  const customWhatsAppHref =
    nom.trim() || messageText.trim()
      ? `https://wa.me/${siteConfig.whatsappRaw}?text=${encodeURIComponent(
          `Bonjour ${siteConfig.brandName},${nom.trim() ? ` je m'appelle ${nom.trim()}.` : ''}${
            sujet.trim() ? ` Sujet : ${sujet.trim()}.` : ''
          } ${messageText.trim()}`.trim()
        )}`
      : getWhatsAppBookingUrl()

  return (
    <div className="bg-[#faf8f4] border border-amber-900/15 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0f0e0c] font-serif italic">
          Écrivez-nous un Message
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Demande de tarif maquillage cérémonie, pose lace ou disponibilité produit : laissez-nous un message ou basculez directement sur WhatsApp.
        </p>
      </div>

      {state?.success && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm space-y-3 animate-fadeIn">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-950">Message enregistré</p>
              <p className="text-xs text-emerald-800 mt-0.5">{state.message}</p>
            </div>
          </div>
          <a
            href={getWhatsAppBookingUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors min-h-[40px]"
          >
            <WhatsAppBrand className="w-4 h-4 text-white" />
            <span>Ouvrir WhatsApp ({siteConfig.whatsappDisplay})</span>
          </a>
        </div>
      )}

      {state?.error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-sm flex items-start gap-3 animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-red-950">Vérifiez le formulaire</p>
            <p className="text-xs text-red-800 mt-0.5">{state.error}</p>
          </div>
        </div>
      )}

      <form ref={formRef} action={formAction} className="space-y-4">
        {salonId && <input type="hidden" name="salonId" value={salonId} />}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="nom" className="text-xs font-bold text-[#0f0e0c]">
              Nom &amp; Prénom <span className="text-amber-700">*</span>
            </label>
            <input
              id="nom"
              name="nom"
              type="text"
              required
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Ex : Ndeye Fatou Diop"
              className="w-full px-4 py-3 bg-white border border-amber-900/15 rounded-2xl text-[#0f0e0c] placeholder-stone-400 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 text-sm transition-all min-h-[44px]"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="telephone" className="text-xs font-bold text-[#0f0e0c]">
              Téléphone / WhatsApp <span className="text-amber-700">*</span>
            </label>
            <input
              id="telephone"
              name="telephone"
              type="tel"
              required
              placeholder="Ex : 77 123 45 67"
              className="w-full px-4 py-3 bg-white border border-amber-900/15 rounded-2xl text-[#0f0e0c] placeholder-stone-400 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 text-sm transition-all min-h-[44px]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-bold text-[#0f0e0c]">
            Adresse e-mail (optionnel)
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Ex : cliente@domaine.sn"
            className="w-full px-4 py-3 bg-white border border-amber-900/15 rounded-2xl text-[#0f0e0c] placeholder-stone-400 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 text-sm transition-all min-h-[44px]"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="sujet" className="text-xs font-bold text-[#0f0e0c]">
            Prestation souhaitée
          </label>
          <input
            id="sujet"
            name="sujet"
            type="text"
            value={sujet}
            onChange={(e) => setSujet(e.target.value)}
            placeholder="Ex : Maquillage cérémonie, pose lace, Stream Pod, parfumerie..."
            className="w-full px-4 py-3 bg-white border border-amber-900/15 rounded-2xl text-[#0f0e0c] placeholder-stone-400 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 text-sm transition-all min-h-[44px]"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="message" className="text-xs font-bold text-[#0f0e0c]">
            Votre message <span className="text-amber-700">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Précisez la date souhaitée, le modèle de coiffure ou de maquillage..."
            className="w-full px-4 py-3 bg-white border border-amber-900/15 rounded-2xl text-[#0f0e0c] placeholder-stone-400 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 text-sm transition-all resize-none"
          />
        </div>

        <div className="space-y-2.5 pt-1">
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 px-6 rounded-full text-xs font-bold text-amber-300 bg-[#0f0e0c] hover:bg-stone-900 border border-amber-500/40 shadow-md active:scale-95 disabled:opacity-60 disabled:pointer-events-none transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                <span>Envoi en cours...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-amber-400" />
                <span>Envoyer ma demande</span>
              </>
            )}
          </button>

          <a
            href={customWhatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-6 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[48px]"
          >
            <WhatsAppBrand className="w-4 h-4 text-white" />
            <span>Envoyer directement sur WhatsApp</span>
          </a>
        </div>
      </form>
    </div>
  )
}
