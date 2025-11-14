"use client";

import { useState } from "react";
import { menuCategories, menu } from "@/lib/data/menu";

export default function LuxuryMenu() {
    const [activeTab, setActiveTab] = useState(menuCategories[0]);

    const getMenuItems = (category: string) => {
        return menu.filter((item) => item.category === category);
    };

    return (
        <section className="py-16 md:py-24 bg-gray-900 text-white">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="mb-3">
                        <span className="text-primary-400 uppercase tracking-widest text-sm font-semibold">
                            Hotel U Šimáka
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Jídelní lístek
                    </h2>
                </div>

                {/* Category Tabs */}
                <div className="mb-12">
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        {menuCategories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveTab(category)}
                                className={`relative px-6 py-3 text-lg font-semibold uppercase tracking-wide transition-all duration-300 ${activeTab === category
                                        ? "text-primary-400"
                                        : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                {category}
                                {activeTab === category && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-400" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Menu Content */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        {getMenuItems(activeTab).map((item) => (
                            <div key={item.id} className="menu-item group">
                                <div className="flex justify-between items-start mb-2">
                                    <h5 className="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors flex-1">
                                        {item.name}
                                        {item.isVegetarian && (
                                            <span className="ml-2 text-xs bg-green-600 text-white px-2 py-1 rounded">
                                                V
                                            </span>
                                        )}
                                    </h5>
                                    <span className="text-primary-400 text-xl font-bold ml-4 whitespace-nowrap">
                                        {item.price} Kč
                                    </span>
                                </div>
                                {item.description && (
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {getMenuItems(activeTab).length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            <p>V této kategorii zatím nejsou žádné položky.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}