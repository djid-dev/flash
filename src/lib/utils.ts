'use client'

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useSession } from "@/lib/auth-client";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const useUserData = () => {
  const { data: session, isPending } = useSession()

  if (isPending ) return null
  if (!session?.user) return null

  return session.user
}



