"use client";

import { Cookie } from "lucide-react";

export default function ResetConsentButton() {
  const handleReset = () => {
    localStorage.removeItem("cookie-consent-v1");
    window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={handleReset}
      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:cursor-pointer hover:-translate-y-0.5 transition-all duration-300"
    >
      <Cookie className="w-4 h-4" />
      Změnit nastavení cookies
    </button>
  );
}