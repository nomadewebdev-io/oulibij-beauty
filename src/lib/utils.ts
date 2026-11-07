import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, withPrefix = false): string {
  if (amount <= 0) return 'Sur demande'
  const formatted = `${new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: 0,
  }).format(amount)} FCFA`
  return withPrefix ? `Dès ${formatted}` : formatted
}

export function formatDuration(minutes: number): string {
  if (minutes <= 0) return 'En boutique • 9h-21h'
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (remainingMinutes === 0) return `${hours}h`
  return `${hours}h${remainingMinutes.toString().padStart(2, '0')}`
}

export function formatDateFrench(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function getStatusBadge(status: string): { label: string; color: string } {
  switch (status) {
    case 'confirme':
      return { label: 'Confirmé', color: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30' }
    case 'en_attente':
      return { label: 'En attente', color: 'bg-amber-500/10 text-amber-800 border-amber-500/30' }
    case 'termine':
      return { label: 'Terminé', color: 'bg-stone-500/10 text-stone-700 border-stone-500/30' }
    case 'annule':
      return { label: 'Annulé', color: 'bg-red-500/10 text-red-700 border-red-500/30' }
    default:
      return { label: status, color: 'bg-zinc-500/10 text-zinc-600 border-zinc-500/30' }
  }
}
