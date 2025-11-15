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
        {/* Nature Attractions - Asymmetric Masonry Grid */}
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-100 rounded-full blur-3xl opacity-20 -z-10" />
          
          <div className="container-custom">
            <div className="text-center mb-16 fade-in-scroll">
              <div className="inline-flex items-center gap-2 bg-secondary-50 text-secondary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Sparkles className="w-4 h-4" />
                <span>Přírodní krásy</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Objevte jedinečnou přírodu <br />
                <span className="gradient-text">Žďárských vrchů</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Od největšího rybníka Českomoravské vrchoviny až po tajemná rašeliniště připomínající severskou tajgu
              </p>
            </div>

            {/* Masonry-style grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Large feature card - Velké Dářko */}
              <div className="fade-in-scroll stagger-1 md:row-span-2 bg-white rounded-3xl shadow-xl overflow-hidden hover-lift group">
                <div className="image-overlay relative h-80 md:h-full">
                  <img
                    src={activitiesByCategory.nature[0].href}
                    alt={activitiesByCategory.nature[0].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform transition-transform group-hover:translate-y-0">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                        {activitiesByCategory.nature[0].distance}
                      </span>
                      <span className="bg-blue-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <Waves className="w-3 h-3" />
                        Největší rybník
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-3">{activitiesByCategory.nature[0].name}</h3>
                    <p className="text-white/90 mb-4 line-clamp-2">
                      {activitiesByCategory.nature[0].description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {activitiesByCategory.nature[0].features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Two smaller cards stacked */}
              <div className="space-y-6">
                {activitiesByCategory.nature.slice(1).map((attraction, index) => (
                  <div
                    key={attraction.id}
                    className={`fade-in-scroll stagger-${index + 2} bg-white rounded-2xl shadow-lg overflow-hidden hover-lift group`}
                  >
                    <div className="md:flex">
                      <div className="image-overlay md:w-2/5 h-48 md:h-auto">
                        <img
                          src={attraction.href}
                          alt={attraction.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:w-3/5">
                        <div className="flex items-center gap-2 mb-2">
                          {attraction.distance && (
                            <span className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full font-semibold">
                              {attraction.distance}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-secondary-600 transition-colors">
                          {attraction.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {attraction.description}
                        </p>
                        <div className="flex items-center text-secondary-600 text-sm font-semibold group-hover:gap-2 transition-all">
                          <span>Zjistit více</span>
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sports - Bento Grid Style */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-20 -z-10" />
          
          <div className="container-custom">
            <div className="text-center mb-16 fade-in-scroll">
              <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Bike className="w-4 h-4" />
                <span>Sportovní vyžití</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Aktivní odpočinek <br />
                <span className="gradient-text">v nádherné přírodě</span>
              </h2>
            </div>

            {/* Bento-style grid */}
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {activitiesByCategory.sport.map((activity, index) => {
                const isLarge = index === 0 || index === 3;
                return (
                  <div
                    key={activity.id}
                    className={`fade-in-scroll stagger-${index + 1} ${
                      isLarge ? "md:col-span-2 md:row-span-2" : ""
                    } bg-white rounded-2xl overflow-hidden hover-lift group shadow-lg`}
                  >
                    <div className={`${isLarge ? "md:flex" : ""}`}>
                      <div className={`image-overlay relative ${isLarge ? "md:w-1/2 h-64 md:h-auto" : "h-48"}`}>
                        <div className="absolute inset-0  group-hover:opacity-0 transition-opacity" />
                        <img
                          src={activity.href}
                          alt={activity.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className={`p-6 ${isLarge ? "md:w-1/2" : ""}`}>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className={`${isLarge ? "text-2xl" : "text-lg"} font-bold text-gray-900 group-hover:text-primary-600 transition-colors`}>
                            {activity.name}
                          </h3>
                          {activity.distance && (
                            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-semibold whitespace-nowrap">
                              {activity.distance}
                            </span>
                          )}
                        </div>
                        <p className={`text-gray-600 ${isLarge ? "text-base mb-4" : "text-sm mb-3"} ${isLarge ? "" : "line-clamp-2"}`}>
                          {activity.description}
                        </p>
                        {isLarge && (
                          <div className="space-y-2 mt-4">
                            {activity.features.slice(0, 4).map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                <Compass className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Culture - Full width feature */}
        {activitiesByCategory.culture.length > 0 && (
          <section className="py-16 md:py-24 bg-white">
            <div className="container-custom">
              <div className="fade-in-scroll bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl overflow-hidden shadow-2xl">
                <div className="md:flex">
                  <div className="image-overlay md:w-1/2 h-80 md:h-auto">
                    <img
                      src={activitiesByCategory.culture[0].href}
                      alt={activitiesByCategory.culture[0].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 w-fit">
                      <Camera className="w-4 h-4" />
                      <span>Kultura & Umění</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      {activitiesByCategory.culture[0].name}
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                      {activitiesByCategory.culture[0].description}
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {activitiesByCategory.culture[0].features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
                          <Compass className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-amber-700 font-semibold hover:gap-3 transition-all cursor-pointer">
                      <span>Zobrazit všechny sochy</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Map with overlay */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12 fade-in-scroll">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Kde nás najdete
              </h2>
              <p className="text-lg text-gray-600">
                Ideální výchozí bod pro objevování Žďárských vrchů
              </p>
            </div>

            <div className="fade-in-scroll relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-[21/9]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2588.7!2d15.874650!3d49.654744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDM5JzE3LjEiTiAxNcKwNTInMjguNyJF!5e0!3m2!1scs!2scz!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa - Hotel U Šimáka a okolí"
                />
              </div>
            </div>
          </div>
        </section>

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