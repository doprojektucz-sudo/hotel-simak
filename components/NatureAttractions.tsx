"use client";

import { Sparkles, ArrowRight, Mountain, Trees, Waves, MapPin, Camera } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const natureAttractions = [
    {
        id: "velke-darko",
        name: "Velké Dářko",
        subtitle: '"Moře Vysočiny"',
        description: "Největší rybník Českomoravské vrchoviny s rozlohou přes 206 hektarů. Oblíbené místo pro koupání, vodní sporty a relaxaci u vody.",
        image: "/images/darko.webp",
        distance: "3 km",
        badge: "Největší rybník",
        badgeColor: "bg-blue-500/80",
        icon: Waves,
        features: ["Koupání", "Vodní sporty", "Pláže", "Občerstvení"],
        moreInfo: "/okoli/velke-darko",
    },
    {
        id: "zdarske-vrchy",
        name: "Žďárské vrchy",
        subtitle: "CHKO",
        description: "Chráněná krajinná oblast s rozmanitou přírodou, desítkami turistických tras a panoramatickými výhledy na celou Vysočinu.",
        image: "/images/attractions/zdarske-vrchy.jpg",
        distance: "V oblasti",
        badge: "CHKO",
        badgeColor: "bg-green-500/80",
        icon: Mountain,
        features: ["Turistika", "Rozhledny", "Naučné stezky"],
        moreInfo: "/okoli/zdarske-vrchy",
    },
    {
        id: "raseliniste",
        name: "Radostínské rašeliniště",
        subtitle: "Národní přírodní rezervace",
        description: "Unikátní ekosystém připomínající severskou tajgu s naučnou stezkou a vzácnou flórou včetně masožravých rostlin.",
        image: "/images/attractions/raseliniste.jpg",
        distance: "1.5 km",
        badge: "NPR",
        badgeColor: "bg-amber-500/80",
        icon: Trees,
        features: ["Naučná stezka", "Vzácná flora", "Fotogenické"],
        moreInfo: "/okoli/raseliniste",
    },
    {
        id: "deviti-skaly",
        name: "Devět skal",
        subtitle: "Nejvyšší vrchol",
        description: "S 836 m n. m. nejvyšší hora Žďárských vrchů s kamenným mořem a nezapomenutelnými výhledy.",
        image: "/images/attractions/devet-skal.jpg",
        distance: "12 km",
        badge: "836 m n.m.",
        badgeColor: "bg-purple-500/80",
        icon: Mountain,
        features: ["Výhledy", "Kamenné moře", "Turistika"],
        moreInfo: "/okoli/devet-skal",
    },
];

export default function NatureAttractionsSection() {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    return (
        <section className="py-20 md:py-32 bg-white relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-20" />

            <div className="container-custom relative">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-2 bg-secondary-50 text-secondary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <Sparkles className="w-4 h-4" />
                        <span>Přírodní krásy</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Objevte jedinečnou přírodu
                        <br />
                        <span className="bg-gradient-to-r from-secondary-600 to-primary-600 bg-clip-text text-transparent">
                            Žďárských vrchů
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Od největšího rybníka Českomoravské vrchoviny až po tajemná
                        rašeliniště připomínající severskou tajgu
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {/* Velké Dářko - Large card spanning 2 columns and 2 rows */}
                    <div
                        className="lg:col-span-2 lg:row-span-2 group relative rounded-3xl overflow-hidden cursor-pointer min-h-[400px] lg:min-h-[520px] shadow-xl"
                        onMouseEnter={() => setHoveredCard("velke-darko")}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 z-10" />
                        <Image
                            src="/images/darko.webp"
                            alt="Velké Dářko - největší rybník Vysočiny"
                            fill
                            className={`object-cover transition-transform duration-700 ${hoveredCard === "velke-darko" ? "scale-110" : "scale-100"
                                }`}
                        />
                        <div className="absolute inset-0 z-20 p-6 md:p-8 flex flex-col justify-end">
                            <div className="flex items-center gap-2 mb-3 flex-wrap">
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                                    3 km od hotelu
                                </span>
                                <span className="px-3 py-1 bg-blue-500/80 backdrop-blur-sm rounded-full text-white text-sm font-medium flex items-center gap-1">
                                    <Waves className="w-3 h-3" />
                                    Největší rybník
                                </span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                Velké Dářko
                            </h3>
                            <p className="text-white/80 text-lg mb-2">"Moře Vysočiny"</p>
                            <p className="text-white/70 max-w-lg leading-relaxed mb-4">
                                Největší rybník Českomoravské vrchoviny s rozlohou přes 206 hektarů.
                                Oblíbené místo pro koupání, vodní sporty a relaxaci.
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {["Koupání", "Vodní sporty", "Pláže"].map((feature) => (
                                    <span
                                        key={feature}
                                        className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white"
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>
                            <Link
                                href="/okoli/velke-darko"
                                className={`inline-flex items-center gap-2 text-white font-medium transition-all duration-300 ${hoveredCard === "velke-darko"
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-4"
                                    }`}
                            >
                                <span>Zjistit více</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Žďárské vrchy - Tall card */}
                    <div
                        className="lg:row-span-2 group relative rounded-3xl overflow-hidden cursor-pointer min-h-[300px] lg:min-h-full shadow-xl"
                        onMouseEnter={() => setHoveredCard("zdarske-vrchy")}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
                        <Image
                            src="/images/vrchy.webp"
                            alt="Žďárské vrchy"
                            fill
                            className={`object-cover transition-transform duration-700 ${hoveredCard === "zdarske-vrchy" ? "scale-110" : "scale-100"
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
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                    Žďárské vrchy
                                </h3>
                                <p className="text-white/70 text-sm leading-relaxed mb-4">
                                    Chráněná krajinná oblast s rozmanitou přírodou,
                                    desítkami turistických tras a panoramatickými výhledy.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {["Turistika", "Rozhledny", "Naučné stezky"].map((feature) => (
                                        <span
                                            key={feature}
                                            className="text-xs bg-white/15 backdrop-blur-sm px-2 py-1 rounded-full text-white/90"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Radostínské rašeliniště - Medium card */}
                    <div
                        className="group relative rounded-3xl overflow-hidden cursor-pointer min-h-[250px] shadow-xl"
                        onMouseEnter={() => setHoveredCard("raseliniste")}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
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
                                <span className="text-white/60 text-xs flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    1.5 km
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">
                                Radostínské rašeliniště
                            </h3>
                            <p className="text-white/70 text-sm line-clamp-2">
                                Unikátní ekosystém s naučnou stezkou a vzácnou flórou
                            </p>
                        </div>
                    </div>

                    {/* Devět skal - Medium card */}
                    <div
                        className="group relative rounded-3xl overflow-hidden cursor-pointer min-h-[250px] shadow-xl"
                        onMouseEnter={() => setHoveredCard("devet-skal")}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                        <Image
                            src="/images/reka.webp"
                            alt="Devět skal"
                            fill
                            className={`object-cover transition-transform duration-700 ${hoveredCard === "devet-skal" ? "scale-110" : "scale-100"
                                }`}
                        />
                        <div className="absolute inset-0 z-20 p-5 flex flex-col justify-end">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-white/60 text-xs flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    2 km
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">
                                Rybník Řeka
                            </h3>
                            <p className="text-white/70 text-sm line-clamp-2">
                                Velký rybník jižně od Krucemburku s travnatou pláží ideální pro koupání.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}