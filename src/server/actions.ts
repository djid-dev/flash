
import { authClient } from "@/lib/auth-client";
import { redirect } from 'next/navigation';




export async function logOutAction() {
  await authClient.signOut();
  redirect('/'); 
}
