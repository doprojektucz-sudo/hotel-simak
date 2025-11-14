import Link from "next/link";
import { Phone, Calendar, Mail } from "lucide-react";
import { contactInfo } from "@/lib/data/contact";

export default function CTASection() {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
            <div className="container-custom">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Těšíme se na vaši návštěvu!
                    </h2>
                    <p className="text-xl text-primary-100 mb-8">
                        Rezervujte si termín nebo nás kontaktujte pro více informací
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <a
                            href={`tel:${contactInfo.phone}`}
                            className="inline-flex items-center justify-center bg-white text-primary-700 hover:bg-primary-50 font-semibold py-4 px-8 rounded-lg transition-colors duration-200"
                        >
                            <Phone className="w-5 h-5 mr-2" />
                            Zavolejte nám
                        </a>
                        <Link
                            href="/kontakt"
                            className="inline-flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-primary-700 font-semibold py-4 px-8 rounded-lg transition-colors duration-200"
                        >
                            <Mail className="w-5 h-5 mr-2" />
                            Kontaktní formulář
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold mb-2">120+</div>
                            <div className="text-primary-200">Kapacita hostů</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">20+</div>
                            <div className="text-primary-200">Lůžek k ubytování</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">100%</div>
                            <div className="text-primary-200">Spokojenost</div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}