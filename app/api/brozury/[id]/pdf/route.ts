import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import ReactPDF from "@react-pdf/renderer";
import QRCode from "qrcode";
import { BrozuraPDF } from "@/components/BrozuraPDF";
import React from "react";
import fs from "fs";
import path from "path";
import sharp from "sharp";

async function toBase64(src: string | null | undefined): Promise<string | null> {
  if (!src) return null;
  try {
    let buf: Buffer;

    if (src.startsWith("/")) {
      const filePath = path.join(process.cwd(), "public", src);
      if (!fs.existsSync(filePath)) return null;
      buf = fs.readFileSync(filePath);
    } else {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 8000);
      const res = await fetch(src, { signal: ctrl.signal });
      clearTimeout(timer);
      if (!res.ok) return null;
      buf = Buffer.from(await res.arrayBuffer());
    }

    const ext = src.split(".").pop()?.toLowerCase();

    // Překonvertuj WebP (a případně jiné formáty) na JPEG přes sharp
    if (ext === "webp" || ext === "gif" || ext === "avif") {
      const converted = await sharp(buf).jpeg({ quality: 90 }).toBuffer();
      return `data:image/jpeg;base64,${converted.toString("base64")}`;
    }

    // PNG a JPEG nechej jak jsou
    const mime = ext === "png" ? "image/png" : "image/jpeg";
    return `data:${mime};base64,${buf.toString("base64")}`;
  } catch { return null; }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const b = await prisma.brozura.findUnique({ where: { id } });
  if (!b) return NextResponse.json({ error: "Nenalezena" }, { status: 404 });

  const [qrDataUrl, fotoBase64, logoBase64, mapBase64] = await Promise.all([
    b.web ? QRCode.toDataURL(b.web, { width: 200, margin: 1, color: { dark: b.barvaAkcentu, light: b.barvaPozadi } }).catch(() => null) : null,
    toBase64(b.fotoUrl),
    b.zobrazitLogo ? toBase64("/images/logo.webp") : null,
    toBase64((b as any).mapUrl),
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
      }) as any
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
    return NextResponse.json({ error: "PDF error" }, { status: 500 });
  }
}
