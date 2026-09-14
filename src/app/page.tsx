import { HeroSection } from '@/components/home/HeroSection'
import { ServicesSection } from '@/components/home/ServicesSection'
import { TeamSection } from '@/components/home/TeamSection'
import { GallerySection } from '@/components/home/GallerySection'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { CtaBookingSection } from '@/components/home/CtaBookingSection'
import { getServices } from '@/lib/actions/services'
import { getStaffMembers } from '@/lib/actions/staff'
import { getRealisations } from '@/lib/actions/gallery'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [services, staff, realisations] = await Promise.all([
    getServices(),
    getStaffMembers(),
    getRealisations(),
  ])

  return (
    <div>
      <HeroSection />
      <ServicesSection initialServices={services} />
      <TeamSection initialStaff={staff} />
      <GallerySection initialRealisations={realisations} />
      <TestimonialsSection />
      <CtaBookingSection />
    </div>
  )
}
