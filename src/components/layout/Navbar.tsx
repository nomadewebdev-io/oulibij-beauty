'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { siteConfig, getWhatsAppBookingUrl, getPhoneCallUrl } from '@/config/site'
import { Menu, X, Phone, WhatsAppBrand, OuliBijLogo } from '@/components/ui/Icons'

export function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const whatsappUrl = getWhatsAppBookingUrl()
  const phoneUrl = getPhoneCallUrl()

  return (
    <header className="w-full py-3 sm:py-4 px-3.5 sm:px-8 border-b border-amber-900/10 bg-white sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3 group shrink-0 min-w-0"
          aria-label={`Retour à l'accueil ${siteConfig.brandName}`}
        >
          <OuliBijLogo
            size={40}
            className="w-9 h-9 sm:w-11 sm:h-11 shrink-0 group-hover:scale-105 transition-transform shadow-sm rounded-full"
          />
          <div className="flex flex-col min-w-0 justify-center">
            <span className="font-serif italic text-[17px] sm:text-2xl font-bold tracking-tight text-[#0f0e0c] group-hover:text-amber-800 transition-colors whitespace-nowrap leading-tight">
              {siteConfig.brandName}
            </span>
            <span className="text-[8.5px] sm:text-[10px] tracking-[0.18em] uppercase font-bold text-amber-800 whitespace-nowrap leading-tight">
              {siteConfig.district.toUpperCase()} • {siteConfig.city.toUpperCase()}
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-5 xl:gap-7" aria-label="Navigation principale">
          {siteConfig.navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all relative py-1 whitespace-nowrap hover:text-amber-800 ${
                  isActive ? 'text-[#0f0e0c] font-bold' : 'text-stone-600'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 rounded-full" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          <a
            href={phoneUrl}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold text-amber-300 bg-[#0f0e0c] hover:bg-stone-900 border border-amber-500/40 shadow-sm hover:scale-[1.02] active:scale-95 transition-all min-h-[40px]"
            aria-label={`Appeler le salon au ${siteConfig.phone}`}
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>{siteConfig.phone}</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-900/15 hover:scale-[1.02] active:scale-95 transition-all min-h-[40px]"
            aria-label={`Réserver sur WhatsApp (${siteConfig.whatsappDisplay})`}
          >
            <WhatsAppBrand className="w-4 h-4 text-white" />
            <span>WhatsApp</span>
          </a>
        </div>

        <div className="lg:hidden flex items-center gap-1.5 sm:hidden shrink-0">
          <a
            href={phoneUrl}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full text-amber-300 bg-[#0f0e0c] border border-amber-500/50 shadow-xs shrink-0"
            aria-label={`Appeler le ${siteConfig.phone}`}
          >
            <Phone className="w-4 h-4 text-amber-400" />
          </a>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl text-[#0f0e0c] hover:bg-amber-50 transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center shrink-0"
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="hidden sm:flex lg:hidden p-2 rounded-xl text-[#0f0e0c] hover:bg-amber-50 transition-colors cursor-pointer min-w-[40px] min-h-[40px] items-center justify-center shrink-0"
          aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden pt-4 pb-6 px-4 mt-3 bg-[#faf8f4] border border-amber-900/15 rounded-2xl shadow-xl space-y-4 animate-fadeIn">
          <nav className="flex flex-col space-y-1" aria-label="Menu mobile">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors min-h-[44px] flex items-center ${
                    isActive
                      ? 'bg-[#0f0e0c] text-amber-300 font-bold'
                      : 'text-stone-800 hover:bg-amber-100/50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="pt-3 border-t border-amber-900/10 flex flex-col gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md min-h-[48px]"
            >
              <WhatsAppBrand className="w-4 h-4 text-white" />
              <span>WhatsApp : {siteConfig.whatsappDisplay}</span>
            </a>

            <a
              href={phoneUrl}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-xs font-bold text-amber-300 bg-[#0f0e0c] border border-amber-500/40 min-h-[48px]"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Appeler : {siteConfig.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
