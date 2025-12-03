import Image from "next/image";
import { Heart, Users, Award } from "lucide-react";

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

export default function AboutSection() {
    return (
        <section className="py-16 md:py-24">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image side */}
                    <div className="relative">
                        <div className="aspect-4/3 bg-gradient-to-r from-primary-200 to-secondary-200 rounded-2xl overflow-hidden">
                            {/* Placeholder pro obrázek */}
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <p>Místo pro obrázek  restaurace/hotelu</p>
                            </div>
                        </div>
                    </div>

                    {/* Content side */}
                    <div>
                        <p className="text-primary-600 font-semibold mb-2">O nás</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Vítejte v Hotelu a Restauraci U Šimáka
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            Nacházíme se v malebné vesničce Radostín v blízkosti rybníka Velké Dářko,
                            v srdci Žďárských vrchů na Českomoravské vrchovině. Náš rodinný podnik
                            vám nabízí útulné ubytování, vynikající českou kuchyni a nezapomenutelné
                            zážitky v nádherné přírodě.
                        </p>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Provozují nás Filip, Aleš a Naďa Šimákovi, kteří se postarají o to,
                            abyste se u nás cítili jako doma. Ať už přijedete na dovolenou, firemní
                            akci nebo svatební hostinu, uděláme vše pro to, aby váš pobyt byl
                            perfektní.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {values.map((value) => {
                                const Icon = value.icon;
                                return (
                                    <div key={value.title}>
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary-100 text-primary-600 mb-3">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="font-semibold text-gray-900 mb-1">
                                            {value.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">{value.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}