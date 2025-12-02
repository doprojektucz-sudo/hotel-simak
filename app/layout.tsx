import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}