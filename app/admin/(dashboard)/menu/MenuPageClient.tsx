"use client";

import { useState } from "react";
import type { MenuItem, MenuCategory } from "@prisma/client";
import { Drawer } from "@/components/admin/Drawer";
import { MenuItemsList } from "./MenuItemsList";
import { CategoriesList } from "./CategoriesList";
import { MenuItemFormDrawer } from "./MenuItemFormDrawer";
interface MenuPageClientProps {
    menuItems: MenuItem[];
    categories: MenuCategory[];
}

export function MenuPageClient({ menuItems, categories }: MenuPageClientProps) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

    // Group items by category
    const groupedItems = categories.reduce(
        (acc, cat) => {
            acc[cat.name] = menuItems.filter((item) => item.category === cat.name);
            return acc;
        },
        {} as Record<string, MenuItem[]>
    );

    const handleEdit = (item: MenuItem) => {
        setEditingItem(item);
        setIsDrawerOpen(true);
    };

    const handleNew = () => {
        setEditingItem(null);
        setIsDrawerOpen(true);
    };

    const handleClose = () => {
        setIsDrawerOpen(false);
        setEditingItem(null);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Jídelní lístek</h2>
                    <p className="text-gray-600 mt-1">
                        Správa položek jídelního lístku ({menuItems.length} položek)
                    </p>
                </div>
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
                    Přidat položku
                </button>
            </div>

            {/* Categories Management */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Kategorie ({categories.length})
                </h3>
                <CategoriesList categories={categories} type="menu" />
            </div>

            {/* Menu Items by Category */}
            <div className="space-y-6">
                {categories.map((category) => {
                    const items = groupedItems[category.name] || [];
                    if (items.length === 0) return null;

                    return (
                        <div key={category.id} className="bg-white rounded-xl shadow-sm">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {category.name}
                                    </h3>
                                    <span className="text-sm text-gray-500">
                                        {items.length} položek
                                    </span>
                                </div>
                            </div>
                            <MenuItemsList items={items} onEdit={handleEdit} />
                        </div>
                    );
                })}
            </div>

            {/* Drawer for editing/creating */}
            <Drawer
                isOpen={isDrawerOpen}
                onClose={handleClose}
                title={editingItem ? "Upravit položku" : "Nová položka"}
            >
                <MenuItemFormDrawer
                    categories={categories.map((c) => c.name)}
                    item={editingItem}
                    onSuccess={handleClose}
                />
            </Drawer>
        </div>
    );
}