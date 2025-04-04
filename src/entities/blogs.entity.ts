export interface Blog {
  id: string;
  title: string;
  subtitle: string | null;
  author: string;
  created_at: string; 
  description: string;
  highlight_text: string | null;
  image: string | null;
}

export interface CreateBlogInput {
  title: string;
  subtitle?: string | null;
  author: string;
  description: string;
  highlight_text?: string | null;
  image?: string | null;
}

export interface BlogResponse {
  blogs: Blog[];
  total_count: number;
}

export interface UpdateBlogInput {
  title?: string;
  subtitle?: string | null;
  author?: string; 
  description?: string;
  highlight_text?: string | null;
  image?: string | null;
}
