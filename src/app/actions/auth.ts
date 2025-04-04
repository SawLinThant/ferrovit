"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const cookieStore = await cookies();
  
  // Clear auth token
  await cookieStore.delete("auth_token");
  
  // Clear user data
  await cookieStore.delete("user_data");
  
  // Redirect to login page
  redirect("/login");
} 