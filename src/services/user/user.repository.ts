import { CreateUserInput, User } from "@/entities/users";
import { CREATE_USER } from "@/graphql/mutation/users.mutation";
import { GET_ALL_USERS, GET_USER_BY_ID } from "@/graphql/query/users.query";
import {
  ApolloClient,
  ApolloError,
  ServerError,
  ServerParseError,
} from "@apollo/client";

export class UserRepository {
  private client: ApolloClient<any>;

  constructor(client: ApolloClient<any>) {
    this.client = client;
  }

  async fetchAllUsers(): Promise<User[]> {
    try {
      const { data } = await this.client.query<{ users: User[] }>({
        query: GET_ALL_USERS,
        fetchPolicy: "network-only",
      });
      return data.users;
    } catch (error) {
      throw new ApolloError({
        errorMessage: "Failed to fetch all users",
        graphQLErrors: error instanceof ApolloError ? error.graphQLErrors : [],
        networkError: this.getNetworkError(error),
      });
    }
  }

  async fetchUserById(id: string): Promise<User | null> {
    try {
      const { data } = await this.client.query<{ users_by_pk: User | null }>({
        query: GET_USER_BY_ID,
        variables: { id },
        fetchPolicy: "network-only",
      });
      return data.users_by_pk;
    } catch (error) {
      throw new ApolloError({
        errorMessage: `Failed to fetch user with ID: ${id}`,
        graphQLErrors: error instanceof ApolloError ? error.graphQLErrors : [],
        networkError: this.getNetworkError(error),
      });
    }
  }

  async createUser(input: CreateUserInput): Promise<User> {
    try {
      const { data } = await this.client.mutate<{
        insert_users_one: User;
      }>({
        mutation: CREATE_USER,
        variables: { input },
      });

      if (!data?.insert_users_one) {
        throw new Error("User creation returned no data");
      }

      return data.insert_users_one;
    } catch (error) {
      throw new ApolloError({
        errorMessage: "Failed to create user",
        graphQLErrors: error instanceof ApolloError ? error.graphQLErrors : [],
        networkError: this.getNetworkError(error),
      });
    }
  }

  private getNetworkError(
    error: unknown
  ): Error | ServerError | ServerParseError | null {
    if (error instanceof ApolloError) {
      return error.networkError;
    }
    if (error instanceof Error) {
      return error;
    }
    if (typeof error === "string") {
      return new Error(error);
    }
    if (error && typeof error === "object" && "message" in error) {
      return new Error((error as { message: string }).message);
    }
    return null;
  }
}
