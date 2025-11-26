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
} from "lucide-react";

const iconMap: Record<string, any> = {
    heart: Heart,
    briefcase: Briefcase,
    cake: Cake,
    utensils: Utensils,
    "graduation-cap": GraduationCap,
};

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
                />

                {/* Capacity Info */}
                <section className="py-12 bg-gray-50">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                                <Users className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    Restaurace
                                </h3>
                                <p className="text-gray-600">Kapacita 60 hostů</p>
                            </div>
                            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                                <Users className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                                <h3 className="font-semibold text-gray-900 mb-2">Salonek</h3>
                                <p className="text-gray-600">Kapacita 24 hostů</p>
                            </div>
                            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                                <Users className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    Venkovní terasa
                                </h3>
                                <p className="text-gray-600">Kapacita 30 hostů</p>
                            </div>
                        </div>
                        <div className="text-center mt-6">
                            <p className="text-lg font-semibold text-gray-900">
                                Celková kapacita: až 120 hostů
                            </p>
                        </div>
                    </div>
                </section>

                {/* Event Types */}
                <section className="py-16 md:py-24">
                    <div className="container-custom">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Typy akcí, které pořádáme
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Vytvoříme pro vás nezapomenutelnou akci na míru vašim přáním
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {eventTypes.map((event) => {
                                const Icon = iconMap[event.icon] || Heart;
                                return (
                                    <div
                                        key={event.id}
                                        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                                    >
                                        <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-6 text-white">
                                            <Icon className="w-12 h-12 mb-3" />
                                            <h3 className="text-2xl font-bold">{event.name}</h3>
                                        </div>
                                        <div className="p-6">
                                            <p className="text-gray-600 mb-4">{event.description}</p>
                                            <div className="space-y-2">
                                                <h4 className="font-semibold text-gray-900 text-sm mb-3">
                                                    Co zajistíme:
                                                </h4>
                                                {event.features.map((feature, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-start gap-2 text-sm text-gray-700"
                                                    >
                                                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                                        <span>{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="py-16 md:py-24 bg-gray-50">
                    <div className="container-custom">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Proč pořádat akci u nás?
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                                    <Utensils className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Vynikající kuchyně
                                </h3>
                                <p className="text-gray-600">
                                    Tradiční česká kuchyně z kvalitních surovin
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary-100 text-secondary-600 mb-4">
                                    <Users className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Flexibilní prostory
                                </h3>
                                <p className="text-gray-600">
                                    Restaurace, salonek i venkovní terasa
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                                    <Heart className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Osobní přístup
                                </h3>
                                <p className="text-gray-600">
                                    Individuální péče o každou akci
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary-100 text-secondary-600 mb-4">
                                    <CheckCircle className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Kompletní servis
                                </h3>
                                <p className="text-gray-600">
                                    Od plánování po realizaci - vše zajistíme
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sample Menus */}
                <section className="py-16 md:py-24">
                    <div className="container-custom">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Ukázková menu
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Všechna menu připravíme přesně podle vašich požadavků
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Wedding Menu */}
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <div className="text-center mb-6">
                                    <Heart className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        Svatební menu
                                    </h3>
                                </div>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="pb-3 border-b border-gray-200">
                                        <span className="font-semibold">Předkrm:</span> Tatarský
                                        biftek s topinkami
                                    </li>
                                    <li className="pb-3 border-b border-gray-200">
                                        <span className="font-semibold">Polévka:</span> Hovězí
                                        vývar s nudlemi
                                    </li>
                                    <li className="pb-3 border-b border-gray-200">
                                        <span className="font-semibold">Hlavní chod:</span>{" "}
                                        Svíčková na smetaně s houskovým knedlíkem
                                    </li>
                                    <li>
                                        <span className="font-semibold">Dezert:</span> Domácí
                                        jablečný závin se zmrzlinou
                                    </li>
                                </ul>
                                <p className="text-sm text-gray-500 mt-6 text-center">
                                    * Menu lze upravit dle přání
                                </p>
                            </div>

                            {/* Corporate Menu */}
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <div className="text-center mb-6">
                                    <Briefcase className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        Firemní menu
                                    </h3>
                                </div>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="pb-3 border-b border-gray-200">
                                        <span className="font-semibold">Studené předkrmy:</span>{" "}
                                        Chlebíčky a obložené mísy
                                    </li>
                                    <li className="pb-3 border-b border-gray-200">
                                        <span className="font-semibold">Teplé jídlo:</span> Guláš s
                                        houskovým knedlíkem
                                    </li>
                                    <li className="pb-3 border-b border-gray-200">
                                        <span className="font-semibold">Vegetariánská volba:</span>{" "}
                                        Smažený sýr s tatarkou
                                    </li>
                                    <li>
                                        <span className="font-semibold">Dezert:</span> Palačinky s
                                        džemem
                                    </li>
                                </ul>
                                <p className="text-sm text-gray-500 mt-6 text-center">
                                    * Menu lze upravit dle přání
                                </p>
                            </div>

                            {/* Celebration Menu */}
                            <div className="bg-white rounded-xl shadow-lg p-8">
                                <div className="text-center mb-6">
                                    <Cake className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        Oslavné menu
                                    </h3>
                                </div>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="pb-3 border-b border-gray-200">
                                        <span className="font-semibold">Předkrm:</span> Nakládaný
                                        hermelín s chlebem
                                    </li>
                                    <li className="pb-3 border-b border-gray-200">
                                        <span className="font-semibold">Polévka:</span> Gulášová
                                        polévka
                                    </li>
                                    <li className="pb-3 border-b border-gray-200">
                                        <span className="font-semibold">Hlavní chod:</span>{" "}
                                        Vepřo-knedlo-zelo
                                    </li>
                                    <li>
                                        <span className="font-semibold">Dezert:</span> Zmrzlinový
                                        pohár
                                    </li>
                                </ul>
                                <p className="text-sm text-gray-500 mt-6 text-center">
                                    * Menu lze upravit dle přání
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Additional Services */}
                <section className="py-16 bg-primary-50">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                                Další služby pro vaši akci
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-lg p-6 shadow-sm">
                                    <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Ubytování pro hosty
                                    </h3>
                                    <p className="text-gray-600">
                                        Nabízíme možnost ubytování pro vaše hosty přímo v našem
                                        hotelu
                                    </p>
                                </div>
                                <div className="bg-white rounded-lg p-6 shadow-sm">
                                    <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Venkovní gril
                                    </h3>
                                    <p className="text-gray-600">
                                        Možnost venkovního grilování na naší prostorné terase
                                    </p>
                                </div>
                                <div className="bg-white rounded-lg p-6 shadow-sm">
                                    <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Bohatý výběr nápojů
                                    </h3>
                                    <p className="text-gray-600">
                                        Pilsner Urquell, Bernard, vína, destiláty i nealko nápoje
                                    </p>
                                </div>
                                <div className="bg-white rounded-lg p-6 shadow-sm">
                                    <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Parkování
                                    </h3>
                                    <p className="text-gray-600">
                                        Dostatek parkovacích míst pro vaše hosty
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Form CTA */}
                <section
                    id="contact"
                    className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 text-white"
                >
                    <div className="container-custom">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-bold mb-4">
                                Máte zájem o pořádání akce?
                            </h2>
                            <p className="text-xl text-primary-100 mb-8">
                                Kontaktujte nás a společně naplánujeme vaši vysněnou akci
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <a
                                    href="tel:728490498"
                                    className="flex items-center justify-center gap-3 bg-white text-primary-700 hover:bg-primary-50 font-semibold py-4 px-6 rounded-lg transition-colors"
                                >
                                    <Phone className="w-5 h-5" />
                                    <div className="text-left">
                                        <div className="text-sm text-gray-600">Zavolejte nám</div>
                                        <div className="font-bold">728 490 498</div>
                                    </div>
                                </a>
                                <a
                                    href="mailto:hotresrad@seznam.cz"
                                    className="flex items-center justify-center gap-3 bg-white text-primary-700 hover:bg-primary-50 font-semibold py-4 px-6 rounded-lg transition-colors"
                                >
                                    <Mail className="w-5 h-5" />
                                    <div className="text-left">
                                        <div className="text-sm text-gray-600">Napište nám</div>
                                        <div className="font-bold text-sm">
                                            hotresrad@seznam.cz
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <p className="text-primary-100">
                                Nebo využijte náš{" "}
                                <a href="/kontakt" className="underline hover:text-white">
                                    kontaktní formulář
                                </a>
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}