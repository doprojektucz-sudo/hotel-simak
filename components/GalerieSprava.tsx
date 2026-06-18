"use client";

import { useState, useCallback, useRef } from "react";

interface Obrazek {
  id: string;
  nazev: string;
  popis: string | null;
  url: string;
  velikost: number;
  typ: string;
  tagy: string[];
  createdAt: string | Date;
}

interface GalerieSpravaProps {
  obrazky: Obrazek[];
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function GalerieSprava({ obrazky: initialObrazky }: GalerieSpravaProps) {
  const [obrazky, setObrazky] = useState(initialObrazky);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string[]>([]);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [selected, setSelected] = useState<Obrazek | null>(null);
  const [hledani, setHledani] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const filtrovane = obrazky.filter(o =>
    !hledani ||
    o.nazev.toLowerCase().includes(hledani.toLowerCase()) ||
    o.popis?.toLowerCase().includes(hledani.toLowerCase()) ||
    o.tagy.some(t => t.toLowerCase().includes(hledani.toLowerCase()))
  );

  const uploadFiles = useCallback(async (files: FileList | File[]) => {
    const arr = Array.from(files);
    if (!arr.length) return;

    setUploading(true);
    setUploadProgress([`Nahrávám ${arr.length} soubor${arr.length > 1 ? "y" : ""}…`]);

    const formData = new FormData();
    arr.forEach(f => formData.append("files", f));

    try {
      const res = await fetch("/api/galerie", { method: "POST", body: formData });
      const data = await res.json();

      if (data.results?.length) {
        setObrazky(prev => [...data.results, ...prev]);
        setUploadProgress([`✅ Nahráno ${data.results.length} obrázk${data.results.length === 1 ? "" : "ů"}`]);
      }
      if (data.errors?.length) {
        setUploadProgress(prev => [...prev, ...data.errors.map((e: string) => `⚠️ ${e}`)]);
      }
    } catch {
      setUploadProgress(["❌ Chyba při nahrávání"]);
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress([]), 4000);
    }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm("Smazat obrázek? Tato akce je nevratná.")) return;
    setDeleting(id);
    try {
      await fetch("/api/galerie", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setObrazky(prev => prev.filter(o => o.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch {
      alert("Chyba při mazání");
    } finally {
      setDeleting(null);
    }
  }, [selected]);

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Galerie obrázků</h1>
          <p className="text-sm text-gray-500 mt-1">
            {obrazky.length} obrázk{obrazky.length === 1 ? "" : obrazky.length < 5 ? "y" : "ů"} · celkem {formatSize(obrazky.reduce((s, o) => s + o.velikost, 0))}
          </p>
        </div>
        <button
          onClick={() => fileRef.current?.click()}
          className="btn-primary flex items-center gap-2 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Nahrát obrázky
        </button>
        <input
          ref={fileRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={e => e.target.files && uploadFiles(e.target.files)}
        />
      </div>

      {/* Upload progress */}
      {uploadProgress.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 space-y-1">
          {uploadProgress.map((msg, i) => (
            <p key={i} className="text-sm text-blue-700">{msg}</p>
          ))}
        </div>
      )}

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => {
          e.preventDefault();
          setDragOver(false);
          uploadFiles(e.dataTransfer.files);
        }}
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer ${
          dragOver ? "border-primary-400 bg-primary-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
        }`}
        onClick={() => fileRef.current?.click()}
      >
        <svg className="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-sm text-gray-500">
          {uploading ? "Nahrávám…" : "Přetáhni sem obrázky nebo klikni pro výběr"}
        </p>
        <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP, GIF · max 8 MB / soubor</p>
      </div>

      {/* Search */}
      {obrazky.length > 0 && (
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Hledat podle názvu, popisu nebo tagu…"
            value={hledani}
            onChange={e => setHledani(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
        </div>
      )}

      {/* Empty state */}
      {filtrovane.length === 0 && obrazky.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-200">
          <div className="text-4xl mb-3">🖼️</div>
          <p className="text-gray-500 font-medium">Galerie je prázdná</p>
          <p className="text-sm text-gray-400 mt-1">Nahraj první obrázky pomocí tlačítka nebo přetažením.</p>
        </div>
      )}

      {/* Grid */}
      {filtrovane.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
          {filtrovane.map(o => (
            <div
              key={o.id}
              className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all cursor-pointer"
              onClick={() => setSelected(o)}
            >
              {/* Thumbnail */}
              <div className="aspect-square bg-gray-100 overflow-hidden">
                <img
                  src={o.url}
                  alt={o.popis || o.nazev}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  loading="lazy"
                />
              </div>

              {/* Overlay actions */}
              <div className="absolute top-1.5 right-1.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={e => { e.stopPropagation(); handleCopyUrl(o.url); }}
                  className="bg-black/60 text-white rounded-lg p-1.5 hover:bg-black/80 transition-colors"
                  title="Kopírovat URL"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <button
                  onClick={e => { e.stopPropagation(); handleDelete(o.id); }}
                  disabled={deleting === o.id}
                  className="bg-red-500/80 text-white rounded-lg p-1.5 hover:bg-red-600 transition-colors disabled:opacity-50"
                  title="Smazat"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              {/* Info */}
              <div className="p-2">
                <p className="text-xs font-medium text-gray-700 truncate">{o.popis || o.nazev}</p>
                <p className="text-xs text-gray-400">{formatSize(o.velikost)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900 truncate">{selected.nazev}</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Preview */}
              <div className="rounded-lg overflow-hidden bg-gray-100 max-h-80">
                <img src={selected.url} alt={selected.popis || selected.nazev} className="w-full object-contain max-h-80" />
              </div>

              {/* URL copy */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">URL obrázku</label>
                <div className="flex gap-2">
                  <input
                    readOnly
                    value={selected.url}
                    className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 font-mono text-gray-700"
                  />
                  <button
                    onClick={() => { handleCopyUrl(selected.url); }}
                    className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap"
                  >
                    Kopírovat
                  </button>
                </div>
              </div>

              {/* Meta */}
              <div className="grid grid-cols-3 gap-3 text-sm text-gray-500">
                <div><span className="font-medium text-gray-700">Typ:</span> {selected.typ}</div>
                <div><span className="font-medium text-gray-700">Velikost:</span> {formatSize(selected.velikost)}</div>
                <div><span className="font-medium text-gray-700">Nahráno:</span> {new Date(selected.createdAt).toLocaleDateString("cs-CZ")}</div>
              </div>

              {/* Delete */}
              <div className="flex justify-end pt-2 border-t border-gray-100">
                <button
                  onClick={() => handleDelete(selected.id)}
                  disabled={deleting === selected.id}
                  className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 border border-red-200 rounded-lg px-4 py-2 hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Smazat obrázek
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
