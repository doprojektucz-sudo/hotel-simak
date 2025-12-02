"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { Drink } from "@prisma/client";
import { createDrink, updateDrink } from "@/lib/actions/drinks";

interface DrinkFormProps {
  categories: string[];
  item?: Drink;
}

const initialState = {};

export function DrinkForm({ categories, item }: DrinkFormProps) {
  const router = useRouter();
  const isEditing = !!item;

  const action = isEditing ? updateDrink.bind(null, item.id) : createDrink;

  const [state, formAction, isPending] = useActionState(action, initialState);

  useEffect(() => {
    if (state.success) {
      router.push("/admin/drinks");
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
            Název *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            defaultValue={item?.name}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Např. Pilsner Urquell"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Kategorie *
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue={item?.category}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Vyberte kategorii</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
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
            defaultValue={item?.price}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="55"
          />
        </div>

        <div>
          <label
            htmlFor="size"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Objem / Velikost
          </label>
          <input
            type="text"
            id="size"
            name="size"
            defaultValue={item?.size ?? ""}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Např. 0,5l nebo 0,04l"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Popis
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            defaultValue={item?.description ?? ""}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Volitelný popis nápoje..."
          />
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={item?.isActive ?? true}
              className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Zobrazit na webu
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
              : "Vytvořit položku"}
        </button>
      </div>
    </form>
  );
}
