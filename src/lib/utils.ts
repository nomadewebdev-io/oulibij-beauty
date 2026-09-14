import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatDuration(minutes: number): string {
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
      return { label: 'Confirmé', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' }
    case 'en_attente':
      return { label: 'En attente', color: 'bg-amber-500/10 text-amber-400 border-amber-500/30' }
    case 'termine':
      return { label: 'Terminé', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' }
    case 'annule':
      return { label: 'Annulé', color: 'bg-rose-500/10 text-rose-400 border-rose-500/30' }
    default:
      return { label: status, color: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30' }
  }
}
