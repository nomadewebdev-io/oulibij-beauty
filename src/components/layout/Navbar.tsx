'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS, SALON_INFO } from '@/lib/constants'
import { Menu, X, Sparkles, Calendar, User, LogOut } from '@/components/ui/Icons'
import { createClient } from '@/lib/supabase/client'
import { signOutAction } from '@/lib/actions/auth'

export function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<{ email?: string } | null>(null)

  useEffect(() => {
    try {
      const supabase = createClient()
      supabase.auth.getUser().then(({ data }) => {
        setUser(data.user)
      })

      const { data: authListener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user || null)
        }
      )

      return () => {
        authListener.subscription.unsubscribe()
      }
    } catch {
      // client error fallback
    }
  }, [])

  return (
    <header className="w-full py-4 px-4 sm:px-8 border-b border-rose-100/70 bg-white/80 backdrop-blur-md sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif italic text-2xl font-bold tracking-wide text-zinc-900 group-hover:text-pink-600 transition-colors">
              {SALON_INFO.brandName}
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-pink-500/90 -mt-1">
              Haute Coiffure & Soins
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all relative py-1 hover:text-pink-600 ${
                  isActive ? 'text-pink-600 font-semibold' : 'text-zinc-600'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-400 rounded-full" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right CTA Button ("Mes réservations") */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/compte/mes-rendez-vous"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-zinc-900 text-white hover:bg-zinc-800 transition-all shadow-sm active:scale-95"
              >
                <User className="w-3.5 h-3.5" />
                <span>Mon Espace</span>
              </Link>
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="p-2 text-zinc-400 hover:text-rose-500 transition-colors"
                  title="Se déconnecter"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/compte/mes-rendez-vous"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-white transition-all shadow-sm active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5 text-pink-300" />
              <span>Mes réservations</span>
            </Link>
          )}

          <Link
            href="/reserver"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 text-white shadow-md shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <span>Réserver</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center gap-3">
          <Link
            href="/reserver"
            className="px-3.5 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-sm"
          >
            Réserver
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl text-zinc-700 hover:bg-rose-50 transition-colors"
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

          <div className="pt-3 border-t border-rose-100 flex flex-col gap-2">
            <Link
              href="/compte/mes-rendez-vous"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-xs font-bold bg-zinc-900 text-white shadow-sm"
            >
              <Calendar className="w-4 h-4 text-pink-300" />
              <span>Mes réservations</span>
            </Link>
            <Link
              href="/reserver"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-xs font-bold bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md shadow-pink-500/25"
            >
              <Sparkles className="w-4 h-4" />
              <span>Prendre un rendez-vous</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
