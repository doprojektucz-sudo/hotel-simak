import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/trasa/1 → přesměruje na gpxUrl brožury s trasaCislo = 1
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const cislo = parseInt(slug);

  if (isNaN(cislo)) {
    return NextResponse.json({ error: "Neplatné číslo trasy" }, { status: 400 });
  }

  const brozura = await prisma.brozura.findFirst({
    where: { trasaCislo: cislo },
    select: { gpxUrl: true, web: true, nadpis: true },
  });

  if (!brozura) {
    return NextResponse.json({ error: `Trasa č. ${cislo} nenalezena` }, { status: 404 });
  }

  // gpxUrl může být: dlouhá Mapy.cz URL, Komoot URL, nebo jiná URL trasy
  const url = brozura.gpxUrl || brozura.web;

  if (!url) {
    return NextResponse.json({ error: "Trasa nemá nastavenou URL" }, { status: 404 });
  }

  // Relativní URL by neměla nastat (ukládáme je jen pro QR), ale pro jistotu
  if (url.startsWith("/")) {
    return NextResponse.redirect(new URL(url, request.nextUrl.origin));
  }

  return NextResponse.redirect(url, { status: 302 });
}
