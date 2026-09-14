import React from 'react'
import Link from 'next/link'
import { SALON_INFO, NAV_LINKS } from '@/lib/constants'
import { Sparkles, MapPin, Phone, Mail, Clock, Instagram, Facebook } from '@/components/ui/Icons'

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 flex items-center justify-center text-zinc-950">
                <Sparkles className="w-5 h-5 fill-zinc-950" />
              </div>
              <span className="text-2xl font-black tracking-widest text-zinc-100 uppercase">
                {SALON_INFO.name}
              </span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {SALON_INFO.description}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href={SALON_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SALON_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-100 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-amber-400 transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/rendez-vous"
                  className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
                >
                  Prendre Rendez-vous en ligne →
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-100 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              Horaires d'Ouverture
            </h3>
            <ul className="space-y-2 text-xs">
              {SALON_INFO.openingHours.map((slot, index) => (
                <li key={index} className="flex justify-between py-1 border-b border-zinc-900">
                  <span className="text-zinc-400">{slot.day}</span>
                  <span className="text-zinc-200 font-medium">{slot.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-100 mb-4">
              Contact & Accès
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {SALON_INFO.address}, {SALON_INFO.postalCode} {SALON_INFO.city}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                <a href={`tel:${SALON_INFO.phone}`} className="hover:text-amber-400 transition-colors">
                  {SALON_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-400 shrink-0" />
                <a href={`mailto:${SALON_INFO.email}`} className="hover:text-amber-400 transition-colors">
                  {SALON_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} {SALON_INFO.name}. Tous droits réservés.</p>
          <p className="flex items-center gap-1">
            Créé pour l'excellence & le bien-être capillaire.
          </p>
        </div>
      </div>
    </footer>
  )
}
