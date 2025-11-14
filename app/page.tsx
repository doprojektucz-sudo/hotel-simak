import HeroCarousel from "@/components/home/HeroCarousel";
import FeaturesSection from "@/components/home/FeaturesSection";
import AboutSection from "@/components/home/AboutSection";
import LocationSection from "@/components/home/LocationSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <main>
      <HeroCarousel />
      <FeaturesSection />
      <AboutSection />
      <LocationSection />
      <CTASection />
    </main>
  );
}