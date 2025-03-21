export interface Blog {
    id: string;
    title: string;
    subtitle: string | null;
    author: string;
    created_at: string; // ISO string from TIMESTAMP
    description: string;
    highlight_text: string | null;
  }
  
  export interface CreateBlogInput {
    title: string;
    subtitle?: string | null;
    author: string;
    description: string;
    highlight_text?: string | null;
  }