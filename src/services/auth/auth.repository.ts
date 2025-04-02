import { ApolloClient, ApolloError } from "@apollo/client";
import { SignInInput, SignInResponse } from "@/entities/auth.entity";
import { SIGN_IN_MUTATION } from "@/graphql/mutation/signIn.mutation";

export class AuthRepository {
  private client: ApolloClient<any>;

  constructor(client: ApolloClient<any>) {
    this.client = client;
  }

  async signIn({ email, password }: SignInInput): Promise<SignInResponse> {
    try {
      const { data } = await this.client.mutate<{
        userLogin: SignInResponse;
      }>({
        mutation: SIGN_IN_MUTATION,
        variables: {
          email,
          password,
        },
      });

      if (!data?.userLogin) {
        throw new Error("No sign-in response returned from mutation");
      }

      return data.userLogin;
    } catch (error) {
      throw new ApolloError({
        errorMessage: "Failed to sign in",
        graphQLErrors: error instanceof ApolloError ? error.graphQLErrors : [],
        networkError: error instanceof ApolloError ? error.networkError : null,
      });
    }
  }
}