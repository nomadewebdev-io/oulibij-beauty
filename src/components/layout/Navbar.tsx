'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS, SALON_INFO, getWhatsAppBookingUrl } from '@/lib/constants'
import { Menu, X, Sparkles, WhatsApp } from '@/components/ui/Icons'

export function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const whatsappUrl = getWhatsAppBookingUrl()

  return (
    <header className="w-full py-3.5 px-4 sm:px-8 border-b border-rose-100/80 bg-white sticky top-0 z-50 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-rose-700 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif italic text-2xl font-bold tracking-tight text-zinc-950 group-hover:text-rose-700 transition-colors">
              {SALON_INFO.brandName}
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-rose-700/90 -mt-1">
              Dakar • Almadies
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all relative py-1 hover:text-rose-700 ${
                  isActive ? 'text-rose-700 font-bold' : 'text-zinc-700'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-700 rounded-full" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right Action: WhatsApp Booking Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            <WhatsApp className="w-4 h-4 text-white" />
            <span>Réserver sur WhatsApp</span>
          </a>
        </div>

        {/* Mobile Hamburger & Quick WhatsApp Icon */}
        <div className="lg:hidden flex items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm"
          >
            <WhatsApp className="w-3.5 h-3.5 text-white" />
            <span className="text-[11px]">WhatsApp</span>
          </a>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl text-zinc-800 hover:bg-rose-50 transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden pt-4 pb-6 px-4 mt-3 bg-white/95 border-t border-rose-100 rounded-2xl shadow-xl space-y-4 animate-fadeIn">
          <nav className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-pink-50 text-pink-600 font-bold'
                      : 'text-zinc-700 hover:bg-rose-50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="pt-3 border-t border-rose-100 flex flex-col gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20"
            >
              <WhatsApp className="w-4 h-4 text-white" />
              <span>Réserver sur WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
