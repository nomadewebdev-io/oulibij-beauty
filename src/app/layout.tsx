import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { siteConfig } from '@/config/site'

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#be123c',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.siteUrl),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.metaDescription,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.seo.siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.metaDescription,
    url: siteConfig.seo.siteUrl,
    siteName: siteConfig.name,
    locale: siteConfig.seo.locale,
    type: 'website',
    images: [
      {
        url: siteConfig.seo.ogImage.url,
        width: siteConfig.seo.ogImage.width,
        height: siteConfig.seo.ogImage.height,
        alt: siteConfig.seo.ogImage.alt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.metaDescription,
    images: [siteConfig.seo.ogImage.url],
    creator: siteConfig.seo.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`scroll-smooth ${jakartaSans.variable}`}>
      <body className="min-h-screen bg-[#f7f2ee] p-2 sm:p-5 lg:p-7 flex flex-col items-center justify-center antialiased font-[var(--font-jakarta)] text-zinc-900">
        <div className="w-full max-w-7xl bg-white rounded-[2rem] sm:rounded-[2.75rem] shadow-xl shadow-stone-900/5 border border-stone-200/80 overflow-hidden flex flex-col relative">
          <Navbar />
          <main className="flex-1 w-full" id="main-content">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
