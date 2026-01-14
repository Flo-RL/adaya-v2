"use server";

// Server Actions pour l'authentification
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

type SignupResult = {
  success: boolean;
  error?: string;
};

// Créer un nouveau compte
export async function signup(
  email: string,
  password: string,
  name: string,
  role: "USER" | "MERCHANT" = "USER"
): Promise<SignupResult> {
  try {
    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, error: "Cet email est déjà utilisé" };
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Erreur signup:", error);
    return { success: false, error: "Erreur lors de la création du compte" };
  }
}
