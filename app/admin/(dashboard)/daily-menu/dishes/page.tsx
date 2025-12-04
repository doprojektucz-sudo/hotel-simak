import { prisma } from "@/lib/prisma";
import { DishesPageClient } from "./DishesPageClient";
import { dishTypes } from "@/lib/constants/daily-menu";

export default async function DailyMenuDishesPage() {
    const dishes = await prisma.dailyMenuDish.findMany({
        orderBy: { sortOrder: "asc" },
    });

    const dishesByType = dishTypes.map((type) => ({
        ...type,
        dishes: dishes.filter((d) => d.type === type.value),
    }));

    return <DishesPageClient dishes={dishes} dishesByType={dishesByType} />;
}