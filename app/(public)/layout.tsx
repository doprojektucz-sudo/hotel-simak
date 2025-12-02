import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export const metadata: Metadata = {
    title: "Hotel a Restaurace U Šimáka - Radostín, Žďár nad Sázavou",
    description: "Rodinný hotel a restaurace v malebném Radostíně u Žďáru nad Sázavou. Ubytování, kvalitní česká kuchyně a nezapomenutelné zážitky v srdci Vysočiny.",
    keywords: "hotel Žďár nad Sázavou, ubytování Žďárské vrchy, restaurace Radostín, česká kuchyně, chata Milunda, Velké Dářko, ubytování Vysočina",
    openGraph: {
        title: "Hotel a Restaurace U Šimáka",
        description: "Rodinný hotel a restaurace v Radostíně u Žďáru nad Sázavou",
        type: "website",
        locale: "cs_CZ",
    },
};

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            {children}
            <BackToTop />
            <Footer />
        </>
    );
}