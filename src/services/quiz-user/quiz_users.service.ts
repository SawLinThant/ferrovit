import { CreateQuizUserInput, QuizUser, QuizUsersResponse } from '@/entities/quiz_users.entity';
import { QuizUserRepository } from './quiz_users.repository';

interface FetchQuizUsersParams {
  phone?: string;
  created_at?: string; 
  page?: number;
  pageSize?: number;
}

export class QuizUserService {
  private repository: QuizUserRepository;

  constructor(repository: QuizUserRepository) {
    this.repository = repository;
  }

  async getAllQuizUsers(): Promise<QuizUser[]> {
    const quizUsers = await this.repository.fetchAllQuizUsers();

    return quizUsers.map((user) => ({
      ...user,
      first_name: user.first_name?.trim() || null,
      last_name: user.last_name?.trim() || null,
    }));
  }

  async getQuizUserById(id: string): Promise<QuizUser> {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid quiz user ID');
    }

    const quizUser = await this.repository.fetchQuizUserById(id);
    if (!quizUser) {
      throw new Error(`Quiz user with ID ${id} not found`);
    }

    return quizUser;
  }

  async createQuizUser(input: CreateQuizUserInput): Promise<QuizUser> {
    if (!input.phone) {
      throw new Error('Phone is required');
    }
    if (!input.address) {
      throw new Error('Address is required');
    }

    const sanitizedInput: CreateQuizUserInput = {
      first_name: input.first_name?.trim() || null,
      last_name: input.last_name?.trim() || null,
      phone: input.phone,
      address: input.address.trim(),
    };

    return await this.repository.createQuizUser(sanitizedInput);
  }

  async getFilteredQuizUserse({
    phone,
    created_at,
    page = 1,
    pageSize = 10,
  }: FetchQuizUsersParams): Promise<QuizUsersResponse> {
    if (!phone && !created_at) {
      throw new Error("At least one filter (phone or date) is required");
    }

    const offset = (page - 1) * pageSize;

    return await this.repository.fetchQuizUsers({
      phone,
      created_at,
      offset,
      limit: pageSize,
    });
  }
}