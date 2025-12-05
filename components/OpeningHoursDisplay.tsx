import { getOpeningHoursData, groupOpeningHours, formatDaysRange, formatTimeRange } from "@/lib/helpers/opening-hours";

interface OpeningHoursDisplayProps {
    variant?: "card" | "list" | "compact" | "footer";
    className?: string;
}

export async function OpeningHoursDisplay({
    variant = "list",
    className = ""
}: OpeningHoursDisplayProps) {
    const hours = await getOpeningHoursData();
    const grouped = groupOpeningHours(hours);

    // Varianta pro kartu (restaurace page)
    if (variant === "card") {
        return (
            <div className={className}>
                {grouped.map((group, index) => (
                    <p key={index} className="text-gray-600">
                        {formatDaysRange(group.days)}: {" "}
                        <span className={!group.isOpen ? "font-semibold text-red-600" : ""}>
                            {formatTimeRange(group.isOpen, group.openTime, group.closeTime)}
                        </span>
                    </p>
                ))}
            </div>
        );
    }

    // Varianta pro footer
    if (variant === "footer") {
        return (
            <ul className={`space-y-2 text-sm ${className}`}>
                {grouped.map((group, index) => (
                    <li key={index} className="flex justify-between">
                        <span>{formatDaysRange(group.days)}:</span>
                        <span className={group.isOpen ? "" : "font-semibold text-primary-400"}>
                            {formatTimeRange(group.isOpen, group.openTime, group.closeTime)}
                        </span>
                    </li>
                ))}
            </ul>
        );
    }

    // Varianta pro kontakt page (detailní seznam)
    if (variant === "list") {
        return (
            <div className={`space-y-2 text-sm ${className}`}>
                {hours.map((hour) => (
                    <div key={hour.id} className="flex justify-between gap-16">
                        <span className="text-gray-600">{hour.dayName}:</span>
                        <span className={`font-semibold ${hour.isOpen ? "text-gray-900" : "text-red-600"}`}>
                            {formatTimeRange(hour.isOpen, hour.openTime, hour.closeTime)}
                        </span>
                    </div>
                ))}
            </div>
        );
    }

    // Kompaktní varianta
    return (
        <div className={className}>
            {grouped.map((group, index) => (
                <div key={index} className="flex justify-between">
                    <span>{formatDaysRange(group.days)}</span>
                    <span className={group.isOpen ? "font-semibold" : "font-semibold text-red-600"}>
                        {formatTimeRange(group.isOpen, group.openTime, group.closeTime)}
                    </span>
                </div>
            ))}
        </div>
    );
}