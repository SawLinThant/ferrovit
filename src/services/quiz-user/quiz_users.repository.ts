import { CreateQuizUserInput, QuizUser, QuizUsersResponse } from "@/entities/quiz_users.entity";
import { CREATE_QUIZ_USER } from "@/graphql/mutation/quiz_users.mutation";
import { GET_ALL_QUIZ_USERS, GET_FILTERED_QUIZ_USERS, GET_QUIZ_USER_BY_ID } from "@/graphql/query/quiz_users.query";
import {
  ApolloClient,
  ApolloError,
  ServerError,
  ServerParseError,
} from "@apollo/client";

interface FetchQuizUsersParams {
  phone?: string;
  address?: string;
  created_at?: string;
  offset?: number;
  limit?: number;
}

export class QuizUserRepository {
  private client: ApolloClient<any>;

  constructor(client: ApolloClient<any>) {
    this.client = client;
  }

  async fetchAllQuizUsers(): Promise<QuizUser[]> {
    try {
      const { data } = await this.client.query<{ quiz_users: QuizUser[] }>({
        query: GET_ALL_QUIZ_USERS,
        fetchPolicy: "no-cache",
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
        fetchPolicy: "no-cache",
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

  async fetchQuizUsers({
    phone,
    created_at,
    address,
    offset = 0,
    limit = 10,
  }: FetchQuizUsersParams): Promise<QuizUsersResponse> {
    try {
      const where: any = {};
      if (phone) {
        where.phone = { _eq: phone };
      }
      if (address) {
        where.address = { _eq: address };
      }
      if (created_at) {
        const startOfDay = `${created_at}T00:00:00Z`;
        const endOfDay = `${created_at}T23:59:59Z`;
        where.created_at = { _gte: startOfDay, _lte: endOfDay }; 
      }

      console.log('Fetching quiz users with params:', {
        where,
        offset,
        limit,
      });

      const { data } = await this.client.query<{
        quiz_users: QuizUser[];
        quiz_users_aggregate: { aggregate: { count: number } };
      }>({
        query: GET_FILTERED_QUIZ_USERS,
        variables: {
          where,
          offset,
          limit,
        },
        fetchPolicy: "no-cache",
        errorPolicy: "all",
      });

      if (!data?.quiz_users) {
        throw new Error("No quiz users returned from query");
      }

      return {
        quiz_users: data.quiz_users,
        total_count: data.quiz_users_aggregate.aggregate.count,
      };
    } catch (error) {
      console.error('Error fetching quiz users:', error);
      throw new ApolloError({
        errorMessage: "Failed to fetch quiz users",
        graphQLErrors: error instanceof ApolloError ? error.graphQLErrors : [],
        networkError: error instanceof ApolloError ? error.networkError : null,
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