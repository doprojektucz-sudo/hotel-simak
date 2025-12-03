"use client";

import { useActionState, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { DailyMenu, DailyMenuToItem, DailyMenuDish } from "@prisma/client";
import {
    createDailyMenu,
    updateDailyMenu,
    type DailyMenuFormState,
} from "@/lib/actions/daily-menu";

type MenuWithItems = DailyMenu & {
    items: (DailyMenuToItem & { dish: DailyMenuDish })[];
};

interface DishType {
    value: string;
    label: string;
    dishes: DailyMenuDish[];
}

interface DailyMenuFormProps {
    dishesByType: DishType[];
    menu?: MenuWithItems;
}

const initialState: DailyMenuFormState = {};

export function DailyMenuForm({ dishesByType, menu }: DailyMenuFormProps) {
    const router = useRouter();
    const isEditing = !!menu;

    const [selectedDishes, setSelectedDishes] = useState<string[]>(
        menu?.items.map((item) => item.dishId) || []
    );

    const action = isEditing
        ? updateDailyMenu.bind(null, menu.id)
        : createDailyMenu;

    const [state, formAction, isPending] = useActionState(action, initialState);

    useEffect(() => {
        if (state.success) {
            router.push("/admin/daily-menu");
        }
    }, [state.success, router]);

    const toggleDish = (dishId: string) => {
        setSelectedDishes((prev) =>
            prev.includes(dishId)
                ? prev.filter((id) => id !== dishId)
                : [...prev, dishId]
        );
    };

    const formatDateForInput = (date: Date) => {
        return new Date(date).toISOString().split("T")[0];
    };

    const getSelectedDishesByType = () => {
        return dishesByType
            .map((type) => ({
                ...type,
                selected: type.dishes.filter((d) => selectedDishes.includes(d.id)),
            }))
            .filter((type) => type.selected.length > 0);
    };

    return (
        <form action={formAction} className="space-y-8">
            {state.error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {state.error}
                </div>
            )}

            {/* Hidden inputs for selected dishes */}
            {selectedDishes.map((dishId) => (
                <input key={dishId} type="hidden" name="dishIds" value={dishId} />
            ))}

            {/* Basic info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="sm:col-span-3">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        Název menu (volitelné)
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        defaultValue={menu?.title || ""}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Např. Vánoční menu, Velikonoční speciality..."
                    />
                </div>

                <div>
                    <label htmlFor="validFrom" className="block text-sm font-medium text-gray-700 mb-2">
                        Platí od *
                    </label>
                    <input
                        type="date"
                        id="validFrom"
                        name="validFrom"
                        required
                        defaultValue={menu ? formatDateForInput(menu.validFrom) : ""}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                </div>

                <div>
                    <label htmlFor="validTo" className="block text-sm font-medium text-gray-700 mb-2">
                        Platí do *
                    </label>
                    <input
                        type="date"
                        id="validTo"
                        name="validTo"
                        required
                        defaultValue={menu ? formatDateForInput(menu.validTo) : ""}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                </div>

                {isEditing && (
                    <div className="flex items-end">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="isActive"
                                defaultChecked={menu?.isActive ?? true}
                                className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <span className="text-sm font-medium text-gray-700">
                                Aktivní
                            </span>
                        </label>
                    </div>
                )}
            </div>

            {/* Dish selection */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Výběr jídel ({selectedDishes.length} vybráno)
                </h3>

                <div className="space-y-6">
                    {dishesByType.map((type) => {
                        if (type.dishes.length === 0) return null;

                        const selectedInType = type.dishes.filter((d) =>
                            selectedDishes.includes(d.id)
                        ).length;

                        return (
                            <div key={type.value} className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
                                    <h4 className="font-medium text-gray-900">
                                        {type.label}
                                    </h4>
                                    {selectedInType > 0 && (
                                        <span className="text-sm text-primary-600 font-medium">
                                            {selectedInType} vybráno
                                        </span>
                                    )}
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {type.dishes.map((dish) => {
                                        const isSelected = selectedDishes.includes(dish.id);

                                        return (
                                            <label
                                                key={dish.id}
                                                className={`flex items-center gap-4 px-4 py-3 cursor-pointer transition-colors ${isSelected ? "bg-primary-50" : "hover:bg-gray-50"
                                                    }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => toggleDish(dish.id)}
                                                    className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        {dish.weight && (
                                                            <span className="text-sm font-bold text-gray-500">
                                                                {dish.weight}
                                                            </span>
                                                        )}
                                                        <span className="text-gray-900">{dish.name}</span>
                                                    </div>
                                                </div>
                                                <span className="font-semibold text-primary-600">
                                                    {dish.price} Kč
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Preview */}
            {selectedDishes.length > 0 && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Náhled menu
                    </h3>
                    <div className="space-y-4">
                        {getSelectedDishesByType().map((type) => (
                            <div key={type.value}>
                                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                    {type.label}
                                </h4>
                                <div className="space-y-2">
                                    {type.selected.map((dish) => (
                                        <div key={dish.id} className="flex justify-between items-center">
                                            <span className="text-gray-900">
                                                {dish.weight && (
                                                    <span className="font-bold mr-2">{dish.weight}</span>
                                                )}
                                                {dish.name}
                                            </span>
                                            <span className="font-semibold text-gray-900">
                                                {dish.price} Kč
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                >
                    Zrušit
                </button>
                <button
                    type="submit"
                    disabled={isPending || selectedDishes.length === 0}
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending
                        ? "Ukládám..."
                        : isEditing
                            ? "Uložit změny"
                            : "Vytvořit menu"}
                </button>
            </div>
        </form>
    );
}