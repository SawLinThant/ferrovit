import { cookies } from "next/headers";

export async function getServerAuthToken(): Promise<string | undefined> {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("auth_token");
    return authCookie?.value;
  } catch (error) {
    console.error("Failed to access cookies", error);
    return undefined;
  }
} 