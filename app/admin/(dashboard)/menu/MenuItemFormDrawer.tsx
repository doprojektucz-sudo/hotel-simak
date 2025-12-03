"use client";

import { useActionState, useEffect } from "react";
import type { MenuItem } from "@prisma/client";
import { createMenuItem, updateMenuItem, type MenuItemFormState } from "@/lib/actions/menu";

interface MenuItemFormDrawerProps {
    categories: string[];
    item: MenuItem | null;
    onSuccess: () => void;
}

const initialState: MenuItemFormState = {};

export function MenuItemFormDrawer({ categories, item, onSuccess }: MenuItemFormDrawerProps) {
    const isEditing = !!item;

    const action = isEditing
        ? updateMenuItem.bind(null, item.id)
        : createMenuItem;

    const [state, formAction, isPending] = useActionState(action, initialState);

    useEffect(() => {
        if (state.success) {
            onSuccess();
        }
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
                        placeholder="Název jídla"
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

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                            Hmotnost
                        </label>
                        <input
                            type="text"
                            id="weight"
                            name="weight"
                            defaultValue={item?.weight ?? ""}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="200g"
                        />
                    </div>

                    <div>
                        <label htmlFor="allergens" className="block text-sm font-medium text-gray-700 mb-1">
                            Alergeny
                        </label>
                        <input
                            type="text"
                            id="allergens"
                            name="allergens"
                            defaultValue={item?.allergens ?? ""}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="1,3,7"
                        />
                    </div>
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
                        placeholder="Popis jídla..."
                    />
                </div>

                <div>
                    <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                        Poznámka
                    </label>
                    <input
                        type="text"
                        id="note"
                        name="note"
                        defaultValue={item?.note ?? ""}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Cena dle nabídky"
                    />
                </div>

                <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="isVegetarian"
                            defaultChecked={item?.isVegetarian}
                            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">Vegetariánské</span>
                    </label>

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