"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar?: string;
  source: string;
  link: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jiří Petrák",
    role: "Host recenze",
    text: "Dnes při pěší procházce v okolí Dářka jsme přišli do vesnice zvané Radostin. A navštívily zdejší restauraci. Velice milé překvapení ochotná a příjemná obsluha s vynikajícím jídlem velké porce. Všem doporučuji 👏👍👏 Ještě jednou děkujeme celému týmu.",
    rating: 5,
    source: "Google",
    link: "https://maps.app.goo.gl/R2ZKRkP2DhRAk9Qo9",
  },
  {
    id: 2,
    name: "Valkira Lucie",
    role: "Host recenze",
    text: "Zavítali jsme sem v sobotu brzké odpoledne s 3letým synkem hladový a hospoda byla plná, poslední dva volné stoly. Číšník nám oznámil, že mají o víkendu zvěřinové hody, což nám nijak nevadilo, naopak. Nemohli jsme si vybrat, chuť byla na všechno z nabídky 😄 Dali jsem si gulášovou polévku a ze zvěřiny rolády a steak a všechno výborné. Jen jsme déle čekali, ale to bylo způsobeno plnou hodpodou. Obsluha milá, měli plné ruce práce.",
    rating: 5,
    source: "Google",
    link: "https://maps.app.goo.gl/M5QUcGJryRDKaqBN7",
  },
  {
    id: 3,
    name: "Pavel Rosecký",
    role: "Host recenze",
    text: "Byli jsme na Svatomartinských hodech a dali jsme si jako předkrm paštiku s toustíky, polévka knedličková a jako hlavní chod se podávala čtvrtka husy, k ní dva druhy zelí a knedlíků. Mysleli jsme, že nemáme šanci všechno sníst. Ale byla to taková bašta, že jsme pomalu vylízali talíře 🙂. Obsluha byla moc příjemná.",
    rating: 5,
    source: "Google",
    link: "https://maps.app.goo.gl/bkequKbns3mXeqCg6",
  },
  {
    id: 4,
    name: "Jan Doubeček",
    role: "Host recenze",
    text: "Šli jsme okolo a rozhodli se zastavit na jedno. Po přečtení menu jsme dostali chuť na Cmundu a kulajdu. Obě jídla byla naprostá dobrota. Domácí bramborák, jedno z nejlepších zelí co jsem kdy jedl a naprosto vynikající kulajda. Abych nezapomněl tak nás obsluhovala velmi příjemná slečna. Určitě se k Šimákovi rádi vrátíme.",
    rating: 5,
    source: "Google",
    link: "https://maps.app.goo.gl/6cyStx11NsJ7PduG8",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrev();
    }

    // Reset values
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Parallax background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('/images/knedliky.webp')",
        }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/85 to-primary-900/80" />

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-primary-400 uppercase tracking-widest text-sm font-semibold mb-3">
              Recenze
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Co říkají naši hosté?
            </h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto" />
          </div>

          {/* Testimonial Box - Glassmorphism */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-8 md:p-12 relative">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full p-4 shadow-lg">
              <Quote className="w-8 h-8 text-white" />
            </div>

            {/* Carousel */}
            <div
              className="relative min-h-[320px] flex items-center mt-4"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${index === currentIndex ? "opacity-100" : "opacity-0"
                    }`}
                >
                  {/* Text */}
                  <p className="text-lg md:text-xl text-white/95 leading-relaxed mb-10 italic">
                    "{testimonial.text}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg">
                      {testimonial.name.charAt(0)}
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      {/* Stars */}
                      <div className="flex gap-1 mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-primary-400 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <h6 className="font-bold text-white text-lg">
                        {testimonial.name}
                      </h6>
                      <p className="text-gray-300 text-sm mb-1">
                        {testimonial.role}
                      </p>
                      <a
                        href={testimonial.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-400 hover:text-primary-300 text-sm font-medium inline-flex items-center gap-1 transition-colors"
                      >
                        Recenze na {testimonial.source}
                        <span className="text-xs">→</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-center gap-4 mt-10">
              <button
                onClick={goToPrev}
                className="p-3 rounded-full bg-white/10 hover:bg-primary-600 border hover:cursor-pointer border-white/20 text-white transition-all duration-300 hover:scale-110 hover:border-primary-500"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="p-3 rounded-full bg-white/10 hover:bg-primary-600 border hover:cursor-pointer border-white/20 text-white transition-all duration-300 hover:scale-110 hover:border-primary-500"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${index === currentIndex
                    ? "w-8 h-2 bg-primary-400"
                    : "w-2 h-2 bg-white/30 hover:bg-white/50"
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}