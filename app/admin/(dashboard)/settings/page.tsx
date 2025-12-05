import { prisma } from "@/lib/prisma";
import { OpeningHoursSettings } from "./OpeningHoursSettings";

export default async function AdminSettingsPage() {
    const openingHours = await prisma.openingHours.findMany({
        orderBy: { sortOrder: "asc" },
    });

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Nastavení</h2>
                <p className="text-gray-600 mt-1">Správa otevírací doby a dalších nastavení</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Otevírací doba</h3>
                <OpeningHoursSettings hours={openingHours} />
            </div>
        </div>
    );
}