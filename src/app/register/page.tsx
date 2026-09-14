'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { registerAction } from '@/lib/actions/auth'
import { Sparkles, Mail, Lock, User, Phone, AlertCircle, CheckCircle2 } from '@/components/ui/Icons'
import { SALON_INFO } from '@/lib/constants'

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    const formData = new FormData(e.currentTarget)
    const result = await registerAction(formData)

    if (result?.error) {
      setError(result.error)
      setIsLoading(false)
    } else if (result?.successMessage) {
      setSuccessMessage(result.successMessage)
      setIsLoading(false)
    }
  }

  return (
    <div className="py-16 sm:py-24 px-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white border border-rose-100 rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white mx-auto shadow-md shadow-pink-500/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black text-zinc-950">Créer un Compte</h1>
          <p className="text-xs sm:text-sm text-zinc-500">
            Rejoignez {SALON_INFO.name} pour profiter d'un suivi privilégié
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-pink-500" />
              Nom complet *
            </label>
            <input
              type="text"
              name="fullName"
              required
              placeholder="Ex: Ouly Diallo"
              className="w-full px-4 py-3 bg-white border border-rose-200 rounded-2xl text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-pink-500 text-sm shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-pink-500" />
              Numéro de téléphone *
            </label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="06 12 34 56 78"
              className="w-full px-4 py-3 bg-white border border-rose-200 rounded-2xl text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-pink-500 text-sm shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-pink-500" />
              Adresse e-mail *
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="votre@email.com"
              className="w-full px-4 py-3 bg-white border border-rose-200 rounded-2xl text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-pink-500 text-sm shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-pink-500" />
              Mot de passe *
            </label>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              placeholder="Au moins 6 caractères"
              className="w-full px-4 py-3 bg-white border border-rose-200 rounded-2xl text-zinc-950 placeholder-zinc-400 focus:outline-none focus:border-pink-500 text-sm shadow-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 shadow-lg shadow-pink-500/25 hover:scale-[1.02] active:scale-95 disabled:opacity-50 transition-all cursor-pointer mt-2"
          >
            {isLoading ? 'Création en cours...' : "S'inscrire"}
          </button>
        </form>

        <div className="pt-4 border-t border-rose-100 text-center text-xs text-zinc-500">
          Vous avez déjà un compte ?{' '}
          <Link href="/login" className="text-pink-600 font-bold hover:underline">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  )
}
