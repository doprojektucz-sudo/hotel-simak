"use client";

import Link from "next/link";
import { useState } from "react";
import type { DailyMenuDish } from "@prisma/client";
import { deleteDailyMenuDish } from "@/lib/actions/daily-menu";

interface DishListProps {
    dishes: DailyMenuDish[];
}

export function DishList({ dishes }: DishListProps) {
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Opravdu chcete smazat "${name}"?`)) {
            return;
        }

        setDeletingId(id);
        try {
            const result = await deleteDailyMenuDish(id);
            if (result.error) {
                alert(result.error);
            }
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="divide-y divide-gray-200">
            {dishes.map((dish) => (
                <div
                    key={dish.id}
                    className={`px-6 py-4 hover:bg-gray-50 transition-colors ${!dish.isActive ? "opacity-50" : ""
                        }`}
                >
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                {dish.weight && (
                                    <span className="text-sm font-bold text-gray-500">
                                        {dish.weight}
                                    </span>
                                )}
                                <span className="text-gray-900">{dish.name}</span>
                                {!dish.isActive && (
                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                        Skryté
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-lg font-bold text-primary-600 whitespace-nowrap">
                                {dish.price} Kč
                            </span>

                            <div className="flex items-center gap-1">
                                <Link
                                    href={`/admin/daily-menu/dishes/${dish.id}`}
                                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="Upravit"
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
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                    </svg>
                                </Link>

                                <button
                                    onClick={() => handleDelete(dish.id, dish.name)}
                                    disabled={deletingId === dish.id}
                                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                    title="Smazat"
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
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}