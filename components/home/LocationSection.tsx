import { MapPin, Navigation, Mountain, Trees } from "lucide-react";
import Link from "next/link";

const highlights = [
    {
        icon: MapPin,
        title: "Velké Dářko",
        description: 'Největší rybník Českomoravské vrchoviny - "Moře Vysočiny"',
    },
    {
        icon: Navigation,
        title: "Cykloturistika",
        description: "Desítky kilometrů značených cyklotras v okolí",
    },
    {
        icon: Mountain,
        title: "Žďárské vrchy",
        description: "Nádherná příroda ideální pro turistiku a relax",
    },
    {
        icon: Trees,
        title: "Radostínské rašeliniště",
        description: "Národní přírodní rezervace s naučnou stezkou",
    },
];

export default function LocationSection() {
    return (
        <section className="py-16 md:py-24 bg-secondary-50">
            <div className="container-custom">
                <div className="text-center mb-12">
                    <p className="text-secondary-600 font-semibold mb-2">Lokalita</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Objevte krásy Vysočiny
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Radostín leží v srdci Žďárských vrchů, obklopen nádhernými lesy,
                        rybníky a přírodními rezervacemi
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {highlights.map((highlight) => {
                        const Icon = highlight.icon;
                        return (
                            <div
                                key={highlight.title}
                                className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                            >
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary-100 text-secondary-600 mb-4">
                                    <Icon className="w-7 h-7" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    {highlight.title}
                                </h3>
                                <p className="text-sm text-gray-600">{highlight.description}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                    <div className="aspect-21/9 bg-gray-200">
                        {/* Zde bude Google Maps embed */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2588.7!2d15.874650!3d49.654744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDM5JzE3LjEiTiAxNcKwNTInMjguNyJF!5e0!3m2!1scs!2scz!4v1234567890"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mapa - Hotel U Šimáka"
                        />
                    </div>
                    <div className="p-6 md:p-8 text-center">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Jak se k nám dostanete
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Radostín 95, 591 01 Žďár nad Sázavou
                        </p>
                        <Link
                            href="/kontakt"
                            className="inline-flex items-center text-secondary-600 hover:text-secondary-700 font-semibold"
                        >
                            Zobrazit detailní informace
                            <Navigation className="ml-2 w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}