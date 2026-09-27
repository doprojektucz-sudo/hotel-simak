"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { CalendarDays, Phone, Gift, Maximize2, Check, Info } from "lucide-react";
import PosterLightbox from "./PosterLightbox";
import { telHref, type SeasonalEvent } from "@/lib/data/seasonal-events";

interface Props {
    events: SeasonalEvent[];
    heading?: string;
    subheading?: string;
    className?: string;
}

export default function SeasonalEventsSection({
    events,
    heading = "Podzimní hody U Šimáka",
    subheading = "Na listopad jsme pro vás připravili dvě tradiční akce. Místa jsou omezená – rezervujte si včas.",
    className = "",
}: Props) {
    const [openEvent, setOpenEvent] = useState<SeasonalEvent | null>(null);
    const close = useCallback(() => setOpenEvent(null), []);

    if (events.length === 0) return null;

    return (
        <section
            id="sezonni-akce"
            className={`relative py-20 md:py-24 bg-[#f6efe3] overflow-hidden scroll-mt-24 ${className}`}
        >
            {/* jemná textura / přechod */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-[#efe4d2] pointer-events-none" />

            <div className="container-custom relative">
                <div className="text-center mb-14">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-900/5 text-secondary-800 text-sm font-medium mb-4 border border-secondary-900/10">
                        <CalendarDays className="w-4 h-4" />
                        Sezónní akce
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-900 mb-4">
                        {heading}
                    </h2>
                    <p className="text-secondary-700 max-w-2xl mx-auto text-lg">{subheading}</p>
                </div>

                <div className={`grid gap-8 ${events.length > 1 ? "lg:grid-cols-2" : "max-w-3xl mx-auto"}`}>
                    {events.map((event) => (
                        <article
                            key={event.slug}
                            id={event.slug}
                            className="scroll-mt-28 group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-500 overflow-hidden flex flex-col sm:flex-row"
                        >
                            {/* Plakát */}
                            <button
                                type="button"
                                onClick={() => setOpenEvent(event)}
                                className="relative sm:w-[44%] shrink-0 aspect-[2/3] sm:aspect-auto overflow-hidden cursor-zoom-in"
                                aria-label={`Zobrazit plakát: ${event.title}`}
                            >
                                <Image
                                    src={event.poster.src}
                                    alt={event.poster.alt}
                                    fill
                                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 44vw, 280px"
                                />
                                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 bg-black/60 backdrop-blur text-white text-xs font-medium px-3 py-1.5 rounded-full opacity-90 group-hover:opacity-100">
                                    <Maximize2 className="w-3.5 h-3.5" />
                                    Zvětšit plakát
                                </span>
                            </button>

                            {/* Obsah */}
                            <div className="flex-1 p-6 md:p-8 flex flex-col">
                                <p
                                    className="text-xs font-semibold uppercase tracking-[0.2em] mb-2"
                                    style={{ color: event.accent }}
                                >
                                    {event.tagline}
                                </p>
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                                    {event.title}
                                </h3>
                                <div
                                    className="inline-flex self-start items-center gap-2 text-white text-sm font-semibold px-3 py-1.5 rounded-lg mb-5"
                                    style={{ backgroundColor: event.accent }}
                                >
                                    <CalendarDays className="w-4 h-4" />
                                    {event.dateLabel}
                                </div>

                                <p className="text-gray-600 mb-5 leading-relaxed">{event.description}</p>

                                <ul className="space-y-2 mb-6">
                                    {event.highlights.map((h) => (
                                        <li key={h} className="flex items-start gap-2 text-sm text-gray-700">
                                            <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: event.accent }} />
                                            {h}
                                        </li>
                                    ))}
                                </ul>

                                {event.note && (
                                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4">
                                        <Info className="w-4 h-4 shrink-0" style={{ color: event.accent }} />
                                        {event.note}
                                    </div>
                                )}

                                {event.vouchers && (
                                    <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4">
                                        <p className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                                            <Gift className="w-4 h-4" style={{ color: event.accent }} />
                                            Dárkové poukázky v hodnotě
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {event.vouchers.map((v) => (
                                                <span
                                                    key={v}
                                                    className="text-sm font-semibold px-3 py-1 rounded-md border bg-white"
                                                    style={{ borderColor: event.accent, color: event.accent }}
                                                >
                                                    {v}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <a
                                    href={telHref(event.phone)}
                                    className="mt-auto inline-flex items-center justify-center gap-2 text-white font-semibold py-3.5 px-6 rounded-xl uppercase text-sm tracking-wider transition-all hover:brightness-110 hover:-translate-y-0.5"
                                    style={{ backgroundColor: event.accent }}
                                >
                                    <Phone className="w-4 h-4" />
                                    Rezervace {event.phone}
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <PosterLightbox event={openEvent} onClose={close} />
        </section>
    );
}
