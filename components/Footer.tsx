import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react";
import { contactInfo } from "@/lib/data/contact";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">
                            Hotel a Restaurace U Šimáka
                        </h3>
                        <p className="text-sm mb-4">
                            Rodinný hotel a restaurace v malebném Radostíně u Žďáru nad Sázavou.
                            Nabízíme ubytování, kvalitní českou kuchyni a nezapomenutelné zážitky
                            v srdci Vysočiny.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">
                            Rychlé odkazy
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/restaurace" className="hover:text-primary-400 transition-colors">
                                    Restaurace & Menu
                                </Link>
                            </li>
                            <li>
                                <Link href="/ubytovani" className="hover:text-primary-400 transition-colors">
                                    Ubytování
                                </Link>
                            </li>
                            <li>
                                <Link href="/chata-milunda" className="hover:text-primary-400 transition-colors">
                                    Chata Milunda
                                </Link>
                            </li>
                            <li>
                                <Link href="/akce" className="hover:text-primary-400 transition-colors">
                                    Akce & Catering
                                </Link>
                            </li>
                            <li>
                                <Link href="/okoli" className="hover:text-primary-400 transition-colors">
                                    Okolí & Tipy na výlety
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Opening Hours */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">
                            Otevírací doba
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex justify-between">
                                <span>Pondělí:</span>
                                <span className="font-semibold text-primary-400">ZAVŘENO</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Út–Čt:</span>
                                <span>11:00–22:00</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Pá–So:</span>
                                <span>11:00–23:00</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Neděle:</span>
                                <span>11:00–23:00</span>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Kontakt</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <MapPin className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                                <span>{contactInfo.address.full}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-5 h-5 text-primary-400 shrink-0" />
                                <a
                                    href={`tel:${contactInfo.phone}`}
                                    className="hover:text-primary-400 transition-colors"
                                >
                                    {contactInfo.phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-5 h-5 text-primary-400 shrink-0" />
                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="hover:text-primary-400 transition-colors"
                                >
                                    {contactInfo.email}
                                </a>
                            </li>
                        </ul>

                        {/* Social Media - placeholder */}
                        <div className="flex gap-4 mt-4">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-primary-400 transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-6 h-6" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-primary-400 transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-6 h-6" />
                            </a>
                        </div>
                    </div >
                </div >

                {/* Bottom bar */}
                < div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center" >
                    <p>
                        &copy; {new Date().getFullYear()} Hotel a Restaurace U Šimáka. Všechna
                        práva vyhrazena.
                    </p>
                </div >
            </div >
        </footer >
    );
}