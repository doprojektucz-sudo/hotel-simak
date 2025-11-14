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

    return (
        <section
            className="relative py-24 md:py-32 bg-fixed bg-cover bg-center overflow-hidden"
            style={{
                backgroundImage: "url('/images/hero-01.webp')",
            }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/70" />

            {/* Content */}
            <div className="container-custom relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <p className="text-primary-400 uppercase tracking-widest text-sm font-semibold mb-3">
                            Recenze
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Co říkají naši hosté?
                        </h2>
                        <div className="w-16 h-1 bg-primary-500 mx-auto" />
                    </div>

                    {/* Testimonial Box */}
                    <div className="bg-white rounded-lg shadow-2xl p-8 md:p-12 relative">
                        {/* Quote Icon */}
                        <div className="absolute -top-6 left-8 bg-primary-600 rounded-full p-4">
                            <Quote className="w-8 h-8 text-white" />
                        </div>

                        {/* Carousel */}
                        <div className="relative min-h-[300px] flex items-center">
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={testimonial.id}
                                    className={`absolute inset-0 transition-opacity duration-500 ${index === currentIndex ? "opacity-100" : "opacity-0"
                                        }`}
                                >
                                    {/* Text */}
                                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic">
                                        "{testimonial.text}"
                                    </p>

                                    {/* Author Info */}
                                    <div className="flex items-center gap-4">
                                        {/* Avatar */}
                                        <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xl flex-shrink-0">
                                            {testimonial.name.charAt(0)}
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1">
                                            {/* Stars */}
                                            <div className="flex gap-1 mb-2">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        className="w-5 h-5 text-primary-500 fill-current"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <h6 className="font-bold text-gray-900 text-lg">
                                                {testimonial.name}
                                            </h6>
                                            <p className="text-gray-600 text-sm">
                                                {testimonial.role}
                                            </p>
                                            <a
                                                href={testimonial.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-1 inline-block"
                                            >
                                                Recenze na {testimonial.source} →
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation Arrows */}
                        <div className="flex justify-center gap-4 mt-8">
                            <button
                                onClick={goToPrev}
                                className="p-3 rounded-full bg-gray-100 hover:bg-primary-600 text-gray-700 hover:text-white transition-all duration-300"
                                aria-label="Previous testimonial"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={goToNext}
                                className="p-3 rounded-full bg-gray-100 hover:bg-primary-600 text-gray-700 hover:text-white transition-all duration-300"
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
                                            ? "w-8 h-2 bg-primary-600"
                                            : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
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


/* "use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

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
    role: "Recenze hosta",
    text: "Vynikající česká kuchyně v krásném prostředí Vysočiny. Obsluha byla velmi milá a profesionální. Zvláště chutnal svíčkový steak a domácí dezerty. Určitě se vrátíme!",
    rating: 5,
    source: "Google",
    link: "https://google.com",
  },
  {
    id: 2,
    name: "Marie Procházková",
    role: "Recenze hosta",
    text: "Perfektní místo pro rodinnou oslavou. Prostorný salonek, výborné jídlo a příjemná atmosféra. Děti si pochutnaly na pizze a my na tradiční české kuchyni. Velké plus za příjemné prostředí a vstřícný personál.",
    rating: 5,
    source: "Booking.com",
    link: "https://booking.com",
  },
  {
    id: 3,
    name: "Petr Svoboda",
    role: "Recenze hosta",
    text: "Skvělá restaurace s autentickou českou kuchyní. Pstruh na másle byl výborný, porce velkorysé a ceny přijatelné. Doporučuji také ubytování - čisté pokoje a klidné prostředí.",
    rating: 5,
    source: "TripAdvisor",
    link: "https://tripadvisor.com",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <section
      className="relative py-24 md:py-32 bg-fixed bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/hero-02.webp')",
      }}
    >
   
      <div className="absolute inset-0 bg-black/50" />


      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
      
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 md:p-12">
        
            <div className="text-center mb-12">
              <p className="text-primary-300 uppercase tracking-widest text-sm font-semibold mb-3">
                Recenze
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Co říkají naši hosté?
              </h2>
              <div className="w-16 h-1 bg-primary-400 mx-auto" />
            </div>

   
            <div className="relative min-h-[350px] flex items-center">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
           
                  <div className="flex justify-center mb-6">
                    <svg
                      className="w-16 h-16 text-primary-400 opacity-50"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                  </div>

         
                  <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 text-center italic px-4">
                    {testimonial.text}
                  </p>

                
                  <div className="flex flex-col items-center">
                    

           
                    <div className="flex gap-1 mb-3">
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

               
                    <h6 className="font-bold text-white text-lg mb-1">
                      {testimonial.name}
                    </h6>
                    <p className="text-white/70 text-sm mb-2">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>

         
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? "w-3 h-3 bg-primary-400"
                      : "w-3 h-3 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

   
      <button
        onClick={goToPrev}
        disabled
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 text-white/50 cursor-not-allowed hidden"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={goToNext}
        disabled
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 text-white/50 cursor-not-allowed hidden"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </section>
  );
} */