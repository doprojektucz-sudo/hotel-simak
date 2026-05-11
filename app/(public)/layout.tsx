import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const BASE_URL = "https://www.usimaka.cz";

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: {
        default: "Hotel a Restaurace U Šimáka | Radostín u Žďáru nad Sázavou",
        template: "%s | Hotel U Šimáka – Radostín",
    },
    description:
        "Rodinný hotel a restaurace v Radostíně u Velké Dářko. 21 lůžek, tradiční česká kuchyně, chata Milunda pro 8–10 osob. Rezervujte pobyt v srdci Žďárských vrchů.",
    openGraph: {
        siteName: "Hotel a Restaurace U Šimáka",
        locale: "cs_CZ",
        type: "website",
        url: BASE_URL,
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Hotel a Restaurace U Šimáka – Radostín",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        images: ["/og-image.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
        },
    },
    alternates: {
        canonical: BASE_URL,
    },
};

// JSON-LD strukturovaná data pro lokální podnik – vložena globálně
const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["LodgingBusiness", "Restaurant"],
    name: "Hotel a Restaurace U Šimáka",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    image: `${BASE_URL}/og-image.jpg`,
    telephone: "+420728958114",
    email: "hotresrad@seznam.cz",
    servesCuisine: "Czech",
    priceRange: "Kč",
    address: {
        "@type": "PostalAddress",
        streetAddress: "Radostín 95",
        addressLocality: "Radostín",
        postalCode: "591 01",
        addressCountry: "CZ",
    },
    geo: {
        "@type": "GeoCoordinates",
        latitude: 49.6548,
        longitude: 15.8749,
    },
    openingHoursSpecification: [
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
                "Monday", "Tuesday", "Wednesday",
                "Thursday", "Friday", "Saturday", "Sunday",
            ],
            opens: "11:00",
            closes: "22:00",
        },
    ],
    hasMap: "https://maps.google.com/?q=Radost%C3%ADn+95,+591+01+Radost%C3%ADn",
};

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Header />
            {children}
            <BackToTop />
            <Footer />
        </>
    );
}