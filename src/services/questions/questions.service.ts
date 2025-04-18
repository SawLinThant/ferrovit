import { CreateQuestionInput, Question } from '@/entities/questions.entity';
import { QuestionRepository } from './questions.repository';

export class QuestionService {
    private repository: QuestionRepository;
  
    constructor(repository: QuestionRepository) {
      this.repository = repository;
    }
  
    async getAllQuestions(): Promise<Question[]> {
      const questions = await this.repository.fetchAllQuestions();
  
      return questions.map((question) => ({
        ...question,
        question_text: question.question_text.trim(),
        category: question.category?.trim() || null,
        question_no: question.question_no.trim(),
      }));
    }
  
    async getQuestionById(id: string): Promise<Question> {
      if (!id || typeof id !== 'string') {
        throw new Error('Invalid question ID');
      }
  
      const question = await this.repository.fetchQuestionById(id);
      if (!question) {
        throw new Error(`Question with ID ${id} not found`);
      }
  
      return question;
    }
  
    async getQuestionByQuestionNo(question_no: string): Promise<Question> {
      if (!question_no || typeof question_no !== 'string') {
        throw new Error('Invalid question number');
      }
  
      const question = await this.repository.fetchQuestionByQuestionNo(question_no);
      if (!question) {
        throw new Error(`Question with number ${question_no} not found`);
      }
  
      return {
        ...question,
        question_text: question.question_text.trim(),
        category: question.category?.trim() || null,
        question_no: question.question_no.trim(),
      };
    }
  
    async createQuestion(input: CreateQuestionInput): Promise<Question> {
      if (!input.question_text || !input.question_no) {
        throw new Error('Question text and question number are required');
      }
  
      const sanitizedInput: CreateQuestionInput = {
        question_text: input.question_text.trim(),
        category: input.category?.trim() || null,
        question_no: input.question_no.trim(),
      };
  
      return await this.repository.createQuestion(sanitizedInput);
    }
  }