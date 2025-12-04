import { prisma } from "@/lib/prisma";
import { DailyMenuPageClient } from "./DailyMenuPageClient";
import { dishTypes } from "@/lib/constants/daily-menu";

export default async function AdminDailyMenuPage() {
    const [menus, dishes] = await Promise.all([
        prisma.dailyMenu.findMany({
            include: {
                items: {
                    include: { dish: true },
                    orderBy: { sortOrder: "asc" },
                },
            },
            orderBy: { validFrom: "desc" },
        }),
        prisma.dailyMenuDish.findMany({
            orderBy: { sortOrder: "asc" },
        }),
    ]);

    const dishesByType = dishTypes.map((type) => ({
        ...type,
        dishes: dishes.filter((d) => d.type === type.value),
    }));

    return (
        <DailyMenuPageClient
            menus={menus}
            dishes={dishes}
            dishesByType={dishesByType}
        />
    );
}