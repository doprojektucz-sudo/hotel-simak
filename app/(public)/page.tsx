import HeroCarousel from "@/components/home/HeroCarousel";
import LocationSection from "@/components/home/LocationSection";
import CTASection from "@/components/home/CTASection";
import { DailyMenuSection } from "@/components/DailyMenuSection";
import AboutFeaturesSection from "@/components/home/AboutFeaturesSection";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Hotel a Restaurace U Šimáka | Radostín u Žďáru nad Sázavou",
    description:
        "Rodinný hotel a restaurace v Radostíně u Velké Dářko. 21 lůžek, tradiční česká kuchyně, chata Milunda pro 8–10 osob. Rezervujte pobyt v srdci Žďárských vrchů.",
    alternates: {
        canonical: "https://www.usimaka.cz",
    },
    openGraph: {
        title: "Hotel a Restaurace U Šimáka | Radostín u Žďáru nad Sázavou",
        description:
            "Rodinný hotel a restaurace v Radostíně u Velké Dářko. 21 lůžek, tradiční česká kuchyně, chata Milunda pro 8–10 osob.",
        url: "https://www.usimaka.cz",
        type: "website",
    },
};

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