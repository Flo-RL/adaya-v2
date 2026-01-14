"use client";

import { deleteProduct } from "@/actions/products";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ productId }: { productId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      return;
    }

    setLoading(true);
    const result = await deleteProduct(productId);
    setLoading(false);

    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || "Erreur lors de la suppression");
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-600 hover:text-red-800 disabled:opacity-50"
    >
      {loading ? "..." : "Supprimer"}
    </button>
  );
}
