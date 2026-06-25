import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BrozuraTiskView } from "@/components/BrozuraTiskView";

// Tato stránka se nepoužívá přímo — slouží jako HTML zdroj pro Puppeteer PDF
// URL: /brozury/[id]/nahled?secret=BROZURA_PRINT_SECRET

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ secret?: string }>;
}

export default async function BrozuraNahledPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { secret } = await searchParams;

  // Jednoduchá ochrana — nikdo nechceme veřejný přístup
  if (secret !== process.env.BROZURA_PRINT_SECRET) {
    return notFound();
  }

  const brozura = await prisma.brozura.findUnique({
    where: { id },
    include: { zastavky: { orderBy: { poradi: "asc" } } },
  });

  if (!brozura) return notFound();

  return <BrozuraTiskView brozura={brozura} />;
}
