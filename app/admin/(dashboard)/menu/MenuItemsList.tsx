"use client";

import { useState } from "react";
import type { MenuItem } from "@prisma/client";
import { deleteMenuItem, toggleMenuItemActive, updateMenuItemPrice } from "@/lib/actions/menu";
import { InlinePrice } from "@/components/admin/InlinePrice";

interface MenuItemsListProps {
  items: MenuItem[];
  onEdit: (item: MenuItem) => void;
}

export function MenuItemsList({ items, onEdit }: MenuItemsListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Opravdu chcete smazat "${name}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const result = await deleteMenuItem(id);
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
      await toggleMenuItemActive(id, !currentState);
    } finally {
      setTogglingId(null);
    }
  };

  const handlePriceUpdate = async (id: string, newPrice: number) => {
    await updateMenuItemPrice(id, newPrice);
  };

  return (
    <div className="divide-y divide-gray-200">
      {items.map((item) => (
        <div
          key={item.id}
          className={`px-6 py-4 hover:bg-gray-50 transition-colors ${!item.isActive ? "opacity-50" : ""
            }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div
              className="flex-1 min-w-0 cursor-pointer"
              onClick={() => onEdit(item)}
            >
              <div className="flex items-center gap-2 flex-wrap">
                {item.weight && (
                  <span className="text-sm font-bold text-gray-500">
                    {item.weight}
                  </span>
                )}
                <h4 className="font-medium text-gray-900">{item.name}</h4>
                {item.isVegetarian && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                    Vegetariánské
                  </span>
                )}
                {!item.isActive && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                    Skryté
                  </span>
                )}
              </div>
              {item.description && (
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              )}
              {item.allergens && (
                <p className="text-xs text-gray-500 mt-1">
                  Alergeny: {item.allergens}
                </p>
              )}
              {item.note && (
                <p className="text-xs text-gray-500 italic mt-1">{item.note}</p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <InlinePrice
                price={item.price}
                onSave={(newPrice) => handlePriceUpdate(item.id, newPrice)}
              />

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleToggleActive(item.id, item.isActive)}
                  disabled={togglingId === item.id}
                  className={`p-2 rounded-lg transition-colors ${item.isActive
                      ? "text-green-600 hover:bg-green-50"
                      : "text-gray-400 hover:bg-gray-100"
                    }`}
                  title={item.isActive ? "Skrýt položku" : "Zobrazit položku"}
                >
                  {item.isActive ? (
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
                  onClick={() => onEdit(item)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Upravit"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>

                <button
                  onClick={() => handleDelete(item.id, item.name)}
                  disabled={deletingId === item.id}
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
        </div>
      ))}

      {items.length === 0 && (
        <div className="px-6 py-8 text-center text-gray-500">
          V této kategorii nejsou žádné položky
        </div>
      )}
    </div>
  );
}