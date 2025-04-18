import { SignInInput, SignInResponse } from "@/entities/auth.entity";
import { AuthRepository } from "./auth.repository";

export class AuthService {
  private repository: AuthRepository;

  constructor(repository: AuthRepository) {
    this.repository = repository;
  }

  async signIn({ email, password }: SignInInput): Promise<SignInResponse> {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }

    return await this.repository.signIn({ email, password });
  }
}