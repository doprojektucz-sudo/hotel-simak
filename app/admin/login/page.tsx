import { LoginForm } from "./LoginForm";

export const metadata = {
  title: "Přihlášení | Admin",
  robots: "noindex, nofollow",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Administrace</h1>
            <p className="text-gray-600 mt-2">Hotel U Šimáka</p>
          </div>

          <LoginForm />
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          <a href="/" className="hover:text-gray-700 transition-colors">
            ← Zpět na web
          </a>
        </p>
      </div>
    </div>
  );
}
