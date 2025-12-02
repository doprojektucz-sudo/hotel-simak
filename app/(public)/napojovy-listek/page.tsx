import { prisma } from "@/lib/prisma";
import LuxuryDrinks from "@/components/drinks/LuxuryDrinks";

export const metadata = {
  title: "Nápojový lístek | Hotel U Šimáka",
  description: "Nabídka nápojů restaurace Hotel U Šimáka",
};

export default async function DrinksPage() {
  const [drinks, categories] = await Promise.all([
    prisma.drink.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }],
    }),
    prisma.drinkCategory.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  return <LuxuryDrinks drinks={drinks} categories={categories} />;
}
