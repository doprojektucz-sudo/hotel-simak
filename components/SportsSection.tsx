"use client";

import { Bike, ArrowRight, MapPin, Footprints, Snowflake, PersonStanding } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const sportsActivities = [
    {
        id: "cyklotrasy",
        name: "Cykloturistika",
        subtitle: "Síť značených tras",
        description: "Stovky kilometrů cyklotras pro všechny úrovně zdatnosti. Od lehkých rodinných výletů až po náročné horské trasy.",
        image: "/images/sports/cyklotrasy.jpg",
        distance: "Od hotelu",
        badge: "Populární",
        badgeColor: "bg-orange-500/80",
        icon: Bike,
        features: ["Půjčovna kol", "Mapy tras", "E-bike friendly", "Cykloservisy v okolí"],
    },
    {
        id: "turistika",
        name: "Pěší turistika",
        subtitle: "Značené stezky",
        description: "Objevte krásy Vysočiny pěšky. Rozhledny, naučné stezky a přírodní rezervace na dosah.",
        image: "/images/sports/turistika.jpg",
        distance: "Od hotelu",
        badge: "Celoročně",
        badgeColor: "bg-green-500/80",
        icon: Footprints,
        features: ["Značené trasy", "Rozhledny", "Naučné stezky"],
    },
    {
        id: "lyzovani",
        name: "Lyžování",
        subtitle: "Zimní radovánky",
        description: "V zimě se okolí mění v lyžařský ráj. Běžecké tratě přímo od hotelu, sjezdovky do 15 km.",
        image: "/images/sports/lyzovani.jpg",
        distance: "0-15 km",
        badge: "Zima",
        badgeColor: "bg-blue-500/80",
        icon: Snowflake,
        features: ["Běžky od hotelu", "Sjezdovky", "Skibusy"],
    },
    {
        id: "golf",
        name: "Golf",
        subtitle: "Golfové hřiště",
        description: "Profesionální 18jamkové golfové hřiště v krásném prostředí nedaleko hotelu.",
        image: "/images/sports/golf.jpg",
        distance: "8 km",
        badge: "18 jamek",
        badgeColor: "bg-emerald-500/80",
        icon: PersonStanding,
        features: ["Driving range", "Pro shop", "Restaurace"],
    },
    {
        id: "wellness",
        name: "Relaxace & wellness",
        subtitle: "Odpočinek pro tělo",
        description: "Po sportovním dni si dopřejte zasloužený odpočinek v našem wellness nebo okolních aquaparcích.",
        image: "/images/sports/wellness.jpg",
        distance: "V hotelu",
        badge: "Relax",
        badgeColor: "bg-pink-500/80",
        icon: PersonStanding,
        features: ["Sauna", "Masáže", "Aquaparky"],
    },
];

export default function SportsSection() {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    return (
        <section className="py-20 md:py-32 bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
            {/* Decorative backgrounds */}
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 translate-y-1/2" />
            <div className="absolute top-1/2 right-0 w-80 h-80 bg-secondary-100 rounded-full blur-3xl opacity-20 translate-x-1/2" />

            <div className="container-custom relative">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <Bike className="w-4 h-4" />
                        <span>Sportovní vyžití</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Aktivní odpočinek
                        <br />
                        <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                            v nádherné přírodě
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Ať už preferujete kolo, pěší túry nebo zimní sporty -
                        v okolí hotelu si každý najde to své
                    </p>
                </div>

                {/* Bento Grid - Different layout than nature section */}
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6">
                    {/* Cykloturistika - Large featured card */}
                    <div
                        className="md:col-span-4 md:row-span-2 group relative rounded-3xl overflow-hidden cursor-pointer min-h-[400px] md:min-h-[500px] shadow-xl"
                        onMouseEnter={() => setHoveredCard("cyklotrasy")}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
                        <Image
                            src="/images/cyklo.webp"
                            alt="Cykloturistika v okolí"
                            fill
                            className={`object-cover transition-transform duration-700 ${hoveredCard === "cyklotrasy" ? "scale-110" : "scale-100"
                                }`}
                        />
                        <div className="absolute inset-0 z-20 p-6 md:p-10 flex flex-col justify-center max-w-xl">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-3 py-1 bg-orange-500/80 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                                    Populární
                                </span>
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                                    Od hotelu
                                </span>
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-5">
                                <Bike className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                                Cykloturistika
                            </h3>
                            <p className="text-white/80 text-lg leading-relaxed mb-6">
                                Stovky kilometrů cyklotras pro všechny úrovně zdatnosti.
                                Od lehkých rodinných výletů až po náročné horské trasy.
                            </p>
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                {["Půjčovna kol", "Mapy tras", "E-bike friendly", "Cykloservisy"].map((feature) => (
                                    <div
                                        key={feature}
                                        className="flex items-center gap-2 text-white/90 text-sm"
                                    >
                                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                                        {feature}
                                    </div>
                                ))}
                            </div>
                            <Link
                                href="/aktivity/cykloturistika"
                                className={`inline-flex items-center gap-2 text-white font-medium transition-all duration-300 ${hoveredCard === "cyklotrasy"
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-70"
                                    }`}
                            >
                                <span>Objevit cyklotrasy</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>

                    {/* Turistika - Medium tall card */}
                    <div
                        className="md:col-span-2 md:row-span-2 group relative rounded-3xl overflow-hidden cursor-pointer min-h-[300px] shadow-xl"
                        onMouseEnter={() => setHoveredCard("turistika")}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
                        <Image
                            src="/images/udoli.webp"
                            alt="Pěší turistika"
                            fill
                            className={`object-cover transition-transform duration-700 ${hoveredCard === "turistika" ? "scale-110" : "scale-100"
                                }`}
                        />
                        <div className="absolute inset-0 z-20 p-5 md:p-6 flex flex-col justify-between">
                            <span className="self-start px-3 py-1 bg-green-500/80 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                                Celoročně
                            </span>
                            <div>
                                <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                                    <Footprints className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    Pěší turistika
                                </h3>
                                <p className="text-white/70 text-sm leading-relaxed mb-4">
                                    Rozhledny, naučné stezky a přírodní rezervace na dosah.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {["Značené trasy", "Rozhledny"].map((feature) => (
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

                    {/* Lyžování - Wide card */}
                    <div
                        className="md:col-span-3 group relative rounded-3xl overflow-hidden cursor-pointer min-h-[220px] shadow-xl"
                        onMouseEnter={() => setHoveredCard("lyzovani")}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10" />
                        <Image
                            src="/images/lyze.webp"
                            alt="Lyžování"
                            fill
                            className={`object-cover transition-transform duration-700 ${hoveredCard === "lyzovani" ? "scale-110" : "scale-100"
                                }`}
                        />
                        <div className="absolute inset-0 z-20 p-5 md:p-6 flex items-end">
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                                    <Snowflake className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-xl font-bold text-white">
                                            Lyžování
                                        </h3>
                                        <span className="px-2 py-0.5 bg-blue-500/80 backdrop-blur-sm rounded text-white text-xs font-medium">
                                            Zima
                                        </span>
                                    </div>
                                    <p className="text-white/70 text-sm">
                                        Běžky přímo od hotelu, sjezdovky do 15 km
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Vodní sporty - Small accent card */}
                    <div
                        className="md:col-span-2 group relative rounded-3xl overflow-hidden cursor-pointer min-h-[220px] shadow-xl"
                        onMouseEnter={() => setHoveredCard("vodni-sporty")}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                        <Image
                            src="/images/vodni-sporty.webp"
                            alt="Kurt"
                            fill
                            className={`object-cover transition-transform duration-700 ${hoveredCard === "vodni-sporty" ? "scale-110" : "scale-100"
                                }`}
                        />
                        <div className="absolute inset-0 z-20 p-5 flex flex-col justify-end">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-white/60 text-xs flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    5 km
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">
                                Vodní sporty
                            </h3>
                            <p className="text-white/70 text-sm">
                                Velké Dářko je rájem pro vodní sporty. Jachting klub nabízí půjčení jachet, windsurfing, loďky a šlapadla.
                            </p>
                        </div>
                    </div>
                    {/* Kurt - Medium card */}
                    <div
                        className="md:col-span-1 group relative rounded-3xl overflow-hidden cursor-pointer min-h-[220px] shadow-xl"
                        onMouseEnter={() => setHoveredCard("golf")}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                        <Image
                            src="/images/kurt.webp"
                            alt="Kurt"
                            fill
                            className={`object-cover transition-transform duration-700 ${hoveredCard === "golf" ? "scale-110" : "scale-100"
                                }`}
                        />
                        <div className="absolute inset-0 z-20 p-5 flex flex-col justify-end">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-white/60 text-xs flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    800 m
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">
                                Tenisový kurt
                            </h3>
                            <p className="text-white/70 text-sm">
                                Profesionální hřiště v krásném prostředí
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}