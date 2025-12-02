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
} from "lucide-react";

const iconMap: Record<string, any> = {
    fish: Fish,
    bike: Bike,
    tree: TreePine,
    waves: Waves,
};

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

                {/* Quick Info */}
                <section className="py-12 bg-gray-50">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                                <Users className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                                <h3 className="font-semibold text-gray-900 mb-2">Kapacita</h3>
                                <p className="text-gray-600">
                                    {chataMilunda.capacity.beds} lůžek + {chataMilunda.capacity.extraBeds} přistýlky
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                                <MapPin className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                                <h3 className="font-semibold text-gray-900 mb-2">Lokalita</h3>
                                <p className="text-gray-600">15 m od vodní nádrže</p>
                            </div>
                            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                                <Home className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                                <h3 className="font-semibold text-gray-900 mb-2">Pronájem</h3>
                                <p className="text-gray-600">Celá chata</p>
                            </div>
                            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                                <Check className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                                <h3 className="font-semibold text-gray-900 mb-2">Cena</h3>
                                <p className="text-gray-600 font-bold text-lg">
                                    {chataMilunda.price.toLocaleString()} Kč
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-16 md:py-24">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                            {/* Image side */}
                            <div className="space-y-6">
                                <div className="aspect-video bg-gradient-to-br from-secondary-200 to-secondary-300 rounded-xl flex items-center justify-center">
                                    <Home className="w-24 h-24 text-secondary-600" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="aspect-video bg-gradient-to-br from-primary-200 to-primary-300 rounded-lg flex items-center justify-center">
                                        <Waves className="w-12 h-12 text-primary-600" />
                                    </div>
                                    <div className="aspect-video bg-gradient-to-br from-secondary-200 to-secondary-300 rounded-lg flex items-center justify-center">
                                        <TreePine className="w-12 h-12 text-secondary-600" />
                                    </div>
                                </div>
                            </div>

                            {/* Content side */}
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                    O chatě Milunda
                                </h2>
                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                    {chataMilunda.description}
                                </p>

                                <div className="bg-primary-50 rounded-xl p-6 mb-8">
                                    <div className="flex items-start gap-3 mb-4">
                                        <MapPin className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">
                                                Adresa
                                            </h3>
                                            <p className="text-gray-600">{chataMilunda.address.full}</p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {chataMilunda.location}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* Features */}
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <Home className="w-6 h-6 text-primary-600" />
                                            Vybavení chaty
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {chataMilunda.features.map((feature, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-start gap-2 text-gray-700"
                                                >
                                                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                                    <span>{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Activities */}
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <Bike className="w-6 h-6 text-secondary-600" />
                                            Aktivity v okolí
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {chataMilunda.activities.map((activity, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-start gap-2 text-gray-700"
                                                >
                                                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                                    <span>{activity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Detailed Features Grid */}
                <section className="py-16 bg-gray-50">
                    <div className="container-custom">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                            Co chata nabízí
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                                <UtensilsCrossed className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                                <h3 className="font-semibold text-gray-900 mb-2">Kuchyň</h3>
                                <p className="text-sm text-gray-600">
                                    Lednice a mikrovlnná trouba pro přípravu jídel
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                                <Bed className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                                <h3 className="font-semibold text-gray-900 mb-2">Ložnice</h3>
                                <p className="text-sm text-gray-600">
                                    2 ložnice pro pohodlný spánek
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                                <Bath className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    Sociální zařízení
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Koupelna a suchý záchod
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                                <Flame className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                                <h3 className="font-semibold text-gray-900 mb-2">Ohniště</h3>
                                <p className="text-sm text-gray-600">
                                    Venkovní ohniště pro grilovací večery
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Activities Highlights */}
                <section className="py-16 md:py-24">
                    <div className="container-custom">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                            Aktivity a zážitky
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                                    <Fish className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Rybaření
                                </h3>
                                <p className="text-gray-600">
                                    Rybaření přímo u chaty na vodní nádrži Strž
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                                    <Waves className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Loďka zdarma
                                </h3>
                                <p className="text-gray-600">
                                    Zapůjčení loďky pro projížďky po nádrži zdarma
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 mb-4">
                                    <Bike className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Cykloturistika
                                </h3>
                                <p className="text-gray-600">
                                    Krásné cyklotrasy v okolí pro všechny úrovně
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                                    <TreePine className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Houbaření
                                </h3>
                                <p className="text-gray-600">
                                    Bohaté lesy plné hub v okolí chaty
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Booking CTA */}
                <section
                    id="booking"
                    className="py-16 bg-gradient-to-r from-secondary-600 to-secondary-700 text-white"
                >
                    <div className="container-custom text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Rezervujte si Chatu Milunda
                        </h2>
                        <p className="text-xl text-secondary-100 mb-2">
                            Cena: {chataMilunda.price.toLocaleString()} Kč za celou chatu
                        </p>
                        <p className="text-secondary-100 mb-8">
                            Ideální pro {chataMilunda.capacity.beds} osob + možnost{" "}
                            {chataMilunda.capacity.extraBeds} přistýlek
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="tel:728490498"
                                className="inline-flex items-center justify-center bg-white text-secondary-700 hover:bg-secondary-50 font-semibold py-3 px-8 rounded-lg transition-colors"
                            >
                                Zavolat: 728 490 498
                            </a>
                            <a
                                href="/kontakt"
                                className="inline-flex items-center justify-center border-2 border-white hover:bg-white hover:text-secondary-700 font-semibold py-3 px-8 rounded-lg transition-colors"
                            >
                                Kontaktní formulář
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}