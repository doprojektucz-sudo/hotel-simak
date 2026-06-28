"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Bike, Mountain, Flame, X, Download, MapPin, Map, ChevronLeft, ChevronRight } from "lucide-react";

const NARC_LABELS: Record<string, string> = {
    LEHKA: "Lehká", STREDNI: "Střední", TEZKA: "Těžká",
};
const NARC_COLORS: Record<string, string> = {
    LEHKA: "text-green-400 bg-green-400/10 border-green-400/30",
    STREDNI: "text-amber-400 bg-amber-400/10 border-amber-400/30",
    TEZKA: "text-red-400   bg-red-400/10   border-red-400/30",
};
const NARC_DOT_COLORS: Record<string, string> = {
    LEHKA: "bg-green-400", STREDNI: "bg-amber-400", TEZKA: "bg-red-400",
};

interface Zastavka {
    id: string; poradi: number; nazev: string;
    popis?: string | null; gps?: string | null;
}
interface Trasa {
    id: string; nadpis: string; podnadpis?: string | null; popis?: string | null;
    trasaCislo?: number | null; trasaKm?: number | null; trasaNarocnost?: string | null;
    trasaPrevyseni?: number | null; trasaTyp?: string | null; trasaPovrch?: string | null;
    mapaMiniUrl?: string | null; mapaTrasyUrl?: string | null; fotoUrl?: string | null;
    gpxUrl?: string | null; zastavky?: Zastavka[];
}

export function CyklotrasySection() {
    const [trasy, setTrasy] = useState<Trasa[]>([]);
    const [aktivni, setAktivni] = useState<Trasa | null>(null);

    useEffect(() => {
        fetch("/api/cyklotrasy")
            .then(r => r.json())
            .then((data: Trasa[]) => setTrasy(data))
            .catch(() => {});
    }, []);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setAktivni(null); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    useEffect(() => {
        document.body.style.overflow = aktivni ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [aktivni]);

    if (!trasy.length) return null;

    const aktivniIndex = aktivni ? trasy.findIndex((t: Trasa) => t.id === aktivni.id) : -1;

    return (
        <>
            <section className="relative py-24 md:py-32 overflow-hidden bg-gray-950">
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-600 rounded-full blur-[100px]" />
                </div>
                <div className="container-custom relative z-10">
                    <div className="text-center mb-16 fade-in-scroll">
                        <div className="inline-flex items-center gap-2 bg-amber-400/15 text-amber-300 px-4 py-2 rounded-full text-sm font-semibold mb-5 border border-amber-400/25">
                            <Bike className="w-4 h-4" />
                            <span>Cyklotrasy z hotelu</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">Objevte okolí na kole</h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Vybrané trasy přímo od hotelu — každá s popisem, mapou a QR kódem pro navigaci v mobilu.
                        </p>
                    </div>

                    <div className="space-y-0">
                        {trasy.map((t: Trasa, index: number) => {
                            const isEven = index % 2 === 0;
                            const foto = t.mapaMiniUrl || t.fotoUrl;
                            const narc = t.trasaNarocnost;
                            return (
                                <article key={t.id} className="fade-in-scroll group">
                                    <div className={`grid md:grid-cols-2 min-h-[400px] ${isEven ? "" : "md:[direction:rtl]"}`}>
                                        <div className="relative overflow-hidden bg-gray-900 cursor-pointer" onClick={() => setAktivni(t)}>
                                            {foto ? (
                                                <>
                                                    <img src={foto} alt={t.nadpis} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                                    <div className={`absolute inset-0 ${isEven ? "bg-gradient-to-r from-transparent via-transparent to-gray-950/80" : "bg-gradient-to-l from-transparent via-transparent to-gray-950/80 [direction:ltr]"}`} />
                                                </>
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                                                    <Bike className="w-20 h-20 text-gray-600" />
                                                </div>
                                            )}
                                            {t.trasaCislo && (
                                                <div className="absolute top-6 left-6 [direction:ltr]">
                                                    <div className="bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">Trasa č. {t.trasaCislo}</div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col justify-center p-10 md:p-14 bg-gray-950 [direction:ltr]">
                                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">{t.nadpis}</h3>
                                            {t.podnadpis && <p className="text-amber-400 font-medium mb-4 italic">{t.podnadpis}</p>}
                                            <div className="flex flex-wrap gap-3 mb-6">
                                                {t.trasaKm && (
                                                    <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
                                                        <Bike className="w-4 h-4 text-amber-400" />
                                                        <span className="text-white font-semibold text-sm">{t.trasaKm} km</span>
                                                    </div>
                                                )}
                                                {t.trasaPrevyseni && (
                                                    <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
                                                        <Mountain className="w-4 h-4 text-amber-400" />
                                                        <span className="text-white font-semibold text-sm">{t.trasaPrevyseni} m</span>
                                                    </div>
                                                )}
                                                {narc && (
                                                    <div className={`flex items-center gap-1.5 border rounded-lg px-3 py-1.5 ${NARC_COLORS[narc] || "text-gray-400 bg-white/5 border-white/10"}`}>
                                                        <Flame className="w-4 h-4" />
                                                        <span className="font-semibold text-sm">{NARC_LABELS[narc] || narc}</span>
                                                    </div>
                                                )}
                                            </div>
                                            {t.popis && <p className="text-gray-400 leading-relaxed mb-8 line-clamp-3">{t.popis}</p>}
                                            <button onClick={() => setAktivni(t)} className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 w-fit group/btn">
                                                <span>Zobrazit trasu</span>
                                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                    {index < trasy.length - 1 && <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />}
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Modal */}
            {aktivni && (
                <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setAktivni(null)}>
                    <div className="bg-gray-900 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-white/10" onClick={e => e.stopPropagation()}>
                        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-gray-900/95 backdrop-blur-sm border-b border-white/10">
                            <div>
                                {aktivni.trasaCislo && <div className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-0.5">Cyklotrasa č. {aktivni.trasaCislo}</div>}
                                <h2 className="text-xl font-bold text-white">{aktivni.nadpis}</h2>
                            </div>
                            <div className="flex items-center gap-1">
                                <button onClick={() => setAktivni(trasy[aktivniIndex - 1])} disabled={aktivniIndex === 0} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 transition-all">
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <span className="text-gray-600 text-sm px-1">{aktivniIndex + 1}/{trasy.length}</span>
                                <button onClick={() => setAktivni(trasy[aktivniIndex + 1])} disabled={aktivniIndex === trasy.length - 1} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 transition-all">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                                <button onClick={() => setAktivni(null)} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all ml-1">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            {(aktivni.mapaTrasyUrl || aktivni.mapaMiniUrl || aktivni.fotoUrl) && (
                                <div className="rounded-xl overflow-hidden border border-white/10 bg-gray-800">
                                    <img src={aktivni.mapaTrasyUrl || aktivni.mapaMiniUrl || aktivni.fotoUrl || ""} alt="Mapa trasy" className="w-full max-h-64 object-cover" />
                                </div>
                            )}

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {aktivni.trasaKm && <StatKarta icon={<Bike className="w-5 h-5 text-amber-400" />} hodnota={`${aktivni.trasaKm} km`} popis="Délka" />}
                                {aktivni.trasaPrevyseni && <StatKarta icon={<Mountain className="w-5 h-5 text-amber-400" />} hodnota={`${aktivni.trasaPrevyseni} m`} popis="Převýšení" />}
                                {aktivni.trasaNarocnost && (
                                    <div className={`border rounded-xl p-4 text-center ${NARC_COLORS[aktivni.trasaNarocnost] || "bg-white/5 border-white/10"}`}>
                                        <div className="flex justify-center gap-1 mb-2">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className={`w-2 h-2 rounded-full ${i <= (aktivni.trasaNarocnost === "LEHKA" ? 1 : aktivni.trasaNarocnost === "STREDNI" ? 2 : 3) ? NARC_DOT_COLORS[aktivni.trasaNarocnost ?? ""] : "bg-gray-600"}`} />
                                            ))}
                                        </div>
                                        <div className="font-bold">{NARC_LABELS[aktivni.trasaNarocnost]}</div>
                                        <div className="text-xs uppercase tracking-wide mt-0.5 opacity-60">Náročnost</div>
                                    </div>
                                )}
                                {aktivni.trasaTyp && <StatKarta icon={<Map className="w-5 h-5 text-amber-400" />} hodnota={aktivni.trasaTyp} popis="Typ" />}
                            </div>

                            {(aktivni.popis || aktivni.trasaPovrch) && (
                                <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-2">
                                    {aktivni.popis && <p className="text-gray-300 leading-relaxed">{aktivni.popis}</p>}
                                    {aktivni.trasaPovrch && <p className="text-gray-500 text-sm">🛤 Povrch: <span className="text-gray-400">{aktivni.trasaPovrch}</span></p>}
                                </div>
                            )}

                            {(aktivni.zastavky?.length ?? 0) > 0 && (
                                <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                                    <h3 className="text-white font-bold mb-4 flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-400" />Zastávky</h3>
                                    <div className="space-y-3">
                                        {aktivni.zastavky!.map((z: Zastavka, i: number) => (
                                            <div key={z.id} className="flex gap-3">
                                                <div className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</div>
                                                <div>
                                                    <div className="text-white font-medium text-sm">{z.nazev}</div>
                                                    {z.popis && <div className="text-gray-500 text-sm mt-0.5">{z.popis}</div>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-4 items-start">
                                {aktivni.gpxUrl && (
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center flex-shrink-0">
                                        <div className="text-gray-400 text-xs mb-2">Načti trasu do mobilu</div>
                                        <img
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(aktivni.gpxUrl.startsWith("/") ? `https://usimaka.cz${aktivni.gpxUrl}` : aktivni.gpxUrl)}&bgcolor=111827&color=c9a547&margin=8`}
                                            alt="QR kód" width={120} height={120} className="rounded-lg mx-auto"
                                        />
                                    </div>
                                )}
                                <div className="flex flex-col gap-3 flex-1 justify-center">
                                    <a href={`/api/brozury/${aktivni.id}/pdf`} className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-5 py-3 rounded-xl transition-all hover:scale-105">
                                        <Download className="w-4 h-4" />Stáhnout brožuru PDF
                                    </a>
                                    {aktivni.gpxUrl && (
                                        <a href={aktivni.gpxUrl.startsWith("/") ? `https://usimaka.cz${aktivni.gpxUrl}` : aktivni.gpxUrl} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-medium px-5 py-3 rounded-xl transition-all">
                                            <Map className="w-4 h-4" />Otevřít v mapách
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function StatKarta({ icon, hodnota, popis }: { icon: React.ReactNode; hodnota: string; popis: string }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="flex justify-center mb-2">{icon}</div>
            <div className="text-white font-bold text-lg capitalize">{hodnota}</div>
            <div className="text-gray-500 text-xs uppercase tracking-wide mt-0.5">{popis}</div>
        </div>
    );
}