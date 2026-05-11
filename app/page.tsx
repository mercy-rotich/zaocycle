import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import HeroSection from '@/components/landing/HeroSection';
import ImpactBanner from '@/components/landing/ImpactBanner';
import HowItWorksSection from '@/components/landing/HowItWorksSection';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ImpactBanner />
        <HowItWorksSection />
      </main>
      <Footer />
    </>
  );
}
