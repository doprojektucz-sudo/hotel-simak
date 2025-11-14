import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: "Hotel a Restaurace U Šimáka - Radostín, Žďár nad Sázavou",
  description: "Rodinný hotel a restaurace v malebném Radostíně u Žďáru nad Sázavou. Ubytování, kvalitní česká kuchyně a nezapomenutelné zážitky v srdci Vysočiny.",
  keywords: "hotel Žďár nad Sázavou, ubytování Žďárské vrchy, restaurace Radostín, česká kuchyně, chata Milunda, Velké Dářko, ubytování Vysočina",
  openGraph: {
    title: "Hotel a Restaurace U Šimáká",
    description: "Rodinný hotel a restaurace v Radostíně u Žďáru nad Sázavou",
    type: "website",
    locale: "cs_CZ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}