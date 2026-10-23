'use client'

import React, { useActionState, useEffect, useRef } from 'react'
import { sendMessageContactAction, ContactActionResult } from '@/lib/actions/contact'
import { Send, CheckCircle2, AlertCircle, Loader2 } from '@/components/ui/Icons'

interface ContactFormProps {
  salonId?: string
}

export function ContactForm({ salonId }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction, isPending] = useActionState<ContactActionResult | null, FormData>(
    sendMessageContactAction,
    null
  )

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset()
    }
  }, [state])

  return (
    <div className="bg-white/80 backdrop-blur-md border border-rose-100 rounded-3xl p-6 sm:p-8 shadow-lg shadow-pink-900/5 space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 font-serif italic">
          Envoyez-nous un Message
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 mt-1">
          Une question sur une prestation, un devis ou une demande spécifique ? Nous vous répondrons sous 24h ouvrées.
        </p>
      </div>

      {/* Success banner */}
      {state?.success && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-emerald-900">Message transmis avec succès !</p>
            <p className="text-xs text-emerald-700 mt-0.5">{state.message}</p>
          </div>
        </div>
      )}

      {/* Error banner */}
      {state?.error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3 animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-rose-900">Une erreur est survenue</p>
            <p className="text-xs text-rose-700 mt-0.5">{state.error}</p>
          </div>
        </div>
      )}

      <form ref={formRef} action={formAction} className="space-y-4">
        {salonId && <input type="hidden" name="salonId" value={salonId} />}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="nom" className="text-xs font-bold text-zinc-700">
              Nom & Prénom <span className="text-pink-500">*</span>
            </label>
            <input
              id="nom"
              name="nom"
              type="text"
              required
              placeholder="Ex: Aminata Diallo"
              className="w-full px-4 py-3 bg-white border border-rose-100 rounded-2xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-sm transition-all shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="telephone" className="text-xs font-bold text-zinc-700">
              Téléphone
            </label>
            <input
              id="telephone"
              name="telephone"
              type="tel"
              placeholder="+221 77 000 00 00"
              className="w-full px-4 py-3 bg-white border border-rose-100 rounded-2xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-sm transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-bold text-zinc-700">
            Adresse e-mail <span className="text-pink-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Ex: aminata.diallo@exemple.sn"
            className="w-full px-4 py-3 bg-white border border-rose-100 rounded-2xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-sm transition-all shadow-sm"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="sujet" className="text-xs font-bold text-zinc-700">
            Objet de la demande
          </label>
          <input
            id="sujet"
            name="sujet"
            type="text"
            placeholder="Ex: Renseignement soin botox, privatisation salon..."
            className="w-full px-4 py-3 bg-white border border-rose-100 rounded-2xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-sm transition-all shadow-sm"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="message" className="text-xs font-bold text-zinc-700">
            Votre message <span className="text-pink-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            placeholder="Décrivez votre besoin, la nature de vos cheveux ou vos disponibilités souhaitées..."
            className="w-full px-4 py-3 bg-white border border-rose-100 rounded-2xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-sm transition-all shadow-sm resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3.5 px-6 rounded-full text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-rose-400 shadow-md shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.01] active:scale-95 disabled:opacity-60 disabled:pointer-events-none transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Envoi en cours...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Envoyer mon message</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}
