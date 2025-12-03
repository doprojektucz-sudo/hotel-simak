"use client";

import { useActionState, useEffect } from "react";
import type { Drink } from "@prisma/client";
import { createDrink, updateDrink, type DrinkFormState } from "@/lib/actions/drinks";

interface DrinkFormDrawerProps {
    categories: string[];
    item: Drink | null;
    onSuccess: () => void;
}

const initialState: DrinkFormState = {};

export function DrinkFormDrawer({ categories, item, onSuccess }: DrinkFormDrawerProps) {
    const isEditing = !!item;
    const action = isEditing ? updateDrink.bind(null, item.id) : createDrink;
    const [state, formAction, isPending] = useActionState(action, initialState);

    useEffect(() => {
        if (state.success) onSuccess();
    }, [state.success, onSuccess]);

    return (
        <form action={formAction} className="space-y-6">
            {state.error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {state.error}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Název *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        defaultValue={item?.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                            Kategorie *
                        </label>
                        <select
                            id="category"
                            name="category"
                            required
                            defaultValue={item?.category}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                            <option value="">Vyberte</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                            Cena (Kč) *
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            required
                            min="0"
                            defaultValue={item?.price}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                        Objem
                    </label>
                    <input
                        type="text"
                        id="size"
                        name="size"
                        defaultValue={item?.size ?? ""}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="0,5l"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Popis
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={2}
                        defaultValue={item?.description ?? ""}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        name="isActive"
                        defaultChecked={item?.isActive ?? true}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Aktivní</span>
                </label>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                    {isPending ? "Ukládám..." : isEditing ? "Uložit" : "Vytvořit"}
                </button>
            </div>
        </form>
    );
}