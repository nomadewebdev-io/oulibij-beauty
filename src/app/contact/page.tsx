import React from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { SALON_INFO } from '@/lib/constants'
import { MapPin, Phone, Mail, Clock, MessageSquare, Send } from '@/components/ui/Icons'

export const metadata = {
  title: `Contact & Accès | ${SALON_INFO.name}`,
  description: `Coordonnées, horaires d'ouverture et adresse du salon ${SALON_INFO.name} à ${SALON_INFO.city}. Contactez-nous par téléphone, WhatsApp ou formulaire.`,
}

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="gold" className="mb-4">
            Contact & Accès
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-100 tracking-tight">
            Nous Contacter & Nous Trouver
          </h1>
          <p className="mt-4 text-zinc-400 text-base">
            Une question sur une prestation ? Besoin d'un diagnostic personnalisé ou d'une privatisation ? Écrivez-nous ou rendez-nous visite.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details & Opening Hours */}
          <div className="space-y-8">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-8 space-y-6">
              <h2 className="text-xl font-bold text-zinc-100">Coordonnées du Salon</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-200">Adresse</h3>
                    <p className="text-sm text-zinc-400">
                      {SALON_INFO.address}, {SALON_INFO.postalCode} {SALON_INFO.city}
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">Métro / RER à proximité • Parking disponible</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-200">Téléphone</h3>
                    <a
                      href={`tel:${SALON_INFO.phone}`}
                      className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      {SALON_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-200">WhatsApp Direct</h3>
                    <a
                      href={`https://wa.me/${SALON_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      {SALON_INFO.whatsapp} (Discussion rapide)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-200">E-mail</h3>
                    <a
                      href={`mailto:${SALON_INFO.email}`}
                      className="text-sm text-zinc-400 hover:text-amber-400 transition-colors"
                    >
                      {SALON_INFO.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Hours card */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-8 space-y-4">
              <h2 className="text-xl font-bold text-zinc-100 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                Horaires d'Ouverture
              </h2>
              <div className="space-y-2">
                {SALON_INFO.openingHours.map((h, i) => (
                  <div key={i} className="flex justify-between text-sm py-1.5 border-b border-zinc-800/60">
                    <span className="text-zinc-400">{h.day}</span>
                    <span className="text-zinc-200 font-medium">{h.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-8 space-y-6">
            <h2 className="text-xl font-bold text-zinc-100">Envoyez-nous un message</h2>
            <p className="text-sm text-zinc-400">
              Notre équipe vous répondra dans un délai de 24h ouvrées.
            </p>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-300">Nom & Prénom *</label>
                  <input
                    type="text"
                    required
                    placeholder="Votre nom"
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-300">Téléphone</label>
                  <input
                    type="tel"
                    placeholder="06 00 00 00 00"
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300">Adresse e-mail *</label>
                <input
                  type="email"
                  required
                  placeholder="votre@email.com"
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300">Objet de votre demande</label>
                <input
                  type="text"
                  placeholder="Renseignement soin, privatisation, devis..."
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-zinc-300">Votre message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Précisez votre demande ici..."
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 text-sm resize-none"
                />
              </div>

              <Button type="button" variant="gold" size="lg" className="w-full justify-center gap-2">
                <Send className="w-4 h-4" />
                <span>Envoyer le message</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
