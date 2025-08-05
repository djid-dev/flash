"use server"
import { auth } from './auth'
import{headers} from 'next/headers'
import { prisma } from "@/server/db"


const blockedWords = [
  "admin", "api", "delete", "dashboard", "404", "500", "error", "login", "logout"
]



function generateShortCodeFromUUID(length = 6) {
  return crypto.randomUUID().replace(/-/g, '').slice(0, length)
}



// Simula una búsqueda en DB
export async function isShortCodeTaken(code: string): Promise<boolean> {
  const existing = await prisma.link.findUnique({
    where: { shortCode: code }
  })
  return !!existing
}

export async function generateUniqueShortCode(): Promise<string> {
  let code
  let attempts = 0

  do {
    code = generateShortCodeFromUUID()
    attempts++

    if (attempts > 10) {
      throw new Error('No se pudo generar un código único')
    }
  } while (blockedWords.includes(code.toLowerCase()) || await isShortCodeTaken(code))

  return code
}

  export const getUserSessionFromServer = async () => await auth.api.getSession({
    headers: await headers()
  })