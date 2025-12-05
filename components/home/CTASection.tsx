"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { contactInfo } from "@/lib/data/contact";

// Hook pro detekci viditelnosti elementu
function useInView(threshold = 0.3) {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect(); // Odpojíme po prvním zobrazení
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isInView };
}

// Hook pro animované počítadlo
function useCountUp(end: number, duration: number = 750, start: boolean = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return;

        let startTime: number | null = null;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Lineární - konstantní rychlost
            setCount(Math.floor(progress * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, start]);

    return count;
}

// Komponenta pro animované číslo
function AnimatedStat({
    value,
    suffix,
    label,
    isInView,
    delay = 0
}: {
    value: number;
    suffix: string;
    label: string;
    isInView: boolean;
    delay?: number;
}) {
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const count = useCountUp(value, 600, shouldAnimate); // 600ms = rychlé

    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => setShouldAnimate(true), delay);
            return () => clearTimeout(timer);
        }
    }, [isInView, delay]);

    return (
        <div
            className={`transition-all duration-700 ${shouldAnimate
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
        >
            <div className="text-4xl md:text-5xl font-bold mb-2">
                {count}{suffix}
            </div>
            <div className="text-primary-200">{label}</div>
        </div>
    );
}

export default function CTASection() {
    const { ref, isInView } = useInView(0.2);

    return (
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
            <div className="container-custom">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Header s fade-in */}
                    <div
                        className={`transition-all duration-700 ${isInView
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-6"
                            }`}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Těšíme se na vaši návštěvu!
                        </h2>
                        <p className="text-xl text-primary-100 mb-8">
                            Rezervujte si termín nebo nás kontaktujte pro více informací
                        </p>
                    </div>

                    {/* Tlačítka s fade-in */}
                    <div
                        className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-700 delay-200 ${isInView
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-6"
                            }`}
                    >
                        <a
                            href={`tel:${contactInfo.phone}`}
                            className="inline-flex items-center justify-center bg-white text-primary-700 hover:bg-primary-50 font-semibold py-4 px-8 rounded-lg transition-colors duration-200"
                        >
                            <Phone className="w-5 h-5 mr-2" />
                            Zavolejte nám
                        </a>
                        <Link
                            href="/kontakt"
                            className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-primary-700 font-semibold py-4 px-8 rounded-lg transition-colors duration-200"
                        >
                            <Mail className="w-5 h-5 mr-2" />
                            Kontaktní formulář
                        </Link>
                    </div>

                    {/* Statistiky s animovanými čísly */}
                    <div
                        ref={ref}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
                    >
                        <AnimatedStat
                            value={120}
                            suffix="+"
                            label="Kapacita hostů"
                            isInView={isInView}
                            delay={0}
                        />
                        <AnimatedStat
                            value={20}
                            suffix="+"
                            label="Lůžek k ubytování"
                            isInView={isInView}
                            delay={200}
                        />
                        <AnimatedStat
                            value={100}
                            suffix="%"
                            label="Spokojenost"
                            isInView={isInView}
                            delay={400}
                        />
                    </div>
                </div>
            </div>
        </section >
    );
}