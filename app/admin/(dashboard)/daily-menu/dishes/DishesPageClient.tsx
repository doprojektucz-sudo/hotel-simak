"use client";

import { useState } from "react";
import Link from "next/link";
import type { DailyMenuDish } from "@prisma/client";
import { Drawer } from "@/components/admin/Drawer";
import { DishList } from "./DishList";
import { DishFormDrawer } from "./DishFormDrawer";

interface DishType {
    value: string;
    label: string;
    dishes: DailyMenuDish[];
}

interface DishesPageClientProps {
    dishes: DailyMenuDish[];
    dishesByType: DishType[];
}

export function DishesPageClient({ dishes, dishesByType }: DishesPageClientProps) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editingDish, setEditingDish] = useState<DailyMenuDish | null>(null);

    const handleEdit = (dish: DailyMenuDish) => {
        setEditingDish(dish);
        setIsDrawerOpen(true);
    };

    const handleNew = () => {
        setEditingDish(null);
        setIsDrawerOpen(true);
    };

    const handleClose = () => {
        setIsDrawerOpen(false);
        setEditingDish(null);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Link
                            href="/admin/daily-menu"
                            className="text-gray-500 hover:text-gray-700"
                        >
                            Denní menu
                        </Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900">Číselník jídel</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Číselník jídel</h2>
                    <p className="text-gray-600 mt-1">
                        Správa jídel pro denní menu ({dishes.length} položek)
                    </p>
                </div>
                <button
                    onClick={handleNew}
                    className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                    Přidat jídlo
                </button>
            </div>

            {/* Dishes by type */}
            <div className="space-y-6">
                {dishesByType.map((type) => {
                    if (type.dishes.length === 0) return null;

                    return (
                        <div key={type.value} className="bg-white rounded-xl shadow-sm">
                            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {type.label}
                                </h3>
                                <span className="text-sm text-gray-500">
                                    {type.dishes.length} položek
                                </span>
                            </div>
                            <DishList dishes={type.dishes} onEdit={handleEdit} />
                        </div>
                    );
                })}

                {dishes.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm px-6 py-12 text-center">
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
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                        </div>
                        <p className="text-gray-500 mb-4">Číselník je prázdný</p>
                    </div>
                )}
            </div>

            {/* Drawer */}
            <Drawer
                isOpen={isDrawerOpen}
                onClose={handleClose}
                title={editingDish ? "Upravit jídlo" : "Nové jídlo"}
            >
                <DishFormDrawer dish={editingDish} onSuccess={handleClose} />
            </Drawer>
        </div>
    );
}