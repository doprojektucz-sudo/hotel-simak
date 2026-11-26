"use client";

import { MapPin, Navigation, Clock, Phone, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

const nearbyPlaces = [
  { name: "Žďár nad Sázavou", distance: "12 km", time: "15 min" },
  { name: "Nové Město na Moravě", distance: "18 km", time: "20 min" },
  { name: "Jihlava", distance: "45 km", time: "40 min" },
  { name: "Brno", distance: "85 km", time: "1 hod" },
];

export default function LocationSection() {
  return (
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
          <div className="grid lg:grid-cols-2 gap-8">
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

            {/* Info Card - Glassmorphism */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-8 md:p-10">
              {/* Location Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full shadow-lg mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>

              {/* Address */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Hotel U Šimáka
              </h3>
              <address className="not-italic text-white/70 mb-8 leading-relaxed text-lg">
                <p>Radostín 95</p>
                <p>591 01 Žďár nad Sázavou</p>
              </address>

              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <a
                  href="tel:+420123456789"
                  className="flex items-center gap-3 text-white/80 hover:text-primary-400 transition-colors"
                >
                  <Phone className="w-5 h-5 text-primary-400" />
                  <span>+420 728 490 498</span>
                </a>
                <a
                  href="mailto:info@hotelusimakaradostin.cz"
                  className="flex items-center gap-3 text-white/80 hover:text-primary-400 transition-colors"
                >
                  <Mail className="w-5 h-5 text-primary-400" />
                  <span>hotresrad@seznam.cz</span>
                </a>
              </div>

              {/* CTA */}
              <Link
                href="/kontakt"
                className="mt-8 w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg"
              >
                Kontaktujte nás
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}