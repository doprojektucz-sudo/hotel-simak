import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DrinkForm } from "../DrinkForm";

interface EditDrinkPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditDrinkPage({ params }: EditDrinkPageProps) {
  const { id } = await params;

  const [item, categories] = await Promise.all([
    prisma.drink.findUnique({ where: { id } }),
    prisma.drinkCategory.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  if (!item) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/drinks"
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
          Zpět na nápojový lístek
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Upravit nápoj</h2>
        <DrinkForm categories={categories.map((c) => c.name)} item={item} />
      </div>
    </div>
  );
}
