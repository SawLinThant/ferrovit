import {
  CreateBlogInput,
  Blog,
  BlogResponse,
  UpdateBlogInput,
} from "@/entities/blogs.entity";
import { CREATE_BLOG, UPDATE_BLOG } from "@/graphql/mutation/blogs.mutation";
import {
  GET_ALL_BLOGS,
  GET_BLOG_BY_ID,
  GET_FILTERED_BLOGS,
} from "@/graphql/query/blogs.query";
import {
  ApolloClient,
  ApolloError,
  ServerError,
  ServerParseError,
} from "@apollo/client";

interface FetchBlogsParams {
  title?: string;
  created_at?: string;
  offset?: number;
  limit?: number;
}

export class BlogRepository {
  private client: ApolloClient<any>;

  constructor(client: ApolloClient<any>) {
    this.client = client;
  }

  async fetchAllBlogs(): Promise<Blog[]> {
    try {
      const { data } = await this.client.query<{ blogs: Blog[] }>({
        query: GET_ALL_BLOGS,
        fetchPolicy: "no-cache",
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
        fetchPolicy: "no-cache",
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

  async fetchBlogs({
    title,
    created_at,
    offset = 0,
    limit = 10,
  }: FetchBlogsParams): Promise<BlogResponse> {
    try {
      const where: any = {};
      if (title) {
        where.title = { _ilike: `%${title}%` };
      }
      if (created_at) {
        const startOfDay = `${created_at}T00:00:00Z`;
        const endOfDay = `${created_at}T23:59:59Z`;
        where.created_at = { _gte: startOfDay, _lte: endOfDay };
      }

      console.log("Fetching blogs with params:", {
        where,
        offset,
        limit,
      });

      const { data } = await this.client.query<{
        blogs: Blog[];
        blogs_aggregate: { aggregate: { count: number } };
      }>({
        query: GET_FILTERED_BLOGS,
        variables: {
          where,
          offset,
          limit,
        },
        fetchPolicy: "no-cache",
        errorPolicy: "all",
      });

      if (!data?.blogs) {
        throw new Error("No blogs returned from query");
      }

      return {
        blogs: data.blogs,
        total_count: data.blogs_aggregate.aggregate.count,
      };
    } catch (error) {
      console.error("Error fetching blogs:", error);
      throw new ApolloError({
        errorMessage: "Failed to fetch blogs",
        graphQLErrors: error instanceof ApolloError ? error.graphQLErrors : [],
        networkError: error instanceof ApolloError ? error.networkError : null,
      });
    }
  }

  async createBlog(input: CreateBlogInput): Promise<Blog> {
    try {
      console.log("Creating blog with input:", input);
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

  async updateBlog(id: string, input: UpdateBlogInput): Promise<Blog> {
    try {
      console.log(`Repository updateBlog called with ID: ${id}`);

      const cleanInput = {
        ...(input.title !== undefined && { title: input.title }),
        ...(input.subtitle !== undefined && { subtitle: input.subtitle }),
        ...(input.author !== undefined && { author: input.author }),
        ...(input.description !== undefined && {
          description: input.description,
        }),
        ...(input.highlight_text !== undefined && {
          highlight_text: input.highlight_text,
        }),
        ...(input.image !== undefined && { image: input.image }),
      };

      console.log(`Clean input: ${JSON.stringify(cleanInput)}`);

      const result = await this.client.mutate({
        mutation: UPDATE_BLOG,
        variables: {
          id,
          input: cleanInput,
        },
      });

      if (!result.data?.update_blogs_by_pk) {
        throw new Error(`Failed to update blog with ID: ${id}`);
      }

      return result.data.update_blogs_by_pk;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error(`Error updating blog: ${errorMessage}`);
      throw new Error(`Failed to update blog: ${errorMessage}`);
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
