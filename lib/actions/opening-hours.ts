"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export interface OpeningHoursFormState {
    error?: string;
    success?: boolean;
}

export async function updateOpeningHours(
    id: string,
    prevState: OpeningHoursFormState,
    formData: FormData
): Promise<OpeningHoursFormState> {
    try {
        await requireAdmin();

        const isOpen = formData.get("isOpen") === "on";
        const openTime = (formData.get("openTime") as string) || null;
        const closeTime = (formData.get("closeTime") as string) || null;
        const note = (formData.get("note") as string) || null;

        if (isOpen && (!openTime || !closeTime)) {
            return { error: "Vyplňte čas otevření a zavření" };
        }

        await prisma.openingHours.update({
            where: { id },
            data: {
                isOpen,
                openTime: isOpen ? openTime : null,
                closeTime: isOpen ? closeTime : null,
                note,
            },
        });

        revalidatePath("/admin/settings");
        revalidatePath("/restaurace");
        revalidatePath("/kontakt");
        revalidatePath("/");

        return { success: true };
    } catch (error) {
        console.error("Update opening hours error:", error);
        return { error: "Nastala chyba při úpravě otevírací doby" };
    }
}

export async function getOpeningHours() {
    return prisma.openingHours.findMany({
        orderBy: { sortOrder: "asc" },
    });
}