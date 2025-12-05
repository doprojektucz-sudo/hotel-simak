"use client";

import { useEffect, useRef } from "react";
import Hero from "@/components/Hero";
import { attractions, activitiesByCategory } from "@/lib/data/attractions";
import {
  Mountain,
  Bike,
  Fish,
  TreePine,
  Waves,
  CircleDot,
  Footprints,
  Camera,
  Compass,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import NatureAttractionsSection from "@/components/NatureAttractions";
import SportsSection from "@/components/SportsSection";

export default function OkoliPage() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".fade-in-scroll");
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        if (isVisible) {
          el.classList.add("visible");
        }
      });

      // Parallax effect
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style jsx global>{`
        .fade-in-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .fade-in-scroll.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.4s; }
        .stagger-5 { transition-delay: 0.5s; }
        
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .image-overlay {
          position: relative;
          overflow: hidden;
        }
        .image-overlay::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .image-overlay:hover::after {
          opacity: 1;
        }
        .image-overlay img {
          transition: transform 0.6s ease;
        }
        .image-overlay:hover img {
          transform: scale(1.08);
        }

        .floating {
          animation: floating 6s ease-in-out infinite;
        }
        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .gradient-text {
          background: linear-gradient(135deg, #8b5a3c 0%, #d4a574 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <main>
        <Hero
          subtitle="Okolí & Tipy na výlety"
          title="Objevte krásy Žďárských vrchů"
          description="Nádherná příroda, rybníky, naučné stezky, cyklotrasy a mnoho dalšího. Radostín je ideálním výchozím bodem pro výlety po Vysočině."
          primaryCta={{
            text: "Prohlédnout ubytování",
            href: "/ubytovani",
          }}
          backgroundImage="/images/okoli.webp"
        />
        <NatureAttractionsSection />
        <SportsSection />

        {/* Culture - Modern Gallery with Parallax - DARKER VERSION */}
        {activitiesByCategory.culture.length > 0 && (
          <section className="relative py-24 md:py-32 overflow-hidden">
            {/* Parallax background with sculpture */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-fixed"
              style={{
                backgroundImage: "url('/images/socha-lev.webp')", // Hlavní sousoší na pozadí
              }}
            />

            {/* MUCH DARKER gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-gray-900/88 to-amber-950/85" />

            {/* Content */}
            <div className="container-custom relative z-10">
              {/* Header */}
              <div className="text-center mb-16 fade-in-scroll">
                <div className="inline-flex items-center gap-2 bg-amber-400/20 backdrop-blur-sm text-amber-200 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-amber-400/30">
                  <Camera className="w-4 h-4" />
                  <span>Kultura & Umění</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {activitiesByCategory.culture[0].name}
                </h2>
                <p className="text-xl text-amber-100 max-w-3xl mx-auto">
                  {activitiesByCategory.culture[0].description}
                </p>
              </div>

              {/* Main Content Card - Glassmorphism */}
              <div className="fade-in-scroll bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                <div className="p-8 md:p-12">
                  {/* Photo Gallery Grid */}
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    {/* Large featured image */}
                    <div className="md:col-span-2 md:row-span-2 group">
                      <div className="relative h-full min-h-[300px] md:min-h-[400px] rounded-2xl overflow-hidden">
                        <img
                          src="/images/socha-mamlas.webp" // Mamlas u Starého Dvora
                          alt="Mamlas u Starého Dvora"
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <h4 className="text-xl font-bold mb-1">Mamlas u Starého Dvora</h4>
                          <p className="text-sm text-white/90">Lesní tvor na vyhlídce</p>
                        </div>
                      </div>
                    </div>

                    {/* Smaller images */}
                    <div className="group">
                      <div className="relative h-48 rounded-2xl overflow-hidden">
                        <img
                          src="/images/socha-hrosi.webp" // Hroši
                          alt="Hroši ve Škrdlovicích"
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h4 className="font-bold text-sm">Hroši</h4>
                          <p className="text-xs text-white/90">Škrdlovice</p>
                        </div>
                      </div>
                    </div>

                    <div className="group">
                      <div className="relative h-48 rounded-2xl overflow-hidden">
                        <img
                          src="/images/socha-mamut.webp" // Mamut
                          alt="Mamut v údolí Sázavy"
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h4 className="font-bold text-sm">Mamut</h4>
                          <p className="text-xs text-white/90">Údolí Sázavy</p>
                        </div>
                      </div>
                    </div>

                    <div className="group">
                      <div className="relative h-48 rounded-2xl overflow-hidden">
                        <img
                          src="/images/socha-lev.webp" // Hraniční kámen
                          alt="Hraniční kámen - lev a orlice"
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h4 className="font-bold text-sm">Lev a orlice</h4>
                          <p className="text-xs text-white/90">Pilská nádrž</p>
                        </div>
                      </div>
                    </div>

                    <div className="group">
                      <div className="relative h-48 rounded-2xl overflow-hidden">
                        <img
                          src="/images/socha.webp" // Rozcestník
                          alt="Rozcestník u Velkého Dářka"
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h4 className="font-bold text-sm">Rozcestník</h4>
                          <p className="text-xs text-white/90">Velké Dářko</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 mb-8">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <div className="bg-amber-500/20 p-2 rounded-lg">
                        <Compass className="w-6 h-6 text-amber-300" />
                      </div>
                      Kde najdete další sochy
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {activitiesByCategory.culture[0].features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 text-white/90 bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
                        >
                          <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="text-center">
                    <a
                      href="https://www.korunavysociny.cz/tematicke-vylety/putovani-po-sochach-michala-olsiaka"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <Camera className="w-5 h-5" />
                      <span>Zobrazit všechny sochy na mapě</span>
                      <ArrowRight className="w-5 h-5" />
                    </a>
                    <p className="text-amber-200 text-sm mt-4">
                      Objevte desítky dalších soch po celé Vysočině
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Info Cards */}
              <div className="grid md:grid-cols-3 gap-6 mt-8 fade-in-scroll">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300">
                  <div className="bg-amber-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-amber-300" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Monumentální díla</h4>
                  <p className="text-amber-100 text-sm">
                    Plastiky z pískovce a betonu vysoké až několik metrů
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300">
                  <div className="bg-amber-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Footprints className="w-8 h-8 text-amber-300" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Turistická trasa</h4>
                  <p className="text-amber-100 text-sm">
                    Projděte se po cestě vedoucí od sochy k soše
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 text-center hover:bg-white/15 transition-all duration-300">
                  <div className="bg-amber-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-8 h-8 text-amber-300" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Foto lokace</h4>
                  <p className="text-amber-100 text-sm">
                    Ideální místa pro nezapomenutelné fotografie
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-secondary-600 via-secondary-700 to-secondary-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>

          <div className="container-custom text-center relative z-10">
            <div className="fade-in-scroll">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Připraveni objevovat Vysočinu?
              </h2>
              <p className="text-xl text-secondary-100 mb-10 max-w-2xl mx-auto">
                Ubytujte se u nás a vyrazte na nezapomenutelné výlety po nejkrásnějších místech Žďárských vrchů
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/ubytovani"
                  className="group inline-flex items-center justify-center gap-2 bg-white text-secondary-700 hover:bg-secondary-50 font-semibold py-4 px-8 rounded-xl transition-all hover:scale-105 shadow-lg"
                >
                  <span>Rezervovat ubytování</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/kontakt"
                  className="inline-flex items-center justify-center border-2 border-white hover:bg-white hover:text-secondary-700 font-semibold py-4 px-8 rounded-xl transition-all hover:scale-105"
                >
                  Kontaktujte nás
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}