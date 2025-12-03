import { prisma } from "@/lib/prisma";
import { DrinksPageClient } from "./DrinksPageClient";

export default async function AdminDrinksPage() {
  const [drinks, categories] = await Promise.all([
    prisma.drink.findMany({
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
    }),
    prisma.drinkCategory.findMany({
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  return <DrinksPageClient drinks={drinks} categories={categories} />;
}