import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SALON_INFO } from '@/lib/constants'

export const metadata: Metadata = {
  title: `${SALON_INFO.name} | Salon de Coiffure & Soins Féminins d'Exception`,
  description: `${SALON_INFO.name} - Prestations sur-mesure, coupes tendance, balayages lumineux, tresses d'art et soins botox. Prenez rendez-vous en ligne 24/7.`,
  keywords: [
    'salon de coiffure',
    'OULIBIJ-BEAUTY',
    'coiffure femme',
    'tresses',
    'braids',
    'balayage',
    'lissage brésilien',
    'soin botox',
  ],
  authors: [{ name: SALON_INFO.name }],
  openGraph: {
    title: `${SALON_INFO.name} | Salon de Coiffure Féminin`,
    description: SALON_INFO.description,
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://oulibij-beauty.fr',
    siteName: SALON_INFO.name,
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 p-2 sm:p-5 lg:p-7 flex flex-col items-center justify-center antialiased">
        <div className="w-full max-w-7xl bg-white rounded-[2rem] sm:rounded-[2.75rem] shadow-2xl shadow-pink-900/10 border border-pink-100/90 overflow-hidden flex flex-col relative">
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
