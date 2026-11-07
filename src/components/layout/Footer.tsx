import React from 'react'
import Link from 'next/link'
import { siteConfig, getWhatsAppBookingUrl, getPhoneCallUrl } from '@/config/site'
import {
  OuliBijLogo,
  MapPin,
  Phone,
  Clock,
  Instagram,
  Facebook,
  WhatsAppBrand,
  ExternalLink,
} from '@/components/ui/Icons'

export function Footer() {
  const whatsappUrl = getWhatsAppBookingUrl()
  const phoneUrl = getPhoneCallUrl()

  return (
    <footer className="w-full bg-[#0f0e0c] border-t border-amber-500/25 text-stone-300 rounded-b-[2rem] sm:rounded-b-[2.75rem]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <OuliBijLogo size={42} className="w-10 h-10 shrink-0 rounded-full" />
              <div>
                <span className="font-serif italic text-2xl font-bold text-white block leading-tight">
                  {siteConfig.brandName}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-amber-400">
                  {siteConfig.district} • {siteConfig.city}
                </span>
              </div>
            </div>
            <p className="text-xs font-semibold text-amber-300/95 italic">
              &laquo; {siteConfig.tagline} &raquo;
            </p>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Maquillage (cérémonie, simple et contouring), coiffure (tissage, tresse, bouclage, pose lace, Stream Pod, teinture, soins) et boutique cosmétiques, parfumerie &amp; accessoires.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 hover:bg-emerald-600 hover:text-white transition-colors min-w-[40px] min-h-[40px]"
                aria-label={`Contacter ${siteConfig.brandName} sur WhatsApp (${siteConfig.whatsappDisplay})`}
                title="WhatsApp direct"
              >
                <WhatsAppBrand className="w-4 h-4" />
              </a>
              <a
                href={phoneUrl}
                className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-300 hover:bg-amber-500 hover:text-[#0f0e0c] transition-colors min-w-[40px] min-h-[40px]"
                aria-label={`Appeler ${siteConfig.brandName} au ${siteConfig.phone}`}
                title="Appel direct"
              >
                <Phone className="w-4 h-4" />
              </a>
              {siteConfig.socials.instagram && (
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-stone-900 border border-amber-500/30 flex items-center justify-center text-amber-300 hover:bg-amber-500 hover:text-[#0f0e0c] transition-colors min-w-[40px] min-h-[40px]"
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
                  className="w-10 h-10 rounded-full bg-stone-900 border border-amber-500/30 flex items-center justify-center text-amber-300 hover:bg-amber-500 hover:text-[#0f0e0c] transition-colors min-w-[40px] min-h-[40px]"
                  aria-label="Facebook du salon"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-amber-400 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-amber-300 transition-colors inline-block text-stone-300 py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/reserver"
                  className="hover:text-amber-300 transition-colors inline-block text-stone-300 py-0.5"
                >
                  Réserver en ligne
                </Link>
              </li>
              <li className="pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors inline-flex items-center gap-1.5 py-0.5"
                >
                  <WhatsAppBrand className="w-3.5 h-3.5" />
                  <span>Réserver sur WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-amber-400 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              Horaires (7j/7)
            </h3>
            <ul className="space-y-2 text-xs">
              {siteConfig.openingHours.map((slot, index) => (
                <li
                  key={index}
                  className="flex justify-between py-1.5 border-b border-stone-800/90"
                >
                  <span className="text-stone-400">{slot.day}</span>
                  <span className="text-amber-200 font-semibold">{slot.hours}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-3 border-t border-stone-800">
              <p className="text-[11px] text-stone-400">
                <strong className="text-white">Paiements :</strong>{' '}
                {siteConfig.payments.join(' • ')}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-amber-400 mb-4">
              Adresse &amp; Contact
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-stone-200 block leading-snug">
                    {siteConfig.address}, {siteConfig.district}, {siteConfig.city}
                  </span>
                  <a
                    href={siteConfig.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 font-semibold mt-1"
                  >
                    <span>Voir sur Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <WhatsAppBrand className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition-colors font-semibold text-emerald-400"
                >
                  WhatsApp : {siteConfig.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={phoneUrl}
                  className="hover:text-amber-300 transition-colors font-semibold text-stone-200"
                >
                  Tél : {siteConfig.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-stone-800/90 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-3">
          <p>
            © {new Date().getFullYear()} {siteConfig.brandName}. Tous droits réservés —{' '}
            {siteConfig.district}, {siteConfig.city}, {siteConfig.country}.
          </p>
          <p className="text-amber-400/80 font-medium">{siteConfig.tagline}.</p>
        </div>
      </div>
    </footer>
  )
}
