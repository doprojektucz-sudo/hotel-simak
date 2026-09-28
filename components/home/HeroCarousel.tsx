"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Phone, CalendarDays, Maximize2, ArrowRight } from "lucide-react";
import { contactInfo } from "@/lib/data/contact";
import { telHref, type SeasonalEvent } from "@/lib/data/seasonal-events";
import PosterLightbox from "@/components/events/PosterLightbox";

interface Slide {
    id: number | string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    primaryCta: {
        text: string;
        href: string;
    };
    secondaryCta?: {
        text: string;
        href: string;
    };
}

const baseSlides: Slide[] = [
    {
        id: 1,
        title: "Vítejte v Hotelu U Šimáka",
        subtitle: "Rodinný hotel v srdci Vysočiny",
        description:
            "Tradiční česká kuchyně, útulné ubytování a nezapomenutelné zážitky v nádherné přírodě Žďárských vrchů",
        image: "/images/hero-03.webp",
        primaryCta: { text: "Rezervovat ubytování", href: "/ubytovani" },
        secondaryCta: { text: "Prohlédnout menu", href: "/restaurace" },
    },
    {
        id: 2,
        title: "Vynikající česká kuchyně",
        subtitle: "Restaurace U Šimáka",
        description:
            "Vychutnejte si autentické pokrmy české kuchyně připravované z čerstvých surovin. Pilsner Urquell, Bernard a pravá čepovaná Kofola.",
        image: "/images/hero-02.webp",
        primaryCta: { text: "Prohlédnout menu", href: "/restaurace" },
        secondaryCta: { text: "Rezervovat stůl", href: "/kontakt" },
    },
    {
        id: 3,
        title: "Pohodlné ubytování",
        subtitle: "Moderní i klasické pokoje",
        description:
            "Útulné pokoje s vlastním sociálním zařízením, Smart-TV a Wi-Fi zdarma. Ideální základna pro výlety do Žďárských vrchů.",
        image: "/images/hero-01.webp",
        primaryCta: { text: "Zobrazit pokoje", href: "/ubytovani" },
        secondaryCta: { text: "Kontaktovat nás", href: "/kontakt" },
    },
];

/** Snímek je buď klasický (fotka + text), nebo sezónní akce (plakát). */
type AnySlide = ({ kind: "base" } & Slide) | ({ kind: "event"; id: string } & { event: SeasonalEvent });

interface HeroCarouselProps {
    /** Aktivní sezónní akce – zobrazí se jako první snímky */
    events?: SeasonalEvent[];
}

export default function HeroCarousel({ events = [] }: HeroCarouselProps) {
    const slides: AnySlide[] = [
        ...events.map((event) => ({ kind: "event" as const, id: `event-${event.slug}`, event })),
        ...baseSlides.map((s) => ({ kind: "base" as const, ...s })),
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [lightboxEvent, setLightboxEvent] = useState<SeasonalEvent | null>(null);
    const closeLightbox = useCallback(() => setLightboxEvent(null), []);
    const [progress, setProgress] = useState(0);
    const touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setProgress(0);
        // Při otevřeném plakátu se carousel zastaví
        if (lightboxEvent) return;
        const progressInterval = setInterval(() => {
            setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
        }, 100);
        const slideTimer = setTimeout(() => {
            handleNextSlide();
        }, 10000);
        return () => {
            clearInterval(progressInterval);
            clearTimeout(slideTimer);
        };
    }, [currentSlide, lightboxEvent]);

    const handleNextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const handlePrevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    const goToSlide = (index: number) => { if (index !== currentSlide) setCurrentSlide(index); };
    const scrollToContent = () => window.scrollTo({ top: window.innerHeight, behavior: "smooth" });

    const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
    const handleTouchMove = (e: React.TouchEvent) => { touchEndX.current = e.touches[0].clientX; };
    const handleTouchEnd = () => {
        const distance = touchStartX.current - touchEndX.current;
        if (Math.abs(distance) < 50) return;
        distance > 0 ? handleNextSlide() : handlePrevSlide();
        touchStartX.current = 0;
        touchEndX.current = 0;
    };

    return (
        <section
            className="relative h-screen overflow-hidden"
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Background Slides */}
            <div className="absolute inset-0">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                            }`}
                    >
                        <div className="relative w-full h-full overflow-hidden">
                            {slide.kind === "event" ? (
                                <>
                                    {/* Rozmazaný plakát jako atmosférické pozadí */}
                                    <Image
                                        src={slide.event.poster.src}
                                        alt=""
                                        aria-hidden
                                        fill
                                        priority={index === 0}
                                        loading={index === 0 ? undefined : "lazy"}
                                        className="object-cover object-bottom scale-125 blur-2xl"
                                        sizes="50vw"
                                        quality={40}
                                    />
                                    <div
                                        className="absolute inset-0 opacity-60 mix-blend-multiply"
                                        style={{ backgroundColor: slide.event.accent }}
                                    />
                                </>
                            ) : (
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                // ✅ priority pouze pro první slide — generuje fetchpriority="high" + <link rel="preload">
                                priority={index === 0}
                                // ✅ ostatní slides se nenačítají dokud nejsou potřeba
                                loading={index === 0 ? undefined : "lazy"}
                                className="object-cover animate-ken-burns-infinite"
                                sizes="100vw"
                                // ✅ snížená kvalita pro hero (viditelný rozdíl minimální, úspora ~30%)
                                quality={75}
                            />
                            )}
                        </div>
                    </div>
                ))}
                <div className="absolute inset-0 bg-black/50 z-20" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center justify-center z-30">
                <div className="container-custom">
                    <div className="text-center max-w-4xl mx-auto">
                        {slides.map((slide, index) =>
                            index === currentSlide && slide.kind === "event" ? (
                                <EventSlideContent
                                    key={slide.id}
                                    event={slide.event}
                                    isFirst={index === 0}
                                    onOpenPoster={() => setLightboxEvent(slide.event)}
                                />
                            ) : index === currentSlide && slide.kind === "base" ? (
                                <div key={slide.id} className="animate-fade-in-up">
                                    <div className="flex justify-center gap-1 mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 text-primary-400 fill-current" viewBox="0 0 20 20">
                                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <h4 className="text-primary-300 font-semibold mb-4 text-xl uppercase tracking-widest animate-fade-in-up animation-delay-200">
                                        {slide.subtitle}
                                    </h4>
                                    <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up animation-delay-400">
                                        {slide.title}
                                    </h1>
                                    <p className="text-white/90 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto animate-fade-in-up animation-delay-600">
                                        {slide.description}
                                    </p>
                                    <div className="animate-fade-in-up animation-delay-800">
                                        <Link
                                            href={slide.primaryCta.href}
                                            className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-10 uppercase text-sm tracking-widest transition-all duration-300 group hover:scale-105"
                                        >
                                            {slide.primaryCta.text}
                                        </Link>
                                    </div>
                                </div>
                            ) : null
                        )}
                    </div>
                </div>
            </div>

            {/* ✅ TOP firma 2025 badge — staženo lokálně, žádná externí závislost při načítání */}
            {/* AKCE: stáhněte SVG z https://www.firmy.cz/top-firma/2025.svg */}
            {/* a uložte jako /public/images/top-firma-2025.svg */}
            {/* Pak odstraňte loading="lazy" — badge je viditelný ihned */}
            <div className="absolute bottom-10 right-6 z-40">
                <a
                    href="https://www.firmy.cz/detail/277496-hotel-u-simaka-radostin.html"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        src="/images/top-firma-2025.svg"  // ← lokální kopie místo externí URL
                        alt="TOP firma 2025"
                        width={128}
                        height={120}
                        // ✅ loading="lazy" — badge není LCP element, načte se až po hlavním obsahu
                        loading="lazy"
                        className="drop-shadow-lg h-16 w-16 md:h-32 md:w-32"
                    />
                </a>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 flex gap-4">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className="group relative"
                        aria-label={`Snímek ${index + 1}`}
                    >
                        <div
                            className={`relative overflow-hidden transition-all hover:cursor-pointer duration-300 ${index === currentSlide
                                    ? "w-16 h-2 bg-white"
                                    : "w-12 h-2 bg-white/40 group-hover:bg-white/60"
                                }`}
                        >
                            {index === currentSlide && (
                                <div
                                    className="absolute inset-0 bg-primary-500 origin-left transition-transform duration-100"
                                    style={{ transform: `scaleX(${progress / 100})` }}
                                />
                            )}
                        </div>
                    </button>
                ))}
            </div>

            {/* Reservation Button */}
            <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:block bg-primary-600 hover:bg-primary-700 text-white py-6 px-4 transition-all duration-300 group hover:px-6"
            >
                <div className="flex flex-col items-center gap-2">
                    <Phone className="w-6 h-6" />
                    <div className="text-xs font-semibold uppercase tracking-wider writing-mode-vertical">
                        <div className="transform whitespace-nowrap">Rezervace</div>
                    </div>
                </div>
            </a>

            <PosterLightbox event={lightboxEvent} onClose={closeLightbox} />

            {/* Scroll Down */}
            <button
                onClick={scrollToContent}
                className="absolute bottom-16 left-1/2 -translate-x-1/2 z-40 text-white animate-bounce"
                aria-label="Scroll dolů"
            >
                <ChevronDown className="w-10 h-10" />
            </button>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* Snímek sezónní akce                                                 */
/* ------------------------------------------------------------------ */

function EventSlideContent({
    event,
    isFirst,
    onOpenPoster,
}: {
    event: SeasonalEvent;
    isFirst: boolean;
    onOpenPoster: () => void;
}) {
    return (
        // Rozšíří se mimo max-w-4xl rodiče, aby se vešel plakát vedle textu
        <div className="relative left-1/2 -translate-x-1/2 w-[min(100vw_-_2rem,72rem)] pt-20 md:pt-16">
            <div className="grid md:grid-cols-[1fr_auto] items-center gap-6 md:gap-14 animate-fade-in-up">
                {/* Text */}
                <div className="order-2 md:order-1 text-center md:text-left">
                    <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/25 text-primary-200 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-4 md:mb-6">
                        <CalendarDays className="w-4 h-4" />
                        {event.dateLabel}
                    </span>
                    <h4 className="text-primary-300 font-semibold mb-2 md:mb-3 text-base md:text-xl uppercase tracking-widest animate-fade-in-up animation-delay-200">
                        {event.tagline}
                    </h4>
                    <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-[1.05] animate-fade-in-up animation-delay-400">
                        {event.title}
                    </h2>
                    <p className="text-white/90 text-base sm:text-lg md:text-xl mb-6 md:mb-8 leading-relaxed max-w-xl md:mx-0 mx-auto animate-fade-in-up animation-delay-600">
                        {event.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start animate-fade-in-up animation-delay-800">
                        <a
                            href={telHref(event.phone)}
                            className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 uppercase text-sm tracking-widest transition-all duration-300 hover:scale-105"
                        >
                            <Phone className="w-4 h-4" />
                            Rezervovat {event.phone}
                        </a>
                        <Link
                            href={`/akce#${event.slug}`}
                            className="inline-flex items-center justify-center gap-2 border border-white/60 hover:bg-white hover:text-gray-900 text-white font-semibold py-4 px-8 uppercase text-sm tracking-widest transition-all duration-300"
                        >
                            Více o akci
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* Plakát */}
                <button
                    type="button"
                    onClick={onOpenPoster}
                    className="order-1 md:order-2 group relative mx-auto block cursor-zoom-in"
                    aria-label={`Zobrazit plakát: ${event.title}`}
                >
                    <div className="relative h-[30vh] sm:h-[36vh] md:h-[62vh] max-h-[640px] aspect-[2/3] md:rotate-2 group-hover:rotate-0 transition-transform duration-500 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.7)] ring-1 ring-white/20">
                        <Image
                            src={event.poster.src}
                            alt={event.poster.alt}
                            fill
                            priority={isFirst}
                            className="object-cover"
                            sizes="(max-width: 768px) 40vw, 420px"
                            quality={85}
                        />
                        <span className="absolute bottom-3 right-3 hidden md:inline-flex items-center gap-1.5 bg-black/60 backdrop-blur text-white text-xs font-medium px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 className="w-3.5 h-3.5" />
                            Zvětšit
                        </span>
                    </div>
                </button>
            </div>
        </div>
    );
}
