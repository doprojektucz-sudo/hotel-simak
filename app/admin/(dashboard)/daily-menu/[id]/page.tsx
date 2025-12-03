import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DishForm } from "../dishes/DishForm";

interface EditDishPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditDishPage({ params }: EditDishPageProps) {
    const { id } = await params;

    const dish = await prisma.dailyMenuDish.findUnique({
        where: { id },
    });

    if (!dish) {
        notFound();
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link
                    href="/admin/daily-menu/dishes"
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
                    Zpět na číselník
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Upravit jídlo</h2>
                <DishForm dish={dish} />
            </div>
        </div>
    );
}