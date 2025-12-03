import { prisma } from "@/lib/prisma";
import { MenuPageClient } from "./MenuPageClient";

export default async function AdminMenuPage() {
  const [menuItems, categories] = await Promise.all([
    prisma.menuItem.findMany({
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
    }),
    prisma.menuCategory.findMany({
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  return (
    <MenuPageClient
      menuItems={menuItems}
      categories={categories}
    />
  );
}