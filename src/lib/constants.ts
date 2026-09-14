export const SALON_INFO = {
  id: process.env.NEXT_PUBLIC_SALON_ID || '00000000-0000-0000-0000-000000000001',
  name: 'OULIBIJ',
  tagline: "L'art de la coiffure & des soins d'exception",
  description: "Salon de coiffure & esthétique haut de gamme. Experts en coiffure mixte, tresses créatives, balayages lumineux, soins botox & kératine.",
  address: "15 Avenue de l'Élégance",
  postalCode: '75008',
  city: 'Paris',
  phone: '+33 1 42 68 00 00',
  whatsapp: '+33 6 12 34 56 78',
  email: 'contact@oulibij-salon.fr',
  openingHours: [
    { day: 'Lundi - Mercredi', hours: '09:00 - 19:00' },
    { day: 'Jeudi', hours: '09:00 - 19:30' },
    { day: 'Vendredi', hours: '09:00 - 20:00' },
    { day: 'Samedi', hours: '08:30 - 19:30' },
    { day: 'Dimanche', hours: 'Fermé (sur privatisation)' },
  ],
  socials: {
    instagram: 'https://instagram.com/oulibij_salon',
    tiktok: 'https://tiktok.com/@oulibij_paris',
    facebook: 'https://facebook.com/oulibij.salon',
  },
}

export const NAV_LINKS = [
  { label: 'Accueil', href: '/' },
  { label: 'Services & Tarifs', href: '/services' },
  { label: 'Galerie', href: '/galerie' },
  { label: 'Notre Équipe', href: '/equipe' },
  { label: 'Contact', href: '/contact' },
]

export const SERVICE_CATEGORIES = [
  'Tous',
  'Coiffure & Coupe',
  'Tresses & Braids',
  'Coloration & Balayage',
  'Soins Profonds',
  'Lissages',
  'Homme & Barbe',
]

export const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '13:00', '13:30', '14:00', '14:30', '15:00',
  '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
]
