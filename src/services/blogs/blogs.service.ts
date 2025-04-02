import { CreateBlogInput, Blog } from '@/entities/blogs.entity';
import { BlogRepository } from './blogs.repository';

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
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid blog ID');
    }

    const blog = await this.repository.fetchBlogById(id);
    if (!blog) {
      throw new Error(`Blog with ID ${id} not found`);
    }

    return blog;
  }

  async createBlog(input: CreateBlogInput): Promise<Blog> {
    if (!input.title || !input.author || !input.description) {
      throw new Error('Title, author, and description are required');
    }

    const sanitizedInput: CreateBlogInput = {
      title: input.title.trim(),
      subtitle: input.subtitle?.trim() || null,
      author: input.author.trim(),
      description: input.description.trim(),
      highlight_text: input.highlight_text?.trim() || null,
    };

    return await this.repository.createBlog(sanitizedInput);
  }
}