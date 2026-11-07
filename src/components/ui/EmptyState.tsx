import React from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight } from '@/components/ui/Icons'

interface EmptyStateProps {
  title: string
  description: string
  icon?: React.ReactNode
  actionLabel?: string
  actionHref?: string
  className?: string
}

export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  actionHref,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`w-full max-w-xl mx-auto my-8 p-8 sm:p-10 rounded-3xl bg-[#faf8f4] border border-amber-900/15 text-center shadow-sm flex flex-col items-center justify-center animate-fadeIn ${className}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-[#0f0e0c] border border-amber-500/40 flex items-center justify-center text-amber-400 mb-5 shadow-xs">
        {icon || <Sparkles className="w-8 h-8 text-amber-400" />}
      </div>

      <h3 className="text-xl font-bold text-[#0f0e0c] mb-2">{title}</h3>
      <p className="text-sm text-stone-600 max-w-md leading-relaxed mb-6">{description}</p>

      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-amber-300 bg-[#0f0e0c] hover:bg-stone-900 border border-amber-500/40 shadow-sm active:scale-95 transition-all min-h-[44px]"
        >
          <span>{actionLabel}</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
        </Link>
      )}
    </div>
  )
}
