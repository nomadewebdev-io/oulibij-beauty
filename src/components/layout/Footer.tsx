import React from 'react'
import Link from 'next/link'
import { siteConfig, getWhatsAppBookingUrl } from '@/config/site'
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
              <div className="w-9 h-9 rounded-full bg-rose-700 flex items-center justify-center text-white shadow-sm">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif italic text-2xl font-bold text-zinc-950">
                {siteConfig.brandName}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors min-w-[36px] min-h-[36px]"
                aria-label={`Nous contacter sur WhatsApp (${siteConfig.whatsappDisplay})`}
                title="Nous contacter sur WhatsApp"
              >
                <WhatsApp className="w-4 h-4" />
              </a>
              {siteConfig.socials.instagram && (
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 hover:bg-rose-500 hover:text-white transition-colors min-w-[36px] min-h-[36px]"
                  aria-label="Instagram du salon"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {siteConfig.socials.facebook && (
                <a
                  href={siteConfig.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 hover:bg-rose-500 hover:text-white transition-colors min-w-[36px] min-h-[36px]"
                  aria-label="Facebook du salon"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-rose-600 transition-colors inline-block text-zinc-600 py-0.5"
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
                  className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors inline-flex items-center gap-1.5 py-0.5"
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
              Horaires d&apos;Ouverture
            </h3>
            <ul className="space-y-2 text-xs">
              {siteConfig.openingHours.map((slot, index) => (
                <li key={index} className="flex justify-between py-1 border-b border-rose-50">
                  <span className="text-zinc-500">{slot.day}</span>
                  <span className="text-zinc-900 font-semibold">{slot.hours}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-3 border-t border-rose-100/70">
              <p className="text-[11px] text-zinc-500">
                <strong className="text-zinc-900">Paiements :</strong> {siteConfig.payments.join(' • ')}
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
                  {siteConfig.address}, {siteConfig.district}, {siteConfig.city}
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
                  WhatsApp : {siteConfig.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-rose-500 shrink-0" />
                <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} className="hover:text-rose-600 transition-colors">
                  Fixe : {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-rose-500 shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-rose-600 transition-colors">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-400 gap-3">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés. {siteConfig.city}, {siteConfig.country}.</p>
          <p>L&apos;excellence &amp; le bien-être capillaire pour chaque femme.</p>
        </div>
      </div>
    </footer>
  )
}
