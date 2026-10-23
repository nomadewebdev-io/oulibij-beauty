import Link from 'next/link'
import { Sparkles, Home } from '@/components/ui/Icons'
import { SALON_INFO } from '@/lib/constants'

export default function NotFound() {
  return (
    <div className="py-24 sm:py-32 px-4 flex items-center justify-center text-center bg-white">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-700 border border-rose-100 flex items-center justify-center mx-auto shadow-xs">
          <Sparkles className="w-8 h-8 text-rose-600" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 font-serif italic">Page Introuvable</h1>
        <p className="text-sm text-zinc-600 leading-relaxed">
          La page que vous recherchez n&apos;existe pas ou a été déplacée dans le salon {SALON_INFO.name}.
        </p>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-zinc-950 hover:bg-zinc-800 shadow-sm hover:scale-[1.02] active:scale-95 transition-all min-h-[44px]"
          >
            <Home className="w-4 h-4" />
            <span>Retour à l&apos;accueil</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
