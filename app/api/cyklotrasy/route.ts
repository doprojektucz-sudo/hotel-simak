// app/api/cyklotrasy/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const brozury = await prisma.brozura.findMany({
        where: { sablona: "CYKLOTRASA", stav: "HOTOVA" },
        include: {
            zastavky: { orderBy: { poradi: "asc" } },
        },
        orderBy: { trasaCislo: "asc" },
    });

    return NextResponse.json(brozury);
}