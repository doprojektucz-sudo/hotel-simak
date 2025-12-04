"use client";

import { useState } from "react";
import Link from "next/link";
import type { DailyMenu, DailyMenuToItem, DailyMenuDish } from "@prisma/client";
import { Drawer } from "@/components/admin/Drawer";
import { DailyMenuList } from "./DailyMenuList";
import { DailyMenuFormDrawer } from "./DailyMenuFormDrawer";

type MenuWithItems = DailyMenu & {
    items: (DailyMenuToItem & { dish: DailyMenuDish })[];
};

interface DishType {
    value: string;
    label: string;
    dishes: DailyMenuDish[];
}

interface DailyMenuPageClientProps {
    menus: MenuWithItems[];
    dishes: DailyMenuDish[];
    dishesByType: DishType[];
}

export function DailyMenuPageClient({
    menus,
    dishes,
    dishesByType,
}: DailyMenuPageClientProps) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editingMenu, setEditingMenu] = useState<MenuWithItems | null>(null);

    const handleEdit = (menu: MenuWithItems) => {
        setEditingMenu(menu);
        setIsDrawerOpen(true);
    };

    const handleNew = () => {
        setEditingMenu(null);
        setIsDrawerOpen(true);
    };

    const handleClose = () => {
        setIsDrawerOpen(false);
        setEditingMenu(null);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Denní menu</h2>
                    <p className="text-gray-600 mt-1">
                        Správa denních/speciálních menu a číselníku jídel
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/admin/daily-menu/dishes"
                        className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
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
                                d="M4 6h16M4 10h16M4 14h16M4 18h16"
                            />
                        </svg>
                        Číselník jídel ({dishes.length})
                    </Link>
                    <button
                        onClick={handleNew}
                        className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors"
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
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        Vytvořit menu
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-600">Celkem menu</p>
                    <p className="text-2xl font-bold text-gray-900">{menus.length}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-600">Aktivní menu</p>
                    <p className="text-2xl font-bold text-green-600">
                        {menus.filter((m) => m.isActive).length}
                    </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-600">Jídel v číselníku</p>
                    <p className="text-2xl font-bold text-gray-900">{dishes.length}</p>
                </div>
            </div>

            {/* Menu List */}
            <div className="bg-white rounded-xl shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Vytvořená menu
                    </h3>
                </div>
                <DailyMenuList menus={menus} onEdit={handleEdit} />
            </div>

            {/* Drawer */}
            <Drawer
                isOpen={isDrawerOpen}
                onClose={handleClose}
                title={editingMenu ? "Upravit menu" : "Nové denní menu"}
            >
                <DailyMenuFormDrawer
                    dishesByType={dishesByType}
                    menu={editingMenu}
                    onSuccess={handleClose}
                />
            </Drawer>
        </div>
    );
}