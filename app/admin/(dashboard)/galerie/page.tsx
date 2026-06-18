import { getGalerieObrazky } from "@/lib/actions/galerie";
import { GalerieSprava } from "@/components/GalerieSprava";

export const metadata = {
  title: "Galerie | Admin",
};

export default async function GaleriePage() {
  const obrazky = await getGalerieObrazky();

  return (
    <div className="p-6 lg:p-8">
      <GalerieSprava obrazky={obrazky} />
    </div>
  );
}
