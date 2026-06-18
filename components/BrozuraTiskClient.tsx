"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";
import type { Brozura } from "@prisma/client";

interface Props {
  brozura: Brozura;
}

const FORMAT_CSS: Record<string, string> = {
  A3: "w-[420mm] min-h-[594mm]",
  A4: "w-[210mm] min-h-[297mm]",
  A5: "w-[148mm] min-h-[210mm]",
};

export function BrozuraTiskClient({ brozura }: Props) {
  const qrRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (brozura.web && qrRef.current) {
      QRCode.toCanvas(qrRef.current, brozura.web, {
        width: 96,
        margin: 1,
        color: { dark: "#4c413b", light: "#ffffff" },
      });
    }
  }, [brozura.web]);

  return (
    <>
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body { margin: 0; background: white; }
          .no-print { display: none !important; }
          .print-page {
            width: 100%;
            height: 100vh;
            page-break-after: always;
          }
        }
        @page {
          size: ${brozura.format === "A3" ? "A3" : brozura.format === "A5" ? "A5" : "A4"};
          margin: 0;
        }
        * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      `}</style>

      {/* Print control bar */}
      <div className="no-print fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white px-6 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-300 hover:text-white text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zpět
          </button>
          <span className="text-white font-medium">{brozura.nazev}</span>
          <span className="text-gray-400 text-sm">· {brozura.format}</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Download PDF */}
          <a
            href={`/api/brozury/${brozura.id}/pdf`}
            className="flex items-center gap-2 text-sm bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a1 1 0 001 1h16a1 1 0 001-1v-3" />
            </svg>
            Stáhnout PDF
          </a>
          {/* Print */}
          <button
            onClick={() => window.print()}
            className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Tisknout
          </button>
        </div>
      </div>

      {/* Page wrapper */}
      <div className="no-print pt-14 bg-gray-100 min-h-screen flex justify-center py-8">
        <div className="print-page">
          <BrozuraPage brozura={brozura} qrRef={qrRef} />
        </div>
      </div>

      {/* Actual print output */}
      <div className="hidden print:block print-page">
        <BrozuraPage brozura={brozura} qrRef={qrRef} />
      </div>
    </>
  );
}

function BrozuraPage({
  brozura,
  qrRef,
}: {
  brozura: Brozura;
  qrRef: React.RefObject<HTMLCanvasElement | null>;
}) {
  const isDark =
    brozura.sablona === "ZVERINOVE_HODY" ||
    brozura.sablona === "AKCE" ||
    brozura.sablona === "RESTAURACE";

  const bgGradient = brozura.sablona === "UBYTOVANI"
    ? "linear-gradient(160deg, #1a2030 0%, #243045 60%, #1e2838 100%)"
    : brozura.sablona === "ZVERINOVE_HODY"
    ? "linear-gradient(160deg, #2d1f0e 0%, #4a2f12 60%, #3a2510 100%)"
    : "linear-gradient(160deg, #1c1008 0%, #3a2010 60%, #2a1808 100%)";

  const textPrimary = "#fdf6e3";
  const gold = "#c9a547";

  return (
    <div
      style={{
        background: bgGradient,
        width: "100%",
        height: "100%",
        minHeight: brozura.format === "A3" ? "594mm" : brozura.format === "A5" ? "210mm" : "297mm",
        position: "relative",
        fontFamily: "Georgia, 'Times New Roman', serif",
        display: "flex",
        flexDirection: "column",
        padding: "16mm",
        boxSizing: "border-box",
      }}
    >
      {/* Decorative borders */}
      <div style={{
        position: "absolute", inset: "6mm",
        border: `1px solid ${gold}`, opacity: 0.35, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: "8mm",
        border: `1px solid ${gold}`, opacity: 0.15, pointerEvents: "none",
      }} />

      {/* Header: Hotel name + ornament */}
      <div style={{ textAlign: "center", marginBottom: "8mm" }}>
        <div style={{ color: gold, letterSpacing: "0.3em", fontSize: "3.5mm", textTransform: "uppercase", marginBottom: "2mm" }}>
          Hotel U Šimáka
        </div>
        <SvgDivider color={gold} width={40} />
      </div>

      {/* Photo */}
      {brozura.fotoUrl && (
        <div style={{
          width: "100%",
          height: brozura.format === "A5" ? "35mm" : "55mm",
          overflow: "hidden",
          borderRadius: "1mm",
          marginBottom: "6mm",
          position: "relative",
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={brozura.fotoUrl}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.45))",
          }} />
        </div>
      )}

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: "4mm" }}>
        {brozura.sablona !== "VSEOBECNE" && (
          <div style={{ color: gold, fontSize: "2.8mm", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.8 }}>
            {SABLONA_LABELS[brozura.sablona]}
          </div>
        )}

        <h1 style={{
          color: textPrimary,
          fontSize: brozura.format === "A5" ? "8mm" : "11mm",
          lineHeight: 1.2,
          margin: 0,
          textShadow: "0 2px 8px rgba(0,0,0,0.4)",
        }}>
          {brozura.nadpis}
        </h1>

        {brozura.podnadpis && (
          <p style={{ color: textPrimary, fontSize: "4.5mm", fontStyle: "italic", opacity: 0.8, margin: 0 }}>
            {brozura.podnadpis}
          </p>
        )}

        <SvgDivider color={gold} width={60} withDot />

        {brozura.popis && (
          <p style={{
            color: textPrimary, fontSize: "3.5mm", opacity: 0.75,
            lineHeight: 1.6, maxWidth: "80%", margin: 0,
            fontFamily: "Arial, Helvetica, sans-serif",
          }}>
            {brozura.popis}
          </p>
        )}
      </div>

      {/* Info grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "3mm 6mm",
        marginTop: "6mm",
        marginBottom: "5mm",
      }}>
        {brozura.datum && <InfoRow icon="📅" text={brozura.datum} color={textPrimary} />}
        {brozura.cas && <InfoRow icon="🕐" text={brozura.cas} color={textPrimary} />}
        {brozura.misto && <InfoRow icon="📍" text={brozura.misto} color={textPrimary} />}
        {brozura.cena && <InfoRow icon="🎟" text={brozura.cena} color={textPrimary} />}
        {brozura.kontakt && <InfoRow icon="📞" text={brozura.kontakt} color={textPrimary} />}
      </div>

      {/* QR Code */}
      {brozura.web && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4mm", marginTop: "3mm" }}>
          <canvas ref={qrRef} style={{ width: "18mm", height: "18mm", borderRadius: "1mm" }} />
          <div style={{ textAlign: "left" }}>
            <div style={{ color: gold, fontSize: "2.5mm", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1mm" }}>
              Více informací
            </div>
            <div style={{ color: textPrimary, fontSize: "2.8mm", opacity: 0.65, fontFamily: "Arial, sans-serif" }}>
              {brozura.web}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SvgDivider({ color, width, withDot }: { color: string; width: number; withDot?: boolean }) {
  return (
    <svg width={width} height={10} viewBox={`0 0 ${width} 10`}>
      <line x1="0" y1="5" x2={width / 2 - 5} y2="5" stroke={color} strokeWidth="0.8" opacity="0.5" />
      {withDot && <circle cx={width / 2} cy="5" r="2" fill={color} opacity="0.7" />}
      <line x1={width / 2 + 5} y1="5" x2={width} y2="5" stroke={color} strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

function InfoRow({ icon, text, color }: { icon: string; text: string; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2mm" }}>
      <span style={{ fontSize: "3.5mm" }}>{icon}</span>
      <span style={{ color, fontSize: "3.5mm", fontFamily: "Arial, Helvetica, sans-serif", opacity: 0.85 }}>
        {text}
      </span>
    </div>
  );
}

const SABLONA_LABELS: Record<string, string> = {
  AKCE: "Kulturní akce",
  ZVERINOVE_HODY: "Zvěřinové hody",
  UBYTOVANI: "Ubytování",
  RESTAURACE: "Restaurace",
  VSEOBECNE: "",
};
