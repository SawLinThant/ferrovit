export interface Question {
    id: string;
    question_text: string;
    category: string | null;
    question_no: string;
    choices: Choice[];
  }
  
  export interface CreateQuestionInput {
    question_text: string;
    category?: string | null;
    question_no: string;
  }

  export interface Choice {
    id: string;
    choice_text: string;
    question_id: string;
    points: number;
  }
  
  
