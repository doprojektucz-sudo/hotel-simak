import { Cookie, Shield, BarChart3, Target } from "lucide-react";
import Hero from "@/components/Hero";
import ResetConsentButton from "@/components/ResetConsentButton";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Zásady Cookies",
    description:
        "Informace o používání cookies na webu hotelu U Šimáka v Radostíně.",
    alternates: {
        canonical: "https://www.usimaka.cz/zasady-cookies",
    },
    robots: {
        index: false,
        follow: false,
    },
};

const cookieTypes = [
    {
        icon: Shield,
        title: "Nezbytné cookies",
        required: true,
        description:
            "Tyto cookies jsou nutné pro základní fungování webu. Bez nich web nefunguje správně. Nelze je vypnout.",
        items: [
            {
                name: "cookie-consent-v1",
                purpose: "Ukládá vaše rozhodnutí o souhlasu s cookies",
                duration: "1 rok",
                provider: "hotel-u-simaka.cz",
            },
        ],
    },
    {
        icon: BarChart3,
        title: "Analytické cookies",
        required: false,
        description:
            "Pomáhají nám pochopit, jak návštěvníci web používají. Sbírané údaje jsou anonymní a používáme je pouze ke zlepšování našich služeb.",
        items: [
            {
                name: "_ga",
                purpose: "Google Analytics — identifikace unikátních návštěvníků",
                duration: "2 roky",
                provider: "Google",
            },
            {
                name: "_ga_XJH6JY7XQT",
                purpose: "Google Analytics — uchovává stav relace",
                duration: "2 roky",
                provider: "Google",
            },
        ],
    },
    {
        icon: Target,
        title: "Marketingové cookies",
        required: false,
        description:
            "Slouží k cílení reklam a měření jejich účinnosti. Pomáhají nám oslovit relevantní uživatele.",
        items: [],
    },
];

export default function CookiePolicyPage() {
    return (
        <main>
            <Hero
                subtitle="Právní informace"
                title="Zásady zpracování cookies"
                description="Tato stránka vysvětluje, jaké cookies na našem webu používáme, k čemu slouží a jak můžete svůj souhlas kdykoliv změnit."
            />

            {/* Co jsou cookies */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg">
                                    <Cookie className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                    Co jsou cookies?
                                </h2>
                            </div>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Cookies jsou malé textové soubory, které webové stránky ukládají
                                do vašeho prohlížeče. Pomáhají webu zapamatovat si informace
                                o vaší návštěvě, jako je preferovaný jazyk, přihlášení nebo
                                nastavení zobrazení.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Cookies používáme v souladu s nařízením GDPR a zákonem
                                č. 127/2005 Sb., o elektronických komunikacích.
                            </p>
                            <p className="text-sm text-gray-500 mt-6 pt-6 border-t border-gray-100">
                                Poslední aktualizace: 26. dubna 2026
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Typy cookies */}
            <section className="py-16 md:py-24">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Jaké cookies používáme
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Přehled všech cookies, jejich účelu a doby uložení
                            </p>
                        </div>

                        <div className="space-y-6">
                            {cookieTypes.map((type) => {
                                const Icon = type.icon;
                                return (
                                    <div
                                        key={type.title}
                                        className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
                                    >
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                                    <h3 className="text-xl font-bold text-gray-900">
                                                        {type.title}
                                                    </h3>
                                                    {type.required ? (
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold">
                                                            Vždy aktivní
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                                                            Volitelné
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-gray-600 leading-relaxed">
                                                    {type.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Tabulka cookies */}
                                        {type.items.length > 0 ? (
                                            <div className="mt-6 overflow-x-auto">
                                                <table className="w-full text-sm">
                                                    <thead>
                                                        <tr className="border-b border-gray-200">
                                                            <th className="text-left py-3 px-2 font-semibold text-gray-900">
                                                                Název
                                                            </th>
                                                            <th className="text-left py-3 px-2 font-semibold text-gray-900">
                                                                Účel
                                                            </th>
                                                            <th className="text-left py-3 px-2 font-semibold text-gray-900">
                                                                Doba uložení
                                                            </th>
                                                            <th className="text-left py-3 px-2 font-semibold text-gray-900">
                                                                Poskytovatel
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {type.items.map((item) => (
                                                            <tr
                                                                key={item.name}
                                                                className="border-b border-gray-100 last:border-0"
                                                            >
                                                                <td className="py-3 px-2 font-mono text-xs text-primary-600">
                                                                    {item.name}
                                                                </td>
                                                                <td className="py-3 px-2 text-gray-600">
                                                                    {item.purpose}
                                                                </td>
                                                                <td className="py-3 px-2 text-gray-600 whitespace-nowrap">
                                                                    {item.duration}
                                                                </td>
                                                                <td className="py-3 px-2 text-gray-600">
                                                                    {item.provider}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <p className="mt-4 text-sm text-gray-500 italic">
                                                Aktuálně žádné marketingové cookies nepoužíváme.
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Jak změnit souhlas */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 md:p-12 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg mb-6">
                                <Cookie className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Změnit souhlas s cookies
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
                                Svůj souhlas můžete kdykoliv změnit kliknutím na tlačítko níže.
                                Po jeho stisknutí se znovu zobrazí lišta s nastavením cookies.
                            </p>
                            <div className="flex justify-center">
                                <ResetConsentButton />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Práva subjektu údajů + Kontakt */}
            <section className="py-16 md:py-24">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Práva */}
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    Vaše práva
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    V souladu s GDPR máte v souvislosti se zpracováním cookies
                                    následující práva:
                                </p>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex gap-3">
                                        <span className="text-primary-600 font-bold mt-0.5">•</span>
                                        <span>právo na přístup k osobním údajům</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-primary-600 font-bold mt-0.5">•</span>
                                        <span>právo na opravu nebo výmaz údajů</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-primary-600 font-bold mt-0.5">•</span>
                                        <span>právo na omezení zpracování</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-primary-600 font-bold mt-0.5">•</span>
                                        <span>právo vznést námitku proti zpracování</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-primary-600 font-bold mt-0.5">•</span>
                                        <span>právo odvolat souhlas se zpracováním</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-primary-600 font-bold mt-0.5">•</span>
                                        <span>
                                            právo podat stížnost u Úřadu pro ochranu osobních údajů
                                            (uoou.cz)
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            {/* Kontakt */}
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    Kontakt
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    V případě dotazů ohledně zpracování cookies nebo osobních
                                    údajů nás kontaktujte:
                                </p>
                                <div className="space-y-2 text-gray-600">
                                    <p>
                                        <strong className="text-gray-900">
                                            Hotel a Restaurace U Šimáka
                                        </strong>
                                    </p>
                                    <p>
                                        E-mail:{" "}
                                        <a
                                            href="mailto:hotresrad@seznam.cz"
                                            className="text-primary-600 hover:text-primary-700 font-medium break-all hover:cursor-poínter"
                                        >
                                            hotresrad@seznam.cz
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}