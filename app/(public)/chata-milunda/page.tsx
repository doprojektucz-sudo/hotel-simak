"use client";

import Hero from "@/components/Hero";
import { chataMilunda } from "@/lib/data/chata";
import {
    Home,
    Users,
    MapPin,
    Check,
    Fish,
    Bike,
    TreePine,
    Waves,
    UtensilsCrossed,
    Bed,
    Bath,
    Flame,
    Sparkles,
    Phone,
    Mail,
    ChevronRight,
    ChevronLeft,
    ArrowRight,
    Anchor,
    Star,
    X,
    ZoomIn,
    Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// Gallery images
const galleryImages = [
    { src: "/images/chata-1.webp", alt: "Chata Milunda - exteriér" },
    { src: "/images/voda.webp", alt: "Vodní nádrž Strž" },
    { src: "/images/chata-2.webp", alt: "Okolní příroda" },
    { src: "/images/interier.webp", alt: "Interiér chaty" },
    { src: "/images/spani.webp", alt: "Ložnice" },
];

// Lightbox Component
function Lightbox({
    images,
    currentIndex,
    onClose,
    onPrev,
    onNext,
}: {
    images: typeof galleryImages;
    currentIndex: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}) {
    return (
        <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={onClose}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
                <X className="w-6 h-6" />
            </button>

            {/* Previous button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onPrev();
                }}
                className="absolute left-4 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onNext();
                }}
                className="absolute right-4 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <div
                className="relative max-w-5xl max-h-[80vh] mx-4 w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                        src={images[currentIndex].src}
                        alt={images[currentIndex].alt}
                        fill
                        className="object-contain"
                    />
                </div>
                {/* Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>
        </div>
    );
}

// Gallery Row Component
function GalleryRow() {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = "auto";
    };

    const goToPrev = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? galleryImages.length - 1 : prev - 1
        );
    };

    const goToNext = () => {
        setCurrentImageIndex((prev) =>
            prev === galleryImages.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {galleryImages.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => openLightbox(index)}
                        className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <ZoomIn className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <Lightbox
                    images={galleryImages}
                    currentIndex={currentImageIndex}
                    onClose={closeLightbox}
                    onPrev={goToPrev}
                    onNext={goToNext}
                />
            )}
        </>
    );
}

export default function ChataMilundaPage() {
    return (
        <>
            <main>
                <Hero
                    backgroundImage="/images/chata.webp"
                    subtitle="Chata Milunda"
                    title="Útulná chata u vodní nádrže"
                    description="Pronájem celé chaty pro 8-10 osob ve Světnově, jen 15 metrů od vodní nádrže Strž. Ideální pro rodinnou dovolenou nebo víkend s přáteli."
                    primaryCta={{
                        text: "Rezervovat chatu",
                        href: "#booking",
                    }}
                />

                {/* Floating Stats Bar */}
                <section className="relative z-10 -mt-16">
                    <div className="container-custom">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2">
                            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
                                <div className="px-6 py-5 text-center group">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 text-primary-700 mb-3 group-hover:scale-110 transition-transform">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {chataMilunda.capacity.beds}+{chataMilunda.capacity.extraBeds}
                                    </p>
                                    <p className="text-sm text-gray-500">Lůžek</p>
                                </div>
                                <div className="px-6 py-5 text-center group">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary-100 text-secondary-700 mb-3 group-hover:scale-110 transition-transform">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">15 m</p>
                                    <p className="text-sm text-gray-500">Od nádrže</p>
                                </div>
                                <div className="px-6 py-5 text-center group">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 text-primary-700 mb-3 group-hover:scale-110 transition-transform">
                                        <Anchor className="w-6 h-6" />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">Loďka</p>
                                    <p className="text-sm text-gray-500">Zdarma</p>
                                </div>
                                <div className="px-6 py-5 text-center group">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary-100 text-secondary-700 mb-3 group-hover:scale-110 transition-transform">
                                        <Star className="w-6 h-6" />
                                    </div>
                                    <p className="text-2xl font-bold text-primary-600">
                                        {chataMilunda.price.toLocaleString()} Kč
                                    </p>
                                    <p className="text-sm text-gray-500">Celá chata</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content - Bento Style */}
                <section className="py-24">
                    <div className="container-custom">
                        {/* Section header */}
                        <div className="text-center mb-16">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
                                <Home className="w-4 h-4" />
                                O chatě
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                                Chata Milunda
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                                {chataMilunda.description}
                            </p>
                        </div>

                        {/* Bento Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Main Image */}
                            <div className="lg:col-span-7 relative group">
                                <div className="aspect-[4/3] lg:aspect-[16/10] rounded-3xl overflow-hidden bg-gradient-to-br from-secondary-200 to-secondary-300">
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Home className="w-24 h-24 text-secondary-500" />
                                        <img src="/images/chata-3.webp" alt="exteriér chaty" />
                                    </div>
                                </div>
                            </div>

                            {/* Right column */}
                            <div className="lg:col-span-5 flex flex-col gap-6">
                                {/* Location card with 15m badge */}
                                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-6 border border-primary-100">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 mb-1">Adresa</h3>
                                                <p className="text-gray-600">{chataMilunda.address.full}</p>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {chataMilunda.location}
                                                </p>
                                            </div>
                                        </div>
                                        {/* 15m badge */}
                                        <div className="flex-shrink-0 bg-white rounded-xl shadow-sm p-3 text-center">
                                            <div className="flex items-center gap-2">
                                                <Waves className="w-5 h-5 text-primary-600" />
                                                <span className="text-xl font-bold text-gray-900">15m</span>
                                            </div>
                                            <p className="text-xs text-gray-500">od vody</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Features card */}
                                <div className="flex-1 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Home className="w-5 h-5 text-primary-600" />
                                        Vybavení chaty
                                    </h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        {chataMilunda.features.slice(0, 6).map((feature, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 text-sm text-gray-600"
                                            >
                                                <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                                                    <Check className="w-3 h-3 text-primary-700" />
                                                </div>
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Gallery Row with Lightbox */}
                        <div className="mt-6">
                            <GalleryRow />
                        </div>
                    </div>
                </section>

                {/* Features Grid - Dark Section */}
                <section className="py-24 bg-gray-900 relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl" />

                    <div className="container-custom relative z-10">
                        {/* Section header */}
                        <div className="text-center mb-16">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-4 border border-white/20">
                                <Sparkles className="w-4 h-4" />
                                Vybavení
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                                Co chata nabízí
                            </h2>
                        </div>

                        {/* Features grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all group text-center">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform shadow-lg">
                                    <UtensilsCrossed className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Kuchyň</h3>
                                <p className="text-gray-400">
                                    Lednice a mikrovlnná trouba pro přípravu jídel
                                </p>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all group text-center">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary-500 to-secondary-700 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform shadow-lg">
                                    <Bed className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Ložnice</h3>
                                <p className="text-gray-400">
                                    2 ložnice pro pohodlný spánek
                                </p>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all group text-center">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform shadow-lg">
                                    <Bath className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    Sociální zařízení
                                </h3>
                                <p className="text-gray-400">
                                    Koupelna a suchý záchod
                                </p>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all group text-center">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary-600 to-primary-600 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform shadow-lg">
                                    <Flame className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Ohniště</h3>
                                <p className="text-gray-400">
                                    Venkovní ohniště pro grilovací večery
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Activities Section */}
                <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
                    <div className="container-custom">
                        {/* Section header */}
                        <div className="text-center mb-16">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-100 text-secondary-700 text-sm font-medium mb-4">
                                <Bike className="w-4 h-4" />
                                Aktivity
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                                Aktivity a zážitky
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Užijte si aktivní dovolenou v krásné přírodě Vysočiny
                            </p>
                        </div>

                        {/* Activities grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="group bg-primary-50 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg">
                                        <Fish className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-2 transition-colors">
                                        Rybaření
                                    </h3>
                                    <p className="text-gray-600 group-hover:text-white/90 transition-colors">
                                        Rybaření přímo u chaty na vodní nádrži Strž
                                    </p>
                                </div>
                            </div>

                            <div className="group bg-secondary-50 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-secondary-500 to-secondary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary-500 to-secondary-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg">
                                        <Waves className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-2 transition-colors">
                                        Loďka zdarma
                                    </h3>
                                    <p className="text-gray-600 group-hover:text-white/90 transition-colors">
                                        Zapůjčení loďky pro projížďky po nádrži zdarma
                                    </p>
                                </div>
                            </div>

                            <div className="group bg-primary-50 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-secondary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg">
                                        <Bike className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-2 transition-colors">
                                        Cykloturistika
                                    </h3>
                                    <p className="text-gray-600 group-hover:text-white/90 transition-colors">
                                        Krásné cyklotrasy v okolí pro všechny úrovně
                                    </p>
                                </div>
                            </div>

                            <div className="group bg-secondary-50 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-secondary-600 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary-600 to-primary-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg">
                                        <TreePine className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-2 transition-colors">
                                        Houbaření
                                    </h3>
                                    <p className="text-gray-600 group-hover:text-white/90 transition-colors">
                                        Bohaté lesy plné hub v okolí chaty
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Booking CTA */}
                <section
                    id="booking"
                    className="py-24 bg-gradient-to-br from-secondary-600 via-secondary-700 to-secondary-800 relative overflow-hidden"
                >
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-96 h-96 bg-secondary-500/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

                    <div className="container-custom relative z-10">
                        <div className="max-w-4xl mx-auto">
                            {/* Header */}
                            <div className="text-center mb-12">
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6 border border-white/20">
                                    <Home className="w-4 h-4" />
                                    Rezervace
                                </span>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                                    Rezervujte si Chatu Milunda
                                </h2>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-secondary-100">
                                    <span className="text-2xl font-bold text-white">
                                        {chataMilunda.price.toLocaleString()} Kč
                                    </span>
                                    <span className="hidden sm:block">•</span>
                                    <span>
                                        Kapacita {chataMilunda.capacity.beds} osob + {chataMilunda.capacity.extraBeds} přistýlky
                                    </span>
                                </div>
                            </div>

                            {/* Contact cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                <a
                                    href="tel:728490498"
                                    className="group bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="w-16 h-16 rounded-xl bg-secondary-100 text-secondary-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Phone className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">
                                                Zavolejte nám
                                            </p>
                                            <p className="text-2xl font-bold text-gray-900">
                                                728 490 498
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center gap-2 text-secondary-600 font-medium">
                                        <span>Zavolat</span>
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </a>

                                <Link
                                    href="/kontakt"
                                    className="group bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="w-16 h-16 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Mail className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">
                                                Napište nám
                                            </p>
                                            <p className="text-xl font-bold text-gray-900">
                                                Kontaktní formulář
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center gap-2 text-primary-600 font-medium">
                                        <span>Přejít na kontakt</span>
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}