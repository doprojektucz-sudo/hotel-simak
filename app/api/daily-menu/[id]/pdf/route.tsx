import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import ReactPDF from "@react-pdf/renderer";
import { DailyMenuPDF } from "@/components/admin/DailyMenuPDF";
import { dishTypes } from "@/lib/constants/daily-menu";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const menu = await prisma.dailyMenu.findUnique({
        where: { id },
        include: {
            items: {
                include: { dish: true },
                orderBy: { sortOrder: "asc" },
            },
        },
    });

    if (!menu) {
        return NextResponse.json({ error: "Menu not found" }, { status: 404 });
    }

    // Group dishes by type
    const dishesByType = dishTypes
        .map((type) => ({
            ...type,
            dishes: menu.items
                .filter((item) => item.dish.type === type.value)
                .map((item) => item.dish),
        }))
        .filter((type) => type.dishes.length > 0);

    const isSingleDay =
        menu.validFrom.toDateString() === menu.validTo.toDateString();

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("cs-CZ", {
            weekday: "long",
            day: "numeric",
            month: "long",
        });
    };

    const dateText = isSingleDay
        ? formatDate(menu.validFrom)
        : `${formatDate(menu.validFrom)} – ${formatDate(menu.validTo)}`;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    try {
        const pdfStream = await ReactPDF.renderToStream(
            <DailyMenuPDF
                title={menu.title || "Denní menu"}
                dateText={dateText}
                dishesByType={dishesByType}
                totalItems={menu.items.length}
                logoUrl={`${baseUrl}/images/logo.png`}
            />
        );

        // Convert Node.js ReadableStream to Buffer
        const chunks: Buffer[] = [];

        await new Promise<void>((resolve, reject) => {
            pdfStream.on("data", (chunk: Buffer) => chunks.push(chunk));
            pdfStream.on("end", () => resolve());
            pdfStream.on("error", reject);
        });

        const pdfBuffer = Buffer.concat(chunks);

        const filename = `menu-${menu.validFrom.toISOString().split("T")[0]}.pdf`;

        return new NextResponse(pdfBuffer, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${filename}"`,
            },
        });
    } catch (error) {
        console.error("PDF generation error:", error);
        return NextResponse.json(
            { error: "Failed to generate PDF" },
            { status: 500 }
        );
    }
}