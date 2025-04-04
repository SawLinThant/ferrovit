import { getServerApolloClient } from "@/graphql/client";
import { AuthRepository } from "@/services/auth/auth.repository";
import { AuthService } from "@/services/auth/auth.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import { SignInResponse } from "@/entities/auth.entity";

export default async function LoginPage() {
  const client = await getServerApolloClient();
  const authRepository = new AuthRepository(client);
  const authService = new AuthService(authRepository);

  // async function handleSignIn(input: { email: string; password: string }) {
  //   "use server";
    
  //   try {
  //     const response = await authService.signIn(input);
      
  //     const cookieStore = await cookies();
      
  //     await cookieStore.set("auth_token", response.token, {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === "production",
  //       sameSite: "strict",
  //       path: "/",
  //       maxAge: 60 * 60 * 24 * 7, 
  //     });

  //     await cookieStore.set("user_data", JSON.stringify({
  //       email: input.email
  //     }), {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === "production",
  //       sameSite: "strict",
  //       path: "/",
  //       maxAge: 60 * 60 * 24 * 7, 
  //     });

  //     redirect("/dashboard/quiz-users");
  //   } catch (error: any) {
  //     throw new Error(error.message || "Failed to sign in");
  //   }
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* <LoginForm onSignIn={handleSignIn} /> */}
    </div>
  );
}