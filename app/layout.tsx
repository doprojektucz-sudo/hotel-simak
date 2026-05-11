import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"] });
const GA_ID = "G-XJH6JY7XQT";

export const metadata: Metadata = {
  title: "Hotel a Restaurace U Šimáka",
  description: "Rodinný hotel a restaurace v Radostíně u Žďáru nad Sázavou.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={inter.className}>

        {/* 1. Consent default — PŘED vším ostatním */}
        <Script id="google-consent-init" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent', 'default', {
              analytics_storage:   'denied',
              ad_storage:          'denied',
              ad_user_data:        'denied',
              ad_personalization:  'denied',
              functionality_storage: 'granted',
              security_storage:    'granted',
              wait_for_update:     500
            });
            gtag('set', { anonymize_ip: true });
          `}
        </Script>

        {/* 2. GA4 script — afterInteractive, načte se až po hydrataci */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />

        {/* 3. GA4 konfigurace — až po načtení gtag.js */}
        <Script id="google-analytics-config" strategy="afterInteractive">
          {`
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              anonymize_ip: true,
              send_page_view: true
            });
          `}
        </Script>

        {children}

        {/* 4. Banner — consent update přijde z CookieBanner komponenty */}
        <CookieBanner />

      </body>
    </html>
  );
}