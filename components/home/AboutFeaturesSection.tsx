import Image from "next/image";
import Link from "next/link";
import {
    Heart,
    Users,
    Award,
    Utensils,
    Bed,
    Home,
    Calendar,
    ArrowRight,
} from "lucide-react";

const values = [
    {
        icon: Heart,
        title: "Rodinná atmosféra",
        description: "Jsme rodinný podnik, kde se každý host cítí jako doma.",
    },
    {
        icon: Users,
        title: "Osobní přístup",
        description: "Každému hostu věnujeme maximální péči a pozornost.",
    },
    {
        icon: Award,
        title: "Kvalita a tradice",
        description: "Dbáme na kvalitu surovin a tradiční české recepty.",
    },
];

const features = [
    {
        icon: Utensils,
        title: "Restaurace",
        description:
            "Tradiční česká kuchyně, Pilsner Urquell, čepovaná Kofola a široký výběr jídel.",
        href: "/restaurace",
        gradient: "from-primary-500 to-primary-700",
        bgLight: "bg-primary-50",
    },
    {
        icon: Bed,
        title: "Ubytování",
        description:
            "Moderní i klasické pokoje s vlastním sociálním zařízením, Smart-TV a Wi-Fi zdarma.",
        href: "/ubytovani",
        gradient: "from-secondary-500 to-secondary-700",
        bgLight: "bg-secondary-50",
    },
    {
        icon: Home,
        title: "Chata Milunda",
        description:
            "Útulná chata u vodní nádrže pro 8-10 osob s loďkou zdarma a možností rybaření.",
        href: "/chata-milunda",
        gradient: "from-primary-600 to-secondary-600",
        bgLight: "bg-primary-50",
    },
    {
        icon: Calendar,
        title: "Akce & Oslavy",
        description:
            "Svatby, firemní večírky, promoce a rodinné oslavy v krásném prostředí.",
        href: "/akce",
        gradient: "from-secondary-600 to-primary-600",
        bgLight: "bg-secondary-50",
    },
];

export default function AboutFeaturesSection() {
    return (
        <section className="relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-secondary-100/30 rounded-full blur-3xl" />

            <div className="relative">
                {/* About Section */}
                <div className="py-20 md:py-32">
                    <div className="container-custom">
                        {/* Header */}
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
                                <Heart className="w-4 h-4" />
                                Rodinný podnik od roku 1995
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                Vítejte v Hotelu
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                                    U Šimáka
                                </span>
                            </h2>
                            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                                V srdci Žďárských vrchů vás čeká útulné ubytování, vynikající
                                česká kuchyně a nezapomenutelné zážitky v nádherné přírodě.
                            </p>
                        </div>

                        {/* Bento Grid Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-20">
                            {/* Main Image */}
                            <div className="lg:col-span-7 relative group">
                                <div className="aspect-[4/3] lg:aspect-[16/10] rounded-3xl overflow-hidden bg-gradient-to-br from-primary-200 to-secondary-200">
                                    {/* Placeholder - nahradit Image komponentou */}
                                    <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gradient-to-br from-primary-100 to-secondary-100">
                                        <img src="/images/restaurace-zima.webp" alt="" />
                                    </div>
                                </div>
                                {/* Floating badge */}
                                <div className="absolute -bottom-4 -right-4 md:bottom-6 md:right-6 bg-white rounded-2xl shadow-xl p-4 md:p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                                            <Award className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">29+</p>
                                            <p className="text-sm text-gray-500">let tradice</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right column */}
                            <div className="lg:col-span-5 flex flex-col gap-6">
                                {/* About text card */}
                                <div className="flex-1 bg-white rounded-3xl p-8 shadow-sm">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                                        Vážení návštěvníci,
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        srdečně Vás vítáme v našem restaurantu a hotelu, který se nachází v malebné vesničce Radostín v blízkosti rybníka Velké Dářko.
                                        Naším přáním je, abyste od nás odcházeli spokojeni a často se k nám vraceli.
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        Na přípravě každého jídla si dáváme velice záležet a doufáme, že budete odcházet vždy spokojeni.
                                    </p>
                                </div>

                                {/* Values row */}
                                <div className="grid grid-cols-3 gap-4">
                                    {values.map((value) => {
                                        const Icon = value.icon;
                                        return (
                                            <div
                                                key={value.title}
                                                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center group hover:shadow-md transition-shadow"
                                            >
                                                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary-100 text-primary-600 mb-2 group-hover:scale-110 transition-transform">
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <p className="text-xs font-medium text-gray-900 leading-tight">
                                                    {value.title}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Features Section */}
                        <div className="relative">
                            {/* Section header */}
                            <div className="text-center mb-12">
                                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    Co u nás najdete
                                </h3>
                                <p className="text-gray-600 max-w-2xl mx-auto">
                                    Objevte všechny služby, které pro vás připravujeme
                                </p>
                            </div>

                            {/* Features grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {features.map((feature, index) => {
                                    const Icon = feature.icon;
                                    return (
                                        <Link
                                            key={feature.title}
                                            href={feature.href}
                                            className="group relative"
                                        >
                                            <div
                                                className={`relative h-full ${feature.bgLight} rounded-3xl p-6 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                                            >
                                                {/* Gradient overlay on hover */}
                                                <div
                                                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                                />

                                                {/* Content */}
                                                <div className="relative z-10">
                                                    {/* Icon */}
                                                    <div
                                                        className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                                                    >
                                                        <Icon className="w-7 h-7" />
                                                    </div>

                                                    {/* Title */}
                                                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors">
                                                        {feature.title}
                                                    </h4>

                                                    {/* Description */}
                                                    <p className="text-gray-600 group-hover:text-white/90 text-sm leading-relaxed mb-4 transition-colors">
                                                        {feature.description}
                                                    </p>

                                                    {/* Arrow link */}
                                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-900 group-hover:text-white transition-colors">
                                                        <span>Zjistit více</span>
                                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </div>

                                                {/* Decorative circle */}
                                                <div
                                                    className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${feature.gradient} opacity-10 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500`}
                                                />
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
