import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Bienvenue sur Adaya
            </h1>
            <p className="mt-6 text-xl text-indigo-100 max-w-2xl mx-auto">
              La marketplace qui connecte acheteurs et vendeurs.
              Trouvez les meilleurs produits ou vendez les vôtres.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/catalog"
                className="bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold hover:bg-indigo-50 transition"
              >
                Voir le catalogue
              </Link>
              <Link
                href="/signup"
                className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white/10 transition"
              >
                Devenir vendeur
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Pourquoi Adaya ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Simple"
              description="Interface intuitive pour acheter et vendre en quelques clics"
            />
            <FeatureCard
              title="Sécurisé"
              description="Transactions protégées et données sécurisées"
            />
            <FeatureCard
              title="Rapide"
              description="Publiez vos produits et commencez à vendre immédiatement"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="text-center p-6 rounded-lg border border-gray-100 hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
