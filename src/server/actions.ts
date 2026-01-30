"use server";

import { auth } from "./auth";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { ShortLinkSchema } from "@/schemas/shortLinks.schema";
import { headers } from "next/headers";
import { createLink, deleteLink, updateLink, getLink, updateLinkClicks } from "./db";

import { generateUniqueShortCode, isShortCodeTaken } from "./utils";
import { Link } from "../../generated/prisma/client";

type FormState = {
  errors?: {
    destination?: string[];
    shortCode?: string[];
  };
  message?: string | null;
  success?: boolean;
  // En algunos formularios guardamos el id en el estado inicial
  linkId?: string;
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

const validationLink = async (data: {
  destination: string;
  shortCode: string;
}) => {
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

  const alreadyExists = await isShortCodeTaken(data.shortCode);

  if (alreadyExists) {
    return {
      errors: { shortCode: ["Este código ya está en uso"] },
      message: "No se pudo crear el link",
    };
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return {
      message: "No tienes acceso",
    };
  }

  return {
    success: true,
    link: data,
    message: null,
  };
};

export async function createLinkAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const data = {
    destination: formData.get("destination")?.toString() ?? "",
    shortCode: formData.get("short_link")?.toString() ?? "",
  };

  const validation = await validationLink(data);

  if (validation.errors) {
    return validation;
  }
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session!.user.id;

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
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return {
      message: "No tienes acceso",
    };
  }

  try {
    await deleteLink(shortCode);
    return {
      success: true,
      message: null,
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        message: "No se pudo eliminar el link: " + err.message,
      };
    }

    return {
      message: "No se pudo eliminar el link: Error desconocido",
    };
  }
}

export async function updateLinkAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return {
      message: "No tienes acceso",
    };
  }

  const previousShortCode = prevState.link?.shortCode ?? "";

  // En este form los campos se envian por `name`, no por `id`
  // Ojo: `short_code` puede NO venir si el input esta `disabled`.
  const submittedShortCode = formData.get("short_code")?.toString();
  const data = {
    destination: formData.get("destination")?.toString() ?? "",
    shortCode:
      submittedShortCode && submittedShortCode.trim() !== ""
        ? submittedShortCode
        : previousShortCode,
  };

  // El linkId viene desde el estado inicial (useActionState)
  const linkId = prevState.linkId ?? prevState.link?.id ?? "";
  if (!linkId) {
    return {
      message: "No se pudo actualizar el link: falta linkId",
    };
  }

  // Validacion basica
  const parsed = ShortLinkSchema.safeParse(data);
  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: "Error de validacion",
    };
  }

  // Si el shortCode no cambia, no hay que revalidar contra la DB (se marcaria como 'taken').
  if (previousShortCode && data.shortCode !== previousShortCode) {
    const alreadyExists = await isShortCodeTaken(data.shortCode);
    if (alreadyExists) {
      return {
        errors: { shortCode: ["Este codigo ya esta en uso"] },
        message: "No se pudo actualizar el link",
      };
    }
  }

  try {
    const link = await updateLink(linkId, data.destination, data.shortCode);
    return {
      success: true,
      link,
      message: null,
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        message: "No se pudo actualizar el link: " + err.message,
      };
    }

    return {
      message: "No se pudo actualizar el link: Error desconocido",
    };
  }
}
export async function updateLinkClicksAction(shortCode: string) {
  try {
    const link = await updateLinkClicks(shortCode);
    return link;
  } catch (err) {
    if (err instanceof Error) {
      return {
        message: "No se pudo actualizar el link: " + err.message,
      };
    }

    return {
      message: "No se pudo actualizar el link: Error desconocido",
    };
  }
}

export async function getLinkByShortCodeAction(
  shortCode: string,
): Promise<Link | { message: string }> {
  try {
    const link = await getLink(shortCode);
    if (!link) {
      return {
        message: "No se encontro el link",
      };
    }
    return link;
  } catch (err) {
    if (err instanceof Error) {
      return {
        message: "No se pudo obtener el link: " + err.message,
      };
    }

    return {
      message: "No se pudo obtener el link: Error desconocido",
    };
  }
}
