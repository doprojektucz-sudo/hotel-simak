"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface Obrazek {
  id: string;
  nazev: string;
  popis: string | null;
  url: string;
  velikost: number;
  typ: string;
  tagy: string[];
}

interface GaleriePickerProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
}

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function GaleriePicker({ label, value, onChange, placeholder }: GaleriePickerProps) {
  const [open, setOpen] = useState(false);
  const [obrazky, setObrazky] = useState<Obrazek[]>([]);
  const [loading, setLoading] = useState(false);
  const [hledani, setHledani] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Load gallery when modal opens
  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch("/api/galerie/list")
      .then(r => r.json())
      .then(data => { setObrazky(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [open]);

  const handleUpload = useCallback(async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    const formData = new FormData();
    Array.from(files).forEach(f => formData.append("files", f));
    try {
      const res = await fetch("/api/galerie", { method: "POST", body: formData });
      const data = await res.json();
      if (data.results?.length) {
        setObrazky(prev => [...data.results, ...prev]);
      }
    } catch {}
    setUploading(false);
  }, []);

  const filtrovane = obrazky.filter(o =>
    !hledani ||
    o.nazev.toLowerCase().includes(hledani.toLowerCase()) ||
    o.popis?.toLowerCase().includes(hledani.toLowerCase())
  );

  const handleSelect = (url: string) => {
    onChange(url);
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>

      {/* Field */}
      <div className="flex gap-2">
        {/* Preview + URL */}
        <div
          className="flex-1 flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2 cursor-pointer hover:border-primary-400 hover:bg-primary-50/30 transition-colors bg-white"
          onClick={() => setOpen(true)}
        >
          {value ? (
            <>
              <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 bg-gray-100">
                <img src={value} alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.opacity = "0.3"; }} />
              </div>
              <span className="text-sm text-gray-700 truncate flex-1 font-mono">{value.split("/").pop()}</span>
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                title="Odstranit"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded border-2 border-dashed border-gray-300 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm text-gray-400">{placeholder || "Vybrat z galerie…"}</span>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors whitespace-nowrap"
        >
          {value ? "Změnit" : "Galerie"}
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Vybrat obrázek</h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="flex items-center gap-1.5 text-sm bg-gray-900 text-white rounded-lg px-3 py-1.5 hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  {uploading ? "Nahrávám…" : "Nahrát"}
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={e => handleUpload(e.target.files)}
                />
                <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 p-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="px-5 py-3 border-b border-gray-100">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Hledat…"
                  value={hledani}
                  onChange={e => setHledani(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
                  autoFocus
                />
              </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-4">
              {loading && (
                <div className="flex items-center justify-center py-12 text-gray-400">
                  <svg className="w-6 h-6 animate-spin mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Načítám…
                </div>
              )}

              {!loading && filtrovane.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-3">🖼️</div>
                  <p className="text-gray-500 text-sm">
                    {obrazky.length === 0
                      ? "Galerie je prázdná. Nahraj první obrázky."
                      : "Žádný obrázek neodpovídá hledání."}
                  </p>
                </div>
              )}

              {!loading && filtrovane.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                  {filtrovane.map(o => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => handleSelect(o.url)}
                      className={`group relative rounded-xl overflow-hidden border-2 transition-all hover:shadow-md ${
                        value === o.url
                          ? "border-primary-500 ring-2 ring-primary-300"
                          : "border-transparent hover:border-primary-300"
                      }`}
                    >
                      <div className="aspect-square bg-gray-100">
                        <img
                          src={o.url}
                          alt={o.popis || o.nazev}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-150"
                          loading="lazy"
                        />
                      </div>
                      {value === o.url && (
                        <div className="absolute top-1 right-1 bg-primary-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-xs truncate">{formatSize(o.velikost)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {value && (
              <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between bg-gray-50 rounded-b-2xl">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded overflow-hidden bg-gray-200">
                    <img src={value} alt="" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm text-gray-600 font-mono truncate max-w-xs">{value.split("/").pop()}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Potvrdit
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
