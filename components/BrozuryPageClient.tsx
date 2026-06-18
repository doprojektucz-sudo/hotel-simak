"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import type { Brozura } from "@prisma/client";
import { deleteBrozura, archivujBrozuru } from "@/lib/actions/brozury";

const KATEGORIE_LABELS: Record<string, string> = {
  AKCE: "Akce",
  MENU: "Menu",
  UBYTOVANI: "Ubytování",
  SPORTOVNI: "Sportovní",
  OSTATNI: "Ostatní",
};

const STAV_COLORS: Record<string, string> = {
  ROZPRACOVANA: "bg-yellow-100 text-yellow-800",
  HOTOVA: "bg-green-100 text-green-800",
  ARCHIV: "bg-gray-100 text-gray-600",
};

const STAV_LABELS: Record<string, string> = {
  ROZPRACOVANA: "Rozpracovaná",
  HOTOVA: "Hotová",
  ARCHIV: "Archiv",
};

const FORMAT_LABELS: Record<string, string> = {
  A3: "A3",
  A4: "A4",
  A5: "A5",
};

interface BrozuryPageClientProps {
  brozury: Brozura[];
}

export function BrozuryPageClient({ brozury }: BrozuryPageClientProps) {
  const [filtrKategorie, setFiltrKategorie] = useState<string>("VSE");
  const [filtrStav, setFiltrStav] = useState<string>("VSE");
  const [hledani, setHledani] = useState("");
  const [isPending, startTransition] = useTransition();

  const filtrovane = brozury.filter((b) => {
    const matchKat =
      filtrKategorie === "VSE" || b.kategorie === filtrKategorie;
    const matchStav = filtrStav === "VSE" || b.stav === filtrStav;
    const matchSearch =
      !hledani ||
      b.nazev.toLowerCase().includes(hledani.toLowerCase()) ||
      b.nadpis.toLowerCase().includes(hledani.toLowerCase()) ||
      b.tagy.some((t) => t.toLowerCase().includes(hledani.toLowerCase()));
    return matchKat && matchStav && matchSearch;
  });

  const handleDelete = (id: string, nazev: string) => {
    if (!confirm(`Opravdu smazat brožuru „${nazev}"?`)) return;
    startTransition(async () => {
      await deleteBrozura(id);
    });
  };

  const handleArchiv = (id: string) => {
    startTransition(async () => {
      await archivujBrozuru(id);
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Brožury</h1>
          <p className="text-sm text-gray-500 mt-1">
            Vytvářejte tisknutelné propagační materiály
          </p>
        </div>
        <Link
          href="/admin/brozury/nova"
          className="btn-primary flex items-center gap-2 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nová brožura
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-wrap gap-4 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Hledat podle názvu, tagu…"
            value={hledani}
            onChange={(e) => setHledani(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
          />
        </div>

        {/* Kategorie filter */}
        <select
          value={filtrKategorie}
          onChange={(e) => setFiltrKategorie(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
        >
          <option value="VSE">Všechny kategorie</option>
          {Object.entries(KATEGORIE_LABELS).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>

        {/* Stav filter */}
        <select
          value={filtrStav}
          onChange={(e) => setFiltrStav(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
        >
          <option value="VSE">Všechny stavy</option>
          {Object.entries(STAV_LABELS).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>

        <span className="text-sm text-gray-400 ml-auto">
          {filtrovane.length} z {brozury.length}
        </span>
      </div>

      {/* Empty state */}
      {filtrovane.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-200">
          <div className="text-4xl mb-3">📄</div>
          <p className="text-gray-500 font-medium">Žádné brožury nenalezeny</p>
          <p className="text-sm text-gray-400 mt-1">
            {brozury.length === 0
              ? "Začněte vytvořením první brožury."
              : "Zkuste upravit filtr nebo vyhledávání."}
          </p>
          {brozury.length === 0 && (
            <Link href="/admin/brozury/nova" className="btn-primary inline-flex mt-4 text-sm">
              Vytvořit první brožuru
            </Link>
          )}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtrovane.map((b) => (
          <BrozuraKarta
            key={b.id}
            brozura={b}
            onDelete={handleDelete}
            onArchiv={handleArchiv}
            isPending={isPending}
          />
        ))}
      </div>
    </div>
  );
}

function BrozuraKarta({
  brozura,
  onDelete,
  onArchiv,
  isPending,
}: {
  brozura: Brozura;
  onDelete: (id: string, nazev: string) => void;
  onArchiv: (id: string) => void;
  isPending: boolean;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
      {/* Visual preview thumbnail */}
      <div
        className="h-28 relative flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #1c1008 0%, #3a2010 100%)",
        }}
      >
        <div className="absolute inset-2 border border-yellow-600/20 rounded-sm" />
        <div className="text-center px-4">
          <p
            className="text-yellow-400/60 text-xs tracking-widest uppercase mb-1"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Hotel U Šimáka
          </p>
          <p
            className="text-white/90 font-bold leading-tight text-sm"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {brozura.nadpis}
          </p>
          {brozura.datum && (
            <p className="text-white/50 text-xs mt-1">{brozura.datum}</p>
          )}
        </div>
        {/* Format badge */}
        <span className="absolute top-2 right-2 bg-black/40 text-white/70 text-xs px-2 py-0.5 rounded">
          {FORMAT_LABELS[brozura.format]}
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm leading-tight">
              {brozura.nazev}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${STAV_COLORS[brozura.stav]}`}
              >
                {STAV_LABELS[brozura.stav]}
              </span>
              <span className="text-xs text-gray-400">
                {KATEGORIE_LABELS[brozura.kategorie]}
              </span>
            </div>
          </div>
        </div>

        {/* Tags */}
        {brozura.tagy.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {brozura.tagy.slice(0, 3).map((t) => (
              <span key={t} className="bg-gray-100 text-gray-500 text-xs px-1.5 py-0.5 rounded">
                {t}
              </span>
            ))}
            {brozura.tagy.length > 3 && (
              <span className="text-gray-400 text-xs">+{brozura.tagy.length - 3}</span>
            )}
          </div>
        )}

        {/* Date */}
        <p className="text-xs text-gray-400 mb-3">
          Upraveno{" "}
          {new Date(brozura.updatedAt).toLocaleDateString("cs-CZ", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/brozury/${brozura.id}`}
            className="flex-1 text-center text-sm bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Upravit
          </Link>

          <a
            href={`/api/brozury/${brozura.id}/pdf`}
            className="text-sm border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
            title="Stáhnout PDF"
          >
            📄
          </a>
          {brozura.stav !== "ARCHIV" && (
            <button
              onClick={() => onArchiv(brozura.id)}
              disabled={isPending}
              className="text-sm border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              title="Archivovat"
            >
              📦
            </button>
          )}
          <button
            onClick={() => onDelete(brozura.id, brozura.nazev)}
            disabled={isPending}
            className="text-sm border border-red-100 text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
            title="Smazat"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
