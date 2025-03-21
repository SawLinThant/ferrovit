import { CreateQuizUserInput, QuizUser } from "@/entities/quiz_users.entity";
import { CREATE_QUIZ_USER } from "@/graphql/mutation/quiz_users.mutation";
import { GET_ALL_QUIZ_USERS, GET_QUIZ_USER_BY_ID } from "@/graphql/query/quiz_users.query";
import {
  ApolloClient,
  ApolloError,
  ServerError,
  ServerParseError,
} from "@apollo/client";

export class QuizUserRepository {
  private client: ApolloClient<any>;

  constructor(client: ApolloClient<any>) {
    this.client = client;
  }

  async fetchAllQuizUsers(): Promise<QuizUser[]> {
    try {
      const { data } = await this.client.query<{ quiz_users: QuizUser[] }>({
        query: GET_ALL_QUIZ_USERS,
        fetchPolicy: "network-only",
      });
      return data.quiz_users;
    } catch (error) {
      throw new ApolloError({
        errorMessage: "Failed to fetch all quiz users",
        graphQLErrors: error instanceof ApolloError ? error.graphQLErrors : [],
        networkError: this.getNetworkError(error),
      });
    }
  }

  async fetchQuizUserById(id: string): Promise<QuizUser | null> {
    try {
      const { data } = await this.client.query<{ quiz_users_by_pk: QuizUser | null }>({
        query: GET_QUIZ_USER_BY_ID,
        variables: { id },
        fetchPolicy: "network-only",
      });
      return data.quiz_users_by_pk;
    } catch (error) {
      throw new ApolloError({
        errorMessage: `Failed to fetch quiz user with ID: ${id}`,
        graphQLErrors: error instanceof ApolloError ? error.graphQLErrors : [],
        networkError: this.getNetworkError(error),
      });
    }
  }

  async createQuizUser(input: CreateQuizUserInput): Promise<QuizUser> {
    try {
      const { data } = await this.client.mutate<{
        insert_quiz_users_one: QuizUser;
      }>({
        mutation: CREATE_QUIZ_USER,
        variables: { input },
      });

      if (!data?.insert_quiz_users_one) {
        throw new Error("Quiz user creation returned no data");
      }

      return data.insert_quiz_users_one;
    } catch (error) {
      throw new ApolloError({
        errorMessage: "Failed to create quiz user",
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