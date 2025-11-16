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
    name: "Jan Novák",
    role: "Host recenze",
    text: "Vynikající česká kuchyně v krásném prostředí Vysočiny. Obsluha byla velmi milá a profesionální. Zvláště chutnal svíčkový steak a domácí dezerty. Určitě se vrátíme!",
    rating: 5,
    source: "Google",
    link: "https://google.com",
  },
  {
    id: 2,
    name: "Marie Procházková",
    role: "Host recenze",
    text: "Perfektní místo pro rodinnou oslavou. Prostorný salonek, výborné jídlo a příjemná atmosféra. Děti si pochutnaly na pizze a my na tradiční české kuchyni. Velké plus za příjemné prostředí a vstřícný personál.",
    rating: 5,
    source: "Booking.com",
    link: "https://booking.com",
  },
  {
    id: 3,
    name: "Petr Svoboda",
    role: "Host recenze",
    text: "Skvělá restaurace s autentickou českou kuchyní. Pstruh na másle byl výborný, porce velkorysé a ceny přijatelné. Doporučuji také ubytování - čisté pokoje a klidné prostředí.",
    rating: 5,
    source: "TripAdvisor",
    link: "https://tripadvisor.com",
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
          backgroundImage: "url('/images/hero-02.webp')",
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
                className="p-3 rounded-full bg-white/10 hover:bg-primary-600 border border-white/20 text-white transition-all duration-300 hover:scale-110 hover:border-primary-500"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="p-3 rounded-full bg-white/10 hover:bg-primary-600 border border-white/20 text-white transition-all duration-300 hover:scale-110 hover:border-primary-500"
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