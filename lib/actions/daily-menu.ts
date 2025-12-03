"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { dishTypes } from "@/lib/constants/daily-menu";

export interface DailyMenuFormState {
    error?: string;
    success?: boolean;
}


// ============ DAILY MENU DISHES (Číselník) ============

export async function createDailyMenuDish(
    prevState: DailyMenuFormState,
    formData: FormData
): Promise<DailyMenuFormState> {
    try {
        await requireAdmin();

        const data = {
            name: formData.get("name") as string,
            weight: (formData.get("weight") as string) || null,
            price: parseInt(formData.get("price") as string) || 0,
            type: formData.get("type") as string,
            isActive: formData.get("isActive") !== "off",
        };

        if (!data.name || !data.type) {
            return { error: "Vyplňte název a typ jídla" };
        }

        // Get max sortOrder for this type
        const maxOrder = await prisma.dailyMenuDish.aggregate({
            where: { type: data.type },
            _max: { sortOrder: true },
        });

        const baseOrder = getBaseSortOrder(data.type);
        const nextOrder = maxOrder._max.sortOrder
            ? maxOrder._max.sortOrder + 1
            : baseOrder;

        await prisma.dailyMenuDish.create({
            data: {
                ...data,
                sortOrder: nextOrder,
            },
        });

        revalidatePath("/admin/daily-menu");
        return { success: true };
    } catch (error) {
        console.error("Create daily menu dish error:", error);
        return { error: "Nastala chyba při vytváření jídla" };
    }
}

export async function updateDailyMenuDish(
    id: string,
    prevState: DailyMenuFormState,
    formData: FormData
): Promise<DailyMenuFormState> {
    try {
        await requireAdmin();

        const data = {
            name: formData.get("name") as string,
            weight: (formData.get("weight") as string) || null,
            price: parseInt(formData.get("price") as string) || 0,
            type: formData.get("type") as string,
            isActive: formData.get("isActive") !== "off",
        };

        if (!data.name || !data.type) {
            return { error: "Vyplňte název a typ jídla" };
        }

        await prisma.dailyMenuDish.update({
            where: { id },
            data,
        });

        revalidatePath("/admin/daily-menu");
        return { success: true };
    } catch (error) {
        console.error("Update daily menu dish error:", error);
        return { error: "Nastala chyba při úpravě jídla" };
    }
}

export async function deleteDailyMenuDish(id: string): Promise<DailyMenuFormState> {
    try {
        await requireAdmin();

        // Check if dish is used in any menu
        const usageCount = await prisma.dailyMenuToItem.count({
            where: { dishId: id },
        });

        if (usageCount > 0) {
            return { error: `Jídlo nelze smazat - je použito v ${usageCount} menu` };
        }

        await prisma.dailyMenuDish.delete({
            where: { id },
        });

        revalidatePath("/admin/daily-menu");
        return { success: true };
    } catch (error) {
        console.error("Delete daily menu dish error:", error);
        return { error: "Nastala chyba při mazání jídla" };
    }
}

// ============ DAILY MENU ============

export async function createDailyMenu(
    prevState: DailyMenuFormState,
    formData: FormData
): Promise<DailyMenuFormState> {
    try {
        await requireAdmin();

        const title = (formData.get("title") as string) || null;
        const validFromStr = formData.get("validFrom") as string;
        const validToStr = formData.get("validTo") as string;
        const dishIds = formData.getAll("dishIds") as string[];

        if (!validFromStr || !validToStr) {
            return { error: "Vyplňte datum platnosti" };
        }

        if (dishIds.length === 0) {
            return { error: "Vyberte alespoň jedno jídlo" };
        }

        const validFrom = new Date(validFromStr);
        validFrom.setHours(0, 0, 0, 0);

        const validTo = new Date(validToStr);
        validTo.setHours(23, 59, 59, 999);

        if (validTo < validFrom) {
            return { error: "Datum 'do' nemůže být před datem 'od'" };
        }

        // Check for overlapping menus
        const overlapping = await prisma.dailyMenu.findFirst({
            where: {
                AND: [
                    { validFrom: { lte: validTo } },
                    { validTo: { gte: validFrom } },
                ],
            },
        });

        if (overlapping) {
            const fromDate = overlapping.validFrom.toLocaleDateString("cs-CZ");
            const toDate = overlapping.validTo.toLocaleDateString("cs-CZ");
            return {
                error: `Menu se překrývá s existujícím menu (${fromDate} - ${toDate})`,
            };
        }

        // Create menu with items
        await prisma.dailyMenu.create({
            data: {
                title,
                validFrom,
                validTo,
                items: {
                    create: dishIds.map((dishId, index) => ({
                        dishId,
                        sortOrder: index,
                    })),
                },
            },
        });

        revalidatePath("/admin/daily-menu");
        revalidatePath("/restaurace");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Create daily menu error:", error);
        return { error: "Nastala chyba při vytváření menu" };
    }
}

export async function updateDailyMenu(
    id: string,
    prevState: DailyMenuFormState,
    formData: FormData
): Promise<DailyMenuFormState> {
    try {
        await requireAdmin();

        const title = (formData.get("title") as string) || null;
        const validFromStr = formData.get("validFrom") as string;
        const validToStr = formData.get("validTo") as string;
        const dishIds = formData.getAll("dishIds") as string[];
        const isActive = formData.get("isActive") !== "off";

        if (!validFromStr || !validToStr) {
            return { error: "Vyplňte datum platnosti" };
        }

        if (dishIds.length === 0) {
            return { error: "Vyberte alespoň jedno jídlo" };
        }

        const validFrom = new Date(validFromStr);
        validFrom.setHours(0, 0, 0, 0);

        const validTo = new Date(validToStr);
        validTo.setHours(23, 59, 59, 999);

        if (validTo < validFrom) {
            return { error: "Datum 'do' nemůže být před datem 'od'" };
        }

        // Check for overlapping menus (excluding current)
        const overlapping = await prisma.dailyMenu.findFirst({
            where: {
                AND: [
                    { id: { not: id } },
                    { validFrom: { lte: validTo } },
                    { validTo: { gte: validFrom } },
                ],
            },
        });

        if (overlapping) {
            const fromDate = overlapping.validFrom.toLocaleDateString("cs-CZ");
            const toDate = overlapping.validTo.toLocaleDateString("cs-CZ");
            return {
                error: `Menu se překrývá s existujícím menu (${fromDate} - ${toDate})`,
            };
        }

        // Update menu - delete old items and create new
        await prisma.$transaction([
            prisma.dailyMenuToItem.deleteMany({ where: { menuId: id } }),
            prisma.dailyMenu.update({
                where: { id },
                data: {
                    title,
                    validFrom,
                    validTo,
                    isActive,
                    items: {
                        create: dishIds.map((dishId, index) => ({
                            dishId,
                            sortOrder: index,
                        })),
                    },
                },
            }),
        ]);

        revalidatePath("/admin/daily-menu");
        revalidatePath("/restaurace");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Update daily menu error:", error);
        return { error: "Nastala chyba při úpravě menu" };
    }
}

export async function deleteDailyMenu(id: string): Promise<DailyMenuFormState> {
    try {
        await requireAdmin();

        await prisma.dailyMenu.delete({
            where: { id },
        });

        revalidatePath("/admin/daily-menu");
        revalidatePath("/restaurace");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Delete daily menu error:", error);
        return { error: "Nastala chyba při mazání menu" };
    }
}

export async function toggleDailyMenuActive(
    id: string,
    isActive: boolean
): Promise<DailyMenuFormState> {
    try {
        await requireAdmin();

        await prisma.dailyMenu.update({
            where: { id },
            data: { isActive },
        });

        revalidatePath("/admin/daily-menu");
        revalidatePath("/restaurace");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Toggle daily menu error:", error);
        return { error: "Nastala chyba" };
    }
}

// ============ GET DATA ============

export async function getDailyMenuDishes() {
    return prisma.dailyMenuDish.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
    });
}

export async function getAllDailyMenuDishes() {
    return prisma.dailyMenuDish.findMany({
        orderBy: { sortOrder: "asc" },
    });
}

export async function getDailyMenuDish(id: string) {
    return prisma.dailyMenuDish.findUnique({
        where: { id },
    });
}

export async function getDailyMenus() {
    return prisma.dailyMenu.findMany({
        include: {
            items: {
                include: { dish: true },
                orderBy: { sortOrder: "asc" },
            },
        },
        orderBy: { validFrom: "desc" },
    });
}

export async function getDailyMenu(id: string) {
    return prisma.dailyMenu.findUnique({
        where: { id },
        include: {
            items: {
                include: { dish: true },
                orderBy: { sortOrder: "asc" },
            },
        },
    });
}

export async function getCurrentDailyMenu() {
    const now = new Date();

    return prisma.dailyMenu.findFirst({
        where: {
            isActive: true,
            validFrom: { lte: now },
            validTo: { gte: now },
        },
        include: {
            items: {
                include: { dish: true },
                orderBy: { sortOrder: "asc" },
            },
        },
    });
}

// ============ HELPERS ============

function getBaseSortOrder(type: string): number {
    const baseOrders: Record<string, number> = {
        SOUP: 100,
        GAME: 200,
        PORK: 300,
        BEEF: 400,
        POULTRY: 500,
        FISH: 600,
        MEATLESS: 700,
        SWEET: 800,
        DESSERT: 900,
        DRINK: 1000,
    };
    return baseOrders[type] || 500;
}