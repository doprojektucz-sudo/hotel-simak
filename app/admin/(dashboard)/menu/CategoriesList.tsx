"use client";

import { useActionState, useState } from "react";
import type { MenuCategory, DrinkCategory } from "@prisma/client";
import {
  createMenuCategory,
  deleteMenuCategory,
  type MenuItemFormState,
} from "@/lib/actions/menu";
import {
  createDrinkCategory,
  deleteDrinkCategory,
} from "@/lib/actions/drinks";

interface CategoriesListProps {
  categories: (MenuCategory | DrinkCategory)[];
  type: "menu" | "drinks";
}

const initialState: MenuItemFormState = {};

export function CategoriesList({ categories, type }: CategoriesListProps) {
  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const createAction =
    type === "menu" ? createMenuCategory : createDrinkCategory;
  const deleteAction =
    type === "menu" ? deleteMenuCategory : deleteDrinkCategory;

  const [state, formAction, isPending] = useActionState(
    createAction,
    initialState
  );

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Opravdu chcete smazat kategorii "${name}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const result = await deleteAction(id);
      if (result.error) {
        alert(result.error);
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="inline-flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg"
          >
            <span className="text-sm font-medium text-gray-700">
              {category.name}
            </span>
            <button
              onClick={() => handleDelete(category.id, category.name)}
              disabled={deletingId === category.id}
              className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
              title="Smazat kategorii"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {showForm ? (
        <form action={formAction} className="flex items-center gap-2">
          <input
            type="text"
            name="name"
            placeholder="Název nové kategorie"
            required
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            {isPending ? "Ukládám..." : "Přidat"}
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm"
          >
            Zrušit
          </button>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 transition-colors"
        >
          <svg
            className="w-4 h-4"
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
          Přidat kategorii
        </button>
      )}

      {state.error && (
        <p className="text-sm text-red-600 mt-2">{state.error}</p>
      )}
    </div>
  );
}