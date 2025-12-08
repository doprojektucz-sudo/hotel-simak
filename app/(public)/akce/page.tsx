import Hero from "@/components/Hero";
import { eventTypes } from "@/lib/data/events";
import {
    Heart,
    Briefcase,
    Cake,
    Utensils,
    GraduationCap,
    Users,
    CheckCircle,
    Phone,
    Mail,
    Sparkles,
    ArrowRight,
    MapPin,
    Wine,
    Car,
    Bed,
    Flame,
    Check,
    ChevronRight,
    Star,
    Calendar,
} from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, any> = {
    heart: Heart,
    briefcase: Briefcase,
    cake: Cake,
    utensils: Utensils,
    "graduation-cap": GraduationCap,
};

const gradientMap: Record<string, string> = {
    heart: "from-primary-500 to-primary-700",
    briefcase: "from-secondary-500 to-secondary-700",
    cake: "from-primary-600 to-secondary-600",
    utensils: "from-secondary-600 to-secondary-800",
    "graduation-cap": "from-primary-500 to-secondary-500",
};

const bgLightMap: Record<string, string> = {
    heart: "bg-primary-50",
    briefcase: "bg-secondary-50",
    cake: "bg-primary-50",
    utensils: "bg-secondary-50",
    "graduation-cap": "bg-primary-50",
};

const spaces = [
    {
        name: "Restaurace",
        capacity: "60 hostů",
        description: "Hlavní prostor pro velké oslavy a svatební hostiny",
        icon: Utensils,
        features: ["Klimatizace", "Reprodukovaná hudba", "Přístup na terasu"],
    },
    {
        name: "Salonek",
        capacity: "24 hostů",
        description: "Soukromý prostor pro intimnější akce a firemní meetingy",
        icon: Users,
        features: ["Soukromí", "Audio zářítení", ],
    },
    {
        name: "Venkovní terasa",
        capacity: "30 hostů",
        description: "Krásné prostředí pro letní akce s výhledem do přírody",
        icon: MapPin,
        features: ["Slunečníky", "Venkovní gril", "Dětské hriště"],
    },
];

const additionalServices = [
    {
        icon: Bed,
        title: "Ubytování pro hosty",
        description: "Pohodlné pokoje přímo v hotelu pro vaše hosty",
        color: "bg-primary-100 text-primary-700",
    },
    {
        icon: Flame,
        title: "Venkovní gril",
        description: "Grilování na prostorné terase v létě",
        color: "bg-secondary-100 text-secondary-700",
    },
    {
        icon: Wine,
        title: "Bohatý výběr nápojů",
        description: "Pivo Bernard, vína, destiláty i nealko",
        color: "bg-primary-100 text-primary-700",
    },
    {
        icon: Car,
        title: "Parkování zdarma",
        description: "Dostatek míst pro všechny vaše hosty",
        color: "bg-secondary-100 text-secondary-700",
    },
];

export default function AkcePage() {
    return (
        <>
            <main>
                <Hero
                    subtitle="Akce & Catering"
                    title="Nezapomenutelné oslavy a akce"
                    description="Svatby, firemní večírky, promoce a rodinné oslavy v krásném prostředí s profesionálním servisem a vynikající kuchyní."
                    primaryCta={{
                        text: "Poptat akci",
                        href: "#contact",
                    }}
                    backgroundImage="/images/svatba.webp"
                />

                {/* Floating Capacity Cards */}
                <section className="relative z-10 -mt-20">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {spaces.map((space, index) => {
                                const Icon = space.icon;
                                return (
                                    <div
                                        key={space.name}
                                        className="group bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-14 h-14 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Icon className="w-7 h-7" />
                                            </div>
                                            <div className="text-right">
                                                <span className="text-3xl font-bold text-gray-900">
                                                    {space.capacity.split(" ")[0]}
                                                </span>
                                                <p className="text-sm text-gray-500">hostů</p>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {space.name}
                                        </h3>
                                        <p className="text-gray-500 text-sm mb-4">
                                            {space.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {space.features.map((feature, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Event Types - Bento Grid Style */}
                <section className="py-24 mt-8">
                    <div className="container-custom">
                        {/* Section header */}
                        <div className="text-center mb-16">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
                                <Calendar className="w-4 h-4" />
                                Typy akcí
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                                Jakou akci plánujete?
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                                Vytvoříme pro vás nezapomenutelnou akci na míru vašim přáním
                            </p>
                        </div>

                        {/* Event cards grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {eventTypes.map((event, index) => {
                                const Icon = iconMap[event.icon] || Heart;
                                const gradient = gradientMap[event.icon] || "from-primary-500 to-primary-600";
                                const bgLight = bgLightMap[event.icon] || "bg-primary-50";

                                return (
                                    <div
                                        key={event.id}
                                        className={`group relative ${bgLight} rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1`}
                                    >
                                        {/* Gradient overlay on hover */}
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                        />

                                        {/* Content */}
                                        <div className="relative z-10 p-8">
                                            {/* Icon */}
                                            <div
                                                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                                            >
                                                <Icon className="w-8 h-8" />
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors">
                                                {event.name}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-gray-600 group-hover:text-white/90 mb-6 transition-colors">
                                                {event.description}
                                            </p>

                                            {/* Features */}
                                            <div className="space-y-2 mb-6">
                                                {event.features.slice(0, 3).map((feature, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-center gap-2 text-sm text-gray-700 group-hover:text-white/90 transition-colors"
                                                    >
                                                        <Check className="w-4 h-4 text-green-600 group-hover:text-white flex-shrink-0" />
                                                        {feature}
                                                    </div>
                                                ))}
                                            </div>

                                            {/* CTA */}
                                            <Link
                                                href="#contact"
                                                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 group-hover:text-white transition-colors"
                                            >
                                                Poptat akci
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>

                                        {/* Decorative circle */}
                                        <div
                                            className={`absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br ${gradient} opacity-10 group-hover:opacity-20 group-hover:scale-150 transition-all duration-700`}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Why Choose Us - Dark Section */}
                <section className="py-24 bg-gray-900 relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl" />

                    <div className="container-custom relative z-10">
                        {/* Section header */}
                        <div className="text-center mb-16">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-4 border border-white/20">
                                <Star className="w-4 h-4" />
                                Proč my?
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                                Proč pořádat akci u nás?
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                Máme dlouholeté zkušenosti s pořádáním všech typů akcí
                            </p>
                        </div>

                        {/* Benefits grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all group text-center">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform shadow-lg">
                                    <Utensils className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    Vynikající kuchyně
                                </h3>
                                <p className="text-gray-400">
                                    Tradiční česká kuchyně z kvalitních surovin
                                </p>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all group text-center">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary-500 to-secondary-700 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform shadow-lg">
                                    <Users className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    Flexibilní prostory
                                </h3>
                                <p className="text-gray-400">
                                    Restaurace, salonek i venkovní terasa
                                </p>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all group text-center">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform shadow-lg">
                                    <Heart className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    Osobní přístup
                                </h3>
                                <p className="text-gray-400">
                                    Individuální péče o každou akci
                                </p>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all group text-center">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform shadow-lg">
                                    <CheckCircle className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">
                                    Kompletní servis
                                </h3>
                                <p className="text-gray-400">
                                    Od plánování po realizaci
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Additional Services */}
                <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
                    <div className="container-custom">
                        <div className="max-w-5xl mx-auto">
                            {/* Section header */}
                            <div className="text-center mb-12">
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-100 text-secondary-700 text-sm font-medium mb-4">
                                    <Sparkles className="w-4 h-4" />
                                    Další služby
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    Co dalšího zajistíme?
                                </h2>
                            </div>

                            {/* Services grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {additionalServices.map((service, index) => {
                                    const Icon = service.icon;
                                    return (
                                        <div
                                            key={service.title}
                                            className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                        >
                                            <div
                                                className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                                            >
                                                <Icon className="w-7 h-7" />
                                            </div>
                                            <h3 className="font-bold text-gray-900 mb-2">
                                                {service.title}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {service.description}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact CTA - Modern gradient */}
                <section
                    id="contact"
                    className="py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden"
                >
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

                    <div className="container-custom relative z-10">
                        <div className="max-w-4xl mx-auto">
                            {/* Header */}
                            <div className="text-center mb-12">
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6 border border-white/20">
                                    <Heart className="w-4 h-4" />
                                    Těšíme se na vás
                                </span>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                                    Máte zájem o pořádání akce?
                                </h2>
                                <p className="text-xl text-primary-100">
                                    Kontaktujte nás a společně naplánujeme vaši vysněnou akci
                                </p>
                            </div>

                            {/* Contact cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                <a
                                    href="tel:728490498"
                                    className="group bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="w-16 h-16 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center group-hover:scale-110 transition-transform">
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
                                    <div className="mt-4 flex items-center gap-2 text-primary-600 font-medium">
                                        <span>Zavolat</span>
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </a>

                                <a
                                    href="mailto:hotresrad@seznam.cz"
                                    className="group bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="w-16 h-16 rounded-xl bg-secondary-100 text-secondary-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Mail className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">
                                                Napište nám
                                            </p>
                                            <p className="text-xl font-bold text-gray-900">
                                                hotresrad@seznam.cz
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center gap-2 text-secondary-600 font-medium">
                                        <span>Napsat e-mail</span>
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </a>
                            </div>

                            {/* Alternative CTA */}
                            <div className="text-center">
                                <p className="text-primary-100 mb-4">
                                    Nebo využijte náš kontaktní formulář
                                </p>
                                <Link
                                    href="/kontakt"
                                    className="inline-flex items-center gap-2 border-2 border-white/30 hover:bg-white/10 text-white font-semibold py-3 px-8 rounded-xl transition-all"
                                >
                                    Přejít na kontakt
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}