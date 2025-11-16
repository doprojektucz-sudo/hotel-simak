import Hero from "@/components/Hero";
import { contactInfo } from "@/lib/data/contact";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import LocationMap from "@/components/LocationMap";

export default function KontaktPage() {
    return (
        <>
            <main>
                <Hero
                    subtitle="Kontakt"
                    title="Jsme tu pro vás"
                    description="Máte dotaz nebo chcete rezervovat? Neváhejte nás kontaktovat telefonicky, emailem nebo přes kontaktní formulář."
                />

                {/* Quick Contact */}
                <section className="py-12 bg-gray-50">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <a
                                href={`tel:${contactInfo.phone}`}
                                className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group"
                            >
                                <Phone className="w-10 h-10 text-primary-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                                <h3 className="font-semibold text-gray-900 mb-2">Telefon</h3>
                                <p className="text-primary-600 font-semibold">
                                    {contactInfo.phone}
                                </p>
                            </a>

                            <a
                                href={`mailto:${contactInfo.email}`}
                                className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group"
                            >
                                <Mail className="w-10 h-10 text-primary-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                                <p className="text-primary-600 font-semibold break-all">
                                    {contactInfo.email}
                                </p>
                            </a>

                            <a
                                href={contactInfo.gps.mapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group"
                            >
                                <MapPin className="w-10 h-10 text-primary-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                                <h3 className="font-semibold text-gray-900 mb-2">Adresa</h3>
                                <p className="text-gray-600 text-sm">
                                    {contactInfo.address.full}
                                </p>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Contact Form & Info */}
                <section className="py-16 md:py-24">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Contact Form */}
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    Napište nám
                                </h2>
                                <p className="text-gray-600 mb-8">
                                    Vyplňte formulář a my se vám ozveme co nejdříve. Rádi
                                    zodpovíme všechny vaše dotazy a pomůžeme s rezervací.
                                </p>
                                <ContactForm />
                            </div>

                            {/* Contact Info */}
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                    Kontaktní informace
                                </h2>

                                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-8 mb-8">
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <MapPin className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-1">
                                                    Adresa
                                                </h3>
                                                <p className="text-gray-600">
                                                    {contactInfo.address.street}
                                                </p>
                                                <p className="text-gray-600">
                                                    {contactInfo.address.zip} {contactInfo.address.city}
                                                </p>
                                                <p className="text-sm text-gray-500 mt-2">
                                                    GPS: {contactInfo.gps.lat}, {contactInfo.gps.lng}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <Phone className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-1">
                                                    Telefon
                                                </h3>
                                                <a
                                                    href={`tel:${contactInfo.phone}`}
                                                    className="text-primary-600 hover:text-primary-700 font-semibold"
                                                >
                                                    {contactInfo.phone}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <Mail className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-1">
                                                    Email
                                                </h3>
                                                <a
                                                    href={`mailto:${contactInfo.email}`}
                                                    className="text-primary-600 hover:text-primary-700 font-semibold break-all"
                                                >
                                                    {contactInfo.email}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <Clock className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-3">
                                                    Otevírací doba
                                                </h3>
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex justify-between gap-16">
                                                        <span className="text-gray-600">Pondělí:</span>
                                                        <span className="font-semibold text-red-600">
                                                            {contactInfo.openingHours.monday}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between gap-16">
                                                        <span className="text-gray-600">Úterý–Čtvrtek:</span>
                                                        <span className="font-semibold text-gray-900">
                                                            {contactInfo.openingHours.tuesday}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between gap-16">
                                                        <span className="text-gray-600">Pátek–Sobota:</span>
                                                        <span className="font-semibold text-gray-900">
                                                            {contactInfo.openingHours.friday}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between gap-16">
                                                        <span className="text-gray-600">Neděle:</span>
                                                        <span className="font-semibold text-gray-900">
                                                            {contactInfo.openingHours.sunday}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-md p-6">
                                    <h3 className="font-semibold text-gray-900 mb-3">
                                        Majitelé
                                    </h3>
                                    <ul className="space-y-2">
                                        {contactInfo.owners.map((owner, index) => (
                                            <li key={index} className="text-gray-600">
                                                • {owner}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <LocationMap />
                {/* Map */}
                <section className="py-16 bg-gray-50">
                    <div className="container-custom">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                            Kde nás najdete
                        </h2>
                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                            <div className="aspect-21/9 bg-gray-200">
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
                        </div>
                    </div>
                </section>

                {/* Directions */}
                <section className="py-16">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                                Jak se k nám dostanete
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-white rounded-xl shadow-md p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                        Autem
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Radostín se nachází cca 10 km od Žďáru nad Sázavou. Z Brna
                                        či Prahy jeďte po dálnici D1, v Jihlavě odbočte směr Žďár
                                        nad Sázavou. Z města pokračujte směr Radostín.
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Parkování přímo u hotelu zdarma.
                                    </p>
                                </div>

                                <div className="bg-white rounded-xl shadow-md p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                        Vlakem a autobusem
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Nejbližší vlakové nádraží je ve Žďáru nad Sázavou (cca 10
                                        km). Odtud můžete pokračovat autobusem směr Radostín nebo
                                        využít taxi službu.
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Rádi vám s dopravou pomůžeme, kontaktujte nás.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}