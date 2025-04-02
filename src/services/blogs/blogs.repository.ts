import { CreateBlogInput, Blog } from "@/entities/blogs.entity";
import { CREATE_BLOG } from "@/graphql/mutation/blogs.mutation";
import { GET_ALL_BLOGS, GET_BLOG_BY_ID } from "@/graphql/query/blogs.query";
import {
  ApolloClient,
  ApolloError,
  ServerError,
  ServerParseError,
} from "@apollo/client";

export class BlogRepository {
  private client: ApolloClient<any>;

  constructor(client: ApolloClient<any>) {
    this.client = client;
  }

  async fetchAllBlogs(): Promise<Blog[]> {
    try {
      const { data } = await this.client.query<{ blogs: Blog[] }>({
        query: GET_ALL_BLOGS,
        fetchPolicy: "network-only",
      });
      return data.blogs;
    } catch (error) {
      throw new ApolloError({
        errorMessage: "Failed to fetch all blogs",
        graphQLErrors: error instanceof ApolloError ? error.graphQLErrors : [],
        networkError: this.getNetworkError(error),
      });
    }
  }

  async fetchBlogById(id: string): Promise<Blog | null> {
    try {
      const { data } = await this.client.query<{ blogs_by_pk: Blog | null }>({
        query: GET_BLOG_BY_ID,
        variables: { id },
        fetchPolicy: "network-only",
      });
      return data.blogs_by_pk;
    } catch (error) {
      throw new ApolloError({
        errorMessage: `Failed to fetch blog with ID: ${id}`,
        graphQLErrors: error instanceof ApolloError ? error.graphQLErrors : [],
        networkError: this.getNetworkError(error),
      });
    }
  }

  async createBlog(input: CreateBlogInput): Promise<Blog> {
    try {
      const { data } = await this.client.mutate<{
        insert_blogs_one: Blog;
      }>({
        mutation: CREATE_BLOG,
        variables: { input },
      });

      if (!data?.insert_blogs_one) {
        throw new Error("Blog creation returned no data");
      }

      return data.insert_blogs_one;
    } catch (error) {
      throw new ApolloError({
        errorMessage: "Failed to create blog",
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