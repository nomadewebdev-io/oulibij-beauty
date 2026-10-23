import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Sparkles, Home } from '@/components/ui/Icons'
import { SALON_INFO } from '@/lib/constants'

export default function NotFound() {
  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-zinc-950 px-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black text-zinc-100">Page Introuvable</h1>
        <p className="text-sm text-zinc-400">
          La page que vous recherchez n&apos;existe pas ou a été déplacée dans le salon {SALON_INFO.name}.
        </p>
        <div>
          <Link href="/">
            <Button variant="gold" size="md" className="gap-2">
              <Home className="w-4 h-4" />
              <span>Retour à l&apos;accueil</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
