import Hero from "@/components/Hero";
import LuxuryDrinks from "@/components/drinks/LuxuryDrinks";
import { OpeningHoursDisplay } from "@/components/OpeningHoursDisplay";
import Testimonials from "@/components/Testimonials";
import VerticalMenu from "@/components/menu/VerticalMenu";
import { prisma } from "@/lib/prisma";
import { Utensils, Clock, Users } from "lucide-react";

export default async function RestauracePage() {
    const [menuItems, menuCategories, drinks, drinkCategories] = await Promise.all([
        prisma.menuItem.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: "asc" },
        }),
        prisma.menuCategory.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: "asc" },
        }),
        prisma.drink.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: "asc" },
        }),
        prisma.drinkCategory.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: "asc" },
        }),
    ]);

    return (
        <>
            <main>
                <Hero
                    backgroundImage="/images/hero-02.webp"
                    subtitle="Restaurace"
                    title="Tradiční česká kuchyně"
                    description="Vychutnejte si autentické pokrmy české kuchyně připravované z kvalitních surovin. Pilsner Urquell, Bernard a pravá čepovaná Kofola."
                    primaryCta={{
                        text: "Rezervovat stůl",
                        href: "/kontakt",
                    }}
                />

                {/* Info cards */}
                <section className="py-12 bg-gray-50">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                                <Users className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                                <h3 className="font-semibold text-gray-900 mb-2">Kapacita</h3>
                                <p className="text-gray-600">
                                    60 míst v restauraci
                                    <br />
                                    24 míst v salonku
                                    <br />
                                    30 míst na terase
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                                <Clock className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    Otevírací doba
                                </h3>
                                <OpeningHoursDisplay variant="card" />
                            </div>
                            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                                <Utensils className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                                <h3 className="font-semibold text-gray-900 mb-2">Speciality</h3>
                                <p className="text-gray-600">
                                    Vídeňská rostěná
                                    <br />
                                    Smažené candátí hranolky
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <VerticalMenu items={menuItems} categories={menuCategories} />
                <LuxuryDrinks drinks={drinks} categories={drinkCategories} />
                <Testimonials />

                {/* CTA section */}
                <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
                    <div className="container-custom text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Máte chuť na dobré jídlo?
                        </h2>
                        <p className="text-xl text-primary-100 mb-8">
                            Rezervujte si stůl nebo nás navštivte
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="tel:728490498"
                                className="inline-flex items-center justify-center bg-white text-primary-700 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-colors"
                            >
                                Zavolat: 728 490 498
                            </a>
                            <a
                                href="/kontakt"
                                className="inline-flex items-center justify-center border-2 border-white hover:bg-white hover:text-primary-700 font-semibold py-3 px-8 rounded-lg transition-colors"
                            >
                                Kontaktní formulář
                            </a>
                        </div>
                    </div>
                </section >
            </main >
        </>
    );
}