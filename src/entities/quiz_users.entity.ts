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

  export interface QuizUsersResponse {
    quiz_users: QuizUser[];
    total_count: number; 
  }