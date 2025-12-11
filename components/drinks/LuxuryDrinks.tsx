"use client";

import { useState } from "react";
import type { Drink, DrinkCategory } from "@prisma/client";

interface LuxuryDrinksProps {
  drinks: Drink[];
  categories: DrinkCategory[];
}

export default function LuxuryDrinks({
  drinks,
  categories,
}: LuxuryDrinksProps) {
  const [activeTab, setActiveTab] = useState(categories[0]?.name || "");
  const [isAnimating, setIsAnimating] = useState(false);

  const getDrinkItems = (category: string) => {
    return drinks.filter((drink) => drink.category === category);
  };

  const handleTabChange = (category: string) => {
    if (category === activeTab) return;

    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(category);
      setIsAnimating(false);
    }, 150);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="mb-3">
            <span className="text-primary-600 uppercase tracking-widest text-sm font-semibold">
              Hotel U Šimáka
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Nápojový lístek
          </h2>
          <p className="text-xl text-gray-600">
            Široká nabídka piv, vín a nápojů
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleTabChange(category.name)}
                className={`relative px-6 py-3 text-base hover:cursor-pointer md:text-lg font-semibold uppercase tracking-wide transition-all duration-300 rounded-lg ${
                  activeTab === category.name
                    ? "text-white bg-primary-600 shadow-lg"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Drinks Content - Vertical List Style with Animation */}
        <div className="max-w-5xl mx-auto">
          {getDrinkItems(activeTab).length > 0 ? (
            <div
              className={`transition-all duration-300 ${
                isAnimating
                  ? "opacity-0 translate-y-4"
                  : "opacity-100 translate-y-0"
              }`}
            >
              {/* Drink Items - Same style as menu */}
              <div className="space-y-4">
                {getDrinkItems(activeTab).map((drink, index) => (
                  <div
                    key={drink.id}
                    className={`drink-item py-5 border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-all duration-300 px-6 -mx-6 rounded-lg ${
                      !isAnimating
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-4"
                    }`}
                    style={{
                      transitionDelay: !isAnimating ? `${index * 30}ms` : "0ms",
                    }}
                  >
                    <div className="flex justify-between items-start gap-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 mb-1 flex-wrap">
                          {drink.size && (
                            <span className="font-bold text-gray-900 whitespace-nowrap flex-shrink-0 text-base">
                              {drink.size}
                            </span>
                          )}
                          <h4 className="font-medium text-gray-900 leading-relaxed text-base md:text-lg">
                            {drink.name}
                          </h4>
                        </div>
                        {drink.description && (
                          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                            {drink.description}
                          </p>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-xl font-bold text-primary-600 whitespace-nowrap">
                          {drink.price} Kč
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Special notes for specific categories */}
           {/*    {activeTab === "Pivo" && (
                <div className="mt-8 p-6 bg-amber-50 rounded-lg border-2 border-amber-200">
                  <p className="text-center text-sm text-amber-900">
                    <span className="font-semibold">Čepované pivo:</span>{" "}
                    Bernard
                  </p>
                </div>
              )}

              {activeTab === "Nealko" && (
                <div className="mt-8 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <p className="text-center text-sm text-blue-900">
                    <span className="font-semibold">Specialita:</span> Pravá
                    čepovaná BEZINKA
                  </p>
                </div>
              )} */}
            </div>
          ) : (
            // Empty State
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">
                V této kategorii zatím nejsou žádné položky.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
