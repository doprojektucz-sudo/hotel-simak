import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DailyMenuForm } from "../DailyMenuForm";
import { dishTypes } from "@/lib/constants/daily-menu";

export default async function NewDailyMenuPage() {
    const dishes = await prisma.dailyMenuDish.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
    });

    const dishesByType = dishTypes.map((type) => ({
        ...type,
        dishes: dishes.filter((d) => d.type === type.value),
    }));

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <Link
                    href="/admin/daily-menu"
                    className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Zpět na denní menu
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Nové denní menu
                </h2>
                <DailyMenuForm dishesByType={dishesByType} />
            </div>
        </div>
    );
}