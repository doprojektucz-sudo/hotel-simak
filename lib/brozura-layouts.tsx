// Satori JSX layouty — identické s BrozuraNahled.tsx
// Satori podporuje inline styles (subset CSS), žádné třídy
// Místo <img> používáme src přímo, místo <canvas> předáváme qr jako data URL

export const HOTEL_INFO = {
  name: "Hotel a Restaurace U Šimáka",
  phone: "728 490 498",
  email: "hotresrad@seznam.cz",
  address: "Radostín 95, 591 01 Žďár nad Sázavou",
  facebook: "facebook.com/hotelsimak",
  instagram: "@hotel_u_simaka",
};

const SABLONA_LABELS: Record<string, string> = {
  AKCE: "Kulturní akce",
  ZVERINOVE_HODY: "Zvěřinové hody",
  UBYTOVANI: "Ubytování",
  RESTAURACE: "Restaurace",
  VSEOBECNE: "",
  CYKLOTRASA: "Cyklotrasa",
};

const NARC_COLORS: Record<string, string> = {
  LEHKA: "#22c55e", STREDNI: "#f59e0b", TEZKA: "#ef4444",
};
const NARC_DOTS: Record<string, number> = { LEHKA: 1, STREDNI: 2, TEZKA: 3 };
const NARC_LABELS: Record<string, string> = {
  LEHKA: "Lehká", STREDNI: "Střední", TEZKA: "Těžká",
};

// Rozměry v px (satori pracuje v px, my používáme mm → px při 96dpi)
// 1mm = 3.7795px
const MM = 2.8346; // 72dpi: 1pt = 1mm*(72/25.4)

export interface SatoriLayoutProps {
  // Brožura data
  bg: string;
  txt: string;
  acc: string;
  layout: string;
  sablona: string;
  zobrazitLogo: boolean;
  zobrazitPaticku: boolean;
  nadpis: string;
  podnadpis?: string | null;
  popis?: string | null;
  datum?: string | null;
  cas?: string | null;
  misto?: string | null;
  cena?: string | null;
  kontakt?: string | null;
  web?: string | null;
  // Obrázky jako base64 data URL
  fotoBase64?: string | null;
  logoBase64?: string | null;
  qrBase64?: string | null;
  mapBase64?: string | null;
  // Rozměry stránky
  w: number; // px
  h: number; // px
  // Cyklotrasa
  trasaKm?: number | null;
  trasaNarocnost?: string | null;
  trasaPrevyseni?: number | null;
  trasaPovrch?: string | null;
  trasaTyp?: string | null;
  trasaCislo?: number | null;
  mapaMiniBase64?: string | null;
  mapaTrasyBase64?: string | null;
  zastavky?: { poradi: number; nazev: string; popis?: string | null }[];
}

// ─── Sdílené komponenty ───────────────────────────────────────────────────────

function Footer(p: SatoriLayoutProps) {
  const isDark = ["TMAVE", "MODRE", "ZELENE"].some(t =>
    p.bg.startsWith("#1") || p.bg.startsWith("#0")
  );
  return (
    <div style={{ display: "flex",
      position: "absolute", bottom: 0, left: 0, right: 0,
      borderTop: `0.5px solid ${p.acc}`,
      background: isDark ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.06)",
      padding: `${3 * MM}px ${8 * MM}px`,
      display: "flex", flexDirection: "row", alignItems: "center",
      gap: `${5 * MM}px`,
    }}>
      <span style={{ display: "flex", color: p.txt, fontSize: 7 * MM, opacity: 0.75 }}>📞 {HOTEL_INFO.phone}</span>
      <span style={{ display: "flex", color: p.txt, fontSize: 7 * MM, opacity: 0.75 }}>✉ {HOTEL_INFO.email}</span>
      <span style={{ display: "flex", color: p.txt, fontSize: 7 * MM, opacity: 0.75 }}>📍 {HOTEL_INFO.address}</span>
    </div>
  );
}

function GoldDivider(p: { acc: string; wide?: boolean }) {
  const w = (p.wide ? 30 : 18) * MM;
  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: `${4 * MM}px` }}>
      <div style={{ display: "flex", width: w, height: 0.4 * MM, background: p.acc, opacity: 0.45 }} />
      <div style={{ display: "flex", width: 2.5 * MM, height: 2.5 * MM, borderRadius: "50%", background: p.acc, opacity: 0.65, marginLeft: `${3 * MM}px`, marginRight: `${3 * MM}px` }} />
      <div style={{ display: "flex", width: w, height: 0.4 * MM, background: p.acc, opacity: 0.45 }} />
    </div>
  );
}

function InfoGrid(p: SatoriLayoutProps & { compact?: boolean }) {
  const items = [
    { icon: "📅", val: p.datum },
    { icon: "🕐", val: p.cas },
    { icon: "📍", val: p.misto },
    { icon: "🎟", val: p.cena },
    { icon: "📞", val: p.kontakt },
  ].filter(i => i.val);

  if (!items.length) return null;
  const fs = p.compact ? 9 * MM : 11 * MM;

  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginBottom: `${3 * MM}px` }}>
      {items.map(({ icon, val }) => (
        <div key={val} style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "50%", marginBottom: `${3 * MM}px` }}>
          <span style={{ display: "flex", fontSize: fs * 1.1 }}>{icon}</span>
          <span style={{ display: "flex", color: p.txt, fontSize: fs, opacity: 0.82, marginLeft: `${2 * MM}px` }}>{val}</span>
        </div>
      ))}
    </div>
  );
}

function QRRow(p: SatoriLayoutProps & { compact?: boolean }) {
  if (!p.qrBase64) return null;
  const sz = (p.compact ? 13 : 17) * MM;
  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <img src={p.qrBase64} width={sz} height={sz} style={{ borderRadius: MM }} />
      <div style={{ display: "flex", marginLeft: `${4 * MM}px` }}>
        <div style={{ display: "flex", color: p.acc, fontSize: 7.5 * MM, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: `${MM}px` }}>Více info</div>
        <div style={{ display: "flex", color: p.txt, fontSize: 7 * MM, opacity: 0.5 }}>{p.web}</div>
      </div>
    </div>
  );
}

// ─── KLASICKY ─────────────────────────────────────────────────────────────────

export function LayoutKlasicky(p: SatoriLayoutProps) {
  const { bg, txt, acc, w, h } = p;
  const pad = 14 * MM;
  const footerH = p.zobrazitPaticku ? 12 * MM : 0;
  const logoH = p.zobrazitLogo && p.logoBase64 ? 22 * MM : 0;

  return (
    <div style={{ display: "flex", width: w, height: h, background: bg, fontFamily: "Roboto", position: "relative", overflow: "hidden" }}>
      {/* Dekorativní rámečky */}
      <div style={{ display: "flex", position: "absolute", top: 4 * MM, left: 4 * MM, right: 4 * MM, bottom: 4 * MM, border: `0.6px solid ${acc}`, opacity: 0.35 }} />
      <div style={{ display: "flex", position: "absolute", top: 6.5 * MM, left: 6.5 * MM, right: 6.5 * MM, bottom: 6.5 * MM, border: `0.4px solid ${acc}`, opacity: 0.15 }} />

      {/* Logo */}
      {p.zobrazitLogo && p.logoBase64 && (
        <div style={{ position: "absolute", top: 8 * MM, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
          <img src={p.logoBase64} height={18 * MM} style={{ objectFit: "contain" }} />
        </div>
      )}

      {/* Obsah */}
      <div style={{ display: "flex",
        position: "absolute", top: pad + logoH, left: pad, right: pad, bottom: pad + footerH,
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>
        <div style={{ display: "flex", color: acc, fontSize: 8.5 * MM, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 2.5 * MM }}>Hotel U Šimáka</div>
        <div style={{ display: "flex", width: 25 * MM, height: 0.4 * MM, background: acc, opacity: 0.45, marginBottom: 5 * MM }} />

        {p.fotoBase64 && (
          <div style={{ display: "flex", width: "100%", height: h * 0.24, overflow: "hidden", borderRadius: MM, marginBottom: 5 * MM, flexShrink: 0 }}>
            <img src={p.fotoBase64} width="100%" height="100%" style={{ objectFit: "cover", opacity: 0.85 }} />
          </div>
        )}

        {SABLONA_LABELS[p.sablona] && (
          <div style={{ display: "flex", color: acc, fontSize: 8 * MM, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.85, marginBottom: 3 * MM }}>
            {SABLONA_LABELS[p.sablona]}
          </div>
        )}

        <div style={{ display: "flex", color: txt, fontSize: 21 * MM, fontWeight: 700, textAlign: "center", lineHeight: 1.2, marginBottom: 3.5 * MM }}>
          {p.nadpis}
        </div>

        {p.podnadpis && (
          <div style={{ display: "flex", color: txt, fontSize: 11 * MM, fontStyle: "italic", opacity: 0.78, textAlign: "center", marginBottom: 3.5 * MM }}>
            {p.podnadpis}
          </div>
        )}

        <GoldDivider acc={acc} wide />

        {p.popis && (
          <div style={{ display: "flex", color: txt, fontSize: 9.5 * MM, opacity: 0.72, textAlign: "center", lineHeight: 1.6, marginBottom: 5 * MM }}>
            {p.popis}
          </div>
        )}

        <div style={{ display: "flex", flexGrow: 1 }} />

        {p.mapBase64 && (
          <div style={{ display: "flex", width: "100%", height: 16 * MM, overflow: "hidden", borderRadius: MM, marginBottom: 4 * MM, flexShrink: 0 }}>
            <img src={p.mapBase64} width="100%" height="100%" style={{ objectFit: "cover" }} />
          </div>
        )}

        <InfoGrid {...p} compact />
        <QRRow {...p} compact />
      </div>

      {p.zobrazitPaticku && <Footer {...p} />}
    </div>
  );
}

// ─── MAGAZIN ──────────────────────────────────────────────────────────────────

export function LayoutMagazin(p: SatoriLayoutProps) {
  const { bg, txt, acc, w, h } = p;
  const pad = 10 * MM;
  const heroH = h * 0.44;
  const footerH = p.zobrazitPaticku ? 12 * MM : 0;

  return (
    <div style={{ display: "flex", width: w, height: h, background: bg, fontFamily: "Roboto", position: "relative", overflow: "hidden" }}>
      {/* Hero */}
      <div style={{ display: "flex", position: "absolute", top: 0, left: 0, right: 0, height: heroH }}>
        {p.fotoBase64
          ? <img src={p.fotoBase64} width="100%" height="100%" style={{ objectFit: "cover" }} />
          : <div style={{ display: "flex", width: "100%", height: "100%", background: `linear-gradient(135deg, ${acc}22, ${acc}55)` }} />}
        <div style={{ display: "flex", position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.75))" }} />

        {p.zobrazitLogo && p.logoBase64 && (
          <div style={{ position: "absolute", top: 8 * MM, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
            <img src={p.logoBase64} height={16 * MM} style={{ objectFit: "contain" }} />
          </div>
        )}

        <div style={{ display: "flex", position: "absolute", bottom: pad, left: pad, right: pad }}>
          <div style={{ display: "flex", color: acc, fontSize: 8 * MM, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 2 * MM }}>
            {SABLONA_LABELS[p.sablona] || "Hotel U Šimáka"}
          </div>
          <div style={{ display: "flex", color: "#fff", fontSize: 21 * MM, fontWeight: 700, lineHeight: 1.15 }}>{p.nadpis}</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ position: "absolute", top: heroH, left: 0, right: 0, bottom: footerH, padding: `${pad}px`, display: "flex", flexDirection: "column" }}>
        {p.podnadpis && <div style={{ display: "flex", color: txt, fontSize: 11 * MM, fontStyle: "italic", opacity: 0.78, marginBottom: 3.5 * MM }}>{p.podnadpis}</div>}
        <div style={{ display: "flex", width: 18 * MM, height: 1.5 * MM, background: acc, borderRadius: MM, marginBottom: 3.5 * MM }} />
        {p.popis && <div style={{ display: "flex", color: txt, fontSize: 9 * MM, opacity: 0.72, lineHeight: 1.55, marginBottom: 3.5 * MM }}>{p.popis}</div>}
        <div style={{ display: "flex", flexGrow: 1 }} />
        {p.mapBase64 && (
          <div style={{ display: "flex", height: 14 * MM, overflow: "hidden", borderRadius: MM, marginBottom: 3.5 * MM, flexShrink: 0 }}>
            <img src={p.mapBase64} width="100%" height="100%" style={{ objectFit: "cover" }} />
          </div>
        )}
        <InfoGrid {...p} compact />
        <QRRow {...p} compact />
      </div>

      {p.zobrazitPaticku && <Footer {...p} />}
    </div>
  );
}

// ─── MINIMA ───────────────────────────────────────────────────────────────────

export function LayoutMinima(p: SatoriLayoutProps) {
  const { bg, txt, acc, w, h } = p;
  const pad = 14 * MM;
  const logoOff = p.zobrazitLogo && p.logoBase64 ? 20 * MM : 0;
  const footerH = p.zobrazitPaticku ? 12 * MM : 0;

  return (
    <div style={{ width: w, height: h, background: bg, fontFamily: "Roboto", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ display: "flex", height: 3 * MM, background: acc }} />
      {p.zobrazitLogo && p.logoBase64 && (
        <div style={{ position: "absolute", top: 8 * MM, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
          <img src={p.logoBase64} height={16 * MM} style={{ objectFit: "contain" }} />
        </div>
      )}
      <div style={{ flexGrow: 1, flexShrink: 1, flexBasis: "0%", padding: `${pad}px`, paddingTop: pad + logoOff, paddingBottom: pad, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", color: acc, fontSize: 8 * MM, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 * MM, fontWeight: 700 }}>Hotel U Šimáka</div>
        <div style={{ display: "flex", color: txt, fontSize: 23 * MM, fontWeight: 900, lineHeight: 1.1, marginBottom: 3.5 * MM }}>{p.nadpis}</div>
        {p.podnadpis && <div style={{ display: "flex", color: acc, fontSize: 10 * MM, fontWeight: 700, marginBottom: 5 * MM, textTransform: "uppercase" }}>{p.podnadpis}</div>}
        {p.popis && <div style={{ display: "flex", color: txt, fontSize: 9 * MM, opacity: 0.7, lineHeight: 1.6, marginBottom: 5 * MM }}>{p.popis}</div>}
        <div style={{ display: "flex", flexGrow: 1 }} />
        {p.fotoBase64 && (
          <div style={{ display: "flex", height: h * 0.2, overflow: "hidden", marginBottom: 5 * MM, flexShrink: 0 }}>
            <img src={p.fotoBase64} width="100%" height="100%" style={{ objectFit: "cover", opacity: 0.8 }} />
          </div>
        )}
        {p.mapBase64 && (
          <div style={{ display: "flex", height: 13 * MM, overflow: "hidden", marginBottom: 3.5 * MM, flexShrink: 0 }}>
            <img src={p.mapBase64} width="100%" height="100%" style={{ objectFit: "cover" }} />
          </div>
        )}
        <InfoGrid {...p} compact />
        <QRRow {...p} compact />
      </div>
      {p.zobrazitPaticku
        ? <Footer {...p} />
        : <div style={{ display: "flex", height: 1.5 * MM, background: acc, opacity: 0.4 }} />}
    </div>
  );
}

// ─── SIROKY ───────────────────────────────────────────────────────────────────

export function LayoutSiroky(p: SatoriLayoutProps) {
  const { bg, txt, acc, w, h } = p;
  const pad = 12 * MM;
  const footerH = p.zobrazitPaticku ? 12 * MM : 0;

  return (
    <div style={{ width: w, height: h, background: bg, fontFamily: "Roboto", display: "flex", flexDirection: "row", overflow: "hidden" }}>
      {/* Foto vlevo */}
      <div style={{ display: "flex", width: "44%", position: "relative", flexShrink: 0 }}>
        {p.fotoBase64
          ? <img src={p.fotoBase64} width="100%" height="100%" style={{ objectFit: "cover", position: "absolute", top: 0, left: 0 }} />
          : <div style={{ display: "flex", width: "100%", height: "100%", background: `${acc}22` }} />}
        <div style={{ display: "flex", position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: `linear-gradient(to right, transparent 60%, ${bg})` }} />
        {p.zobrazitLogo && p.logoBase64 && (
          <div style={{ display: "flex", position: "absolute", top: 6 * MM, left: 6 * MM }}>
            <img src={p.logoBase64} height={14 * MM} style={{ objectFit: "contain" }} />
          </div>
        )}
      </div>
      {/* Obsah vpravo */}
      <div style={{ flexGrow: 1, flexShrink: 1, flexBasis: "0%", padding: `${pad}px`, paddingBottom: pad, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: acc, fontSize: 8 * MM, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 3.5 * MM }}>{SABLONA_LABELS[p.sablona] || ""}</div>
          <div style={{ display: "flex", color: txt, fontSize: 20 * MM, fontWeight: 700, lineHeight: 1.2, marginBottom: 3.5 * MM }}>{p.nadpis}</div>
          {p.podnadpis && <div style={{ display: "flex", color: txt, fontSize: 10 * MM, fontStyle: "italic", opacity: 0.75, marginBottom: 4 * MM }}>{p.podnadpis}</div>}
          <div style={{ display: "flex", width: 14 * MM, height: 1.2 * MM, background: acc, marginBottom: 4.5 * MM }} />
          {p.popis && <div style={{ display: "flex", color: txt, fontSize: 9 * MM, opacity: 0.72, lineHeight: 1.6 }}>{p.popis}</div>}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {p.mapBase64 && (
            <div style={{ display: "flex", height: 16 * MM, overflow: "hidden", borderRadius: MM, marginBottom: 4 * MM }}>
              <img src={p.mapBase64} width="100%" height="100%" style={{ objectFit: "cover" }} />
            </div>
          )}
          <InfoGrid {...p} compact />
          <QRRow {...p} compact />
        </div>
      </div>
      {p.zobrazitPaticku && <Footer {...p} />}
    </div>
  );
}

// ─── CYKLOTRASA Strana A ──────────────────────────────────────────────────────

export function LayoutCykloA(p: SatoriLayoutProps) {
  const { bg, txt, acc, w, h } = p;
  const pad = 12 * MM;
  const narc = p.trasaNarocnost || "";
  const narcColor = NARC_COLORS[narc] || acc;
  const narcDots = NARC_DOTS[narc] || 0;
  const narcLabel = NARC_LABELS[narc] || "";

  return (
    <div style={{ display: "flex", flexDirection: "column", width: w, height: h, background: bg, fontFamily: "Roboto" }}>
      {/* Top bar */}
      <div style={{ display: "flex", height: 1.5 * MM, background: acc, flexShrink: 0 }} />

      {/* Logo */}
      {p.zobrazitLogo && p.logoBase64 && (
        <div style={{ display: "flex", justifyContent: "center", paddingTop: `${3 * MM}px`, paddingBottom: `${2 * MM}px`, flexShrink: 0 }}>
          <img src={p.logoBase64} height={16 * MM} style={{ objectFit: "contain" }} />
        </div>
      )}

      {/* Main scrollable content */}
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, flexShrink: 1, flexBasis: "0%", paddingLeft: `${pad}px`, paddingRight: `${pad}px`, overflow: "hidden" }}>

        {/* Série + název */}
        <div style={{ display: "flex", flexDirection: "column", marginBottom: `${3 * MM}px` }}>
          {p.trasaCislo != null && (
            <div style={{ display: "flex", color: acc, fontSize: 6 * MM, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: `${1.5 * MM}px`, opacity: 0.9 }}>
              Cyklotrasa č. {p.trasaCislo}
            </div>
          )}
          <div style={{ display: "flex", color: txt, fontSize: 14 * MM, fontWeight: 700, lineHeight: 1.1 }}>{p.nadpis}</div>
          {p.podnadpis && (
            <div style={{ display: "flex", color: txt, fontSize: 8 * MM, fontStyle: "italic", opacity: 0.68, marginTop: `${1 * MM}px` }}>{p.podnadpis}</div>
          )}
        </div>

        {/* Mapa okruhu */}
        {p.mapaMiniBase64 && (
          <img src={p.mapaMiniBase64} width={w - pad * 2} height={Math.round(h * 0.22)}
            style={{ objectFit: "cover", borderWidth: "0.3px", borderStyle: "solid", borderColor: acc, marginBottom: `${3 * MM}px`, flexShrink: 0 }} />
        )}

        {/* Stats */}
        <div style={{ display: "flex", flexDirection: "row", marginBottom: `${3 * MM}px`, flexShrink: 0 }}>
          {p.trasaKm != null && (
            <div style={{ flexGrow: 1, flexShrink: 1, flexBasis: "0%", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: `${4 * MM}px`, paddingBottom: `${4 * MM}px`, marginRight: `${2 * MM}px`, borderWidth: "0.4px", borderStyle: "solid", borderColor: acc }}>
              <span style={{ display: "flex", fontSize: `${10 * MM}px`, marginBottom: `${0.5 * MM}px` }}>🚴</span>
              <div style={{ display: "flex", fontSize: 10 * MM, fontWeight: 700, color: acc }}>{p.trasaKm} km</div>
              <div style={{ display: "flex", fontSize: 5 * MM, color: txt, opacity: 0.5, textTransform: "uppercase", marginTop: `${0.5 * MM}px` }}>Délka</div>
            </div>
          )}
          {p.trasaPrevyseni != null && (
            <div style={{ flexGrow: 1, flexShrink: 1, flexBasis: "0%", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: `${4 * MM}px`, paddingBottom: `${4 * MM}px`, marginRight: `${2 * MM}px`, borderWidth: "0.4px", borderStyle: "solid", borderColor: acc }}>
              <span style={{ display: "flex", fontSize: `${10 * MM}px`, marginBottom: `${0.5 * MM}px` }}>⛰</span>
              <div style={{ display: "flex", fontSize: 10 * MM, fontWeight: 700, color: acc }}>{p.trasaPrevyseni} m</div>
              <div style={{ display: "flex", fontSize: 5 * MM, color: txt, opacity: 0.5, textTransform: "uppercase", marginTop: `${0.5 * MM}px` }}>Převýšení</div>
            </div>
          )}
          {narc && (
            <div style={{ flexGrow: 1, flexShrink: 1, flexBasis: "0%", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: `${4 * MM}px`, paddingBottom: `${4 * MM}px`, borderWidth: "0.4px", borderStyle: "solid", borderColor: acc }}>
              <span style={{ display: "flex", fontSize: `${10 * MM}px`, marginBottom: `${0.5 * MM}px` }}>💪</span>
              <div style={{ display: "flex", flexDirection: "row", marginBottom: `${1.5 * MM}px` }}>
                <div style={{ display: "flex", width: 3 * MM, height: 3 * MM, borderRadius: "50%", background: narcDots >= 1 ? narcColor : "rgba(128,128,128,0.25)", marginRight: `${1.5 * MM}px` }} />
                <div style={{ display: "flex", width: 3 * MM, height: 3 * MM, borderRadius: "50%", background: narcDots >= 2 ? narcColor : "rgba(128,128,128,0.25)", marginRight: `${1.5 * MM}px` }} />
                <div style={{ display: "flex", width: 3 * MM, height: 3 * MM, borderRadius: "50%", background: narcDots >= 3 ? narcColor : "rgba(128,128,128,0.25)" }} />
              </div>
              <div style={{ display: "flex", fontSize: 5.5 * MM, color: narcColor, fontWeight: 700 }}>{narcLabel}</div>
              <div style={{ display: "flex", fontSize: 4.5 * MM, color: txt, opacity: 0.5, textTransform: "uppercase" }}>Náročnost</div>
            </div>
          )}
        </div>

        {(p.trasaPovrch || p.trasaTyp) && (
          <div style={{ display: "flex", flexDirection: "row", marginBottom: `${2.5 * MM}px` }}>
            {p.trasaPovrch && <span style={{ display: "flex", fontSize: 7 * MM, color: txt, opacity: 0.7, marginRight: `${12 * MM}px` }}>🛤 {p.trasaPovrch}</span>}
            {p.trasaTyp && <span style={{ display: "flex", fontSize: 7 * MM, color: txt, opacity: 0.7 }}>🔄 {p.trasaTyp}</span>}
          </div>
        )}

        {p.popis && (
          <div style={{ display: "flex", fontSize: 7.5 * MM, color: txt, opacity: 0.72, lineHeight: 1.5, marginBottom: `${3 * MM}px` }}>{p.popis}</div>
        )}

        <div style={{ display: "flex", flexGrow: 1 }} />

        {/* QR */}
        {p.qrBase64 && (
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", paddingTop: `${3 * MM}px`, paddingBottom: `${3 * MM}px`, paddingLeft: `${3 * MM}px`, paddingRight: `${3 * MM}px`, borderWidth: "0.4px", borderStyle: "solid", borderColor: acc, marginBottom: `${2 * MM}px`, flexShrink: 0 }}>
            <img src={p.qrBase64} width={13 * MM} height={13 * MM} style={{ marginRight: `${4 * MM}px` }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", color: acc, fontWeight: 700, fontSize: 7 * MM, marginBottom: `${1 * MM}px` }}>Načti trasu do mobilu</div>
              <div style={{ display: "flex", color: txt, fontSize: 6 * MM, opacity: 0.55 }}>usimaka.cz/api/trasa/{p.trasaCislo}</div>
            </div>
          </div>
        )}
      </div>

      {/* Footer jako normální flow element — ne absolutní */}
      {p.zobrazitPaticku && <Footer {...p} />}
    </div>
  );
}


export function LayoutCykloB(p: SatoriLayoutProps) {
  const { bg, txt, acc, w, h } = p;
  const pad = 8 * MM;
  const zastavky = p.zastavky || [];

  return (
    <div style={{ display: "flex", flexDirection: "column", width: w, height: h, background: bg, fontFamily: "Roboto" }}>
      <div style={{ display: "flex", height: 1.5 * MM, background: acc, flexShrink: 0 }} />

      <div style={{ display: "flex", flexDirection: "row", flexGrow: 1, flexShrink: 1, flexBasis: "0%", paddingLeft: `${pad}px`, paddingRight: `${pad}px`, paddingTop: `${pad}px`, paddingBottom: `${pad}px`, overflow: "hidden" }}>

        {/* Velká mapa */}
        {p.mapaTrasyBase64 && (
          <img src={p.mapaTrasyBase64} width={Math.round(w * 0.48)} height={h - 1.5 * MM - pad * 2 - (p.zobrazitPaticku ? 12 * MM : 0)}
            style={{ objectFit: "cover", borderWidth: "0.3px", borderStyle: "solid", borderColor: acc, marginRight: `${4 * MM}px`, flexShrink: 0 }} />
        )}

        {/* Zastávky */}
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, flexShrink: 1, flexBasis: "0%" }}>
          <div style={{ display: "flex", color: acc, fontSize: 6.5 * MM, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: `${3.5 * MM}px`, fontWeight: 700 }}>
            Zastávky na trase
          </div>

          {zastavky.length === 0 && (
            <div style={{ display: "flex", color: txt, fontSize: 7 * MM, opacity: 0.4, fontStyle: "italic" }}>Zastávky budou doplněny…</div>
          )}

          {zastavky.slice(0, 8).map((z, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "row", marginBottom: `${2.5 * MM}px` }}>
              <div style={{ display: "flex", width: 4.5 * MM, height: 4.5 * MM, borderRadius: "50%", background: acc, alignItems: "center", justifyContent: "center", marginRight: `${2 * MM}px`, flexShrink: 0, marginTop: `${0.3 * MM}px` }}>
                <span style={{ display: "flex", color: bg, fontSize: 5 * MM, fontWeight: 700 }}>{i + 1}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <div style={{ display: "flex", fontSize: 7.5 * MM, fontWeight: 700, color: txt, lineHeight: 1.2 }}>{z.nazev}</div>
                {z.popis && (
                  <div style={{ display: "flex", fontSize: 6 * MM, color: txt, opacity: 0.62, lineHeight: 1.5, marginTop: `${0.5 * MM}px` }}>
                    {z.popis.length > 100 ? z.popis.slice(0, 100) + "…" : z.popis}
                  </div>
                )}
              </div>
            </div>
          ))}

          <div style={{ display: "flex", flexGrow: 1 }} />

          <div style={{ display: "flex", flexDirection: "column", borderTop: `0.3px solid ${acc}`, paddingTop: `${2.5 * MM}px` }}>
            <div style={{ display: "flex", fontSize: 6.5 * MM, color: acc, fontWeight: 700, marginBottom: `${1.5 * MM}px` }}>Ubytování na trase</div>
            <div style={{ display: "flex", fontSize: 6 * MM, color: txt, opacity: 0.7, marginBottom: `${1 * MM}px` }}>Hotel a Restaurace U Šimáka</div>
            <div style={{ display: "flex", fontSize: 5.5 * MM, color: txt, opacity: 0.5 }}>Radostín 95 · 728 490 498</div>
          </div>
        </div>
      </div>

      {p.zobrazitPaticku && <Footer {...p} />}
    </div>
  );
}


// ─── Dispatcher ───────────────────────────────────────────────────────────────

export function getLayout(layout: string) {
  const map: Record<string, (p: SatoriLayoutProps) => JSX.Element> = {
    KLASICKY:    LayoutKlasicky,
    MAGAZIN:     LayoutMagazin,
    MINIMA:      LayoutMinima,
    SIROKY:      LayoutSiroky,
    VINTAGE:     LayoutKlasicky,   // fallback na Klasicky
    SVETLY_CARD: LayoutKlasicky,
    SPLIT:       LayoutKlasicky,
    MIKROMINIMA: LayoutMinima,
  };
  return map[layout] || LayoutKlasicky;
}
