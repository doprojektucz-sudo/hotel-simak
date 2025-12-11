import Hero from "@/components/Hero";
import { rooms, accommodationInfo } from "@/lib/data/rooms";
import {
    Bed,
    Wifi,
    Tv,
    Check,
    Clock,
    Info,
    Users,
    Bath,
    Coffee,
    Sparkles,
    ChevronLeft,
    ChevronRight,
    Star,
    ShowerHead,
    Car,
} from "lucide-react";
import Image from "next/image";

export default function UbytovaniPage() {
    const deluxeRooms = rooms.filter((room) => room.type === "deluxe");
    const classicRooms = rooms.filter((room) => room.type === "classic");

    return (
        <>
            <main>
                <Hero
                    subtitle="Ubytování"
                    title="Pohodlné ubytování v srdci Vysočiny"
                    description="Moderní i klasické pokoje s vlastním sociálním zařízením, Smart-TV a Wi-Fi zdarma. Ideální základna pro výlety do Žďárských vrchů."
                    primaryCta={{
                        text: "Rezervovat pokoj",
                        href: "#booking",
                    }}
                />

                {/* Floating Stats Bar */}
                <section className="relative z-10 -mt-16">
                    <div className="container-custom">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-gray-100">
                                <div className="px-4 py-5 text-center group">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 text-primary-700 mb-3 group-hover:scale-110 transition-transform">
                                        <Bed className="w-6 h-6" />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">20+</p>
                                    <p className="text-sm text-gray-500">Lůžek</p>
                                </div>
                                <div className="px-4 py-5 text-center group">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary-100 text-secondary-700 mb-3 group-hover:scale-110 transition-transform">
                                        <Wifi className="w-6 h-6" />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">Zdarma</p>
                                    <p className="text-sm text-gray-500">Wi-Fi</p>
                                </div>
                                <div className="px-4 py-5 text-center group">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 text-primary-700 mb-3 group-hover:scale-110 transition-transform">
                                        <Coffee className="w-6 h-6" />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">Snídaně</p>
                                    <p className="text-sm text-gray-500">V ceně</p>
                                </div>
                                <div className="px-4 py-5 text-center group">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary-100 text-secondary-700 mb-3 group-hover:scale-110 transition-transform">
                                        <ShowerHead className="w-6 h-6" />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">Vlastní</p>
                                    <p className="text-sm text-gray-500">Koupelna</p>
                                </div>
                                <div className="px-4 py-5 text-center group">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 text-primary-700 mb-3 group-hover:scale-110 transition-transform">
                                        <Tv className="w-6 h-6" />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">Smart-TV</p>
                                    <p className="text-sm text-gray-500">V pokojích</p>
                                </div>
                                <div className="px-4 py-5 text-center group">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary-100 text-secondary-700 mb-3 group-hover:scale-110 transition-transform font-bold text-xl">
                                        P
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">Zdarma</p>
                                    <p className="text-sm text-gray-500">Parkování</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Deluxe Rooms - Dark elegant section */}
                <section className="py-24 bg-gray-900 mt-16">
                    <div className="container-custom">
                        {/* Section header */}
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                            <div>
                                <span className="inline-flex items-center gap-2 text-primary-400 text-sm font-medium mb-3">
                                    <Sparkles className="w-4 h-4" />
                                    Premium ubytování
                                </span>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                                    Moderní pokoje Deluxe
                                </h2>
                                <p className="text-gray-400 mt-3 max-w-xl">
                                    Nově zrekonstruované pokoje s moderním vybavením pro maximální pohodlí
                                </p>
                            </div>
                            {/* Navigation arrows for future carousel */}
                            {/*     <div className="flex gap-3">
                                <button className="w-12 h-12 rounded-full border border-gray-700 text-gray-400 hover:border-primary-500 hover:text-primary-400 transition-colors flex items-center justify-center">
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button className="w-12 h-12 rounded-full border border-gray-700 text-gray-400 hover:border-primary-500 hover:text-primary-400 transition-colors flex items-center justify-center">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div> */}
                        </div>

                        {/* Rooms grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {deluxeRooms.map((room, index) => (
                                <div
                                    key={room.id}
                                    className="group relative bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-primary-500/50 transition-all duration-500"
                                >
                                    {/* Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                                            src={room.href}
                                            alt={room.name}
                                        />
                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />

                                        {/* Price badge */}
                                        <div className="absolute top-4 right-4">
                                            <div className="bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 border border-white/20">
                                                <span className="text-2xl font-bold text-white">
                                                    {room.price} Kč
                                                </span>
                                                <span className="text-white/60 text-sm block">
                                                    / lůžko / noc
                                                </span>
                                            </div>
                                        </div>

                                        {/* Room info overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <h3 className="text-2xl font-bold text-white mb-2">
                                                {room.name}
                                            </h3>
                                            <div className="flex items-center gap-4 text-white/70">
                                                <span className="flex items-center gap-1.5">
                                                    <Users className="w-4 h-4" />
                                                    {room.capacity}{" "}
                                                    {room.capacity === 1
                                                        ? "osoba"
                                                        : room.capacity < 5
                                                            ? "osoby"
                                                            : "osob"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <p className="text-gray-400 text-sm mb-5 line-clamp-2">
                                            {room.description}
                                        </p>

                                        {/* Features */}
                                        <div className="flex flex-wrap gap-2 mb-5">
                                            {room.features.slice(0, 4).map((feature, idx) => (
                                                <span
                                                    key={idx}
                                                    className="inline-flex items-center gap-1.5 text-xs text-gray-300 bg-gray-700/50 px-3 py-1.5 rounded-full"
                                                >
                                                    <Check className="w-3 h-3 text-primary-400" />
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Divider with icons */}
                                        <div className="flex items-center justify-between pt-5 border-t border-gray-700/50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg bg-gray-700/50 flex items-center justify-center text-gray-400">
                                                    <Bed className="w-4 h-4" />
                                                </div>
                                                <div className="w-9 h-9 rounded-lg bg-gray-700/50 flex items-center justify-center text-gray-400">
                                                    <Bath className="w-4 h-4" />
                                                </div>
                                                <div className="w-9 h-9 rounded-lg bg-gray-700/50 flex items-center justify-center text-gray-400">
                                                    <Wifi className="w-4 h-4" />
                                                </div>
                                                <div className="w-9 h-9 rounded-lg bg-gray-700/50 flex items-center justify-center text-gray-400">
                                                    <Tv className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Classic Rooms - Light elegant section (same style as deluxe) */}
                <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
                    <div className="container-custom">
                        {/* Section header */}
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                            <div>
                                <span className="inline-flex items-center gap-2 text-secondary-600 text-sm font-medium mb-3">
                                    <Star className="w-4 h-4" />
                                    Výhodná cena
                                </span>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                                    Klasické pokoje
                                </h2>
                                <p className="text-gray-500 mt-3 max-w-xl">
                                    Útulné pokoje s kompletním vybavením za výhodnou cenu
                                </p>
                            </div>
                            {/* Navigation arrows */}
                            {/*  <div className="flex gap-3">
                                <button className="w-12 h-12 rounded-full border border-gray-200 text-gray-400 hover:border-secondary-500 hover:text-secondary-500 transition-colors flex items-center justify-center">
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button className="w-12 h-12 rounded-full border border-gray-200 text-gray-400 hover:border-secondary-500 hover:text-secondary-500 transition-colors flex items-center justify-center">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div> */}
                        </div>

                        {/* Rooms grid - same style as deluxe but light */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {classicRooms.map((room, index) => (
                                <div
                                    key={room.id}
                                    className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:border-secondary-300 transition-all duration-500"
                                >
                                    {/* Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                                            src={room.href}
                                            alt={room.name}
                                        />
                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                        {/* Price badge */}
                                        <div className="absolute top-4 right-4">
                                            <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                                                <span className="text-2xl font-bold text-secondary-600">
                                                    {room.price} Kč
                                                </span>
                                                <span className="text-gray-500 text-sm block">
                                                    / lůžko / noc
                                                </span>
                                            </div>
                                        </div>

                                        {/* Room info overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <h3 className="text-2xl font-bold text-white mb-2">
                                                {room.name}
                                            </h3>
                                            <div className="flex items-center gap-4 text-white/80">
                                                <span className="flex items-center gap-1.5">
                                                    <Users className="w-4 h-4" />
                                                    {room.capacity}{" "}
                                                    {room.capacity === 1
                                                        ? "osoba"
                                                        : room.capacity < 5
                                                            ? "osoby"
                                                            : "osob"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <p className="text-gray-500 text-sm mb-5 line-clamp-2">
                                            {room.description}
                                        </p>

                                        {/* Features */}
                                        <div className="flex flex-wrap gap-2 mb-5">
                                            {room.features.slice(0, 4).map((feature, idx) => (
                                                <span
                                                    key={idx}
                                                    className="inline-flex items-center gap-1.5 text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full"
                                                >
                                                    <Check className="w-3 h-3 text-secondary-500" />
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Divider with icons */}
                                        <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-secondary-100 group-hover:text-secondary-600 transition-colors">
                                                    <Bed className="w-4 h-4" />
                                                </div>
                                                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-secondary-100 group-hover:text-secondary-600 transition-colors">
                                                    <Bath className="w-4 h-4" />
                                                </div>
                                                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-secondary-100 group-hover:text-secondary-600 transition-colors">
                                                    <Wifi className="w-4 h-4" />
                                                </div>
                                                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-secondary-100 group-hover:text-secondary-600 transition-colors">
                                                    <Tv className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Additional info - Modern glass card */}
                <section className="relative py-24 overflow-hidden">
                    {/* Parallax background */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-fixed"
                        style={{
                            backgroundImage: "url(/images/hero-03.webp)",
                        }}
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-primary-900/85" />

                    {/* Content */}
                    <div className="container-custom relative z-10">
                        <div className="max-w-5xl mx-auto">
                            {/* Header */}
                            <div className="text-center mb-12">
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-4 border border-white/20">
                                    <Info className="w-4 h-4" />
                                    Důležité informace
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-white">
                                    Vše, co potřebujete vědět
                                </h2>
                            </div>

                            {/* Info grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

                                {/* Check-in */}
                                <div className="
        bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 
        hover:bg-white/15 transition-all group
        flex flex-row items-center justify-between gap-4
        lg:flex-col lg:items-start
    ">
                                    <div className="flex flex-row items-center gap-4 lg:flex-col lg:items-start lg:w-full">
                                        <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Clock className="w-6 h-6 text-primary-300" />
                                        </div>
                                        <h4 className="font-semibold text-white mb-0 lg:mb-1">Check-in</h4>
                                    </div>

                                    <p className="text-2xl font-bold text-primary-300 lg:mt-4">
                                        {accommodationInfo.checkIn}
                                    </p>
                                </div>

                                {/* Check-out */}
                                <div className="
        bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 
        hover:bg-white/15 transition-all group
        flex flex-row items-center justify-between gap-4
        lg:flex-col lg:items-start
    ">
                                    <div className="flex flex-row items-center gap-4 lg:flex-col lg:items-start lg:w-full">
                                        <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
                                            <Clock className="w-6 h-6 text-primary-300" />
                                        </div>
                                        <h4 className="font-semibold text-white mb-0 lg:mb-1">Check-out</h4>
                                    </div>

                                    <p className="text-2xl font-bold text-primary-300 lg:mt-4">
                                        {accommodationInfo.checkOut}
                                    </p>
                                </div>

                                {/* Parking */}
                                <div className="
        bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 
        hover:bg-white/15 transition-all group
        flex flex-row items-center justify-between gap-4
        lg:flex-col lg:items-start
    ">
                                    <div className="flex flex-row items-center gap-4 lg:flex-col lg:items-start lg:w-full">
                                        <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
                                            <Car className="w-6 h-6 text-primary-300" />
                                        </div>
                                        <h4 className="font-semibold text-white mb-0 lg:mb-1">Parkování</h4>
                                    </div>

                                    <p className="text-lg text-primary-300 lg:mt-4">
                                        Zdarma u hotelu
                                    </p>
                                </div>

                                {/* Breakfast */}
                                <div className="
        bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 
        hover:bg-white/15 transition-all group
        flex flex-row items-center justify-between gap-4
        lg:flex-col lg:items-start
    ">
                                    <div className="flex flex-row items-center gap-4 lg:flex-col lg:items-start lg:w-full">
                                        <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center">
                                            <Coffee className="w-6 h-6 text-primary-300" />
                                        </div>
                                        <h4 className="font-semibold text-white mb-0 lg:mb-1">Snídaně</h4>
                                    </div>

                                    <p className="text-lg text-primary-300 lg:mt-4">
                                        V ceně ubytování
                                    </p>
                                </div>
                            </div>


                            {/* Recreation fee notice */}
                            <div className="bg-gradient-to-r from-primary-500/20 to-secondary-500/20 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <Info className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">
                                            Rekreační poplatek
                                        </h4>
                                        <p className="text-gray-300">
                                            {accommodationInfo.recreationFeeNote}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Booking CTA - Modern gradient */}
                <section
                    id="booking"
                    className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden"
                >
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

                    <div className="container-custom relative z-10">
                        <div className="max-w-3xl mx-auto text-center">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6">
                                <Bed className="w-4 h-4" />
                                Rezervace ubytování
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                                Rezervujte si pobyt
                            </h2>
                            <p className="text-xl text-primary-100 mb-10">
                                Kontaktujte nás telefonicky {/* nebo využijte rezervační systém */}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="tel:728490498"
                                    className="group inline-flex items-center justify-center gap-3 bg-white text-primary-700 hover:bg-primary-50 font-semibold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl"
                                >
                                    <span className="text-lg">728 490 498</span>
                                </a>
                                {/* <a
                                    href="https://www.booking.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-xl transition-all"
                                >
                                    Rezervovat přes Booking.com
                                </a> */}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}