import HeroCarousel from "@/components/home/HeroCarousel";
import LocationSection from "@/components/home/LocationSection";
import CTASection from "@/components/home/CTASection";
import { DailyMenuSection } from "@/components/DailyMenuSection";
import AboutFeaturesSection from "@/components/home/AboutFeaturesSection";

export default function Home() {
    return (
        <main>
            <HeroCarousel />
            <DailyMenuSection />
            <AboutFeaturesSection />
            <CTASection />
            <LocationSection />

        </main>
    );
}