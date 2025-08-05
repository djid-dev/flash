import { z } from 'zod'

export const blockedWords = [
  "admin", "api", "dashboard", "delete", "404", "500", "error", "home",
  "index", "login", "logout", "register", "/"
]

export const ShortLinkSchema = z.object({
  destination: z.string()
    .min(1, "El enlace no puede estar vacío")
    .max(2048, "El enlace es demasiado largo")
    .url("El enlace no es válido"),

  shortCode: z.string()
    .min(4, "Debe tener al menos 4 caracteres")
    .max(20, "Debe tener como máximo 20 caracteres")
    .regex(/^[a-zA-Z0-9]+$/, "Solo se permiten letras y números")
    .refine(code => !blockedWords.includes(code.toLowerCase()), {
      message: "Este código está reservado"
    })
})

// (opcional) exporta también el tipo inferido:
export type ShortLinkInput = z.infer<typeof ShortLinkSchema>
