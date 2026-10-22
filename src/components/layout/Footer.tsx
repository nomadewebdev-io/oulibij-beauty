import React from 'react'
import Link from 'next/link'
import { SALON_INFO, NAV_LINKS, getWhatsAppBookingUrl } from '@/lib/constants'
import { Sparkles, MapPin, Phone, Mail, Clock, Instagram, Facebook, WhatsApp } from '@/components/ui/Icons'

export function Footer() {
  const whatsappUrl = getWhatsAppBookingUrl()

  return (
    <footer className="w-full bg-white border-t border-rose-100/90 text-zinc-600 rounded-b-[2rem] sm:rounded-b-[2.75rem]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 flex items-center justify-center text-white shadow-sm">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif italic text-2xl font-bold text-zinc-950">
                {SALON_INFO.brandName}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
              {SALON_INFO.description}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors"
                aria-label="WhatsApp"
                title="Nous contacter sur WhatsApp"
              >
                <WhatsApp className="w-4 h-4" />
              </a>
              <a
                href={SALON_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 hover:bg-rose-500 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SALON_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 hover:bg-rose-500 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-rose-600 transition-colors inline-block text-zinc-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors inline-flex items-center gap-1.5"
                >
                  <WhatsApp className="w-3.5 h-3.5" />
                  <span>Réserver sur WhatsApp →</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-rose-500" />
              Horaires d'Ouverture
            </h3>
            <ul className="space-y-2 text-xs">
              {SALON_INFO.openingHours.map((slot, index) => (
                <li key={index} className="flex justify-between py-1 border-b border-rose-50">
                  <span className="text-zinc-500">{slot.day}</span>
                  <span className="text-zinc-900 font-semibold">{slot.hours}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-3 border-t border-rose-100/70">
              <p className="text-[11px] text-zinc-500">
                <strong className="text-zinc-900">Paiements :</strong> {SALON_INFO.payments.join(' • ')}
              </p>
            </div>
          </div>

          {/* Contact & Address */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 mb-4">
              Adresse & Contact
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>
                  {SALON_INFO.address}, {SALON_INFO.district}, {SALON_INFO.city}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <WhatsApp className="w-4 h-4 text-emerald-600 shrink-0" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-700 transition-colors font-semibold text-emerald-700"
                >
                  WhatsApp : {SALON_INFO.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-rose-500 shrink-0" />
                <a href={`tel:${SALON_INFO.phone}`} className="hover:text-rose-600 transition-colors">
                  Fixe : {SALON_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-rose-500 shrink-0" />
                <a href={`mailto:${SALON_INFO.email}`} className="hover:text-rose-600 transition-colors">
                  {SALON_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-400 gap-3">
          <p>© {new Date().getFullYear()} {SALON_INFO.name}. Tous droits réservés. Dakar, Sénégal.</p>
          <p>L'excellence & le bien-être capillaire pour chaque femme.</p>
        </div>
      </div>
    </footer>
  )
}
