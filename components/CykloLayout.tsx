"use client";

// ─── Cyklotrasa layout — dvoustranná brožura ──────────────────────────────────
// Strana A: miniatura mapy, stats, QR kód
// Strana B: velká mapa trasy + číslované zastávky

import { useRef, useEffect, useState } from "react";
import QRCode from "qrcode";
import type { LayoutProps } from "@/components/BrozuraNahled";
import { Footer, Logo, HOTEL_INFO } from "@/components/BrozuraNahled";

export interface Zastavka {
  id?: string;
  poradi: number;
  nazev: string;
  popis?: string;
  gps?: string;
  fotoUrl?: string;
}

export interface CykloData {
  trasaKm?: number;
  trasaNarocnost?: string;   // LEHKA | STREDNI | TEZKA
  trasaPrevyseni?: number;
  trasaPovrch?: string;
  trasaTyp?: string;
  trasaCislo?: number;
  gpxUrl?: string;
  mapaTrasyUrl?: string;     // velká mapa pro stranu B
  mapaMiniUrl?: string;      // miniatura okruhu pro stranu A
  zastavky?: Zastavka[];
}

const NAROCNOST_LABELS: Record<string, { label: string; color: string; dots: number }> = {
  LEHKA:   { label: "Lehká",   color: "#22c55e", dots: 1 },
  STREDNI: { label: "Střední", color: "#f59e0b", dots: 2 },
  TEZKA:   { label: "Těžká",   color: "#ef4444", dots: 3 },
};

function NarocnostBadge({ narocnost, s, acc }: { narocnost: string; s: number; acc: string }) {
  const info = NAROCNOST_LABELS[narocnost] || NAROCNOST_LABELS.STREDNI;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2 * s }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{
          width: 3 * s, height: 3 * s, borderRadius: "50%",
          background: i <= info.dots ? info.color : "rgba(255,255,255,0.2)",
        }} />
      ))}
      <span style={{ fontSize: 3 * s, color: info.color, fontWeight: 700, marginLeft: s }}>{info.label}</span>
    </div>
  );
}

function StatBox({ icon, value, label, s, txt, acc }: {
  icon: string; value: string; label: string; s: number; txt: string; acc: string;
}) {
  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
      padding: `${3 * s}px ${2 * s}px`,
      background: "rgba(255,255,255,0.06)",
      borderRadius: 1.5 * s,
      border: `${0.5 * s}px solid rgba(255,255,255,0.1)`,
    }}>
      <div style={{ fontSize: 5 * s, marginBottom: 1.5 * s }}>{icon}</div>
      <div style={{ fontSize: 5.5 * s, fontWeight: 900, color: acc, lineHeight: 1, marginBottom: 1 * s }}>{value}</div>
      <div style={{ fontSize: 2.5 * s, color: txt, opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>
    </div>
  );
}

// ─── Strana A — přední ───────────────────────────────────────────────────────

export function CykloStranaA({ data, cyklo, w, h, s, qrRef, logoRef }: LayoutProps & { cyklo: CykloData }) {
  const { barvaPozadi: bg, barvaText: txt, barvaAkcentu: acc } = data;
  const footerH = data.zobrazitPaticku ? 12 * s : 0;
  const logoH = data.zobrazitLogo ? 20 * s : 0;
  const pad = 12 * s;

  return (
    <div style={{ width: w, height: h, background: bg, fontFamily: "Georgia, serif", overflow: "hidden", position: "relative" }}>
      {/* Decorative top band */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2 * s, background: acc }} />

      {data.zobrazitLogo && <Logo s={s} acc={acc} logoRef={logoRef} />}

      <div style={{
        position: "absolute",
        top: pad + logoH,
        left: pad, right: pad,
        bottom: pad + footerH,
        display: "flex", flexDirection: "column", gap: 4 * s,
      }}>

        {/* Header: série + název */}
        <div>
          {cyklo.trasaCislo && (
            <div style={{ color: acc, fontSize: 2.8 * s, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 1.5 * s, opacity: 0.85 }}>
              Cyklotrasa č. {cyklo.trasaCislo}
            </div>
          )}
          <div style={{ color: txt, fontSize: 8 * s, fontWeight: 700, lineHeight: 1.15 }}>
            {data.nadpis || "Název trasy"}
          </div>
          {data.podnadpis && (
            <div style={{ color: txt, fontSize: 3.5 * s, fontStyle: "italic", opacity: 0.7, marginTop: 1.5 * s }}>
              {data.podnadpis}
            </div>
          )}
        </div>

        {/* Mini mapa okruhu */}
        {cyklo.mapaMiniUrl ? (
          <div style={{
            width: "100%", flex: "0 0 auto",
            height: h * 0.3,
            borderRadius: 2 * s, overflow: "hidden",
            border: `${0.5 * s}px solid ${acc}`,
            opacity: 0.95,
            position: "relative",
          }}>
            <img src={cyklo.mapaMiniUrl} alt="Mapa okruhu" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            {/* Compass */}
            <div style={{
              position: "absolute", top: 2 * s, right: 2 * s,
              background: "rgba(0,0,0,0.6)", borderRadius: "50%",
              width: 8 * s, height: 8 * s,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 4 * s, fontWeight: 900,
            }}>N</div>
          </div>
        ) : (
          <div style={{
            height: h * 0.28, borderRadius: 2 * s,
            border: `${0.5 * s}px dashed ${acc}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: 0.4,
          }}>
            <span style={{ color: txt, fontSize: 3.5 * s }}>🗺 Mapa okruhu</span>
          </div>
        )}

        {/* Stats grid */}
        <div style={{ display: "flex", gap: 2.5 * s }}>
          {cyklo.trasaKm && (
            <StatBox icon="🚴" value={`${cyklo.trasaKm} km`} label="Délka" s={s} txt={txt} acc={acc} />
          )}
          {cyklo.trasaPrevyseni && (
            <StatBox icon="⛰" value={`${cyklo.trasaPrevyseni} m`} label="Převýšení" s={s} txt={txt} acc={acc} />
          )}
          {cyklo.trasaNarocnost && (
            <div style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
              padding: `${3 * s}px ${2 * s}px`,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 1.5 * s,
              border: `${0.5 * s}px solid rgba(255,255,255,0.1)`,
              gap: 2 * s,
            }}>
              <div style={{ fontSize: 5 * s }}>💪</div>
              <NarocnostBadge narocnost={cyklo.trasaNarocnost} s={s} acc={acc} />
              <div style={{ fontSize: 2.5 * s, color: txt, opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.1em" }}>Náročnost</div>
            </div>
          )}
        </div>

        {/* Extra info */}
        <div style={{ display: "flex", gap: 6 * s }}>
          {cyklo.trasaPovrch && (
            <div style={{ display: "flex", alignItems: "center", gap: 2 * s }}>
              <span style={{ fontSize: 3.5 * s }}>🛤</span>
              <span style={{ color: txt, fontSize: 3 * s, opacity: 0.75 }}>{cyklo.trasaPovrch}</span>
            </div>
          )}
          {cyklo.trasaTyp && (
            <div style={{ display: "flex", alignItems: "center", gap: 2 * s }}>
              <span style={{ fontSize: 3.5 * s }}>🔄</span>
              <span style={{ color: txt, fontSize: 3 * s, opacity: 0.75 }}>{cyklo.trasaTyp}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {data.popis && (
          <div style={{ color: txt, fontSize: 3 * s, opacity: 0.72, lineHeight: 1.6 }}>
            {data.popis}
          </div>
        )}

        <div style={{ flex: 1 }} />

        {/* QR kód + výzva */}
        {data.web || cyklo.gpxUrl ? (
          <div style={{
            display: "flex", alignItems: "center", gap: 5 * s,
            padding: `${4 * s}px`,
            background: `${acc}18`,
            borderRadius: 2 * s,
            border: `${0.5 * s}px solid ${acc}33`,
          }}>
            <canvas ref={qrRef} style={{ width: 18 * s, height: 18 * s, borderRadius: s, flexShrink: 0 }} />
            <div>
              <div style={{ color: acc, fontSize: 3 * s, fontWeight: 700, marginBottom: 1.5 * s }}>
                Načti trasu do mobilu
              </div>
              <div style={{ color: txt, fontSize: 2.5 * s, opacity: 0.6 }}>
                {(cyklo.gpxUrl || data.web || "").startsWith("/")
                  ? `usimaka.cz${cyklo.gpxUrl || data.web}`
                  : (cyklo.gpxUrl || data.web)}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {data.zobrazitPaticku && <Footer data={data} s={s} />}
    </div>
  );
}

// ─── Strana B — zadní ────────────────────────────────────────────────────────

export function CykloStranaB({ data, cyklo, w, h, s, logoRef }: LayoutProps & { cyklo: CykloData }) {
  const { barvaPozadi: bg, barvaText: txt, barvaAkcentu: acc } = data;
  const footerH = data.zobrazitPaticku ? 12 * s : 0;
  const pad = 10 * s;
  const zastavky = cyklo.zastavky || [];
  const hasMap = !!cyklo.mapaTrasyUrl;

  // Split: mapa vlevo, zastávky vpravo (nebo mapa nahoře + zastávky dole)
  const mapW = hasMap ? w * 0.52 : 0;

  return (
    <div style={{ width: w, height: h, background: bg, fontFamily: "'Arial', sans-serif", overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2 * s, background: acc }} />

      <div style={{
        position: "absolute",
        top: pad, left: pad, right: pad,
        bottom: pad + footerH,
        display: "flex", gap: 5 * s,
      }}>

        {/* Velká mapa trasy */}
        {hasMap && (
          <div style={{
            width: mapW - pad,
            flexShrink: 0,
            borderRadius: 2 * s,
            overflow: "hidden",
            border: `${0.5 * s}px solid ${acc}44`,
            position: "relative",
          }}>
            <img
              src={cyklo.mapaTrasyUrl}
              alt="Mapa trasy"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {/* Numbered markers overlay */}
            {zastavky.slice(0, 8).map((z, i) => (
              <div key={i} style={{
                position: "absolute",
                // Evenly distribute markers as visual hint (actual GPS not used in preview)
                top: `${15 + i * (65 / Math.max(zastavky.length, 1))}%`,
                left: `${20 + (i % 2) * 35}%`,
                width: 5 * s, height: 5 * s,
                borderRadius: "50%",
                background: acc,
                border: `${s}px solid #fff`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 2.5 * s, color: "#000", fontWeight: 900,
                boxShadow: "0 1px 4px rgba(0,0,0,0.5)",
              }}>
                {i + 1}
              </div>
            ))}
          </div>
        )}

        {/* Zastávky */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 0 }}>
          <div style={{ color: acc, fontSize: 3 * s, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 * s, fontWeight: 700 }}>
            Zastávky na trase
          </div>

          {zastavky.length === 0 && (
            <div style={{ color: txt, fontSize: 3 * s, opacity: 0.4, fontStyle: "italic" }}>
              Zastávky budou doplněny…
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 3 * s, overflow: "hidden" }}>
            {zastavky.slice(0, 8).map((z, i) => (
              <div key={i} style={{ display: "flex", gap: 3 * s, alignItems: "flex-start" }}>
                {/* Number badge */}
                <div style={{
                  width: 6 * s, height: 6 * s, borderRadius: "50%",
                  background: acc, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 3 * s, fontWeight: 900, color: bg,
                  marginTop: 0.5 * s,
                }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: txt, fontSize: 3.5 * s, fontWeight: 700, lineHeight: 1.2 }}>
                    {z.nazev}
                  </div>
                  {z.popis && (
                    <div style={{ color: txt, fontSize: 2.8 * s, opacity: 0.65, lineHeight: 1.5, marginTop: 0.8 * s }}>
                      {z.popis.length > 120 ? z.popis.slice(0, 120) + "…" : z.popis}
                    </div>
                  )}
                  {z.gps && (
                    <div style={{ color: acc, fontSize: 2.3 * s, opacity: 0.6, marginTop: 0.5 * s }}>
                      📍 {z.gps}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ flex: 1 }} />

          {/* Hotel promo na zadní straně */}
          <div style={{
            borderTop: `${0.5 * s}px solid ${acc}44`,
            paddingTop: 3 * s,
            display: "flex", alignItems: "center", gap: 3 * s,
          }}>
            <div style={{ fontSize: 3 * s }}>🏨</div>
            <div>
              <div style={{ color: acc, fontSize: 2.8 * s, fontWeight: 700 }}>Ubytování na trase</div>
              <div style={{ color: txt, fontSize: 2.5 * s, opacity: 0.65 }}>{HOTEL_INFO.name}</div>
              <div style={{ color: txt, fontSize: 2.3 * s, opacity: 0.5 }}>{HOTEL_INFO.address}</div>
            </div>
          </div>
        </div>
      </div>

      {data.zobrazitPaticku && <Footer data={data} s={s} />}
    </div>
  );
}

// ─── Preview wrapper — obě strany vedle sebe ─────────────────────────────────

interface CykloNahledProps {
  data: import("@/components/BrozuraNahled").BrozuraData;
  cyklo: CykloData;
  targetW?: number;
}

const MM: Record<string, { w: number; h: number }> = {
  A3: { w: 297, h: 420 }, A4: { w: 210, h: 297 }, A5: { w: 148, h: 210 },
};

export function CykloNahled({ data, cyklo, targetW = 300 }: CykloNahledProps) {
  const qrRefA = useRef<HTMLCanvasElement>(null);
  const qrRefZoom = useRef<HTMLCanvasElement>(null);
  const logoRefA = useRef<HTMLImageElement>(null);
  const logoRefB = useRef<HTMLImageElement>(null);
  const logoRefZoomA = useRef<HTMLImageElement>(null);
  const logoRefZoomB = useRef<HTMLImageElement>(null);
  const [activeStrana, setActiveStrana] = useState<"A" | "B">("A");
  const [zoomed, setZoomed] = useState(false);

  const fmm = MM[data.format] || MM.A4;
  const isLandscape = data.orientace === "LANDSCAPE";
  const mmW = isLandscape ? fmm.h : fmm.w;
  const mmH = isLandscape ? fmm.w : fmm.h;
  const w = targetW;
  const h = Math.round((mmH / mmW) * w);

  // Zoom dimensions
  const zoomW = typeof window !== "undefined" ? Math.min(860, window.innerWidth * 0.88) : 860;
  const zoomH = Math.round((mmH / mmW) * zoomW);

  function makeQR(canvas: HTMLCanvasElement | null, size: number) {
    if (!canvas) return;
    const gpxOrWeb = cyklo.gpxUrl || data.web;
    if (!gpxOrWeb) return;
    const qrUrl = gpxOrWeb.startsWith("/") ? window.location.origin + gpxOrWeb : gpxOrWeb;
    const s = size / mmW;
    QRCode.toCanvas(canvas, qrUrl, {
      width: Math.round(20 * s), margin: 1,
      color: { dark: data.barvaAkcentu, light: data.barvaPozadi },
    }).catch(() => {});
  }

  useEffect(() => { makeQR(qrRefA.current, w); }, [cyklo.gpxUrl, data.web, data.barvaAkcentu, data.barvaPozadi, w]);
  useEffect(() => { if (zoomed) makeQR(qrRefZoom.current, zoomW); }, [zoomed, cyklo.gpxUrl, data.web, data.barvaAkcentu, data.barvaPozadi, zoomW]);

  const s = w / mmW;
  const sZoom = zoomW / mmW;
  const layoutProps = { data, w, h, s, qrRef: qrRefA, logoRef: logoRefA };
  const zoomPropsA = { data, w: zoomW, h: zoomH, s: sZoom, qrRef: qrRefZoom, logoRef: logoRefZoomA };
  const zoomPropsB = { data, w: zoomW, h: zoomH, s: sZoom, qrRef: qrRefZoom, logoRef: logoRefZoomB };

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Header row */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">
            Živý náhled — Cyklotrasa
          </span>
          <button
            type="button"
            onClick={() => setZoomed(true)}
            className="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 border border-primary-200 rounded-lg px-2 py-1 hover:bg-primary-50 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
            </svg>
            Zvětšit
          </button>
        </div>

        {/* Strana toggle */}
        <div className="flex gap-2">
          {(["A", "B"] as const).map(strana => (
            <button
              key={strana}
              type="button"
              onClick={() => setActiveStrana(strana)}
              className={`flex-1 text-xs py-2 rounded-lg border-2 font-semibold transition-all ${
                activeStrana === strana
                  ? "border-primary-500 bg-primary-50 text-primary-700"
                  : "border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              Strana {strana} — {strana === "A" ? "přední" : "zadní"}
            </button>
          ))}
        </div>

        {/* Preview */}
        <div style={{ width: w, height: h, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.2)", borderRadius: 2 }}>
          {activeStrana === "A"
            ? <CykloStranaA {...layoutProps} cyklo={cyklo} />
            : <CykloStranaB {...{ ...layoutProps, logoRef: logoRefB }} cyklo={cyklo} />}
        </div>

        <p className="text-xs text-center text-gray-400">
          {activeStrana === "A" ? "Přední strana — statistiky a QR kód" : "Zadní strana — mapa trasy a zastávky"}
        </p>
      </div>

      {/* Zoom modal */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setZoomed(false)}
        >
          <div onClick={e => e.stopPropagation()} className="flex flex-col items-center gap-3">
            {/* Modal header */}
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {(["A", "B"] as const).map(strana => (
                  <button
                    key={strana}
                    type="button"
                    onClick={() => setActiveStrana(strana)}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                      activeStrana === strana
                        ? "border-primary-400 bg-primary-500 text-white"
                        : "border-white/30 text-white/70 hover:border-white/60"
                    }`}
                  >
                    Strana {strana}
                  </button>
                ))}
              </div>
              <span className="text-white/50 text-sm">Cyklotrasa</span>
              <button
                onClick={() => setZoomed(false)}
                className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg p-1.5 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div style={{ maxHeight: "85vh", overflow: "auto" }}>
              {activeStrana === "A"
                ? <CykloStranaA {...zoomPropsA} cyklo={cyklo} />
                : <CykloStranaB {...zoomPropsB} cyklo={cyklo} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
