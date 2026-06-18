import { getBrozury } from "@/lib/actions/brozury";
import { BrozuryPageClient } from "@/components/BrozuryPageClient";

export const metadata = {
  title: "Brožury | Admin",
};

export default async function BrozuryPage() {
  const brozury = await getBrozury();

  return (
    <div className="p-6 lg:p-8">
      <BrozuryPageClient brozury={brozury} />
    </div>
  );
}
