"use client";

import { MapPin, Navigation, Mountain, Trees, ArrowRight, Compass } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const locationCards = [
    {
        id: "darko",
        icon: MapPin,
        title: "Velké Dářko",
        subtitle: '"Moře Vysočiny"',
        description: "Největší rybník Českomoravské vrchoviny nabízí koupání, rybaření a nádherné západy slunce.",
        image: "/images/darko.webp",
        size: "large", // zabírá 2 sloupce
        distance: "3 km",
    },
    {
        id: "cyklo",
        icon: Navigation,
        title: "Cyklotrasy",
        subtitle: "Pro všechny úrovně",
        description: "Desítky kilometrů značených cyklotras přímo od hotelu.",
        image: "/images/cyklo.webp",
        size: "medium",
        distance: "0 km",
    },
    {
        id: "zdarske",
        icon: Mountain,
        title: "Žďárské vrchy",
        subtitle: "CHKO",
        description: "Rozmanitá příroda ideální pro turistiku po celý rok.",
        image: "/images/location/zdarske-vrchy.jpg",
        size: "tall", // vyšší karta
        distance: "V oblasti",
    },
    {
        id: "raseliniste",
        icon: Trees,
        title: "Radostínské rašeliniště",
        subtitle: "NPR",
        description: "Unikátní přírodní rezervace s naučnou stezkou a vzácnou flórou.",
        image: "/images/raselina.webp",
        size: "medium",
        distance: "1.5 km",
    },
];

export default function LocationSection() {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    return (
        <section className="py-20 md:py-32 bg-gradient-to-b from-white via-secondary-50/50 to-white overflow-hidden">
            <div className="container-custom">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 md:mb-16">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-100 rounded-full mb-4">
                            <Compass className="w-4 h-4 text-secondary-600" />
                            <span className="text-sm font-medium text-secondary-700">
                                Srdce Vysočiny
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                            Objevte krásy
                            <span className="block text-secondary-600">Žďárských vrchů</span>
                        </h2>
                        <p className="text-lg text-gray-600">
                            Radostín leží v samém srdci chráněné krajinné oblasti,
                            obklopen lesy, rybníky a přírodními rezervacemi.
                        </p>
                    </div>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
                    {/* Velké Dářko - Large card spanning 2 columns */}
                    <div
                        className="lg:col-span-2 lg:row-span-2 group relative rounded-3xl overflow-hidden cursor-pointer min-h-[400px] lg:min-h-[500px]"
                        onMouseEnter={() => setHoveredCard("darko")}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                        <Image
                            src="/images/darko.webp"
                            alt="Velké Dářko - největší rybník Vysočiny"
                            fill
                            className={`object-cover transition-transform duration-700 ${hoveredCard === "darko" ? "scale-110" : "scale-100"
                                }`}
                        />
                        <div className="absolute inset-0 z-20 p-6 md:p-8 flex flex-col justify-end">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                                    3 km od hotelu
                                </span>
                                <span className="px-3 py-1 bg-secondary-500/80 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                                    Doporučujeme
                                </span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                Velké Dářko
                            </h3>
                            <p className="text-white/80 text-lg mb-1">"Moře Vysočiny"</p>
                            <p className="text-white/70 max-w-md leading-relaxed">
                                Největší rybník Českomoravské vrchoviny nabízí koupání,
                                rybaření a nádherné západy slunce.
                            </p>
                            <div
                            >
                                <a href="https://www.kudyznudy.cz/aktivity/velke-darko" target="_blank" className={`mt-4 flex items-center gap-2 text-white font-medium transition-all duration-300 ${hoveredCard === "darko"
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-4"
                                    }`}>
                                    <span>Zjistit více</span>
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Cyklotrasy - Medium card */}
                    <div
                        className="group relative rounded-3xl overflow-hidden cursor-pointer min-h-[240px]"
                        onMouseEnter={() => setHoveredCard("cyklo")}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
                        <Image
                            src="/images/cyklo.webp"
                            alt="Cyklotrasy v okolí"
                            fill
                            className={`object-cover transition-transform duration-700 ${hoveredCard === "cyklo" ? "scale-110" : "scale-100"
                                }`}
                        />
                        <div className="absolute inset-0 z-20 p-5 flex flex-col justify-end">
                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                                <Navigation className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">Cyklotrasy</h3>
                            <p className="text-white/70 text-sm">
                                Desítky kilometrů značených tras
                            </p>
                        </div>
                    </div>

                    {/* Žďárské vrchy - Tall card */}
                    <div
                        className="lg:row-span-2 group relative rounded-3xl overflow-hidden cursor-pointer min-h-[300px] lg:min-h-full"
                        onMouseEnter={() => setHoveredCard("zdarske")}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                        <Image
                            src="/images/vrchy.webp"
                            alt="Žďárské vrchy"
                            fill
                            className={`object-cover transition-transform duration-700 ${hoveredCard === "zdarske" ? "scale-110" : "scale-100"
                                }`}
                        />
                        <div className="absolute inset-0 z-20 p-5 md:p-6 flex flex-col justify-between">
                            <span className="self-start px-3 py-1 bg-green-500/80 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                                CHKO
                            </span>
                            <div>
                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                                    <Mountain className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    Žďárské vrchy
                                </h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    Chráněná krajinná oblast s rozmanitou přírodou
                                    ideální pro turistiku po celý rok.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Rašeliniště - Medium card */}
                    <div
                        className="group relative rounded-3xl overflow-hidden cursor-pointer min-h-[240px]"
                        onMouseEnter={() => setHoveredCard("raseliniste")}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
                        <Image
                            src="/images/raselina.webp"
                            alt="Radostínské rašeliniště"
                            fill
                            className={`object-cover transition-transform duration-700 ${hoveredCard === "raseliniste" ? "scale-110" : "scale-100"
                                }`}
                        />
                        <div className="absolute inset-0 z-20 p-5 flex flex-col justify-end">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-2 py-0.5 bg-amber-500/80 backdrop-blur-sm rounded text-white text-xs font-medium">
                                    NPR
                                </span>
                                <span className="text-white/60 text-xs">1.5 km</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">
                                Radostínské rašeliniště
                            </h3>
                            <p className="text-white/70 text-sm">
                                Naučná stezka s vzácnou flórou
                            </p>
                        </div>
                    </div>
                </div>

                {/* Map Section - Redesigned */}
                <div className="relative rounded-3xl overflow-hidden bg-gray-900">
                    <div className="grid lg:grid-cols-5">
                        {/* Map */}
                        <div className="lg:col-span-3 aspect-video lg:aspect-auto lg:min-h-[400px]">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2588.7!2d15.874650!3d49.654744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDM5JzE3LjEiTiAxNcKwNTInMjguNyJF!5e0!3m2!1scs!2scz!4v1234567890"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: "grayscale(0.3)" }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Mapa - Hotel U Šimáka"
                                className="min-h-[300px] lg:min-h-full"
                            />
                        </div>

                        {/* Info panel */}
                        <div className="lg:col-span-2 p-8 md:p-10 flex flex-col justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full w-fit mb-6">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-white/80 text-sm">Snadno dostupné</span>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                                Jak se k nám dostanete
                            </h3>

                            <address className="not-italic text-white/70 mb-6 leading-relaxed">
                                <p className="text-lg text-white/90">Hotel U Šimáka</p>
                                <p>Radostín 95</p>
                                <p>591 01 Žďár nad Sázavou</p>
                            </address>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link
                                    href="/kontakt"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold rounded-xl transition-colors"
                                >
                                    <MapPin className="w-4 h-4" />
                                    Kontakt
                                </Link>
                                <a
                                    href="https://maps.google.com/?q=49.654744,15.874650"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors"
                                >
                                    <Navigation className="w-4 h-4" />
                                    Google Maps
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}