import HeroSection from '@/components/home/HeroSection'
import PopularDonations from '@/components/home/PopularDonations'
import DonorPrivileges from '@/components/home/DonorPrivileges'
import VideoTestimonials from '@/components/home/VideoTestimonials'
import CampaignSection from '@/components/home/CampaignSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import PatronSection from '@/components/home/PatronSection'
import PaymentSection from '@/components/home/PaymentSection'
import ScripturalImportance from '@/components/home/ScripturalImportance'
import FAQSection from '@/components/home/FAQSection'
import ImpactSection from '@/components/home/ImpactSection'
import FinalCTA from '@/components/home/FinalCTA'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PopularDonations />
      <DonorPrivileges />
      <VideoTestimonials />
      <CampaignSection />
      <TestimonialsSection />
      <PatronSection />
      <PaymentSection />
      <ScripturalImportance />
      <FAQSection />
      <ImpactSection />
      <FinalCTA />
    </>
  )
}
