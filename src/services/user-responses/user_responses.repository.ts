import { CreateUserResponseInput, UserResponse } from "@/entities/user_responses.entity";
import { CREATE_USER_RESPONSE, DELETE_USER_RESPONSE } from "@/graphql/mutation/user_responses.mutation";
import { GET_ALL_USER_RESPONSES, GET_USER_RESPONSE_BY_ID, GET_USER_RESPONSE_BY_QUIZ_USER_ID_AND_QUESTION_ID } from "@/graphql/query/user_responses.query";
import {
  ApolloClient,
  ApolloError,
  ServerError,
  ServerParseError,
} from "@apollo/client";

export class UserResponseRepository {
  private client: ApolloClient<any>;

  constructor(client: ApolloClient<any>) {
    this.client = client;
  }

  async fetchAllUserResponses(): Promise<UserResponse[]> {
    try {
      const { data } = await this.client.query<{ user_responses: UserResponse[] }>({
        query: GET_ALL_USER_RESPONSES,
        fetchPolicy: "network-only",
      });
      return data.user_responses;
    } catch (error) {
      throw new ApolloError({
        errorMessage: "Failed to fetch all user responses",
        graphQLErrors: error instanceof ApolloError ? error.graphQLErrors : [],
        networkError: this.getNetworkError(error),
      });
    }
  }

  async fetchUserResponseById(id: string): Promise<UserResponse | null> {
    try {
      const { data } = await this.client.query<{ user_responses_by_pk: UserResponse | null }>({
        query: GET_USER_RESPONSE_BY_ID,
        variables: { id },
        fetchPolicy: "network-only",
      });
      return data.user_responses_by_pk;
    } catch (error) {
      throw new ApolloError({
        errorMessage: `Failed to fetch user response with ID: ${id}`,
        graphQLErrors: error instanceof ApolloError ? error.graphQLErrors : [],
        networkError: this.getNetworkError(error),
      });
    }
  }

  async createUserResponse(input: CreateUserResponseInput): Promise<UserResponse> {
    try {
      console.log("input",input);
      const { data } = await this.client.mutate<{
        insert_user_responses_one: UserResponse;
      }>({
        mutation: CREATE_USER_RESPONSE,
        variables: { input },
      });

      if (!data?.insert_user_responses_one) {
        throw new Error("User response creation returned no data");
      }

      return data.insert_user_responses_one;
    } catch (error) {
      throw new ApolloError({
        errorMessage: "Failed to create user response",
        graphQLErrors: error instanceof ApolloError ? error.graphQLErrors : [],
        networkError: this.getNetworkError(error),
      });
    }
  }

  async fetchUserResponseByQuizUserAndQuestion(
    quiz_user_id: string,
    question_id: string
  ): Promise<UserResponse | null> {
    try {
      const { data } = await this.client.query<{
        user_responses: UserResponse[];
      }>({
        query: GET_USER_RESPONSE_BY_QUIZ_USER_ID_AND_QUESTION_ID,
        variables: { quiz_user_id, question_id },
        fetchPolicy: "network-only",
      });
      console.log("data",data);

      return data.user_responses.length > 0 ? data.user_responses[0] : null;
    } catch (error) {
      throw new ApolloError({
        errorMessage: `Failed to fetch user response for quiz_user_id: ${quiz_user_id}, question_id: ${question_id}`,
        graphQLErrors: error instanceof ApolloError ? error.graphQLErrors : [],
        networkError: this.getNetworkError(error),
      });
    }
  }

  async deleteUserResponse(id: string): Promise<{ id: string }> {
    try {
      const { data } = await this.client.mutate<{
        delete_user_responses_by_pk: { id: string };
      }>({
        mutation: DELETE_USER_RESPONSE,
        variables: { id },
      });

      if (!data?.delete_user_responses_by_pk) {
        throw new Error("User response deletion returned no data");
      }

      return data.delete_user_responses_by_pk;
    } catch (error) {
      throw new ApolloError({
        errorMessage: `Failed to delete user response with id: ${id}`,
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