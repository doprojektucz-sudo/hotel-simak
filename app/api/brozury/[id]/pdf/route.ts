import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import ReactPDF from "@react-pdf/renderer";
import QRCode from "qrcode";
import { BrozuraPDF } from "@/components/BrozuraPDF";
import React from "react";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const BASE_URL = "https://usimaka.cz";

async function toBase64(src: string | null | undefined): Promise<string | null> {
  if (!src) return null;
  try {
    if (src.startsWith("/")) {
      const filePath = path.join(process.cwd(), "public", src);
      if (!fs.existsSync(filePath)) return null;
      let buf = fs.readFileSync(filePath);
      const ext = path.extname(src).slice(1).toLowerCase();
      if (["webp", "gif", "avif"].includes(ext)) {
        buf = await sharp(buf).jpeg({ quality: 90 }).toBuffer();
        return `data:image/jpeg;base64,${buf.toString("base64")}`;
      }
      const mime = ext === "png" ? "image/png" : "image/jpeg";
      return `data:${mime};base64,${buf.toString("base64")}`;
    }
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(src, { signal: ctrl.signal });
    clearTimeout(timer);
    if (!res.ok) return null;
    let buf = Buffer.from(await res.arrayBuffer());
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("webp") || ct.includes("gif")) {
      buf = await sharp(buf).jpeg({ quality: 90 }).toBuffer();
      return `data:image/jpeg;base64,${buf.toString("base64")}`;
    }
    const mime = ct.includes("png") ? "image/png" : "image/jpeg";
    return `data:${mime};base64,${buf.toString("base64")}`;
  } catch { return null; }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const b = await prisma.brozura.findUnique({
    where: { id },
    include: { zastavky: { orderBy: { poradi: "asc" } } },
  });
  if (!b) return NextResponse.json({ error: "Nenalezena" }, { status: 404 });

  // QR zdroj — relativní cesta vždy rozšíříme na usimaka.cz
  const rawQr = (b as any).gpxUrl || b.web;
  const qrSource = rawQr?.startsWith("/") ? `${BASE_URL}${rawQr}` : rawQr;

  const [qrDataUrl, fotoBase64, logoBase64, mapBase64, mapaMiniBase64, mapaTrasyBase64] = await Promise.all([
    qrSource
      ? QRCode.toDataURL(qrSource, { width: 200, margin: 1, color: { dark: (b as any).barvaAkcentu, light: (b as any).barvaPozadi } }).catch(() => null)
      : null,
    toBase64(b.fotoUrl),
    b.zobrazitLogo ? toBase64("/images/logo.webp") : null,
    toBase64((b as any).mapUrl),
    toBase64((b as any).mapaMiniUrl),
    toBase64((b as any).mapaTrasyUrl),
  ]);

  try {
    const stream = await ReactPDF.renderToStream(
      React.createElement(BrozuraPDF, {
        nazev: b.nazev, sablona: b.sablona, format: b.format,
        orientace: b.orientace, layout: b.layout,
        barvaPozadi: b.barvaPozadi, barvaText: b.barvaText, barvaAkcentu: b.barvaAkcentu,
        zobrazitLogo: b.zobrazitLogo, zobrazitPaticku: b.zobrazitPaticku,
        nadpis: b.nadpis, podnadpis: b.podnadpis, popis: b.popis,
        datum: b.datum, cas: b.cas, misto: b.misto, cena: b.cena,
        kontakt: b.kontakt, web: b.web,
        fotoUrl: fotoBase64,
        logoBase64,
        mapUrl: mapBase64,
        qrDataUrl,
        // Cyklotrasa
        trasaKm: (b as any).trasaKm,
        trasaNarocnost: (b as any).trasaNarocnost,
        trasaPrevyseni: (b as any).trasaPrevyseni,
        trasaPovrch: (b as any).trasaPovrch,
        trasaTyp: (b as any).trasaTyp,
        trasaCislo: (b as any).trasaCislo,
        gpxUrl: (b as any).gpxUrl,
        mapaMiniUrl: mapaMiniBase64,
        mapaTrasyUrl: mapaTrasyBase64,
        zastavky: (b as any).zastavky || [],
      } as any)
    );

    const chunks: Buffer[] = [];
    await new Promise<void>((resolve, reject) => {
      stream.on("data", (c: Buffer) => chunks.push(c));
      stream.on("end", resolve);
      stream.on("error", reject);
    });

    const slug = b.nazev.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60);

    return new NextResponse(Buffer.concat(chunks), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="brozura-${slug}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("PDF error:", err);
    return NextResponse.json({ error: "PDF generation error" }, { status: 500 });
  }
}
