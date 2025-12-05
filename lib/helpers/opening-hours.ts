import { prisma } from "@/lib/prisma";

export type OpeningHoursData = {
    id: string;
    dayOfWeek: number;
    dayName: string;
    isOpen: boolean;
    openTime: string | null;
    closeTime: string | null;
    note: string | null;
};

export async function getOpeningHoursData(): Promise<OpeningHoursData[]> {
    return prisma.openingHours.findMany({
        orderBy: { sortOrder: "asc" },
    });
}

// Seskupení dnů se stejnou otevírací dobou pro kompaktnější zobrazení
export function groupOpeningHours(hours: OpeningHoursData[]) {
    const groups: {
        days: string[];
        isOpen: boolean;
        openTime: string | null;
        closeTime: string | null;
        note: string | null;
    }[] = [];

    let currentGroup: typeof groups[0] | null = null;

    for (const hour of hours) {
        const isSame =
            currentGroup &&
            currentGroup.isOpen === hour.isOpen &&
            currentGroup.openTime === hour.openTime &&
            currentGroup.closeTime === hour.closeTime;

        if (isSame && currentGroup) {
            currentGroup.days.push(hour.dayName);
        } else {
            if (currentGroup) {
                groups.push(currentGroup);
            }
            currentGroup = {
                days: [hour.dayName],
                isOpen: hour.isOpen,
                openTime: hour.openTime,
                closeTime: hour.closeTime,
                note: hour.note,
            };
        }
    }

    if (currentGroup) {
        groups.push(currentGroup);
    }

    return groups;
}

// Formátování dnů: "Pondělí" nebo "Úterý–Čtvrtek"
export function formatDaysRange(days: string[]): string {
    if (days.length === 1) {
        return days[0];
    }
    if (days.length === 2) {
        return `${days[0]}, ${days[1]}`;
    }
    return `${days[0]}–${days[days.length - 1]}`;
}

// Formátování času: "11:00–22:00" nebo "ZAVŘENO"
export function formatTimeRange(
    isOpen: boolean,
    openTime: string | null,
    closeTime: string | null
): string {
    if (!isOpen) {
        return "ZAVŘENO";
    }
    return `${openTime}–${closeTime}`;
}