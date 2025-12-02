import { prisma } from "@/lib/prisma";
import VerticalMenu from "@/components/menu/VerticalMenu";

export const metadata = {
  title: "Jídelní lístek | Hotel U Šimáka",
  description: "Nabídka jídel restaurace Hotel U Šimáka",
};

export default async function MenuPage() {
  const [items, categories] = await Promise.all([
    prisma.menuItem.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }],
    }),
    prisma.menuCategory.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  return <VerticalMenu items={items} categories={categories} />;
}
