export interface User {
    id: string;
    name: string;
    phone: string | null; 
    email: string;
    gender: string; 
  }
  
  export interface CreateUserInput {
    name: string;
    phone?: string | null;
    email: string;
    gender?: string;
  }