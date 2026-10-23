import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SALON_INFO } from '@/lib/constants'

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: `${SALON_INFO.name} | Salon de Coiffure & Soins Féminins d'Exception à Dakar`,
  description: `${SALON_INFO.name} (Almadies, Dakar) - Tresses d'art (knotless braids), coupes sur-mesure, balayages lumineux, lissages et soins botox. Réservation directe sur WhatsApp.`,
  keywords: [
    'salon de coiffure Dakar',
    'OULIBIJ BEAUTY',
    'coiffure femme Dakar',
    'Almadies',
    'tresses knotless',
    'braids Dakar',
    'balayage',
    'lissage brésilien',
    'soin botox capillaire',
  ],
  authors: [{ name: SALON_INFO.name }],
  openGraph: {
    title: `${SALON_INFO.name} | Salon de Coiffure Féminin à Dakar`,
    description: SALON_INFO.description,
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://oulibij-beauty.sn',
    siteName: SALON_INFO.name,
    locale: 'fr_SN',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`scroll-smooth ${jakartaSans.variable}`}>
      <body className="min-h-screen bg-[#f7f2ee] p-2 sm:p-5 lg:p-7 flex flex-col items-center justify-center antialiased font-[var(--font-jakarta)]">
        <div className="w-full max-w-7xl bg-white rounded-[2rem] sm:rounded-[2.75rem] shadow-xl shadow-stone-900/5 border border-stone-200/80 overflow-hidden flex flex-col relative">
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
