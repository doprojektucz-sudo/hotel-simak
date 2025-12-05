"use client";

import { useState } from "react";
import type { OpeningHours } from "@prisma/client";
import { Drawer } from "@/components/admin/Drawer";
import { OpeningHoursFormDrawer } from "./OpeningHoursFormDrawer";

interface OpeningHoursSettingsProps {
    hours: OpeningHours[];
}

export function OpeningHoursSettings({ hours }: OpeningHoursSettingsProps) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editingHour, setEditingHour] = useState<OpeningHours | null>(null);

    const handleEdit = (hour: OpeningHours) => {
        setEditingHour(hour);
        setIsDrawerOpen(true);
    };

    const handleClose = () => {
        setIsDrawerOpen(false);
        setEditingHour(null);
    };

    return (
        <>
            <div className="divide-y divide-gray-200">
                {hours.map((hour) => (
                    <div
                        key={hour.id}
                        className="py-4 flex items-center justify-between hover:bg-gray-50 -mx-4 px-4 rounded-lg cursor-pointer transition-colors"
                        onClick={() => handleEdit(hour)}
                    >
                        <div className="flex items-center gap-4">
                            <span className="font-medium text-gray-900 w-24">{hour.dayName}</span>
                            {hour.isOpen ? (
                                <span className="text-gray-600">
                                    {hour.openTime} – {hour.closeTime}
                                </span>
                            ) : (
                                <span className="text-red-600 font-medium">ZAVŘENO</span>
                            )}
                            {hour.note && (
                                <span className="text-sm text-gray-500 italic">({hour.note})</span>
                            )}
                        </div>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            <Drawer
                isOpen={isDrawerOpen}
                onClose={handleClose}
                title={`Upravit ${editingHour?.dayName || ""}`}
            >
                {editingHour && (
                    <OpeningHoursFormDrawer hour={editingHour} onSuccess={handleClose} />
                )}
            </Drawer>
        </>
    );
}