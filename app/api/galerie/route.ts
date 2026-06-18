import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const MAX_SIZE = 8 * 1024 * 1024; // 8 MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session?.isAdmin) {
    return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });
  }

  const formData = await request.formData();
  const files = formData.getAll("files") as File[];

  if (!files.length) {
    return NextResponse.json({ error: "Žádný soubor" }, { status: 400 });
  }

  // Ensure upload directory exists
  const uploadDir = path.join(process.cwd(), "public", "uploads", "brozury");
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  const results = [];
  const errors = [];

  for (const file of files) {
    if (!ALLOWED.includes(file.type)) {
      errors.push(`${file.name}: nepodporovaný formát`);
      continue;
    }
    if (file.size > MAX_SIZE) {
      errors.push(`${file.name}: soubor je příliš velký (max 8 MB)`);
      continue;
    }

    try {
      // Generate unique filename
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const safeName = file.name
        .replace(/\.[^.]+$/, "")
        .replace(/[^a-z0-9]/gi, "-")
        .toLowerCase()
        .slice(0, 40);
      const filename = `${safeName}-${Date.now()}.${ext}`;
      const filePath = path.join(uploadDir, filename);
      const url = `/uploads/brozury/${filename}`;

      // Write file
      const bytes = await file.arrayBuffer();
      await writeFile(filePath, Buffer.from(bytes));

      // Save to DB
      const obrazek = await prisma.galerieObrazek.create({
        data: {
          nazev: file.name,
          url,
          velikost: file.size,
          typ: file.type,
        },
      });

      results.push(obrazek);
    } catch (err) {
      console.error(err);
      errors.push(`${file.name}: chyba při nahrávání`);
    }
  }

  return NextResponse.json({ results, errors });
}

export async function DELETE(request: NextRequest) {
  const session = await getSession();
  if (!session?.isAdmin) {
    return NextResponse.json({ error: "Nepřihlášen" }, { status: 401 });
  }

  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: "Chybí ID" }, { status: 400 });

  try {
    const obrazek = await prisma.galerieObrazek.findUnique({ where: { id } });
    if (!obrazek) return NextResponse.json({ error: "Nenalezeno" }, { status: 404 });

    // Delete file from disk
    const filePath = path.join(process.cwd(), "public", obrazek.url);
    try {
      const { unlink } = await import("fs/promises");
      await unlink(filePath);
    } catch {
      // File may not exist — continue
    }

    await prisma.galerieObrazek.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Chyba při mazání" }, { status: 500 });
  }
}
