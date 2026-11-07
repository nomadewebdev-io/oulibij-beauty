import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { products } from '@/data/products'
import { BoutiqueCatalog } from '@/components/boutique/BoutiqueCatalog'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { siteConfig, getPhoneCallUrl } from '@/config/site'
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Phone,
  ShoppingBag,
} from '@/components/ui/Icons'

const baseUrl = siteConfig.seo.siteUrl.replace(/\/$/, '')
const absoluteOgImage = `${baseUrl}/images/og-image.jpg`

export const metadata: Metadata = {
  title: 'Boutique Cosmétiques, Parfums & Accessoires',
  description: `Boutique ${siteConfig.brandName} à ${siteConfig.fullAddress} : sélection de cosmétiques, soins beauté, parfums et accessoires. Commande rapide sur WhatsApp au ${siteConfig.whatsappDisplay}, ouvert 7j/7 de 9h à 21h.`,
  keywords: [
    'boutique OuliBij Beauté',
    'cosmétiques Dakar',
    'parfumerie Liberté 6',
    'accessoires beauté Dakar',
    'soins beauté Cité Sonatel 2',
  ],
  alternates: {
    canonical: `${baseUrl}/boutique`,
  },
  openGraph: {
    title: `Boutique Cosmétiques, Parfums & Accessoires | ${siteConfig.brandName}`,
    description: `Découvrez les cosmétiques, parfums et accessoires ${siteConfig.brandName} à ${siteConfig.district}, ${siteConfig.city}. Commande directe sur WhatsApp au ${siteConfig.whatsappDisplay}.`,
    url: `${baseUrl}/boutique`,
    siteName: siteConfig.brandName,
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: absoluteOgImage,
        width: 1200,
        height: 630,
        alt: siteConfig.seo.ogImage.alt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Boutique Cosmétiques, Parfums & Accessoires | ${siteConfig.brandName}`,
    description: `Cosmétiques, parfums et accessoires beauté chez ${siteConfig.brandName} à ${siteConfig.district}, ${siteConfig.city}.`,
    images: [absoluteOgImage],
  },
}

const boutiqueJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: `Boutique ${siteConfig.brandName}`,
  description: `Espace cosmétiques, parfums et accessoires beauté du salon ${siteConfig.brandName} à ${siteConfig.fullAddress}.`,
  url: `${baseUrl}/boutique`,
  isPartOf: {
    '@type': 'BeautySalon',
    name: siteConfig.brandName,
    telephone: siteConfig.phoneRaw,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${siteConfig.address}, ${siteConfig.district}`,
      addressLocality: siteConfig.city,
      addressCountry: 'SN',
    },
  },
}

export default function BoutiquePage() {
  return (
    <div className="pt-10 pb-20 px-4 sm:px-8 lg:px-12 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(boutiqueJsonLd) }}
      />

      <div className="max-w-7xl mx-auto">
        <header className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0f0e0c] border border-amber-500/40 text-amber-300 text-xs font-bold tracking-wider uppercase mb-3 shadow-sm">
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            <span>Cosmétiques • Parfums • Accessoires</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0f0e0c] tracking-tight font-serif italic">
            La Boutique {siteConfig.brandName}
          </h1>

          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed">
            Prolongez votre mise en beauté avec nos cosmétiques, parfums et accessoires disponibles au salon à{' '}
            <strong className="text-[#0f0e0c]">{siteConfig.district}</strong> ou sur commande via WhatsApp.
          </p>
        </header>

        <BoutiqueCatalog products={products} />

        <RevealOnScroll className="mt-16" delayMs={80}>
          <div className="p-7 sm:p-9 rounded-3xl bg-[#faf8f4] border border-amber-900/15 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-1 w-full">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0f0e0c] text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/40">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#0f0e0c]">Retrait à {siteConfig.district}</h2>
                  <p className="text-xs text-stone-600 leading-snug mt-0.5">
                    {siteConfig.address}, {siteConfig.city}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0f0e0c] text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/40">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#0f0e0c]">Ouvert 7j/7 • 9h – 21h</h2>
                  <p className="text-xs text-stone-600 leading-snug mt-0.5">
                    Paiements : {siteConfig.payments.join(' • ')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0f0e0c] text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/40">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#0f0e0c]">Conseil Direct</h2>
                  <a
                    href={getPhoneCallUrl()}
                    className="text-xs font-semibold text-amber-800 hover:underline inline-flex items-center gap-1 mt-0.5"
                  >
                    <span>Appeler le {siteConfig.phone}</span>
                  </a>
                </div>
              </div>
            </div>

            <Link
              href="/prestations"
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-amber-300 bg-[#0f0e0c] hover:bg-stone-900 border border-amber-500/40 transition-all shrink-0 min-h-[44px]"
            >
              <span>Voir nos prestations salon</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  )
}
