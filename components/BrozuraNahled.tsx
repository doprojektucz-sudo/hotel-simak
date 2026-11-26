"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface BrozuraData {
  sablona: string;
  format: string;
  orientace: string;
  layout: string;
  tema: string;
  barvaPozadi: string;
  barvaText: string;
  barvaAkcentu: string;

  // Brand
  zobrazitLogo: boolean;
  zobrazitPaticku: boolean;

  // Content
  nadpis: string;
  podnadpis?: string;
  popis?: string;
  datum?: string;
  cas?: string;
  misto?: string;
  cena?: string;
  kontakt?: string;
  web?: string;
  fotoUrl?: string;
  mapUrl?: string;
}

// ─── Contact / brand constants ───────────────────────────────────────────────

export const HOTEL_INFO = {
  name: "Hotel a Restaurace U Šimáka",
  phone: "728 490 498",
  email: "hotresrad@seznam.cz",
  address: "Radostín 95, 591 01 Žďár nad Sázavou",
  facebook: "facebook.com/hotelsimak",
  instagram: "@hotel_u_simaka",
  logoPath: "/images/logo.webp",
};

// ─── Default themes ──────────────────────────────────────────────────────────

export const TEMA_TMAVE = {
  barvaPozadi: "#1c1008",
  barvaText: "#fdf6e3",
  barvaAkcentu: "#c9a547",
};

export const TEMA_SVETLE = {
  barvaPozadi: "#fdf6e3",
  barvaText: "#1c1008",
  barvaAkcentu: "#c9a547",
};

export const TEMA_MODRE = {
  barvaPozadi: "#0f1f35",
  barvaText: "#e8f0fe",
  barvaAkcentu: "#5b9bd5",
};

export const TEMA_ZELENE = {
  barvaPozadi: "#0d2018",
  barvaText: "#e8f5ec",
  barvaAkcentu: "#5aaa6f",
};

export const TEMA_BILA = {
  barvaPozadi: "#ffffff",
  barvaText: "#1a1a1a",
  barvaAkcentu: "#c9a547",
};

// ─── Dimensions ──────────────────────────────────────────────────────────────

const MM: Record<string, { w: number; h: number }> = {
  A3: { w: 297, h: 420 },
  A4: { w: 210, h: 297 },
  A5: { w: 148, h: 210 },
};

// Preview fits in 320px wide panel
const PREVIEW_W = 320;

// ─── Shared sub-components ────────────────────────────────────────────────────

export interface LayoutProps {
  data: BrozuraData;
  w: number;
  h: number;
  s: number; // px per mm
  qrRef: React.RefObject<HTMLCanvasElement | null>;
  logoRef: React.RefObject<HTMLImageElement | null>;
}

export function Logo({ s, acc, logoRef }: { s: number; acc: string; logoRef: React.RefObject<HTMLImageElement | null> }) {
  return (
    <div style={{
      position: "absolute", top: 8 * s, left: 0, right: 0,
      display: "flex", justifyContent: "center", zIndex: 10, pointerEvents: "none",
    }}>
      <img
        ref={logoRef}
        src={HOTEL_INFO.logoPath}
        alt="Hotel U Šimáka"
        style={{ height: 18 * s, width: "auto", objectFit: "contain", filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.5))" }}
        onError={(e) => {
          // Fallback text if logo fails
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
    </div>
  );
}

export function Footer({ data, s }: { data: BrozuraData; s: number }) {
  const { barvaText: txt, barvaAkcentu: acc } = data;
  const isDark = data.tema === "TMAVE" || data.tema === "MODRE" || data.tema === "ZELENE";
  const footerBg = isDark ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.06)";

  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      background: footerBg,
      borderTop: `${0.5 * s}px solid ${acc}`,
      opacity: 0.9,
      padding: `${3 * s}px ${8 * s}px`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: 3 * s, flexWrap: "wrap",
    }}>
      <span style={{ color: txt, fontSize: 2.4 * s, opacity: 0.75 }}>📞 {HOTEL_INFO.phone}</span>
      <span style={{ color: txt, fontSize: 2.4 * s, opacity: 0.75 }}>✉ {HOTEL_INFO.email}</span>
      <span style={{ color: txt, fontSize: 2.4 * s, opacity: 0.75 }}>📍 {HOTEL_INFO.address}</span>
    </div>
  );
}

export function GoldDivider({ s, acc, wide }: { s: number; acc: string; wide?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3 * s, marginBottom: 4 * s }}>
      <div style={{ width: (wide ? 30 : 18) * s, height: 0.4 * s, background: acc, opacity: 0.45 }} />
      <div style={{ width: 2.5 * s, height: 2.5 * s, borderRadius: "50%", background: acc, opacity: 0.65 }} />
      <div style={{ width: (wide ? 30 : 18) * s, height: 0.4 * s, background: acc, opacity: 0.45 }} />
    </div>
  );
}

export function InfoGrid({ data, s, compact }: { data: BrozuraData; s: number; compact?: boolean }) {
  const txt = data.barvaText;
  const items = [
    { icon: "📅", val: data.datum },
    { icon: "🕐", val: data.cas },
    { icon: "📍", val: data.misto },
    { icon: "🎟", val: data.cena },
    { icon: "📞", val: data.kontakt },
  ].filter(i => i.val);
  if (!items.length) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: compact ? 2 * s : 3 * s, marginBottom: 3 * s }}>
      {items.map(({ icon, val }) => (
        <div key={val} style={{ display: "flex", alignItems: "center", gap: 2 * s, minWidth: "42%" }}>
          <span style={{ fontSize: compact ? 3.2 * s : 3.8 * s }}>{icon}</span>
          <span style={{ color: txt, fontSize: compact ? 2.8 * s : 3.3 * s, opacity: 0.82 }}>{val}</span>
        </div>
      ))}
    </div>
  );
}

export function QRRow({ data, s, qrRef, compact }: { data: BrozuraData; s: number; qrRef: React.RefObject<HTMLCanvasElement | null>; compact?: boolean }) {
  if (!data.web) return null;
  const qrSz = compact ? 13 * s : 17 * s;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 * s }}>
      <canvas ref={qrRef} style={{ width: qrSz, height: qrSz, borderRadius: s }} />
      <div>
        <div style={{ color: data.barvaAkcentu, fontSize: 2.3 * s, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 1 * s }}>Více info</div>
        <div style={{ color: data.barvaText, fontSize: 2.2 * s, opacity: 0.5 }}>{data.web}</div>
      </div>
    </div>
  );
}

// ─── LAYOUTS ─────────────────────────────────────────────────────────────────

const SABLONA_LABELS: Record<string, string> = {
  AKCE: "Kulturní akce", ZVERINOVE_HODY: "Zvěřinové hody",
  UBYTOVANI: "Ubytování", RESTAURACE: "Restaurace", VSEOBECNE: "",
};

// 1. KLASICKY — centrovaný, zlaté rámečky, hotel styl
function LayoutKlasicky({ data, w, h, s, qrRef, logoRef }: LayoutProps) {
  const { barvaPozadi: bg, barvaText: txt, barvaAkcentu: acc } = data;
  const pad = 14 * s;
  const logoOffset = data.zobrazitLogo ? 22 * s : 0;
  const footerH = data.zobrazitPaticku ? 12 * s : 0;

  return (
    <div style={{ width: w, height: h, background: bg, position: "relative", fontFamily: "Georgia, serif", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 4 * s, border: `${0.5 * s}px solid ${acc}`, opacity: 0.35 }} />
      <div style={{ position: "absolute", inset: 6.5 * s, border: `${0.3 * s}px solid ${acc}`, opacity: 0.15 }} />

      {data.zobrazitLogo && <Logo s={s} acc={acc} logoRef={logoRef} />}

      <div style={{ position: "absolute", top: pad + logoOffset, left: pad, right: pad, bottom: pad + footerH, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ color: acc, fontSize: 3.5 * s, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 2.5 * s }}>Hotel U Šimáka</div>
        <div style={{ width: 25 * s, height: 0.4 * s, background: acc, opacity: 0.45, marginBottom: 5 * s }} />

        {data.fotoUrl && (
          <div style={{ width: "100%", height: h * 0.24, overflow: "hidden", borderRadius: s, marginBottom: 5 * s, flexShrink: 0 }}>
            <img src={data.fotoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
          </div>
        )}

        {SABLONA_LABELS[data.sablona] && (
          <div style={{ color: acc, fontSize: 3 * s, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.85, marginBottom: 3 * s }}>
            {SABLONA_LABELS[data.sablona]}
          </div>
        )}

        <div style={{ color: txt, fontSize: 8.5 * s, fontWeight: 700, textAlign: "center", lineHeight: 1.2, marginBottom: 3.5 * s }}>
          {data.nadpis || "Název akce"}
        </div>

        {data.podnadpis && (
          <div style={{ color: txt, fontSize: 4 * s, fontStyle: "italic", opacity: 0.78, textAlign: "center", marginBottom: 3.5 * s }}>
            {data.podnadpis}
          </div>
        )}

        <GoldDivider s={s} acc={acc} wide />

        {data.popis && (
          <div style={{ color: txt, fontSize: 3.2 * s, opacity: 0.72, textAlign: "center", lineHeight: 1.6, maxWidth: "85%", marginBottom: 4 * s }}>
            {data.popis}
          </div>
        )}

        <div style={{ flex: 1 }} />

        {data.mapUrl && (
          <div style={{ width: "100%", height: 16 * s, overflow: "hidden", borderRadius: s, marginBottom: 4 * s, flexShrink: 0 }}>
            <img src={data.mapUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}

        <InfoGrid data={data} s={s} compact />
        <QRRow data={data} s={s} qrRef={qrRef} compact />
      </div>

      {data.zobrazitPaticku && <Footer data={data} s={s} />}
    </div>
  );
}

// 2. MAGAZIN — hero foto nahoře s překryvem titulku
function LayoutMagazin({ data, w, h, s, qrRef, logoRef }: LayoutProps) {
  const { barvaPozadi: bg, barvaText: txt, barvaAkcentu: acc } = data;
  const pad = 10 * s;
  const heroH = h * 0.44;
  const footerH = data.zobrazitPaticku ? 12 * s : 0;

  return (
    <div style={{ width: w, height: h, background: bg, position: "relative", fontFamily: "Georgia, serif", overflow: "hidden" }}>
      {/* Hero */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: heroH }}>
        {data.fotoUrl
          ? <img src={data.fotoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${acc}22, ${acc}55)` }} />}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.75))" }} />

        {data.zobrazitLogo && <Logo s={s} acc={acc} logoRef={logoRef} />}

        <div style={{ position: "absolute", bottom: pad, left: pad, right: pad }}>
          <div style={{ color: acc, fontSize: 2.8 * s, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 2 * s }}>
            {SABLONA_LABELS[data.sablona] || "Hotel U Šimáka"}
          </div>
          <div style={{ color: "#fff", fontSize: 8.5 * s, fontWeight: 700, lineHeight: 1.15 }}>
            {data.nadpis || "Název akce"}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ position: "absolute", top: heroH, left: 0, right: 0, bottom: footerH, padding: pad, display: "flex", flexDirection: "column", gap: 3.5 * s }}>
        {data.podnadpis && <div style={{ color: txt, fontSize: 4 * s, fontStyle: "italic", opacity: 0.78 }}>{data.podnadpis}</div>}
        <div style={{ width: 18 * s, height: 1.5 * s, background: acc, borderRadius: s }} />
        {data.popis && <div style={{ color: txt, fontSize: 3.2 * s, opacity: 0.72, lineHeight: 1.55 }}>{data.popis}</div>}
        <div style={{ flex: 1 }} />
        {data.mapUrl && (
          <div style={{ height: 14 * s, overflow: "hidden", borderRadius: s, flexShrink: 0 }}>
            <img src={data.mapUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}
        <InfoGrid data={data} s={s} compact />
        <QRRow data={data} s={s} qrRef={qrRef} compact />
      </div>

      {data.zobrazitPaticku && <Footer data={data} s={s} />}
    </div>
  );
}

// 3. MINIMA — velká typografie, čistý moderní
function LayoutMinima({ data, w, h, s, qrRef, logoRef }: LayoutProps) {
  const { barvaPozadi: bg, barvaText: txt, barvaAkcentu: acc } = data;
  const pad = 14 * s;
  const logoOffset = data.zobrazitLogo ? 20 * s : 0;
  const footerH = data.zobrazitPaticku ? 12 * s : 0;

  return (
    <div style={{ width: w, height: h, background: bg, fontFamily: "'Arial', sans-serif", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 3 * s, background: acc }} />
      <div style={{ flex: 1, padding: pad, paddingTop: pad + logoOffset, display: "flex", flexDirection: "column" }}>
        {data.zobrazitLogo && <Logo s={s} acc={acc} logoRef={logoRef} />}
        <div style={{ color: acc, fontSize: 2.8 * s, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 * s, fontWeight: 700 }}>Hotel U Šimáka</div>
        <div style={{ color: txt, fontSize: 9.5 * s, fontWeight: 900, lineHeight: 1.1, marginBottom: 3.5 * s, letterSpacing: "-0.02em" }}>{data.nadpis || "Název akce"}</div>
        {data.podnadpis && <div style={{ color: acc, fontSize: 3.8 * s, fontWeight: 700, marginBottom: 5 * s, textTransform: "uppercase", letterSpacing: "0.1em" }}>{data.podnadpis}</div>}
        {data.popis && <div style={{ color: txt, fontSize: 3.2 * s, opacity: 0.7, lineHeight: 1.6, maxWidth: "80%", marginBottom: 5 * s }}>{data.popis}</div>}
        <div style={{ flex: 1 }} />
        {data.fotoUrl && (
          <div style={{ height: h * 0.2, overflow: "hidden", marginBottom: 5 * s, flexShrink: 0 }}>
            <img src={data.fotoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />
          </div>
        )}
        {data.mapUrl && (
          <div style={{ height: 13 * s, overflow: "hidden", marginBottom: 3.5 * s, flexShrink: 0 }}>
            <img src={data.mapUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
          </div>
        )}
        <InfoGrid data={data} s={s} compact />
        <QRRow data={data} s={s} qrRef={qrRef} compact />
      </div>
      {data.zobrazitPaticku
        ? <Footer data={data} s={s} />
        : <div style={{ height: 1.5 * s, background: acc, opacity: 0.4 }} />}
    </div>
  );
}

// 4. SIROKY — dvousloupcový (foto vlevo)
function LayoutSiroky({ data, w, h, s, qrRef, logoRef }: LayoutProps) {
  const { barvaPozadi: bg, barvaText: txt, barvaAkcentu: acc } = data;
  const pad = 12 * s;
  const footerH = data.zobrazitPaticku ? 12 * s : 0;

  return (
    <div style={{ width: w, height: h, background: bg, fontFamily: "Georgia, serif", overflow: "hidden", display: "flex" }}>
      {/* Left: photo */}
      <div style={{ width: w * 0.44, flexShrink: 0, position: "relative" }}>
        {data.fotoUrl
          ? <img src={data.fotoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <div style={{ width: "100%", height: "100%", background: `${acc}22` }} />}
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, transparent 60%, ${bg})` }} />
        {data.zobrazitLogo && (
          <div style={{ position: "absolute", top: 6 * s, left: 6 * s }}>
            <img src={HOTEL_INFO.logoPath} alt="" style={{ height: 14 * s, width: "auto", filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.6))" }} />
          </div>
        )}
      </div>

      {/* Right: content */}
      <div style={{ flex: 1, padding: pad, paddingBottom: pad + footerH, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ color: acc, fontSize: 2.8 * s, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 3.5 * s }}>{SABLONA_LABELS[data.sablona] || ""}</div>
          <div style={{ color: txt, fontSize: 8 * s, fontWeight: 700, lineHeight: 1.2, marginBottom: 3.5 * s }}>{data.nadpis || "Název akce"}</div>
          {data.podnadpis && <div style={{ color: txt, fontSize: 3.8 * s, fontStyle: "italic", opacity: 0.75, marginBottom: 4 * s }}>{data.podnadpis}</div>}
          <div style={{ width: 14 * s, height: 1.2 * s, background: acc, marginBottom: 4.5 * s }} />
          {data.popis && <div style={{ color: txt, fontSize: 3 * s, opacity: 0.72, lineHeight: 1.6 }}>{data.popis}</div>}
        </div>
        <div>
          {data.mapUrl && (
            <div style={{ height: 16 * s, overflow: "hidden", borderRadius: s, marginBottom: 4 * s }}>
              <img src={data.mapUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          )}
          <InfoGrid data={data} s={s} compact />
          <QRRow data={data} s={s} qrRef={qrRef} compact />
        </div>
      </div>

      {data.zobrazitPaticku && <Footer data={data} s={s} />}
    </div>
  );
}

// 5. VINTAGE — tmavé s ornamenty, tiskový styl plakátu
function LayoutVintage({ data, w, h, s, qrRef, logoRef }: LayoutProps) {
  const { barvaPozadi: bg, barvaText: txt, barvaAkcentu: acc } = data;
  const pad = 12 * s;
  const footerH = data.zobrazitPaticku ? 12 * s : 0;

  return (
    <div style={{ width: w, height: h, background: bg, fontFamily: "Georgia, serif", overflow: "hidden", position: "relative" }}>
      {/* Corner ornaments */}
      {[["0","0","rotate(0deg)"],["auto","0","rotate(90deg)"],["0","auto","rotate(-90deg)"],["auto","auto","rotate(180deg)"]].map(([t,r,rot], i) => (
        <div key={i} style={{ position: "absolute", top: t !== "auto" ? 5 * s : undefined, bottom: t === "auto" ? 5 * s : undefined, left: r !== "auto" ? 5 * s : undefined, right: r === "auto" ? 5 * s : undefined, width: 12 * s, height: 12 * s, opacity: 0.5, transform: rot as string }}>
          <svg width="100%" height="100%" viewBox="0 0 20 20"><path d="M0 0 L8 0 L8 2 L2 2 L2 8 L0 8 Z" fill={acc} /></svg>
        </div>
      ))}

      <div style={{ position: "absolute", inset: 10 * s, border: `${0.5 * s}px solid ${acc}`, opacity: 0.25 }} />

      {data.zobrazitLogo && <Logo s={s} acc={acc} logoRef={logoRef} />}

      <div style={{ position: "absolute", inset: pad, top: (data.zobrazitLogo ? 24 : 14) * s, bottom: pad + footerH, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>

        <div style={{ textAlign: "center", width: "100%" }}>
          {SABLONA_LABELS[data.sablona] && (
            <div style={{ color: acc, fontSize: 3 * s, letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.9, marginBottom: 3 * s }}>
              — {SABLONA_LABELS[data.sablona]} —
            </div>
          )}
          <div style={{ color: txt, fontSize: 9 * s, fontWeight: 700, lineHeight: 1.1, marginBottom: 3 * s }}>
            {data.nadpis || "Název akce"}
          </div>
          {data.podnadpis && (
            <div style={{ color: acc, fontSize: 4 * s, fontStyle: "italic", marginBottom: 3 * s }}>
              {data.podnadpis}
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 * s, margin: `${2 * s}px 0` }}>
            {[...Array(5)].map((_, i) => <div key={i} style={{ width: i === 2 ? 3 * s : 1.5 * s, height: 1.5 * s, background: acc, opacity: i === 2 ? 0.8 : 0.4 }} />)}
          </div>
        </div>

        {data.fotoUrl && (
          <div style={{ width: "88%", height: h * 0.25, overflow: "hidden", flexShrink: 0 }}>
            <img src={data.fotoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85, filter: "sepia(15%)" }} />
          </div>
        )}

        {data.popis && (
          <div style={{ color: txt, fontSize: 3.2 * s, opacity: 0.72, textAlign: "center", lineHeight: 1.6, maxWidth: "82%" }}>
            {data.popis}
          </div>
        )}

        <div style={{ width: "100%" }}>
          {data.mapUrl && (
            <div style={{ height: 14 * s, overflow: "hidden", marginBottom: 4 * s, flexShrink: 0 }}>
              <img src={data.mapUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          )}
          <InfoGrid data={data} s={s} compact />
          <QRRow data={data} s={s} qrRef={qrRef} compact />
        </div>
      </div>

      {data.zobrazitPaticku && <Footer data={data} s={s} />}
    </div>
  );
}

// 6. SVETLY_CARD — světlé s barevným akcentovým pruhem
function LayoutSvetlyCard({ data, w, h, s, qrRef, logoRef }: LayoutProps) {
  const { barvaPozadi: bg, barvaText: txt, barvaAkcentu: acc } = data;
  const pad = 12 * s;
  const accentH = h * 0.38;
  const footerH = data.zobrazitPaticku ? 12 * s : 0;

  return (
    <div style={{ width: w, height: h, background: bg, fontFamily: "'Arial', sans-serif", overflow: "hidden", position: "relative" }}>
      {/* Top accent block */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: accentH, background: acc }} />

      {/* Photo inside accent */}
      {data.fotoUrl && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: accentH }}>
          <img src={data.fotoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.35, mixBlendMode: "multiply" }} />
        </div>
      )}

      {data.zobrazitLogo && (
        <div style={{ position: "absolute", top: 8 * s, left: pad, zIndex: 10 }}>
          <img src={HOTEL_INFO.logoPath} alt="" style={{ height: 14 * s, width: "auto", filter: "brightness(0) invert(1) drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }} />
        </div>
      )}

      {/* Title in accent area */}
      <div style={{ position: "absolute", top: accentH * 0.35, left: pad, right: pad, zIndex: 5 }}>
        {SABLONA_LABELS[data.sablona] && (
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 2.8 * s, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 2 * s }}>
            {SABLONA_LABELS[data.sablona]}
          </div>
        )}
        <div style={{ color: "#fff", fontSize: 8.5 * s, fontWeight: 800, lineHeight: 1.15, textShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
          {data.nadpis || "Název akce"}
        </div>
      </div>

      {/* Content */}
      <div style={{ position: "absolute", top: accentH + 6 * s, left: pad, right: pad, bottom: pad + footerH, display: "flex", flexDirection: "column", gap: 3.5 * s }}>
        {data.podnadpis && <div style={{ color: acc, fontSize: 3.8 * s, fontWeight: 700 }}>{data.podnadpis}</div>}
        {data.popis && <div style={{ color: txt, fontSize: 3.2 * s, opacity: 0.75, lineHeight: 1.6 }}>{data.popis}</div>}
        <div style={{ flex: 1 }} />
        {data.mapUrl && (
          <div style={{ height: 14 * s, overflow: "hidden", borderRadius: s, flexShrink: 0 }}>
            <img src={data.mapUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}
        <InfoGrid data={data} s={s} compact />
        <QRRow data={data} s={s} qrRef={qrRef} compact />
      </div>

      {data.zobrazitPaticku && <Footer data={data} s={s} />}
    </div>
  );
}

// 7. SPLIT — diagonální rozdělení
function LayoutSplit({ data, w, h, s, qrRef, logoRef }: LayoutProps) {
  const { barvaPozadi: bg, barvaText: txt, barvaAkcentu: acc } = data;
  const pad = 12 * s;
  const footerH = data.zobrazitPaticku ? 12 * s : 0;

  return (
    <div style={{ width: w, height: h, background: bg, fontFamily: "Georgia, serif", overflow: "hidden", position: "relative" }}>
      {/* Diagonal background split */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        background: `linear-gradient(135deg, ${acc}18 0%, ${acc}18 45%, transparent 45%)`,
      }} />

      {/* Photo top-right */}
      {data.fotoUrl && (
        <div style={{ position: "absolute", top: 0, right: 0, width: "55%", height: "45%", overflow: "hidden" }}>
          <img src={data.fotoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to left, transparent 50%, ${bg})` }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${bg} 0%, transparent 50%)` }} />
        </div>
      )}

      {data.zobrazitLogo && <Logo s={s} acc={acc} logoRef={logoRef} />}

      {/* Content */}
      <div style={{ position: "absolute", top: (data.zobrazitLogo ? 22 : 12) * s, left: pad, right: pad, bottom: pad + footerH, display: "flex", flexDirection: "column" }}>
        <div style={{ color: acc, fontSize: 3 * s, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 3 * s }}>{SABLONA_LABELS[data.sablona] || ""}</div>
        <div style={{ color: txt, fontSize: 9 * s, fontWeight: 700, lineHeight: 1.1, maxWidth: "65%", marginBottom: 3 * s }}>{data.nadpis || "Název akce"}</div>
        {data.podnadpis && <div style={{ color: txt, fontSize: 3.8 * s, fontStyle: "italic", opacity: 0.75, marginBottom: 3 * s }}>{data.podnadpis}</div>}
        <div style={{ width: 3 * s, height: 20 * s, background: acc, opacity: 0.5, marginBottom: 4 * s }} />
        {data.popis && <div style={{ color: txt, fontSize: 3.2 * s, opacity: 0.72, lineHeight: 1.6, maxWidth: "75%", marginBottom: 4 * s }}>{data.popis}</div>}
        <div style={{ flex: 1 }} />
        {data.mapUrl && (
          <div style={{ height: 14 * s, overflow: "hidden", borderRadius: s, marginBottom: 4 * s, flexShrink: 0 }}>
            <img src={data.mapUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}
        <InfoGrid data={data} s={s} compact />
        <QRRow data={data} s={s} qrRef={qrRef} compact />
      </div>

      {data.zobrazitPaticku && <Footer data={data} s={s} />}
    </div>
  );
}

// 8. MIKROMINIMA — ultra čistý, jen text, žádná fotka
function LayoutMikroMinima({ data, w, h, s, qrRef, logoRef }: LayoutProps) {
  const { barvaPozadi: bg, barvaText: txt, barvaAkcentu: acc } = data;
  const pad = 16 * s;
  const footerH = data.zobrazitPaticku ? 12 * s : 0;
  const logoOffset = data.zobrazitLogo ? 22 * s : 0;

  return (
    <div style={{ width: w, height: h, background: bg, fontFamily: "'Arial', sans-serif", overflow: "hidden", position: "relative" }}>
      {/* Vertical accent line */}
      <div style={{ position: "absolute", top: 0, left: 6 * s, width: 2 * s, height: "100%", background: acc, opacity: 0.25 }} />

      {data.zobrazitLogo && <Logo s={s} acc={acc} logoRef={logoRef} />}

      <div style={{ position: "absolute", top: pad + logoOffset, left: pad + 4 * s, right: pad, bottom: pad + footerH, display: "flex", flexDirection: "column" }}>
        <div style={{ color: acc, fontSize: 2.5 * s, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 4 * s, opacity: 0.8 }}>
          {SABLONA_LABELS[data.sablona] || "Hotel U Šimáka"}
        </div>

        <div style={{ color: txt, fontSize: 11 * s, fontWeight: 900, lineHeight: 0.95, marginBottom: 5 * s, letterSpacing: "-0.03em" }}>
          {data.nadpis || "Název akce"}
        </div>

        <div style={{ width: 25 * s, height: 0.5 * s, background: acc, marginBottom: 5 * s }} />

        {data.podnadpis && (
          <div style={{ color: acc, fontSize: 4 * s, fontWeight: 700, marginBottom: 4 * s }}>
            {data.podnadpis}
          </div>
        )}

        {data.popis && (
          <div style={{ color: txt, fontSize: 3.2 * s, opacity: 0.68, lineHeight: 1.7, maxWidth: "88%", marginBottom: 4 * s }}>
            {data.popis}
          </div>
        )}

        <div style={{ flex: 1 }} />

        {data.mapUrl && (
          <div style={{ height: 15 * s, overflow: "hidden", marginBottom: 4 * s, flexShrink: 0 }}>
            <img src={data.mapUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}

        {/* Compact info — horizontal list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 * s, marginBottom: 3 * s }}>
          {[
            { val: data.datum,   label: "Datum" },
            { val: data.cas,     label: "Čas" },
            { val: data.misto,   label: "Místo" },
            { val: data.cena,    label: "Vstupné" },
            { val: data.kontakt, label: "Kontakt" },
          ].filter(i => i.val).map(({ val, label }) => (
            <div key={label} style={{ display: "flex", gap: 3 * s }}>
              <div style={{ color: acc, fontSize: 2.8 * s, width: 16 * s, flexShrink: 0, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
              <div style={{ color: txt, fontSize: 2.8 * s, opacity: 0.82 }}>{val}</div>
            </div>
          ))}
        </div>

        <QRRow data={data} s={s} qrRef={qrRef} compact />
      </div>

      {data.zobrazitPaticku && <Footer data={data} s={s} />}
    </div>
  );
}

// ─── Layout map ───────────────────────────────────────────────────────────────

const LAYOUTS: Record<string, React.FC<LayoutProps>> = {
  KLASICKY:     LayoutKlasicky,
  MAGAZIN:      LayoutMagazin,
  MINIMA:       LayoutMinima,
  SIROKY:       LayoutSiroky,
  VINTAGE:      LayoutVintage,
  SVETLY_CARD:  LayoutSvetlyCard,
  SPLIT:        LayoutSplit,
  MIKROMINIMA:  LayoutMikroMinima,
};

// ─── Preview component ────────────────────────────────────────────────────────

interface BrozuraNahledProps {
  data: BrozuraData;
}

function PreviewInner({ data, targetW }: { data: BrozuraData; targetW: number }) {
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  const fmm = MM[data.format] || MM.A4;
  const isLandscape = data.orientace === "LANDSCAPE";
  const mmW = isLandscape ? fmm.h : fmm.w;
  const mmH = isLandscape ? fmm.w : fmm.h;
  const w = targetW;
  const h = Math.round((mmH / mmW) * w);
  const s = w / mmW;

  useEffect(() => {
    const canvas = qrCanvasRef.current;
    if (!canvas) return;
    if (data.web) {
      QRCode.toCanvas(canvas, data.web, {
        width: Math.round(20 * s),
        margin: 1,
        color: { dark: data.barvaAkcentu, light: data.barvaPozadi },
      }).catch(() => {});
    } else {
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [data.web, data.barvaAkcentu, data.barvaPozadi, s]);

  const LayoutComp = LAYOUTS[data.layout] || LayoutKlasicky;

  return (
    <div style={{ width: w, height: h, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}>
      <LayoutComp data={data} w={w} h={h} s={s} qrRef={qrCanvasRef} logoRef={logoRef} />
    </div>
  );
}

export function BrozuraNahled({ data }: BrozuraNahledProps) {
  const [zoomed, setZoomed] = useState(false);

  const fmm = MM[data.format] || MM.A4;
  const isLandscape = data.orientace === "LANDSCAPE";
  const mmW = isLandscape ? fmm.h : fmm.w;
  const mmH = isLandscape ? fmm.w : fmm.h;
  const formatLabel = `${data.format} ${isLandscape ? "na šírku" : "na výšku"}`;

  // Zoom size: max 90vw / 88vh
  const zoomW = Math.min(900, typeof window !== "undefined" ? window.innerWidth * 0.88 : 900);
  const zoomH = Math.round((mmH / mmW) * zoomW);

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 w-full justify-between">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">
            Živý náhled — {formatLabel}
          </span>
          <button
            type="button"
            onClick={() => setZoomed(true)}
            className="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 border border-primary-200 rounded-lg px-2 py-1 hover:bg-primary-50 transition-colors"
            title="Zvětšit náhled"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            Zvětšit
          </button>
        </div>

        <PreviewInner data={data} targetW={PREVIEW_W} />

        <span className="text-xs text-gray-400">{data.layout || "Klasický"}</span>
      </div>

      {/* Zoom modal */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setZoomed(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <span className="text-white/70 text-sm">{formatLabel} — {data.layout}</span>
              <button
                onClick={() => setZoomed(false)}
                className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg p-1.5 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div style={{ maxHeight: "85vh", overflow: "auto" }}>
              <PreviewInner data={data} targetW={zoomW} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
