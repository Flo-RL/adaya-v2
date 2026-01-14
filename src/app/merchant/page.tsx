import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { getMerchantProducts, deleteProduct } from "@/actions/products";
import DeleteButton from "./DeleteButton";

export default async function MerchantPage() {
  const session = await getServerSession(authOptions);

  // Rediriger si non connecté ou pas marchand
  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "MERCHANT" && session.user.role !== "ADMIN") {
    redirect("/");
  }

  const products = await getMerchantProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Espace Marchand</h1>
        <Link
          href="/merchant/products/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          + Nouveau produit
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Produits" value={products.length.toString()} />
        <StatCard
          title="Publiés"
          value={products.filter((p) => p.published).length.toString()}
        />
        <StatCard title="Ventes" value="0" subtitle="Bientôt disponible" />
      </div>

      {/* Liste des produits */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Mes produits</h2>
        </div>

        {products.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            Vous n&apos;avez pas encore de produits.{" "}
            <Link href="/merchant/products/new" className="text-indigo-600 hover:underline">
              Créez votre premier produit
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Produit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Prix
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Statut
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{product.name}</div>
                    {product.description && (
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {product.description}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {product.price.toFixed(2)} €
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        product.published
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {product.published ? "Publié" : "Brouillon"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DeleteButton productId={product.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle?: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
}
