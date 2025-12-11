"use client";

import { useEffect, useRef, useState } from "react";
import type { MenuItem, MenuCategory } from "@prisma/client";

interface VerticalMenuProps {
  items: MenuItem[];
  categories: MenuCategory[];
}

export default function VerticalMenu({ items, categories }: VerticalMenuProps) {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const getMenuItems = (category: string) => {
    return items.filter((item) => item.category === category);
  };

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    Object.keys(sectionRefs.current).forEach((category) => {
      const element = sectionRefs.current[category];
      if (element) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => new Set([...prev, category]));
            }
          });
        }, observerOptions);

        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="mb-3">
            <span className="text-primary-600 uppercase tracking-widest text-sm font-semibold">
              Hotel U Šimáka
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Jídelní lístek
          </h2>
          <p className="text-xl text-gray-600">Naše nabídka</p>
        </div>

        {/* Menu Sections - Single Column with Fade-in */}
        <div className="space-y-16">
          {categories.map((category) => {
            const categoryItems = getMenuItems(category.name);
            if (categoryItems.length === 0) return null;

            const isVisible = visibleSections.has(category.name);

            return (
              <div
                key={category.id}
                ref={(el) => {
                  sectionRefs.current[category.name] = el;
                }}
                className={`menu-section transition-all duration-1000 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                {/* Category Header */}
                <div className="mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <div className="w-20 h-1 bg-primary-600" />
                </div>

                {/* Menu Items */}
                <div className="space-y-4">
                  {categoryItems.map((item, index) => (
                    <div
                      key={item.id}
                      className={`menu-item py-5 border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-all duration-300 px-6 -mx-6 rounded-lg ${
                        isVisible
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-4"
                      }`}
                      style={{
                        transitionDelay: isVisible ? `${index * 50}ms` : "0ms",
                      }}
                    >
                      <div className="flex justify-between items-start gap-6">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            {item.weight && (
                              <span className="font-bold text-gray-900 whitespace-nowrap flex-shrink-0 text-base w-12">
                                {item.weight}
                              </span>
                            )}
                            <h4 className="font-medium text-gray-900 leading-relaxed text-base md:text-lg">
                              {item.name}
                              {item.isVegetarian && (
                                <span className="ml-2 text-xs bg-green-600 text-white px-2 py-1 rounded">
                                  VEGETARIÁNSKÉ
                                </span>
                              )}
                            </h4>
                          </div>
                          {item.description && (
                            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                              {item.description}
                            </p>
                          )}
                          {item.allergens && (
                            <p className="text-xs text-gray-500 mt-2">
                              Alergeny: {item.allergens}
                            </p>
                          )}
                          {item.note && (
                            <p className="text-xs text-gray-500 italic mt-2">
                              {item.note}
                            </p>
                          )}
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="text-xl font-bold text-primary-600 whitespace-nowrap">
                            {item.price} Kč
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Poznámka */}
        <div className="mt-16 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
          <p className="text-center text-sm text-gray-700">
            <span className="font-semibold">Poznámka:</span> Za poloviční porce
            účtujeme 70% z ceny
          </p>
        </div>
      </div>
    </section>
  );
}
