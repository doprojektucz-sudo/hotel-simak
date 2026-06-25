import { notFound } from "next/navigation";
import Link from "next/link";
import { getBrozura } from "@/lib/actions/brozury";
import { BrozuraForm } from "@/components/BrozuraForm";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const brozura = await getBrozura(id);
  return {
    title: brozura ? `${brozura.nazev} | Admin` : "Brožura | Admin",
  };
}

export default async function EditBrozuraPage({ params }: Props) {
  const { id } = await params;
  const brozura = await getBrozura(id);

  if (!brozura) notFound();

  return (
    <div className="p-6 lg:p-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/admin/brozury" className="hover:text-gray-700 transition-colors">
          Brožury
        </Link>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-600 font-medium">{brozura.nazev}</span>
      </nav>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{brozura.nazev}</h1>
        <a
          href={`/api/brozury/${brozura.id}/pdf`}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a1 1 0 001 1h16a1 1 0 001-1v-3" />
          </svg>
          Stáhnout PDF
        </a>
      </div>

      <BrozuraForm brozura={brozura} />
    </div>
  );
}
