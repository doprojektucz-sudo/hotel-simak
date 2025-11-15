import Hero from "@/components/Hero";
import { rooms, accommodationInfo } from "@/lib/data/rooms";
import { Bed, Wifi, Tv, Check, Clock, Info } from "lucide-react";

export default function UbytovaniPage() {
    const deluxeRooms = rooms.filter((room) => room.type === "deluxe");
    const classicRooms = rooms.filter((room) => room.type === "classic");

    return (
        <>
            <main>
                <Hero
                    subtitle="Ubytování"
                    title="Pohodlné ubytování v srdci Vysočiny"
                    description="Moderní i klasické pokoje s vlastním sociálním zařízením, TV a Wi-Fi zdarma. Ideální základna pro výlety do Žďárských vrchů."
                    primaryCta={{
                        text: "Rezervovat pokoj",
                        href: "#booking",
                    }}
                />

                {/* Info section */}
                <section className="py-12 bg-gray-50">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                                <Bed className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    Kapacita
                                </h3>
                                <p className="text-gray-600">20+ lůžek</p>
                            </div>
                            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                                <Wifi className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                                <h3 className="font-semibold text-gray-900 mb-2">Wi-Fi</h3>
                                <p className="text-gray-600">Zdarma ve všech pokojích</p>
                            </div>
                            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                                <Tv className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                                <h3 className="font-semibold text-gray-900 mb-2">TV</h3>
                                <p className="text-gray-600">V každém pokoji</p>
                            </div>
                            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
                                <Check className="w-10 h-10 text-primary-600 mx-auto mb-3" />
                                <h3 className="font-semibold text-gray-900 mb-2">Snídaně</h3>
                                <p className="text-gray-600">Zahrnuta v ceně</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Deluxe Rooms */}
                <section className="py-16 md:py-24">
                    <div className="container-custom">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Moderní pokoje Deluxe
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Nově zrekonstruované pokoje s moderním vybavením pro maximální
                                pohodlí
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {deluxeRooms.map((room) => (
                                <div
                                    key={room.id}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                                >
                                    {/* Image placeholder */}
                                    <img className="object-cover aspect-video w-full max-h-64" src={room.href} alt={room.href} />

                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-1">
                                                    {room.name}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    Kapacita: {room.capacity}{" "}
                                                    {room.capacity === 1
                                                        ? "osoba"
                                                        : room.capacity < 5
                                                            ? "osoby"
                                                            : "osob"}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-primary-600">
                                                    {room.price} Kč
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    za lůžko/noc
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 mb-4">{room.description}</p>

                                        <div className="space-y-2">
                                            <h4 className="font-semibold text-gray-900 text-sm">
                                                Vybavení:
                                            </h4>
                                            <ul className="space-y-1">
                                                {room.features.map((feature, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-center text-sm text-gray-600"
                                                    >
                                                        <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Classic Rooms */}
                <section className="py-16 md:py-24 bg-gray-50">
                    <div className="container-custom">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Klasické pokoje
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Útulné pokoje s kompletním vybavením za výhodnou cenu
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {classicRooms.map((room) => (
                                <div
                                    key={room.id}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                                >
                                    {/* Image placeholder */}
                                    <img className="object-cover aspect-video w-full max-h-64" src={room.href} alt={room.href} />

                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-1">
                                                    {room.name}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    Kapacita: {room.capacity}{" "}
                                                    {room.capacity === 1
                                                        ? "osoba"
                                                        : room.capacity < 5
                                                            ? "osoby"
                                                            : "osob"}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-secondary-600">
                                                    {room.price} Kč
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    za lůžko/noc
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 mb-4">{room.description}</p>

                                        <div className="space-y-2">
                                            <h4 className="font-semibold text-gray-900 text-sm">
                                                Vybavení:
                                            </h4>
                                            <ul className="space-y-1">
                                                {room.features.map((feature, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-center text-sm text-gray-600"
                                                    >
                                                        <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Additional info */}
                <section className="py-16 bg-primary-50">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-xl shadow-md p-8">
                                <div className="flex items-start gap-4 mb-6">
                                    <Info className="w-8 h-8 text-primary-600 flex-shrink-0" />
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                            Důležité informace
                                        </h3>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <Clock className="w-5 h-5 text-primary-600" />
                                            <h4 className="font-semibold text-gray-900">Check-in</h4>
                                        </div>
                                        <p className="text-gray-600 ml-8">
                                            Od {accommodationInfo.checkIn}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <Clock className="w-5 h-5 text-primary-600" />
                                            <h4 className="font-semibold text-gray-900">Check-out</h4>
                                        </div>
                                        <p className="text-gray-600 ml-8">
                                            Do {accommodationInfo.checkOut}
                                        </p>
                                    </div>

                                    <div className="md:col-span-2">
                                        <div className="flex items-start gap-3 mb-2">
                                            <Info className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">
                                                    Rekreační poplatek
                                                </h4>
                                                <p className="text-gray-600">
                                                    {accommodationInfo.recreationFeeNote}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <div className="flex items-start gap-3">
                                            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-2">
                                                    V ceně ubytování
                                                </h4>
                                                <ul className="space-y-1 text-gray-600">
                                                    <li>• Snídaně</li>
                                                    <li>• Wi-Fi připojení zdarma</li>
                                                    <li>• Parkování u hotelu</li>
                                                    <li>• TV v pokoji</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Booking CTA */}
                <section id="booking" className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
                    <div className="container-custom text-center">
                        <h2 className="text-3xl font-bold mb-4">Rezervujte si pobyt</h2>
                        <p className="text-xl text-primary-100 mb-8">
                            Kontaktujte nás telefonicky nebo využijte rezervační systém
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="tel:728490498"
                                className="inline-flex items-center justify-center bg-white text-primary-700 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition-colors"
                            >
                                Zavolat: 728 490 498
                            </a>
                            <a
                                href="https://www.booking.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center border-2 border-white hover:bg-white hover:text-primary-700 font-semibold py-3 px-8 rounded-lg transition-colors"
                            >
                                Rezervovat přes Booking.com
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}