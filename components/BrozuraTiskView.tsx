"use client";

// Tato komponenta renderuje brožuru jako čisté HTML/CSS
// Puppeteer ji zachytí a převede na PDF — 1:1 s editorem

import { useEffect, useRef } from "react";
import QRCode from "qrcode";
import type { Brozura, Zastavka } from "@prisma/client";

type BrozuraWithZastavky = Brozura & { zastavky: Zastavka[] };

// Rozměry formátů v mm
const FORMAT_MM: Record<string, { w: number; h: number }> = {
  A3: { w: 297, h: 420 },
  A4: { w: 210, h: 297 },
  A5: { w: 148, h: 210 },
};

const HOTEL_INFO = {
  phone: "728 490 498",
  email: "hotresrad@seznam.cz",
  address: "Radostín 95, 591 01 Žďár nad Sázavou",
};

const NARC_COLORS: Record<string, string> = {
  LEHKA: "#22c55e", STREDNI: "#f59e0b", TEZKA: "#ef4444",
};
const NARC_DOTS: Record<string, number> = { LEHKA: 1, STREDNI: 2, TEZKA: 3 };
const NARC_LABELS: Record<string, string> = {
  LEHKA: "Lehká", STREDNI: "Střední", TEZKA: "Těžká",
};

interface Props {
  brozura: BrozuraWithZastavky;
}

export function BrozuraTiskView({ brozura: b }: Props) {
  const qrRef = useRef<HTMLCanvasElement>(null);
  const fmm = FORMAT_MM[b.format] || FORMAT_MM.A4;
  const isLandscape = b.orientace === "LANDSCAPE";
  const mmW = isLandscape ? fmm.h : fmm.w;
  const mmH = isLandscape ? fmm.w : fmm.h;

  const gpxOrWeb = (b as any).gpxUrl || b.web;
  const qrUrl = gpxOrWeb?.startsWith("/")
    ? `https://usimaka.cz${gpxOrWeb}`
    : gpxOrWeb;

  useEffect(() => {
    if (qrRef.current && qrUrl) {
      QRCode.toCanvas(qrRef.current, qrUrl, {
        width: 120, margin: 1,
        color: { dark: (b as any).barvaAkcentu, light: (b as any).barvaPozadi },
      }).catch(() => {});
    }
  }, [qrUrl]);

  const isCyklo = b.layout === "CYKLOTRASA";

  return (
    <>
      {/* Print CSS — nastavuje přesný formát stránky */}
      <style dangerouslySetInnerHTML={{ __html: `
        * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        html, body { background: white; }
        @page {
          size: ${mmW}mm ${mmH}mm;
          margin: 0;
        }
        .page {
          width: ${mmW}mm;
          height: ${mmH}mm;
          overflow: hidden;
          position: relative;
          page-break-after: always;
        }
        @media print {
          html, body { width: ${mmW}mm; height: ${mmH}mm; }
        }
      `}} />

      {isCyklo ? (
        <>
          <CykloStranaA b={b} mmW={mmW} mmH={mmH} qrRef={qrRef} />
          <CykloStranaB b={b} mmW={mmW} mmH={mmH} />
        </>
      ) : (
        <StandardLayout b={b} mmW={mmW} mmH={mmH} qrRef={qrRef} />
      )}
    </>
  );
}

// ─── Standard layouts ─────────────────────────────────────────────────────────

function StandardLayout({ b, mmW, mmH, qrRef }: {
  b: BrozuraWithZastavky; mmW: number; mmH: number;
  qrRef: React.RefObject<HTMLCanvasElement | null>;
}) {
  const bg = (b as any).barvaPozadi || "#1c1008";
  const txt = (b as any).barvaText || "#fdf6e3";
  const acc = (b as any).barvaAkcentu || "#c9a547";
  const zobrazitLogo = (b as any).zobrazitLogo ?? true;
  const zobrazitPaticku = (b as any).zobrazitPaticku ?? true;
  const layout = b.layout || "KLASICKY";

  // Všechny standardní layouty sdílejí stejnou základní strukturu
  // jako v BrozuraNahled.tsx — zde je HTML verze
  const isLight = (b as any).tema === "SVETLE" || (b as any).tema === "BILA";
  const footerH = zobrazitPaticku ? "28px" : "0";

  return (
    <div className="page" style={{ background: bg, fontFamily: "Georgia, serif", color: txt }}>

      {/* Dekorativní rámečky pro klasický layout */}
      {layout === "KLASICKY" && (
        <>
          <div style={{ position: "absolute", inset: "6px", border: `0.5px solid ${acc}`, opacity: 0.35, pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: "10px", border: `0.3px solid ${acc}`, opacity: 0.15, pointerEvents: "none" }} />
        </>
      )}

      {/* Horní pruh pro Minima */}
      {(layout === "MINIMA" || layout === "MIKROMINIMA") && (
        <div style={{ height: "3px", background: acc }} />
      )}

      {/* Logo */}
      {zobrazitLogo && (
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "10px", paddingBottom: "4px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.webp" alt="Logo" style={{ height: "18mm", objectFit: "contain" }} />
        </div>
      )}

      {/* Hlavní obsah */}
      <div style={{
        position: "absolute",
        top: zobrazitLogo ? "28mm" : "8mm",
        left: "10mm", right: "10mm",
        bottom: zobrazitPaticku ? "12mm" : "8mm",
        display: "flex", flexDirection: "column",
        alignItems: layout === "KLASICKY" ? "center" : "flex-start",
      }}>

        {/* Hotel jméno */}
        <div style={{ color: acc, fontSize: "2.5mm", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "3mm", opacity: 0.9 }}>
          Hotel U Šimáka
        </div>

        {/* Foto */}
        {b.fotoUrl && (
          <div style={{ width: "100%", height: "35mm", overflow: "hidden", borderRadius: "1mm", marginBottom: "4mm", flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={b.fotoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }} />
          </div>
        )}

        {/* Nadpis */}
        <div style={{ color: txt, fontSize: "8mm", fontWeight: 700, lineHeight: 1.2, marginBottom: "3mm", textAlign: layout === "KLASICKY" ? "center" : "left" }}>
          {b.nadpis}
        </div>

        {b.podnadpis && (
          <div style={{ color: txt, fontSize: "3.5mm", fontStyle: "italic", opacity: 0.75, marginBottom: "4mm" }}>
            {b.podnadpis}
          </div>
        )}

        {/* Oddělovač */}
        <div style={{ display: "flex", alignItems: "center", gap: "3mm", marginBottom: "4mm", alignSelf: "center" }}>
          <div style={{ width: "15mm", height: "0.3mm", background: acc, opacity: 0.5 }} />
          <div style={{ width: "2mm", height: "2mm", borderRadius: "50%", background: acc, opacity: 0.7 }} />
          <div style={{ width: "15mm", height: "0.3mm", background: acc, opacity: 0.5 }} />
        </div>

        {b.popis && (
          <div style={{ color: txt, fontSize: "3mm", opacity: 0.72, lineHeight: 1.6, marginBottom: "5mm", textAlign: layout === "KLASICKY" ? "center" : "left" }}>
            {b.popis}
          </div>
        )}

        <div style={{ flex: 1 }} />

        {/* Info */}
        <InfoGrid b={b} txt={txt} />

        {/* QR */}
        {qrRef && (
          <div style={{ display: "flex", alignItems: "center", gap: "3mm", marginTop: "3mm" }}>
            <canvas ref={qrRef} style={{ width: "15mm", height: "15mm" }} />
            <div>
              <div style={{ color: acc, fontSize: "2mm", textTransform: "uppercase", letterSpacing: "0.1em" }}>Více informací</div>
              {b.web && <div style={{ color: txt, fontSize: "2mm", opacity: 0.55 }}>{b.web}</div>}
            </div>
          </div>
        )}
      </div>

      {/* Patička */}
      {zobrazitPaticku && <PrintFooter acc={acc} txt={txt} />}
    </div>
  );
}

// ─── Cyklotrasa Strana A ──────────────────────────────────────────────────────

function CykloStranaA({ b, mmW, mmH, qrRef }: {
  b: BrozuraWithZastavky; mmW: number; mmH: number;
  qrRef: React.RefObject<HTMLCanvasElement | null>;
}) {
  const bg = (b as any).barvaPozadi || "#fdf6e3";
  const txt = (b as any).barvaText || "#1c1008";
  const acc = (b as any).barvaAkcentu || "#c9a547";
  const zobrazitLogo = (b as any).zobrazitLogo ?? true;
  const zobrazitPaticku = (b as any).zobrazitPaticku ?? true;
  const narc = (b as any).trasaNarocnost || "";
  const narcColor = NARC_COLORS[narc] || acc;
  const narcDots = NARC_DOTS[narc] || 0;
  const narcLabel = NARC_LABELS[narc] || "";

  return (
    <div className="page" style={{ background: bg, fontFamily: "Georgia, serif", color: txt, display: "flex", flexDirection: "column" }}>
      {/* Horní pruh */}
      <div style={{ height: "1.5mm", background: acc, flexShrink: 0 }} />

      {/* Logo */}
      {zobrazitLogo && (
        <div style={{ display: "flex", justifyContent: "center", paddingTop: "4mm", paddingBottom: "3mm", flexShrink: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.webp" alt="Logo" style={{ height: "15mm", objectFit: "contain" }} />
        </div>
      )}

      {/* Obsah */}
      <div style={{ flex: 1, paddingLeft: "8mm", paddingRight: "8mm", paddingBottom: zobrazitPaticku ? "12mm" : "5mm", display: "flex", flexDirection: "column", minHeight: 0 }}>

        {/* Série + název */}
        <div style={{ marginBottom: "4mm" }}>
          {(b as any).trasaCislo != null && (
            <div style={{ color: acc, fontSize: "2.2mm", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "1.5mm", opacity: 0.9 }}>
              Cyklotrasa č. {(b as any).trasaCislo}
            </div>
          )}
          <div style={{ color: txt, fontSize: "7mm", fontWeight: 700, lineHeight: 1.1 }}>{b.nadpis}</div>
          {b.podnadpis && (
            <div style={{ color: txt, fontSize: "2.8mm", fontStyle: "italic", opacity: 0.68, marginTop: "1mm" }}>{b.podnadpis}</div>
          )}
        </div>

        {/* Miniatura mapy */}
        {(b as any).mapaMiniUrl && (
          <div style={{ width: "100%", height: `${mmH * 0.24}mm`, overflow: "hidden", border: `0.3mm solid ${acc}`, marginBottom: "4mm", flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={(b as any).mapaMiniUrl} alt="Mapa" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}

        {/* Stats boxy */}
        <div style={{ display: "flex", gap: "2mm", marginBottom: "4mm", flexShrink: 0 }}>
          {(b as any).trasaKm != null && (
            <StatBox icon="🚴" value={`${(b as any).trasaKm} km`} label="Délka" acc={acc} txt={txt} />
          )}
          {(b as any).trasaPrevyseni != null && (
            <StatBox icon="⛰" value={`${(b as any).trasaPrevyseni} m`} label="Převýšení" acc={acc} txt={txt} />
          )}
          {narc && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: `0.3mm solid ${acc}`, padding: "2mm 1mm" }}>
              <span style={{ fontSize: "4mm", marginBottom: "1mm" }}>💪</span>
              <div style={{ display: "flex", gap: "1mm", marginBottom: "1mm" }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ width: "2mm", height: "2mm", borderRadius: "50%", background: i <= narcDots ? narcColor : "rgba(128,128,128,0.2)" }} />
                ))}
              </div>
              <div style={{ fontSize: "2mm", color: narcColor, fontWeight: 700 }}>{narcLabel}</div>
              <div style={{ fontSize: "1.8mm", color: txt, opacity: 0.5, textTransform: "uppercase", marginTop: "0.5mm" }}>Náročnost</div>
            </div>
          )}
        </div>

        {/* Povrch + typ */}
        {((b as any).trasaPovrch || (b as any).trasaTyp) && (
          <div style={{ display: "flex", gap: "5mm", marginBottom: "3mm", fontSize: "2.5mm", color: txt, opacity: 0.7 }}>
            {(b as any).trasaPovrch && <span>🛤 {(b as any).trasaPovrch}</span>}
            {(b as any).trasaTyp && <span>🔄 {(b as any).trasaTyp}</span>}
          </div>
        )}

        {/* Popis */}
        {b.popis && (
          <div style={{ fontSize: "2.5mm", color: txt, opacity: 0.72, lineHeight: 1.55, marginBottom: "3mm" }}>{b.popis}</div>
        )}

        <div style={{ flex: 1 }} />

        {/* QR box */}
        <div style={{ display: "flex", alignItems: "center", gap: "3mm", border: `0.3mm solid ${acc}`, padding: "3mm", background: acc + "12", flexShrink: 0 }}>
          <canvas ref={qrRef} style={{ width: "15mm", height: "15mm", flexShrink: 0 }} />
          <div>
            <div style={{ color: acc, fontWeight: 700, fontSize: "2.5mm", marginBottom: "1mm" }}>Načti trasu do mobilu</div>
            <div style={{ color: txt, fontSize: "2mm", opacity: 0.55 }}>usimaka.cz/api/trasa/{(b as any).trasaCislo}</div>
          </div>
        </div>
      </div>

      {zobrazitPaticku && <PrintFooter acc={acc} txt={txt} />}
    </div>
  );
}

// ─── Cyklotrasa Strana B ──────────────────────────────────────────────────────

function CykloStranaB({ b, mmW, mmH }: {
  b: BrozuraWithZastavky; mmW: number; mmH: number;
}) {
  const bg = (b as any).barvaPozadi || "#fdf6e3";
  const txt = (b as any).barvaText || "#1c1008";
  const acc = (b as any).barvaAkcentu || "#c9a547";
  const zobrazitPaticku = (b as any).zobrazitPaticku ?? true;
  const zastavky = b.zastavky || [];

  return (
    <div className="page" style={{ background: bg, fontFamily: "Georgia, serif", color: txt, display: "flex", flexDirection: "column" }}>
      <div style={{ height: "1.5mm", background: acc, flexShrink: 0 }} />

      <div style={{ flex: 1, display: "flex", padding: "6mm", paddingBottom: zobrazitPaticku ? "14mm" : "6mm", gap: "5mm", minHeight: 0 }}>

        {/* Velká mapa */}
        {(b as any).mapaTrasyUrl && (
          <div style={{ width: "50%", flexShrink: 0, border: `0.3mm solid ${acc}`, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={(b as any).mapaTrasyUrl} alt="Mapa trasy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}

        {/* Zastávky */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ color: acc, fontSize: "2.2mm", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "4mm", fontWeight: 700 }}>
            Zastávky na trase
          </div>

          {zastavky.length === 0 && (
            <div style={{ color: txt, fontSize: "2.5mm", opacity: 0.4, fontStyle: "italic" }}>Zastávky budou doplněny…</div>
          )}

          {zastavky.slice(0, 8).map((z, i) => (
            <div key={z.id} style={{ display: "flex", gap: "2mm", marginBottom: "3mm" }}>
              <div style={{ width: "5mm", height: "5mm", borderRadius: "50%", background: acc, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.3mm" }}>
                <span style={{ color: bg, fontSize: "2.2mm", fontWeight: 700 }}>{i + 1}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "2.8mm", fontWeight: 700, color: txt, lineHeight: 1.2 }}>{z.nazev}</div>
                {z.popis && (
                  <div style={{ fontSize: "2.3mm", color: txt, opacity: 0.62, lineHeight: 1.5, marginTop: "0.5mm" }}>
                    {z.popis.length > 120 ? z.popis.slice(0, 120) + "…" : z.popis}
                  </div>
                )}
              </div>
            </div>
          ))}

          <div style={{ flex: 1 }} />

          {/* Hotel promo */}
          <div style={{ borderTop: `0.3mm solid ${acc}`, paddingTop: "3mm" }}>
            <div style={{ fontSize: "2.2mm", color: acc, fontWeight: 700, marginBottom: "1mm" }}>Ubytování na trase</div>
            <div style={{ fontSize: "2mm", color: txt, opacity: 0.7, marginBottom: "0.5mm" }}>Hotel a Restaurace U Šimáka</div>
            <div style={{ fontSize: "1.8mm", color: txt, opacity: 0.5 }}>Radostín 95 · 728 490 498</div>
          </div>
        </div>
      </div>

      {zobrazitPaticku && <PrintFooter acc={acc} txt={txt} />}
    </div>
  );
}

// ─── Sdílené sub-komponenty ───────────────────────────────────────────────────

function StatBox({ icon, value, label, acc, txt }: { icon: string; value: string; label: string; acc: string; txt: string }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: `0.3mm solid ${acc}`, padding: "2mm 1mm" }}>
      <span style={{ fontSize: "4mm", marginBottom: "1mm" }}>{icon}</span>
      <div style={{ fontSize: "3.5mm", fontWeight: 700, color: acc }}>{value}</div>
      <div style={{ fontSize: "1.8mm", color: txt, opacity: 0.5, textTransform: "uppercase", marginTop: "0.5mm", letterSpacing: "0.05em" }}>{label}</div>
    </div>
  );
}

function InfoGrid({ b, txt }: { b: BrozuraWithZastavky; txt: string }) {
  const items = [
    { icon: "📅", val: b.datum },
    { icon: "🕐", val: b.cas },
    { icon: "📍", val: b.misto },
    { icon: "🎟", val: b.cena },
    { icon: "📞", val: b.kontakt },
  ].filter(i => i.val);

  if (!items.length) return null;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "2mm", marginBottom: "2mm" }}>
      {items.map(({ icon, val }) => (
        <div key={val} style={{ display: "flex", alignItems: "center", gap: "1mm", minWidth: "42%" }}>
          <span style={{ fontSize: "3mm" }}>{icon}</span>
          <span style={{ color: txt, fontSize: "2.5mm", opacity: 0.82 }}>{val}</span>
        </div>
      ))}
    </div>
  );
}

function PrintFooter({ acc, txt }: { acc: string; txt: string }) {
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      borderTop: `0.3mm solid ${acc}`,
      background: "rgba(0,0,0,0.08)",
      padding: "2mm 6mm",
      display: "flex", alignItems: "center", gap: "5mm",
    }}>
      <span style={{ color: txt, fontSize: "1.8mm", opacity: 0.75 }}>📞 {HOTEL_INFO.phone}</span>
      <span style={{ color: txt, fontSize: "1.8mm", opacity: 0.75 }}>✉ {HOTEL_INFO.email}</span>
      <span style={{ color: txt, fontSize: "1.8mm", opacity: 0.75 }}>📍 {HOTEL_INFO.address}</span>
    </div>
  );
}
