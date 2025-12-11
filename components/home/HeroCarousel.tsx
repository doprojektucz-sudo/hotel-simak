"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Phone } from "lucide-react";
import { contactInfo } from "@/lib/data/contact";

interface Slide {
    id: number;
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

const slides: Slide[] = [
    {
        id: 1,
        title: "Vítejte v Hotelu U Šimáka",
        subtitle: "Rodinný hotel v srdci Vysočiny",
        description:
            "Tradiční česká kuchyně, útulné ubytování a nezapomenutelné zážitky v nádherné přírodě Žďárských vrchů",
        image: "/images/hero-03.webp",
        primaryCta: {
            text: "Rezervovat ubytování",
            href: "/ubytovani",
        },
        secondaryCta: {
            text: "Prohlédnout menu",
            href: "/restaurace",
        },
    },
    {
        id: 2,
        title: "Vynikající česká kuchyně",
        subtitle: "Restaurace U Šimáka",
        description:
            "Vychutnejte si autentické pokrmy české kuchyně připravované z čerstvých surovin. Pilsner Urquell, Bernard a pravá čepovaná Kofola.",
        image: "/images/hero-02.webp",
        primaryCta: {
            text: "Prohlédnout menu",
            href: "/restaurace",
        },
        secondaryCta: {
            text: "Rezervovat stůl",
            href: "/kontakt",
        },
    },
    {
        id: 3,
        title: "Pohodlné ubytování",
        subtitle: "Moderní i klasické pokoje",
        description:
            "Útulné pokoje s vlastním sociálním zařízením, Smart-TV a Wi-Fi zdarma. Ideální základna pro výlety do Žďárských vrchů.",
        image: "/images/hero-01.webp",
        primaryCta: {
            text: "Zobrazit pokoje",
            href: "/ubytovani",
        },
        secondaryCta: {
            text: "Kontaktovat nás",
            href: "/kontakt",
        },
    },
];

export default function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [progress, setProgress] = useState(0);
    const touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Progress bar animation
        setProgress(0);
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    return 0;
                }
                return prev + 1;
            });
        }, 100); // Update every 100ms for smooth animation

        // Slide transition
        const slideTimer = setTimeout(() => {
            handleNextSlide();
        }, 10000);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(slideTimer);
        };
    }, [currentSlide]);

    const handleNextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const handlePrevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goToSlide = (index: number) => {
        if (index === currentSlide) return;
        setCurrentSlide(index);
    };

    const scrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
        });
    };

    // Touch handlers for swipe gestures
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;

        const distance = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50; // Minimum distance for swipe to register

        if (Math.abs(distance) < minSwipeDistance) return;

        if (distance > 0) {
            // Swipe left - next slide
            handleNextSlide();
        } else {
            // Swipe right - previous slide
            handlePrevSlide();
        }

        // Reset values
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
            {/* Ken Burns Background Slides with Cross-Fade */}
            <div className="absolute inset-0">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
                            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                    >
                        <div className="relative w-full h-full overflow-hidden">
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                priority={index === 0}
                                className="object-cover animate-ken-burns-infinite"
                                sizes="100vw"
                            />
                        </div>
                    </div>
                ))}

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50 z-20" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center justify-center z-30">
                <div className="container-custom">
                    <div className="text-center max-w-4xl mx-auto">
                        {slides.map((slide, index) =>
                            index === currentSlide ? (
                                <div key={slide.id} className="animate-fade-in-up">
                                    {/* Stars Rating */}
                                    <div className="flex justify-center gap-1 mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className="w-5 h-5 text-primary-400 fill-current"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                        ))}
                                    </div>
                                    {/* Subtitle */}
                                    <h4 className="text-primary-300 font-semibold mb-4 text-xl uppercase tracking-widest animate-fade-in-up animation-delay-200">
                                        {slide.subtitle}
                                    </h4>

                                    {/* Title */}
                                    <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up animation-delay-400">
                                        {slide.title}
                                    </h1>

                                    {/* Description */}
                                    <p className="text-white/90 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto animate-fade-in-up animation-delay-600">
                                        {slide.description}
                                    </p>

                                    {/* CTA */}
                                    <div className="animate-fade-in-up animation-delay-800">
                                        <Link
                                            href={slide.primaryCta.href}
                                            className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-10 uppercase text-sm tracking-widest transition-all duration-300 group hover:scale-105"
                                        >
                                            <span>{slide.primaryCta.text}</span>
                                        </Link>
                                    </div>
                                </div>
                            ) : null
                        )}
                    </div>
                </div>
            </div>

            {/* Slide Indicators - Bottom Center */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 flex gap-4">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className="group relative"
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        {/* Rectangle indicator */}
                        <div
                            className={`relative overflow-hidden transition-all hover:cursor-pointer duration-300 ${
                                index === currentSlide
                                    ? "w-16 h-2 bg-white"
                                    : "w-12 h-2 bg-white/40 group-hover:bg-white/60"
                            }`}
                        >
                            {/* Progress bar */}
                            {index === currentSlide && (
                                <div
                                    className="absolute inset-0 bg-primary-500 origin-left transition-transform duration-100"
                                    style={{
                                        transform: `scaleX(${progress / 100})`,
                                    }}
                                />
                            )}
                        </div>
                    </button>
                ))}
            </div>

            {/* Reservation Button - Right Side */}
            <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:block bg-primary-600 hover:bg-primary-700 text-white py-6 px-4 transition-all duration-300 group hover:px-6"
            >
                <div className="flex flex-col items-center gap-2">
                    <Phone className="w-6 h-6" />
                    <div className="text-xs font-semibold uppercase tracking-wider writing-mode-vertical">
                        <div className="transform  whitespace-nowrap">
                            Rezervace
                        </div>
                    </div>
                </div>
            </a>

            {/* Scroll Down Arrow */}
            <button
                onClick={scrollToContent}
                className="absolute bottom-16 left-1/2 -translate-x-1/2 z-40 text-white animate-bounce"
                aria-label="Scroll down"
            >
                <ChevronDown className="w-10 h-10" />
            </button>
        </section>
    );
}