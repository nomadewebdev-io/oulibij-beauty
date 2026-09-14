'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS, SALON_INFO } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { Menu, X, Calendar, Sparkles, User, LogOut } from '@/components/ui/Icons'
import { createClient } from '@/lib/supabase/client'
import { signOutAction } from '@/lib/actions/auth'

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<{ email?: string } | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      // Ignore if supabase client is not yet configured with valid keys
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 py-3 shadow-xl'
          : 'bg-gradient-to-b from-zinc-950/80 via-zinc-950/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 flex items-center justify-center text-zinc-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5 fill-zinc-950" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-widest text-zinc-100 uppercase group-hover:text-amber-400 transition-colors">
                {SALON_INFO.name}
              </span>
              <span className="hidden sm:block text-[10px] uppercase tracking-widest text-amber-400/80 font-medium">
                Haute Coiffure & Beauté
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-amber-400 relative py-1 ${
                    isActive ? 'text-amber-400 font-semibold' : 'text-zinc-300'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full animate-fadeIn" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Link href="/dashboard">
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="w-4 h-4" />
                    <span>Mon Espace</span>
                  </Button>
                </Link>
                <form action={signOutAction}>
                  <Button
                    type="submit"
                    variant="ghost"
                    size="sm"
                    className="text-zinc-400 hover:text-rose-400 p-2"
                    title="Se déconnecter"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-sm font-medium text-zinc-300 hover:text-amber-400 transition-colors"
              >
                Connexion
              </Link>
            )}

            <Link href="/rendez-vous">
              <Button variant="gold" size="sm" className="gap-2 shadow-amber-500/20">
                <Calendar className="w-4 h-4" />
                <span>Prendre RDV</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <Link href="/rendez-vous">
              <Button variant="gold" size="sm" className="px-3 py-1.5 text-xs">
                RDV
              </Button>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-zinc-950/98 border-b border-zinc-800 px-4 pt-4 pb-6 mt-3 space-y-4 shadow-2xl backdrop-blur-xl animate-fadeIn">
          <nav className="flex flex-col space-y-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20'
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="pt-4 border-t border-zinc-800 flex flex-col gap-3">
            {user ? (
              <div className="flex items-center justify-between">
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm text-zinc-300 hover:text-amber-400"
                >
                  <User className="w-4 h-4" />
                  <span>Mon Espace Client</span>
                </Link>
                <form action={signOutAction}>
                  <Button type="submit" variant="ghost" size="sm" className="text-rose-400 text-xs">
                    Déconnexion
                  </Button>
                </form>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center py-2 text-sm text-zinc-300 hover:text-amber-400"
              >
                Connexion / Espace Membre
              </Link>
            )}

            <Link href="/rendez-vous" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="gold" size="md" className="w-full justify-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Réserver un créneau</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
