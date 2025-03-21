import { CreateQuestionInput, Question } from "@/entities/questions.entity";
import { CREATE_QUESTION } from "@/graphql/mutation/questions.mutation";
import { GET_ALL_QUESTIONS, GET_QUESTION_BY_ID, GET_QUESTION_BY_QUESTION_NO } from "@/graphql/query/questions.query";
import {
  ApolloClient,
  ApolloError,
  ServerError,
  ServerParseError,
} from "@apollo/client";

export class QuestionRepository {
  private client: ApolloClient<any>;

  constructor(client: ApolloClient<any>) {
    this.client = client;
  }

  async fetchAllQuestions(): Promise<Question[]> {
    try {
      const { data } = await this.client.query<{ questions: Question[] }>({
        query: GET_ALL_QUESTIONS,
        fetchPolicy: "network-only",
      });
      return data.questions;
    } catch (error) {
      throw new ApolloError({
        errorMessage: "Failed to fetch all questions",
        graphQLErrors: error instanceof ApolloError ? error.graphQLErrors : [],
        networkError: this.getNetworkError(error),
      });
    }
  }

  async fetchQuestionById(id: string): Promise<Question | null> {
    try {
      const { data } = await this.client.query<{ questions_by_pk: Question | null }>({
        query: GET_QUESTION_BY_ID,
        variables: { id },
        fetchPolicy: "network-only",
      });
      return data.questions_by_pk;
    } catch (error) {
      throw new ApolloError({
        errorMessage: `Failed to fetch question with ID: ${id}`,
        graphQLErrors: error instanceof ApolloError ? error.graphQLErrors : [],
        networkError: this.getNetworkError(error),
      });
    }
  }

  async fetchQuestionByQuestionNo(question_no: string): Promise<Question | null> {
    try {
      const { data } = await this.client.query<{ questions: Question[] }>({
        query: GET_QUESTION_BY_QUESTION_NO,
        variables: { question_no },
        fetchPolicy: "network-only",
      });

      if (!data.questions || data.questions.length === 0) {
        return null;
      }

      return data.questions[0];
    } catch (error) {
      throw new ApolloError({
        errorMessage: `Failed to fetch question with question number: ${question_no}`,
        graphQLErrors: error instanceof ApolloError ? error.graphQLErrors : [],
        networkError: this.getNetworkError(error),
      });
    }
  }

  async createQuestion(input: CreateQuestionInput): Promise<Question> {
    try {
      const { data } = await this.client.mutate<{
        insert_questions_one: Question;
      }>({
        mutation: CREATE_QUESTION,
        variables: { input },
      });

      if (!data?.insert_questions_one) {
        throw new Error("Question creation returned no data");
      }

      return data.insert_questions_one;
    } catch (error) {
      throw new ApolloError({
        errorMessage: "Failed to create question",
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