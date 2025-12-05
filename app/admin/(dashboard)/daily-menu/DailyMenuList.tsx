"use client";

import Link from "next/link";
import { useState } from "react";
import type { DailyMenu, DailyMenuToItem, DailyMenuDish } from "@prisma/client";
import { deleteDailyMenu, toggleDailyMenuActive } from "@/lib/actions/daily-menu";

type MenuWithItems = DailyMenu & {
    items: (DailyMenuToItem & { dish: DailyMenuDish })[];
};

interface DailyMenuListProps {
    menus: MenuWithItems[];
    onEdit: (menu: MenuWithItems) => void;
}

export function DailyMenuList({ menus, onEdit }: DailyMenuListProps) {
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [togglingId, setTogglingId] = useState<string | null>(null);

    // Formátování data v UTC
    const formatDate = (date: Date) => {
        const d = new Date(date);
        return d.toLocaleDateString("cs-CZ", {
            weekday: "short",
            day: "numeric",
            month: "numeric",
            timeZone: "UTC",
        });
    };

    const isCurrentlyActive = (menu: MenuWithItems) => {
        const now = new Date();
        const nowUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

        const menuFrom = new Date(menu.validFrom);
        const menuTo = new Date(menu.validTo);
        const fromUTC = Date.UTC(menuFrom.getUTCFullYear(), menuFrom.getUTCMonth(), menuFrom.getUTCDate());
        const toUTC = Date.UTC(menuTo.getUTCFullYear(), menuTo.getUTCMonth(), menuTo.getUTCDate());

        return menu.isActive && nowUTC >= fromUTC && nowUTC <= toUTC;
    };

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Opravdu chcete smazat menu "${title || "Bez názvu"}"?`)) {
            return;
        }

        setDeletingId(id);
        try {
            const result = await deleteDailyMenu(id);
            if (result.error) {
                alert(result.error);
            }
        } finally {
            setDeletingId(null);
        }
    };

    const handleToggleActive = async (id: string, currentState: boolean) => {
        setTogglingId(id);
        try {
            await toggleDailyMenuActive(id, !currentState);
        } finally {
            setTogglingId(null);
        }
    };

    if (menus.length === 0) {
        return (
            <div className="px-6 py-12 text-center">
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
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                </div>
                <p className="text-gray-500 mb-4">Zatím nemáte žádné menu</p>
            </div>
        );
    }

    return (
        <div className="divide-y divide-gray-200">
            {menus.map((menu) => {
                const isCurrent = isCurrentlyActive(menu);

                return (
                    <div
                        key={menu.id}
                        className={`px-6 py-4 hover:bg-gray-50 transition-colors ${!menu.isActive ? "opacity-50" : ""
                            }`}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div
                                className="flex-1 min-w-0 cursor-pointer"
                                onClick={() => onEdit(menu)}
                            >
                                <div className="flex items-center gap-2 flex-wrap mb-2">
                                    <h4 className="font-semibold text-gray-900">
                                        {menu.title || "Menu"}
                                    </h4>
                                    {isCurrent && (
                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                                            Právě platí
                                        </span>
                                    )}
                                    {!menu.isActive && (
                                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                            Skryté
                                        </span>
                                    )}
                                </div>

                                <p className="text-sm text-gray-600 mb-2">
                                    <span className="font-medium">
                                        {formatDate(menu.validFrom)}
                                    </span>
                                    {" – "}
                                    <span className="font-medium">{formatDate(menu.validTo)}</span>
                                </p>

                                <p className="text-sm text-gray-500">
                                    {menu.items.length} položek
                                    {menu.items.length > 0 && (
                                        <span className="ml-2">
                                            (
                                            {menu.items
                                                .slice(0, 3)
                                                .map((item) => item.dish.name.split(",")[0])
                                                .join(", ")}
                                            {menu.items.length > 3 && "..."}
                                            )
                                        </span>
                                    )}
                                </p>
                            </div>

                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => handleToggleActive(menu.id, menu.isActive)}
                                    disabled={togglingId === menu.id}
                                    className={`p-2 rounded-lg transition-colors ${menu.isActive
                                        ? "text-green-600 hover:bg-green-50"
                                        : "text-gray-400 hover:bg-gray-100"
                                        }`}
                                    title={menu.isActive ? "Skrýt menu" : "Zobrazit menu"}
                                >
                                    {menu.isActive ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    )}
                                </button>

                                <button
                                    onClick={() => onEdit(menu)}
                                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="Upravit"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>

                                <a
                                    href={`/api/daily-menu/${menu.id}/pdf`}
                                    download
                                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="Stáhnout PDF"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </a>

                                <button
                                    onClick={() => handleDelete(menu.id, menu.title || "")}
                                    disabled={deletingId === menu.id}
                                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                    title="Smazat"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div >
    );
}