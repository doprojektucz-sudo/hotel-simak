import { Utensils, Bed, Home, Calendar } from "lucide-react";
import Link from "next/link";

const features = [
    {
        icon: Utensils,
        title: "Restaurace",
        description: "Tradiční česká kuchyně, Pilsner Urquell, čepovaná Kofola a široký výběr jídel.",
        href: "/restaurace",
        color: "primary"
    },
    {
        icon: Bed,
        title: "Ubytování",
        description: "Moderní i klasické pokoje s vlastním sociálním zařízením, Smart-TV a Wi-Fi zdarma.",
        href: "/ubytovani",
        color: "secondary"
    },
    {
        icon: Home,
        title: "Chata Milunda",
        description: "Útulná chata u vodní nádrže pro 8-10 osob s loďkou zdarma a možností rybaření.",
        href: "/chata-milunda",
        color: "primary"
    },
    {
        icon: Calendar,
        title: "Akce & Oslavy",
        description: "Svatby, firemní večírky, promoce a rodinné oslavy v krásném prostředí.",
        href: "/akce",
        color: "secondary"
    },
];

export default function FeaturesSection() {
    return (
        <section className="py-16 md:py-24 bg-gray-50">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Co u nás najdete
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Objevte všechny služby, které pro vás připravujeme v srdci Žďárských vrchů
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <Link
                                key={feature.title}
                                href={feature.href}
                                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div
                                    className={`inline-flex items-center justify-center w-14 h-14 rounded-lg mb-4 ${feature.color === "primary"
                                            ? "bg-primary-100 text-primary-600"
                                            : "bg-secondary-100 text-secondary-600"
                                        } group-hover:scale-110 transition-transform`}
                                >
                                    <Icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}