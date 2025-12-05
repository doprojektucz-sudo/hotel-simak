import HeroCarousel from "@/components/home/HeroCarousel";
import FeaturesSection from "@/components/home/FeaturesSection";
import AboutSection from "@/components/home/AboutSection";
import LocationSection from "@/components/home/LocationSection";
import CTASection from "@/components/home/CTASection";
import { DailyMenuSection } from "@/components/DailyMenuSection";

export default function Home() {
    return (
        <main>
            <HeroCarousel />
            <DailyMenuSection />
            <FeaturesSection />
            <AboutSection />
            <CTASection />
            <LocationSection />

        </main>
    );
}