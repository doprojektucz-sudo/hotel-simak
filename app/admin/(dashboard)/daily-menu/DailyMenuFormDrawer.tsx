"use client";

import { useActionState, useState, useEffect } from "react";
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

interface DailyMenuFormDrawerProps {
    dishesByType: DishType[];
    menu: MenuWithItems | null;
    onSuccess: () => void;
}

const initialState: DailyMenuFormState = {};

// Správná konverze data bez timezone problémů
const formatDateForInput = (date: Date): string => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

export function DailyMenuFormDrawer({
    dishesByType,
    menu,
    onSuccess,
}: DailyMenuFormDrawerProps) {
    const isEditing = !!menu;

    const [selectedDishes, setSelectedDishes] = useState<string[]>(
        menu?.items.map((item) => item.dishId) || []
    );

    // Reset selected dishes when menu changes
    useEffect(() => {
        setSelectedDishes(menu?.items.map((item) => item.dishId) || []);
    }, [menu]);

    const action = isEditing
        ? updateDailyMenu.bind(null, menu.id)
        : createDailyMenu;

    const [state, formAction, isPending] = useActionState(action, initialState);

    useEffect(() => {
        if (state.success) {
            onSuccess();
        }
    }, [state.success, onSuccess]);

    const toggleDish = (dishId: string) => {
        setSelectedDishes((prev) =>
            prev.includes(dishId)
                ? prev.filter((id) => id !== dishId)
                : [...prev, dishId]
        );
    };

    return (
        <form action={formAction} className="space-y-6">
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
            <div className="space-y-4">
                <div>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Název menu (volitelné)
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        defaultValue={menu?.title || ""}
                        key={menu?.id || "new-title"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Vánoční menu, Velikonoční speciality..."
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label
                            htmlFor="validFrom"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Platí od *
                        </label>
                        <input
                            type="date"
                            id="validFrom"
                            name="validFrom"
                            required
                            defaultValue={menu ? formatDateForInput(menu.validFrom) : ""}
                            key={menu?.id || "new-from"}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="validTo"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Platí do *
                        </label>
                        <input
                            type="date"
                            id="validTo"
                            name="validTo"
                            required
                            defaultValue={menu ? formatDateForInput(menu.validTo) : ""}
                            key={menu?.id || "new-to"}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>
                </div>

                {isEditing && (
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="isActive"
                            defaultChecked={menu?.isActive ?? true}
                            key={menu?.id || "new-active"}
                            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">Aktivní</span>
                    </label>
                )}
            </div>

            {/* Dish selection */}
            <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Výběr jídel ({selectedDishes.length} vybráno)
                </h3>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                    {dishesByType.map((type) => {
                        if (type.dishes.length === 0) return null;

                        const selectedInType = type.dishes.filter((d) =>
                            selectedDishes.includes(d.id)
                        ).length;

                        return (
                            <div
                                key={type.value}
                                className="border border-gray-200 rounded-lg overflow-hidden"
                            >
                                <div className="bg-gray-50 px-3 py-2 flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">
                                        {type.label}
                                    </span>
                                    {selectedInType > 0 && (
                                        <span className="text-xs text-primary-600 font-medium">
                                            {selectedInType}
                                        </span>
                                    )}
                                </div>
                                <div className="divide-y divide-gray-100 max-h-48 overflow-y-auto">
                                    {type.dishes.map((dish) => {
                                        const isSelected = selectedDishes.includes(dish.id);

                                        return (
                                            <label
                                                key={dish.id}
                                                className={`flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors ${isSelected ? "bg-primary-50" : "hover:bg-gray-50"
                                                    }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => toggleDish(dish.id)}
                                                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <span className="text-sm text-gray-900 truncate block">
                                                        {dish.weight && (
                                                            <span className="font-bold mr-1">{dish.weight}</span>
                                                        )}
                                                        {dish.name}
                                                    </span>
                                                </div>
                                                <span className="text-sm font-semibold text-primary-600">
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

            {/* Submit */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                    type="submit"
                    disabled={isPending || selectedDishes.length === 0}
                    className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                    {isPending ? "Ukládám..." : isEditing ? "Uložit" : "Vytvořit"}
                </button>
            </div>
        </form>
    );
}