"use server";

// Server Actions pour les produits
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

type ProductResult = {
  success: boolean;
  error?: string;
};

// Créer un nouveau produit
export async function createProduct(
  name: string,
  description: string,
  price: number,
  image?: string
): Promise<ProductResult> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return { success: false, error: "Non connecté" };
    }

    if (session.user.role !== "MERCHANT" && session.user.role !== "ADMIN") {
      return { success: false, error: "Vous devez être marchand" };
    }

    await prisma.product.create({
      data: {
        name,
        description,
        price,
        image,
        merchantId: session.user.id,
        published: true,
      },
    });

    revalidatePath("/catalog");
    revalidatePath("/merchant");

    return { success: true };
  } catch (error) {
    console.error("Erreur createProduct:", error);
    return { success: false, error: "Erreur lors de la création du produit" };
  }
}

// Supprimer un produit
export async function deleteProduct(productId: string): Promise<ProductResult> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return { success: false, error: "Non connecté" };
    }

    // Vérifier que le produit appartient au marchand
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return { success: false, error: "Produit non trouvé" };
    }

    if (product.merchantId !== session.user.id && session.user.role !== "ADMIN") {
      return { success: false, error: "Non autorisé" };
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    revalidatePath("/catalog");
    revalidatePath("/merchant");

    return { success: true };
  } catch (error) {
    console.error("Erreur deleteProduct:", error);
    return { success: false, error: "Erreur lors de la suppression" };
  }
}

// Récupérer tous les produits publiés (pour le catalogue)
export async function getPublishedProducts() {
  return prisma.product.findMany({
    where: { published: true },
    include: {
      merchant: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

// Récupérer les produits d'un marchand
export async function getMerchantProducts() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return [];
  }

  return prisma.product.findMany({
    where: { merchantId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
}
