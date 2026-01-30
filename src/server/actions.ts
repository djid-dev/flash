"use server";

import { auth } from "./auth";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { ShortLinkSchema } from "@/schemas/shortLinks.schema";
import { headers } from "next/headers";
import { createLink, deleteLink } from "./db";

import { generateUniqueShortCode, isShortCodeTaken } from "./utils";

type FormState = {
  errors?: {
    destination?: string[];
    shortCode?: string[];
  };
  message?: string | null;
  success?: boolean;
  link?: {
    id: string;
    originalUrl: string;
    shortCode: string;
    // Otros campos si existen
  } | null;
};

export async function logOutAction() {
  await authClient.signOut();
  redirect("/");
}

export async function createLinkAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const data = {
    destination: formData.get("destination")?.toString() ?? "",
    shortCode: formData.get("short_link")?.toString() ?? "",
  };

  // Validación inicial con Zod
  let parsed = ShortLinkSchema.safeParse(data);

  if (!parsed.success) {
    const needsAutoCode = data.shortCode.trim() === "";
    if (needsAutoCode) {
      const autoCode = await generateUniqueShortCode();
      data.shortCode = autoCode;

      // Revalidar con el nuevo código
      parsed = ShortLinkSchema.safeParse(data);
      if (!parsed.success) {
        return {
          errors: parsed.error.flatten().fieldErrors,
          message: "Error de validación",
        };
      }
    } else {
      return {
        errors: parsed.error.flatten().fieldErrors,
        message: "Error de validación",
      };
    }
  }

  const alreadyExists = await isShortCodeTaken(data.shortCode)

  if (alreadyExists) {
    return {
      errors: { shortCode: ["Este código ya está en uso"] },
      message: "No se pudo crear el link"
    }
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return {
      message: "No tienes acceso",
    };
  }

  const userId = session.user.id;

  try {
    const link = await createLink(data.destination, data.shortCode, userId);
    return {
      success: true,
      link,
      message: null,
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        message: "No se pudo crear el link: " + err.message,
      };
    }

    return {
      message: "No se pudo crear el link: Error desconocido",
    };
  }
}


export async function deleteLinkAction(shortCode: string) {
  await deleteLink(shortCode);
  
}