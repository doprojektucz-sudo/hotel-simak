"use client";

import { useActionState, useEffect } from "react";
import type { DailyMenuDish } from "@prisma/client";
import {
    createDailyMenuDish,
    updateDailyMenuDish,
    type DailyMenuFormState,
} from "@/lib/actions/daily-menu";
import { dishTypes } from "@/lib/constants/daily-menu";

interface DishFormDrawerProps {
    dish: DailyMenuDish | null;
    onSuccess: () => void;
}

const initialState: DailyMenuFormState = {};

export function DishFormDrawer({ dish, onSuccess }: DishFormDrawerProps) {
    const isEditing = !!dish;

    const action = isEditing
        ? updateDailyMenuDish.bind(null, dish.id)
        : createDailyMenuDish;

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
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Název jídla *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        defaultValue={dish?.name}
                        key={dish?.id || "new"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Svíčková na smetaně, houskový knedlík"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label
                            htmlFor="type"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Kategorie *
                        </label>
                        <select
                            id="type"
                            name="type"
                            required
                            defaultValue={dish?.type || "MAIN"}
                            key={dish?.id || "new-type"}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                            {dishTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="price"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Cena (Kč) *
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            required
                            min="0"
                            defaultValue={dish?.price}
                            key={dish?.id || "new-price"}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="weight"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Hmotnost / Porce
                    </label>
                    <input
                        type="text"
                        id="weight"
                        name="weight"
                        defaultValue={dish?.weight ?? ""}
                        key={dish?.id || "new-weight"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="200g"
                    />
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        name="isActive"
                        defaultChecked={dish?.isActive ?? true}
                        key={dish?.id || "new-active"}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">
                        Aktivní (zobrazit ve výběru)
                    </span>
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