import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { MenuItemForm } from "../MenuItemForm";

export default async function NewMenuItemPage() {
  const categories = await prisma.menuCategory.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/menu"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Zpět na jídelní lístek
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Nová položka jídelního lístku
        </h2>
        <MenuItemForm categories={categories.map((c) => c.name)} />
      </div>
    </div>
  );
}
