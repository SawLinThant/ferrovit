import {
  CreateBlogInput,
  Blog,
  BlogResponse,
  UpdateBlogInput,
} from "@/entities/blogs.entity";
import { BlogRepository } from "./blogs.repository";

interface FetchBlogsParams {
  title?: string;
  created_at?: string;
  page?: number;
  pageSize?: number;
}

export class BlogService {
  private repository: BlogRepository;

  constructor(repository: BlogRepository) {
    this.repository = repository;
  }

  async getAllBlogs(): Promise<Blog[]> {
    const blogs = await this.repository.fetchAllBlogs();

    return blogs.map((blog) => ({
      ...blog,
      title: blog.title.trim(),
      subtitle: blog.subtitle?.trim() || null,
      author: blog.author.trim(),
      highlight_text: blog.highlight_text?.trim() || null,
    }));
  }

  async getBlogById(id: string): Promise<Blog> {
    if (!id || typeof id !== "string") {
      throw new Error("Invalid blog ID");
    }

    const blog = await this.repository.fetchBlogById(id);
    if (!blog) {
      throw new Error(`Blog with ID ${id} not found`);
    }

    return blog;
  }

  async createBlog(input: CreateBlogInput): Promise<Blog> {
    if (!input.title || !input.author || !input.description) {
      throw new Error("Title, author, and description are required");
    }

    const sanitizedInput: CreateBlogInput = {
      title: input.title,
      subtitle: input.subtitle || null,
      author: input.author,
      description: input.description,
      highlight_text: input.highlight_text || null,
      image: input.image,
    };

    return await this.repository.createBlog(sanitizedInput);
  }

  async getFilteredQuizUserse({
    title,
    created_at,
    page = 1,
    pageSize = 10,
  }: FetchBlogsParams): Promise<BlogResponse> {
    const offset = (page - 1) * pageSize;

    return await this.repository.fetchBlogs({
      title,
      created_at,
      offset,
      limit: pageSize,
    });
  }

  async updateBlog(id: string, input: UpdateBlogInput): Promise<Blog> {
    if (!id) {
      throw new Error("Blog ID is required");
    }
    
    try {
      const sanitizedInput = {
        ...(input.title !== undefined && { title: input.title.trim() }),
        ...(input.subtitle !== undefined && { 
          subtitle: input.subtitle ? input.subtitle.trim() : null 
        }),
        ...(input.author !== undefined && { author: input.author.trim() }),
        ...(input.description !== undefined && { description: input.description.trim() }),
        ...(input.highlight_text !== undefined && { 
          highlight_text: input.highlight_text ? input.highlight_text.trim() : null 
        }),
        ...(input.image !== undefined && { image: input.image }),
      };
      
      return await this.repository.updateBlog(id, sanitizedInput);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Unknown error updating blog");
    }
  }
}
