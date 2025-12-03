"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { DailyMenuDish } from "@prisma/client";
import {
    createDailyMenuDish,
    updateDailyMenuDish,
    type DailyMenuFormState,
} from "@/lib/actions/daily-menu";
import { dishTypes } from "@/lib/constants/daily-menu";

interface DishFormProps {
    dish?: DailyMenuDish;
}

const initialState: DailyMenuFormState = {};

export function DishForm({ dish }: DishFormProps) {
    const router = useRouter();
    const isEditing = !!dish;

    const action = isEditing
        ? updateDailyMenuDish.bind(null, dish.id)
        : createDailyMenuDish;

    const [state, formAction, isPending] = useActionState(action, initialState);

    useEffect(() => {
        if (state.success) {
            router.push("/admin/daily-menu/dishes");
        }
    }, [state.success, router]);

    return (
        <form action={formAction} className="space-y-6">
            {state.error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {state.error}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Název jídla *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        defaultValue={dish?.name}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Např. Svíčková na smetaně, houskový knedlík"
                    />
                </div>

                <div>
                    <label
                        htmlFor="type"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Kategorie *
                    </label>
                    <select
                        id="type"
                        name="type"
                        required
                        defaultValue={dish?.type || "MAIN"}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
                        className="block text-sm font-medium text-gray-700 mb-2"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="199"
                    />
                </div>

                <div>
                    <label
                        htmlFor="weight"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Hmotnost / Porce
                    </label>
                    <input
                        type="text"
                        id="weight"
                        name="weight"
                        defaultValue={dish?.weight ?? ""}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Např. 200g"
                    />
                </div>

                <div className="flex items-end">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            name="isActive"
                            defaultChecked={dish?.isActive ?? true}
                            className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm font-medium text-gray-700">
                            Aktivní (zobrazit ve výběru)
                        </span>
                    </label>
                </div>
            </div>

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
                    disabled={isPending}
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending
                        ? "Ukládám..."
                        : isEditing
                            ? "Uložit změny"
                            : "Vytvořit jídlo"}
                </button>
            </div>
        </form>
    );
}