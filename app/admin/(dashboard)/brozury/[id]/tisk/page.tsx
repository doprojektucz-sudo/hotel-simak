import { notFound } from "next/navigation";
import { getBrozura } from "@/lib/actions/brozury";
import { BrozuraTiskClient } from "@/components/BrozuraTiskClient";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function TiskBrozuryPage({ params }: Props) {
  const { id } = await params;
  const brozura = await getBrozura(id);

  if (!brozura) notFound();

  return <BrozuraTiskClient brozura={brozura} />;
}
