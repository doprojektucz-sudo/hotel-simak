"use client";

import { useActionState, useEffect, useState } from "react";
import type { OpeningHours } from "@prisma/client";
import { updateOpeningHours, type OpeningHoursFormState } from "@/lib/actions/opening-hours";

interface OpeningHoursFormDrawerProps {
    hour: OpeningHours;
    onSuccess: () => void;
}

const initialState: OpeningHoursFormState = {};

export function OpeningHoursFormDrawer({ hour, onSuccess }: OpeningHoursFormDrawerProps) {
    const [isOpen, setIsOpen] = useState(hour.isOpen);

    const action = updateOpeningHours.bind(null, hour.id);
    const [state, formAction, isPending] = useActionState(action, initialState);

    useEffect(() => {
        if (state.success) {
            onSuccess();
        }
    }, [state.success, onSuccess]);

    useEffect(() => {
        setIsOpen(hour.isOpen);
    }, [hour]);

    return (
        <form action={formAction} className="space-y-6">
            {state.error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {state.error}
                </div>
            )}

            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">{hour.dayName}</span>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <span className="text-sm text-gray-600">
                            {isOpen ? "Otevřeno" : "Zavřeno"}
                        </span>
                        <input
                            type="checkbox"
                            name="isOpen"
                            checked={isOpen}
                            onChange={(e) => setIsOpen(e.target.checked)}
                            className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                    </label>
                </div>

                {isOpen && (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="openTime" className="block text-sm font-medium text-gray-700 mb-1">
                                Otevření
                            </label>
                            <input
                                type="time"
                                id="openTime"
                                name="openTime"
                                defaultValue={hour.openTime || "11:00"}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="closeTime" className="block text-sm font-medium text-gray-700 mb-1">
                                Zavření
                            </label>
                            <input
                                type="time"
                                id="closeTime"
                                name="closeTime"
                                defaultValue={hour.closeTime || "22:00"}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>
                    </div>
                )}

                <div>
                    <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                        Poznámka (volitelné)
                    </label>
                    <input
                        type="text"
                        id="note"
                        name="note"
                        defaultValue={hour.note || ""}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Např. Pouze pro ubytované hosty"
                    />
                </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                    {isPending ? "Ukládám..." : "Uložit"}
                </button>
            </div>
        </form>
    );
}