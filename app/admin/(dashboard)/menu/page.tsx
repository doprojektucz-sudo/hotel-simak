import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { MenuItemsList } from "./MenuItemsList";
import { CategoriesList } from "./CategoriesList";

export default async function AdminMenuPage() {
  const [menuItems, categories] = await Promise.all([
    prisma.menuItem.findMany({
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
    }),
    prisma.menuCategory.findMany({
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  // Group items by category
  const groupedItems = categories.reduce(
    (acc, cat) => {
      acc[cat.name] = menuItems.filter((item) => item.category === cat.name);
      return acc;
    },
    {} as Record<string, typeof menuItems>
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Jídelní lístek</h2>
          <p className="text-gray-600 mt-1">
            Správa položek jídelního lístku ({menuItems.length} položek)
          </p>
        </div>
        <Link
          href="/admin/menu/new"
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
        </Link>
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
              <MenuItemsList items={items} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
