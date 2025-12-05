import { prisma } from "@/lib/prisma";
import { dishTypes } from "@/lib/constants/daily-menu";

export async function DailyMenuSection() {
    // Aktuální čas - začátek a konec dnešního dne
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    const menu = await prisma.dailyMenu.findFirst({
        where: {
            isActive: true,
            validFrom: { lte: todayEnd },
            validTo: { gte: todayStart },
        },
        include: {
            items: {
                include: { dish: true },
                orderBy: { sortOrder: "asc" },
            },
        },
    });

    // Pokud není aktivní menu nebo nemá žádné položky, nezobrazuj nic
    if (!menu || menu.items.length === 0) {
        return null;
    }

    // Dvojitá kontrola - ověř, že menu opravdu platí dnes
    const menuFrom = new Date(menu.validFrom);
    const menuTo = new Date(menu.validTo);

    const menuFromDate = new Date(menuFrom.getFullYear(), menuFrom.getMonth(), menuFrom.getDate());
    const menuToDate = new Date(menuTo.getFullYear(), menuTo.getMonth(), menuTo.getDate());
    const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (todayDate < menuFromDate || todayDate > menuToDate) {
        return null;
    }

    const formatDate = (date: Date) => {
        const d = new Date(date);
        return d.toLocaleDateString("cs-CZ", {
            weekday: "long",
            day: "numeric",
            month: "long",
        });
    };

    const getDishesByType = () => {
        return dishTypes
            .map((type) => ({
                ...type,
                dishes: menu.items
                    .filter((item) => item.dish.type === type.value)
                    .map((item) => item.dish),
            }))
            .filter((type) => type.dishes.length > 0);
    };

    const isSingleDay = menuFromDate.getTime() === menuToDate.getTime();

    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary-50 to-white">
            <div className="container-custom max-w-4xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="mb-3">
                        <span className="text-primary-600 uppercase tracking-widest text-sm font-semibold">
                            {menu.title || "Denní menu"}
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        {isSingleDay
                            ? formatDate(menu.validFrom)
                            : `${formatDate(menu.validFrom)} – ${formatDate(menu.validTo)}`}
                    </h2>
                    <div className="w-20 h-1 bg-primary-600 mx-auto" />
                </div>

                {/* Menu items */}
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
                    <div className="space-y-8">
                        {getDishesByType().map((type) => (
                            <div key={type.value}>
                                <h3 className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-4">
                                    {type.label}
                                </h3>
                                <div className="space-y-3">
                                    {type.dishes.map((dish) => (
                                        <div
                                            key={dish.id}
                                            className="flex justify-between items-start gap-4 py-2 border-b border-gray-100 last:border-0"
                                        >
                                            <div className="flex-1">
                                                <div className="flex items-start gap-2">
                                                    {dish.weight && (
                                                        <span className="font-bold text-gray-900">
                                                            {dish.weight}
                                                        </span>
                                                    )}
                                                    <span className="text-gray-800">{dish.name}</span>
                                                </div>
                                            </div>
                                            <span className="text-lg font-bold text-primary-600 whitespace-nowrap">
                                                {dish.price} Kč
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer note */}
                    <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-500">Přejeme dobrou chuť!</p>
                    </div>
                </div>
            </div>
        </section>
    );
}