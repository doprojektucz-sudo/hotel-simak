import Hero from "@/components/Hero";
import { contactInfo } from "@/lib/data/contact";
import { Phone, Mail, MapPin, Clock, Send, Link, Navigation } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import LocationMap from "@/components/LocationMap";
import { OpeningHoursDisplay } from "@/components/OpeningHoursDisplay";
import LocationSection from "@/components/home/LocationSection";

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
                                                <OpeningHoursDisplay variant="list" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-md p-6">
                                    <h3 className="font-semibold text-gray-900 mb-3">
                                        Majitel
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
                {/* Map */}
                <section className="relative py-24 md:py-32 overflow-hidden">
                    {/* Parallax background */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-fixed"
                        style={{
                            backgroundImage: "url('/images/hero-03.webp')",
                        }}
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/85 to-primary-900/80" />

                    {/* Content */}
                    <div className="container-custom relative z-10">
                        <div className="max-w-6xl mx-auto">
                            {/* Header */}
                            <div className="text-center mb-16">
                                <p className="text-primary-400 uppercase tracking-widest text-sm font-semibold mb-3">
                                    Srdce Vysočiny
                                </p>
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                    Jak se k nám dostanete
                                </h2>
                                <div className="w-16 h-1 bg-primary-500 mx-auto mb-6" />
                                <p className="text-white/70 text-lg max-w-2xl mx-auto">
                                    Radostín leží v samém srdci chráněné krajinné oblasti, obklopen lesy, rybníky a přírodními rezervacemi.
                                </p>
                            </div>

                            {/* Main Content Grid */}
                            <div className="grid lg:grid-cols-1 gap-8">
                                {/* Map Card - Glassmorphism */}
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                                    {/* Map Embed */}
                                    <div className="aspect-[4/3] w-full">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2586.123456789!2d15.874650!3d49.654744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDM5JzE3LjEiTiAxNcKwNTInMjguNyJF!5e0!3m2!1scs!2scz!4v1234567890"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            className="grayscale hover:grayscale-0 transition-all duration-500"
                                        />
                                    </div>

                                    {/* Map Actions */}
                                    <div className="p-6 flex flex-col sm:flex-row gap-3">
                                        <a
                                            href="https://maps.google.com/?q=49.654744,15.874650"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                                        >
                                            <Navigation className="w-4 h-4" />
                                            Navigovat
                                        </a>
                                        <a
                                            href="https://mapy.cz/zakladni?x=15.874650&y=49.654744&z=15"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 border border-white/20"
                                        >
                                            <MapPin className="w-4 h-4" />
                                            Mapy.cz
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}