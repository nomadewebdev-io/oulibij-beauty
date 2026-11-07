import Link from 'next/link'
import { Sparkles, Home } from '@/components/ui/Icons'
import { siteConfig } from '@/config/site'

export default function NotFound() {
  return (
    <div className="py-24 sm:py-32 px-4 flex items-center justify-center text-center bg-white">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#0f0e0c] text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto shadow-md">
          <Sparkles className="w-8 h-8 text-amber-400" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f0e0c] font-serif italic">
          Page Introuvable
        </h1>
        <p className="text-sm text-stone-600 leading-relaxed">
          La page demandée n&apos;est plus disponible sur le site d&apos;{siteConfig.brandName}.
        </p>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-amber-300 bg-[#0f0e0c] hover:bg-stone-900 border border-amber-500/40 shadow-sm active:scale-95 transition-all min-h-[44px]"
          >
            <Home className="w-4 h-4 text-amber-400" />
            <span>Retour à l&apos;accueil</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
