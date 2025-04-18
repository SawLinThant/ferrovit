export interface SignInInput {
    email: string;
    password: string;
  }
  
  export interface SignInResponse {
    token: string;
    message: string;
  }