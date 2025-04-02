export interface UserResponse {
    id: string;
    quiz_user_id: string;
    question_id: string;
    choice_id: string;
    submitted_at: string; 
  }
  
  export interface CreateUserResponseInput {
    quiz_user_id: string;
    question_id: string;
    choice_id: string;
  }