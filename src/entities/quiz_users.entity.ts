export interface QuizUser {
    id: string;
    first_name?: string | null; 
    last_name?: string | null;  
    phone: string;
    address: string;
    created_at: string; 
  }
  
  export interface CreateQuizUserInput {
    first_name?: string | null; 
    last_name?: string | null;  
    phone: string;
    address: string;
  }