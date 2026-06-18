import { BrozuraForm } from "@/components/BrozuraForm";
import Link from "next/link";

export const metadata = {
  title: "Nová brožura | Admin",
};

export default function NovaBrozuraPage() {
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
        <span className="text-gray-600 font-medium">Nová brožura</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Vytvořit novou brožuru</h1>

      <BrozuraForm />
    </div>
  );
}
