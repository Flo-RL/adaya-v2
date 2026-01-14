"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            Adaya
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            <Link
              href="/catalog"
              className="text-gray-600 hover:text-gray-900"
            >
              Catalogue
            </Link>

            {session ? (
              <>
                {/* Lien marchand si rôle approprié */}
                {(session.user.role === "MERCHANT" ||
                  session.user.role === "ADMIN") && (
                  <Link
                    href="/merchant"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Espace Marchand
                  </Link>
                )}

                {/* Info utilisateur */}
                <span className="text-gray-500 text-sm">
                  {session.user.email}
                </span>

                {/* Déconnexion */}
                <button
                  onClick={() => signOut()}
                  className="text-red-600 hover:text-red-800"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Connexion
                </Link>
                <Link
                  href="/signup"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
