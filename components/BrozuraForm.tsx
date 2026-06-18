"use client";

import { useActionState, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Brozura } from "@prisma/client";
import { createBrozura, updateBrozura, type BrozuraFormState } from "@/lib/actions/brozury";
import { BrozuraNahled, type BrozuraData, TEMA_TMAVE, TEMA_SVETLE, TEMA_MODRE, TEMA_ZELENE, TEMA_BILA } from "@/components/BrozuraNahled";
import { GaleriePicker } from "@/components/GaleriePicker";

const SABLONA_OPTIONS = [
  { value: "AKCE",           label: "🎭 Kulturní akce / Koncert" },
  { value: "ZVERINOVE_HODY", label: "🦌 Zvěřinové hody / Speciální menu" },
  { value: "UBYTOVANI",      label: "🛏️ Nabídka ubytování" },
  { value: "RESTAURACE",     label: "🍽️ Promo restaurace" },
  { value: "VSEOBECNE",      label: "📄 Univerzální šablona" },
];

const KATEGORIE_OPTIONS = [
  { value: "AKCE", label: "Akce" }, { value: "MENU", label: "Menu" },
  { value: "UBYTOVANI", label: "Ubytování" }, { value: "SPORTOVNI", label: "Sportovní" },
  { value: "OSTATNI", label: "Ostatní" },
];

const FORMAT_OPTIONS = [
  { value: "A3", label: "A3 (297×420 mm)" },
  { value: "A4", label: "A4 (210×297 mm)" },
  { value: "A5", label: "A5 (148×210 mm)" },
];

const STAV_OPTIONS = [
  { value: "ROZPRACOVANA", label: "Rozpracovaná" },
  { value: "HOTOVA", label: "Hotová" },
  { value: "ARCHIV", label: "Archiv" },
];

const LAYOUT_OPTIONS = [
  { value: "KLASICKY",    label: "Klasický",      desc: "Centrovaný, zlaté rámečky" },
  { value: "MAGAZIN",     label: "Magazín",       desc: "Hero foto s překryvem textu" },
  { value: "MINIMA",      label: "Minimalistický",desc: "Velká typografie, čistý" },
  { value: "SIROKY",      label: "Dvousloupcový", desc: "Foto vlevo, obsah vpravo" },
  { value: "VINTAGE",     label: "Vintage",       desc: "Plakátový styl s ornamenty" },
  { value: "SVETLY_CARD", label: "Barevná karta", desc: "Akcentový blok nahoře" },
  { value: "SPLIT",       label: "Diagonální",    desc: "Geometrické rozdělení" },
  { value: "MIKROMINIMA", label: "Mikrominima",   desc: "Ultra čistý, jen text" },
];

const TEMA_OPTIONS = [
  { value: "TMAVE",  label: "Tmavé",  colors: TEMA_TMAVE,  swatch: ["#1c1008", "#c9a547"] },
  { value: "SVETLE", label: "Světlé", colors: TEMA_SVETLE, swatch: ["#fdf6e3", "#c9a547"] },
  { value: "MODRE",  label: "Modré",  colors: TEMA_MODRE,  swatch: ["#0f1f35", "#5b9bd5"] },
  { value: "ZELENE", label: "Zelené", colors: TEMA_ZELENE, swatch: ["#0d2018", "#5aaa6f"] },
  { value: "BILA",   label: "Bílé",   colors: TEMA_BILA,   swatch: ["#ffffff", "#c9a547"] },
  { value: "VLASTNI",label: "Vlastní",colors: null,        swatch: ["#555", "#888"] },
];

function defaultPreview(b?: Brozura | null): BrozuraData {
  const tema = (b as any)?.tema || "TMAVE";
  const temaColors = TEMA_OPTIONS.find(t => t.value === tema)?.colors || TEMA_TMAVE;
  return {
    sablona:         (b as any)?.sablona        || "AKCE",
    format:          (b as any)?.format         || "A4",
    orientace:       (b as any)?.orientace      || "PORTRAIT",
    layout:          (b as any)?.layout         || "KLASICKY",
    tema,
    barvaPozadi:     (b as any)?.barvaPozadi    || temaColors.barvaPozadi,
    barvaText:       (b as any)?.barvaText      || temaColors.barvaText,
    barvaAkcentu:    (b as any)?.barvaAkcentu   || temaColors.barvaAkcentu,
    zobrazitLogo:    (b as any)?.zobrazitLogo   ?? true,
    zobrazitPaticku: (b as any)?.zobrazitPaticku ?? true,
    nadpis:          b?.nadpis                  || "Název akce",
    podnadpis:       b?.podnadpis               || "",
    popis:           b?.popis                   || "",
    datum:           b?.datum                   || "",
    cas:             b?.cas                     || "",
    misto:           b?.misto                   || "",
    cena:            b?.cena                    || "",
    kontakt:         b?.kontakt                 || "",
    web:             b?.web                     || "",
    fotoUrl:         b?.fotoUrl                 || "",
    mapUrl:          (b as any)?.mapUrl         || "",
  };
}

const initialState: BrozuraFormState = {};

export function BrozuraForm({ brozura }: { brozura?: Brozura | null }) {
  const router = useRouter();
  const isEditing = !!brozura;
  const action = isEditing ? updateBrozura.bind(null, brozura.id) : createBrozura;
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [preview, setPreview] = useState<BrozuraData>(() => defaultPreview(brozura));

  const upd = useCallback((field: keyof BrozuraData, value: string | boolean) => {
    setPreview(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleTema = useCallback((tema: string) => {
    const opt = TEMA_OPTIONS.find(t => t.value === tema);
    if (opt?.colors) {
      setPreview(prev => ({ ...prev, tema, ...opt.colors }));
    } else {
      setPreview(prev => ({ ...prev, tema }));
    }
  }, []);

  useEffect(() => {
    if (state.success) {
      if (state.id) router.push(`/admin/brozury/${state.id}`);
      else router.push("/admin/brozury");
    }
  }, [state.success, state.id, router]);

  return (
    <div className="flex gap-6 min-h-0">
      {/* Form */}
      <div className="flex-1 min-w-0 overflow-y-auto">
        <form action={formAction} className="space-y-5 pb-12">
          {/* Hidden state fields */}
          <input type="hidden" name="tema"              value={preview.tema} />
          <input type="hidden" name="layout"            value={preview.layout} />
          <input type="hidden" name="orientace"         value={preview.orientace} />
          <input type="hidden" name="barvaPozadi"       value={preview.barvaPozadi} />
          <input type="hidden" name="barvaText"         value={preview.barvaText} />
          <input type="hidden" name="barvaAkcentu"      value={preview.barvaAkcentu} />
          <input type="hidden" name="zobrazitLogo"      value={preview.zobrazitLogo ? "true" : "false"} />
          <input type="hidden" name="zobrazitPaticku"   value={preview.zobrazitPaticku ? "true" : "false"} />

          {state.error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">{state.error}</div>
          )}

          {/* Základní */}
          <Section title="Základní nastavení">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label>Interní název</Label>
                <input name="nazev" required defaultValue={brozura?.nazev} placeholder="např. Zvěřinové hody – říjen 2025" className="input-field" />
                <p className="text-xs text-gray-400 mt-1">Viditelný pouze v adminu</p>
              </div>
              <div>
                <Label>Šablona</Label>
                <select name="sablona" defaultValue={(brozura as any)?.sablona || "AKCE"} onChange={e => upd("sablona", e.target.value)} className="input-field">
                  {SABLONA_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div>
                <Label>Kategorie</Label>
                <select name="kategorie" defaultValue={(brozura as any)?.kategorie || "OSTATNI"} className="input-field">
                  {KATEGORIE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              {isEditing && (
                <div>
                  <Label>Stav</Label>
                  <select name="stav" defaultValue={(brozura as any)?.stav} className="input-field">
                    {STAV_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              )}
            </div>
          </Section>

          {/* Brand prvky */}
          <Section title="Logo a patička">
            <div className="space-y-4">
              <p className="text-xs text-gray-500">Logo se zobrazí absolutně v horní části brožury, patička obsahuje kontaktní informace hotelu.</p>
              <div className="flex gap-4">
                <Toggle
                  label="Zobrazit logo"
                  value={preview.zobrazitLogo}
                  onChange={v => upd("zobrazitLogo", v)}
                  description="/images/logo.webp"
                />
                <Toggle
                  label="Zobrazit patičku"
                  value={preview.zobrazitPaticku}
                  onChange={v => upd("zobrazitPaticku", v)}
                  description="Tel. · Email · Adresa · FB · IG"
                />
              </div>
            </div>
          </Section>

          {/* Vzhled */}
          <Section title="Vzhled a layout">
            <div className="space-y-5">
              {/* Téma */}
              <div>
                <Label>Barevné téma</Label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {TEMA_OPTIONS.map(t => (
                    <button key={t.value} type="button" onClick={() => handleTema(t.value)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border-2 transition-all text-sm ${
                        preview.tema === t.value ? "border-primary-500 bg-primary-50" : "border-gray-200 hover:border-gray-300"
                      }`}>
                      <div className="flex gap-1">
                        <div className="w-3.5 h-3.5 rounded-full border border-gray-200" style={{ background: t.swatch[0] }} />
                        <div className="w-3.5 h-3.5 rounded-full border border-gray-200" style={{ background: t.swatch[1] }} />
                      </div>
                      <span className="text-xs font-medium text-gray-700">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color pickers */}
              <div>
                <Label>Vlastní barvy</Label>
                <div className="grid grid-cols-3 gap-3 mt-1">
                  <ColorPicker label="Pozadí" value={preview.barvaPozadi} onChange={v => upd("barvaPozadi", v)} />
                  <ColorPicker label="Text" value={preview.barvaText} onChange={v => upd("barvaText", v)} />
                  <ColorPicker label="Akcent" value={preview.barvaAkcentu} onChange={v => upd("barvaAkcentu", v)} />
                </div>
              </div>

              {/* Layout */}
              <div>
                <Label>Layout</Label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {LAYOUT_OPTIONS.map(l => (
                    <button key={l.value} type="button" onClick={() => upd("layout", l.value)}
                      className={`text-left px-3 py-2.5 rounded-lg border-2 transition-all ${
                        preview.layout === l.value ? "border-primary-500 bg-primary-50" : "border-gray-200 hover:border-gray-300"
                      }`}>
                      <div className="text-xs font-semibold text-gray-800">{l.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{l.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Format + Orientace */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Formát</Label>
                  <select name="format" value={preview.format} onChange={e => upd("format", e.target.value)} className="input-field">
                    {FORMAT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <div>
                  <Label>Orientace</Label>
                  <div className="flex gap-2 mt-1">
                    {[{ value: "PORTRAIT", label: "↕ Na výšku" }, { value: "LANDSCAPE", label: "↔ Na šírku" }].map(o => (
                      <button key={o.value} type="button" onClick={() => upd("orientace", o.value)}
                        className={`flex-1 text-xs px-3 py-2.5 rounded-lg border-2 transition-all font-medium ${
                          preview.orientace === o.value ? "border-primary-500 bg-primary-50 text-primary-700" : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}>
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Obsah */}
          <Section title="Obsah brožury">
            <div className="space-y-4">
              <div>
                <Label required>Hlavní nadpis</Label>
                <input name="nadpis" required defaultValue={brozura?.nadpis} placeholder="např. Zvěřinové hody 2025"
                  className="input-field text-base font-medium" onChange={e => upd("nadpis", e.target.value)} />
              </div>
              <div>
                <Label>Podnadpis</Label>
                <input name="podnadpis" defaultValue={brozura?.podnadpis || ""} placeholder="např. Tradiční podzimní slavnost"
                  className="input-field" onChange={e => upd("podnadpis", e.target.value)} />
              </div>
              <div>
                <Label>Popis / Program</Label>
                <textarea name="popis" rows={4} defaultValue={brozura?.popis || ""} placeholder="Stručný popis akce…"
                  className="input-field resize-none" onChange={e => upd("popis", e.target.value)} />
              </div>
            </div>
          </Section>

          {/* Datum, místo */}
          <Section title="Datum, místo a cena">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Datum</Label>
                <input name="datum" defaultValue={brozura?.datum || ""} placeholder="např. 15. 10. 2025" className="input-field" onChange={e => upd("datum", e.target.value)} />
              </div>
              <div>
                <Label>Čas</Label>
                <input name="cas" defaultValue={brozura?.cas || ""} placeholder="např. od 18:00" className="input-field" onChange={e => upd("cas", e.target.value)} />
              </div>
              <div>
                <Label>Místo</Label>
                <input name="misto" defaultValue={brozura?.misto || ""} placeholder="např. Restaurace U Šimáka" className="input-field" onChange={e => upd("misto", e.target.value)} />
              </div>
              <div>
                <Label>Cena / vstupné</Label>
                <input name="cena" defaultValue={brozura?.cena || ""} placeholder="např. 350 Kč / zdarma" className="input-field" onChange={e => upd("cena", e.target.value)} />
              </div>
              <div className="col-span-2">
                <Label>Kontakt pro rezervace</Label>
                <input name="kontakt" defaultValue={brozura?.kontakt || ""} placeholder="např. +420 777 000 111" className="input-field" onChange={e => upd("kontakt", e.target.value)} />
              </div>
            </div>
          </Section>

          {/* Média */}
          <Section title="Fotografie a QR kód">
            <div className="space-y-4">
              <div>
                <input type="hidden" name="fotoUrl" value={preview.fotoUrl || ""} />
                <GaleriePicker
                  label="Hlavní fotografie"
                  value={preview.fotoUrl || ""}
                  onChange={v => upd("fotoUrl", v)}
                  placeholder="Vybrat z galerie…"
                />
              </div>
              <div>
                <Label>URL pro QR kód</Label>
                <input name="web" type="url" defaultValue={brozura?.web || ""} placeholder="https://hotel-simak.cz/akce/…" className="input-field" onChange={e => upd("web", e.target.value)} />
              </div>
            </div>
          </Section>

          {/* Mapa */}
          <Section title="Mapa / trasa">
            <div className="space-y-3">
              <p className="text-xs text-gray-500">Nahraj screenshot mapy do galerie a vyber ho zde.</p>
              <input type="hidden" name="mapUrl" value={preview.mapUrl || ""} />
              <GaleriePicker
                label="Mapa / trasa"
                value={preview.mapUrl || ""}
                onChange={v => upd("mapUrl", v)}
                placeholder="Vybrat screenshot mapy z galerie…"
              />
            </div>
          </Section>

          {/* Tagy */}
          <Section title="Tagy">
            <Label>Tagy (oddělené čárkou)</Label>
            <input name="tagy" defaultValue={(brozura as any)?.tagy?.join(", ") || ""} placeholder="zvěřina, podzim, 2025" className="input-field" />
          </Section>

          {/* Akce */}
          <div className="flex items-center gap-3 pt-2">
            <button type="submit" disabled={isPending} className="btn-primary disabled:opacity-60 flex items-center gap-2">
              {isPending
                ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Ukládám…</>
                : isEditing ? "Uložit změny" : "Vytvořit brožuru"}
            </button>
            <button type="button" onClick={() => router.back()} className="btn-outline">Zrušit</button>
            {isEditing && (
              <div className="flex items-center gap-2 ml-auto">
                <a href={`/api/brozury/${brozura.id}/pdf`}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg px-4 py-2.5 hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a1 1 0 001 1h16a1 1 0 001-1v-3"/></svg>
                  PDF
                </a>

              </div>
            )}
          </div>
        </form>
      </div>

      {/* Sticky preview */}
      <div className="w-[360px] flex-shrink-0">
        <div className="sticky top-6">
          <BrozuraNahled data={preview} />
        </div>
      </div>
    </div>
  );
}

// Sub-components
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

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {children}{required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  );
}

function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-gray-500">{label}</span>
      <div className="flex items-center gap-2">
        <input type="color" value={value} onChange={e => onChange(e.target.value)}
          className="w-10 h-9 rounded border border-gray-200 cursor-pointer p-0.5 bg-white" />
        <input type="text" value={value} onChange={e => onChange(e.target.value)}
          className="flex-1 text-xs border border-gray-200 rounded px-2 py-1.5 font-mono focus:outline-none focus:ring-1 focus:ring-primary-400" />
      </div>
    </div>
  );
}

function Toggle({ label, value, onChange, description }: {
  label: string; value: boolean; onChange: (v: boolean) => void; description?: string;
}) {
  return (
    <div
      className={`flex-1 flex items-center justify-between px-4 py-3 rounded-lg border-2 cursor-pointer transition-all ${
        value ? "border-primary-400 bg-primary-50" : "border-gray-200 bg-gray-50"
      }`}
      onClick={() => onChange(!value)}
    >
      <div>
        <div className="text-sm font-medium text-gray-800">{label}</div>
        {description && <div className="text-xs text-gray-400 mt-0.5">{description}</div>}
      </div>
      <div className={`w-10 h-5 rounded-full transition-colors relative ${value ? "bg-primary-500" : "bg-gray-300"}`}>
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${value ? "left-5" : "left-0.5"}`} />
      </div>
    </div>
  );
}
