import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SALON_INFO } from '@/lib/constants'

export const metadata: Metadata = {
  title: `${SALON_INFO.name} | Salon de Coiffure & Beauté Haute Couture`,
  description: `${SALON_INFO.name} - Coiffure mixte, tresses & braids artistiques, coloration, balayage, soins botox et lissage à Paris. Réservation en ligne 24/7.`,
  keywords: [
    'salon de coiffure',
    'OULIBIJ',
    'coiffeur paris',
    'tresses',
    'braids',
    'balayage',
    'lissage brésilien',
    'soin botox',
    'barbier',
  ],
  authors: [{ name: SALON_INFO.name }],
  openGraph: {
    title: `${SALON_INFO.name} | Salon de Coiffure & Esthétique`,
    description: SALON_INFO.description,
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://oulibij-salon.fr',
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
    <html lang="fr" className="dark scroll-smooth">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
