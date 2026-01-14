import { getPublishedProducts } from "@/actions/products";

// Force le rendu dynamique (pas de pré-rendu statique)
export const dynamic = "force-dynamic";

type Product = Awaited<ReturnType<typeof getPublishedProducts>>[number];

export default async function CatalogPage() {
  const products = await getPublishedProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Catalogue</h1>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Aucun produit disponible pour le moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
      {/* Image placeholder */}
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400">Pas d&apos;image</span>
        )}
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {product.name}
        </h2>
        {product.description && (
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="mt-3 flex justify-between items-center">
          <span className="text-xl font-bold text-indigo-600">
            {product.price.toFixed(2)} €
          </span>
          <span className="text-xs text-gray-500">
            par {product.merchant.name || "Vendeur"}
          </span>
        </div>
      </div>
    </div>
  );
}
