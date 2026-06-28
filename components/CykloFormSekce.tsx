"use client";

import { useState, useCallback, useEffect } from "react";
import type { Zastavka, CykloData } from "@/components/CykloLayout";
import { GaleriePicker } from "@/components/GaleriePicker";

interface CykloFormSekceProps {
  initial?: Partial<CykloData>;
  onChange: (data: CykloData) => void;
}

const NAROCNOST_OPTIONS = [
  { value: "LEHKA",   label: "🟢 Lehká — rodinná, rovinatá" },
  { value: "STREDNI", label: "🟡 Střední — mírné stoupání" },
  { value: "TEZKA",   label: "🔴 Těžká — výrazné převýšení" },
];

const TYP_OPTIONS = [
  { value: "okruh",        label: "🔄 Okruh — vrátíš se na start" },
  { value: "tam a zpět",   label: "↔️ Tam a zpět" },
  { value: "jednosměrná",  label: "→ Jednosměrná" },
];

export function CykloFormSekce({ initial, onChange }: CykloFormSekceProps) {
  const [data, setData] = useState<CykloData>({
    trasaKm:        initial?.trasaKm,
    trasaNarocnost: initial?.trasaNarocnost || "STREDNI",
    trasaPrevyseni: initial?.trasaPrevyseni,
    trasaPovrch:    initial?.trasaPovrch || "",
    trasaTyp:       initial?.trasaTyp || "okruh",
    trasaCislo:     initial?.trasaCislo,
    gpxUrl:         initial?.gpxUrl || "",
    mapaTrasyUrl:   initial?.mapaTrasyUrl || "",
    mapaMiniUrl:    initial?.mapaMiniUrl || "",
    zastavky:       initial?.zastavky || [],
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    onChange(data);
  }, [data]); // onChange záměrně vynecháno z deps

  const upd = useCallback(<K extends keyof CykloData>(key: K, value: CykloData[K]) => {
    setData(prev => ({ ...prev, [key]: value }));
  }, []);

  // Krátká URL jen pro zobrazení a QR — NIKDY se neukládá do gpxUrl
  const shortUrl = data.trasaCislo ? `/api/trasa/${data.trasaCislo}` : null;

  // gpxUrl je dlouhá URL z Mapy.cz/Komoot — to je to co se ukládá
  const longUrl = data.gpxUrl || "";
  // Co se použije pro QR: pokud máme trasaCislo → krátká URL, jinak dlouhá
  const qrUrl = shortUrl || longUrl;

  // ── Zastávky ────────────────────────────────────────────────────────────────

  const addZastavka = () => {
    const nova: Zastavka = { poradi: (data.zastavky?.length || 0) + 1, nazev: "", popis: "" };
    upd("zastavky", [...(data.zastavky || []), nova]);
  };

  const updateZastavka = (i: number, field: keyof Zastavka, value: string) => {
    const updated = [...(data.zastavky || [])];
    updated[i] = { ...updated[i], [field]: value };
    upd("zastavky", updated);
  };

  const removeZastavka = (i: number) => {
    const updated = (data.zastavky || [])
      .filter((_, idx) => idx !== i)
      .map((z, idx) => ({ ...z, poradi: idx + 1 }));
    upd("zastavky", updated);
  };

  const moveZastavka = (i: number, dir: -1 | 1) => {
    const arr = [...(data.zastavky || [])];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    upd("zastavky", arr.map((z, idx) => ({ ...z, poradi: idx + 1 })));
  };

  return (
    <div className="space-y-5">

      {/* Základní info trasy */}
      <Section title="🚴 Informace o trase">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Číslo trasy v seriálu</Label>
            <input
              type="number" min="1"
              value={data.trasaCislo || ""}
              onChange={e => upd("trasaCislo", e.target.value ? Number(e.target.value) : undefined)}
              placeholder="např. 1"
              className="input-field"
            />
            <p className="text-xs text-gray-400 mt-1">Zobrazí se jako "Cyklotrasa č. 1"</p>
          </div>
          <div>
            <Label>Délka trasy (km)</Label>
            <input
              type="number" min="0" step="0.1"
              value={data.trasaKm || ""}
              onChange={e => upd("trasaKm", e.target.value ? Number(e.target.value) : undefined)}
              placeholder="např. 24.5"
              className="input-field"
            />
          </div>
          <div>
            <Label>Převýšení (m)</Label>
            <input
              type="number" min="0"
              value={data.trasaPrevyseni || ""}
              onChange={e => upd("trasaPrevyseni", e.target.value ? Number(e.target.value) : undefined)}
              placeholder="např. 320"
              className="input-field"
            />
          </div>
          <div>
            <Label>Typ trasy</Label>
            <select value={data.trasaTyp || ""} onChange={e => upd("trasaTyp", e.target.value)} className="input-field">
              {TYP_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className="col-span-2">
            <Label>Náročnost</Label>
            <div className="flex gap-2 mt-1">
              {NAROCNOST_OPTIONS.map(o => (
                <button key={o.value} type="button"
                  onClick={() => upd("trasaNarocnost", o.value)}
                  className={`flex-1 text-xs px-3 py-2.5 rounded-lg border-2 transition-all text-left ${
                    data.trasaNarocnost === o.value
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
          <div className="col-span-2">
            <Label>Povrch</Label>
            <input
              value={data.trasaPovrch || ""}
              onChange={e => upd("trasaPovrch", e.target.value)}
              placeholder="např. asfalt, štěrk, mix"
              className="input-field"
            />
          </div>
        </div>
      </Section>

      {/* Mapy */}
      <Section title="🗺 Mapy">
        <div className="space-y-4">
          <p className="text-xs text-gray-500">
            Nahrej mapy do galerie a vyber je zde.
            <strong className="text-gray-700"> Miniatura</strong> = přehledový obrázek okruhu pro přední stranu.
            <strong className="text-gray-700"> Detailní mapa</strong> = mapa se zakreslenou trasou pro zadní stranu.
          </p>
          <GaleriePicker
            label="Miniatura okruhu (přední strana)"
            value={data.mapaMiniUrl || ""}
            onChange={v => upd("mapaMiniUrl", v)}
            placeholder="Přehledová mapa okruhu…"
          />
          <GaleriePicker
            label="Detailní mapa trasy (zadní strana)"
            value={data.mapaTrasyUrl || ""}
            onChange={v => upd("mapaTrasyUrl", v)}
            placeholder="Mapa s vykreslenou trasou…"
          />
        </div>
      </Section>

      {/* QR kód */}
      <Section title="📲 QR kód — odkaz na trasu">
        <div className="space-y-4">

          {/* Dlouhá URL — primární pole */}
          <div>
            <Label>
              URL trasy — Mapy.cz / Komoot / Wikiloc
              <span className="ml-1 text-xs font-normal text-gray-400">(sem vlož dlouhou URL trasy)</span>
            </Label>
            <input
              value={longUrl}
              onChange={e => upd("gpxUrl", e.target.value)}
              placeholder="https://mapy.cz/s/xxxxx nebo https://www.komoot.com/tour/…"
              className="input-field font-mono text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">
              Vlož URL z Mapy.cz, Komoot, Wikiloc nebo Strava.
              QR kód na brožuře bude přes zkrácenou cestu{" "}
              {shortUrl
                ? <><code className="bg-gray-100 px-1 rounded">{shortUrl}</code> přesměrovat sem.</>
                : <>přesměrovávat sem (po vyplnění čísla trasy).</>}
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            {[
              { label: "Mapy.cz",  url: "https://mapy.cz/" },
              { label: "Komoot",   url: "https://www.komoot.com/" },
              { label: "Wikiloc",  url: "https://www.wikiloc.com/" },
              { label: "Strava",   url: "https://www.strava.com/" },
            ].map(s => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener"
                className="text-xs text-primary-600 hover:underline border border-primary-200 rounded px-2 py-1">
                Otevřít {s.label} →
              </a>
            ))}
          </div>

          {/* Automatická krátká URL — jen informativní, nemění gpxUrl */}
          {shortUrl && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="text-sm font-medium text-green-800">Zkrácená URL pro QR kód na brožuře</span>
              </div>
              <div className="flex gap-2 items-center">
                <code className="flex-1 text-sm text-green-900 bg-green-100 rounded px-3 py-1.5 font-mono">
                  {shortUrl}
                </code>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.origin + shortUrl).catch(() => {});
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="text-xs bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
                >
                  {copied ? "Zkopírováno ✓" : "Kopírovat →"}
                </button>
              </div>
              <p className="text-xs text-green-700">
                Tato krátká URL se použije pro QR kód na brožuře a přesměruje na dlouhou URL výše.
                {!longUrl && <strong className="text-amber-700"> ⚠ Vlož dlouhou URL trasy výše, jinak přesměrování nebude fungovat.</strong>}
              </p>
            </div>
          )}

          {!shortUrl && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-xs text-amber-700">
              💡 Vyplň číslo trasy výše a automaticky se vygeneruje zkrácená URL pro QR kód.
            </div>
          )}
        </div>
      </Section>

      {/* Zastávky */}
      <Section title={`📍 Zastávky na trase (${data.zastavky?.length || 0})`}>
        <div className="space-y-3">
          <p className="text-xs text-gray-500">
            Zajímavé body na trase — zobrazí se jako číslovaný seznam na zadní straně brožury. Max 8 zastávek.
          </p>

          <input type="hidden" name="zastavkyJson" value={JSON.stringify(data.zastavky || [])} />

          {(data.zastavky || []).map((z, i) => (
            <div key={i} className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-primary-500 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </div>
                <input
                  value={z.nazev}
                  onChange={e => updateZastavka(i, "nazev", e.target.value)}
                  placeholder="Název zastávky (např. Zámek Žďár nad Sázavou)"
                  className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white"
                />
                <div className="flex gap-1">
                  <button type="button" onClick={() => moveZastavka(i, -1)} disabled={i === 0}
                    className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-25 rounded">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7"/></svg>
                  </button>
                  <button type="button" onClick={() => moveZastavka(i, 1)} disabled={i === (data.zastavky?.length || 1) - 1}
                    className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-25 rounded">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                  </button>
                  <button type="button" onClick={() => removeZastavka(i)}
                    className="p-1.5 text-red-400 hover:text-red-600 rounded">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </div>
              </div>

              <textarea
                value={z.popis || ""}
                onChange={e => updateZastavka(i, "popis", e.target.value)}
                placeholder="Stručný popis (zobrazí se na zadní straně)…"
                rows={2}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white"
              />

              <input
                value={z.gps || ""}
                onChange={e => updateZastavka(i, "gps", e.target.value)}
                placeholder="GPS souřadnice (volitelně, např. 49.5938, 15.9394)"
                className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-400 bg-white font-mono"
              />
            </div>
          ))}

          {(data.zastavky?.length || 0) < 8 && (
            <button
              type="button"
              onClick={addZastavka}
              className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
              </svg>
              Přidat zastávku
            </button>
          )}
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-gray-700 mb-1.5">{children}</label>;
}