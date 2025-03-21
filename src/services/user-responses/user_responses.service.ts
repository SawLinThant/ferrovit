import { CreateUserResponseInput, UserResponse } from '@/entities/user_responses.entity';
import { UserResponseRepository } from './user_responses.repository';

export class UserResponseService {
  private repository: UserResponseRepository;

  constructor(repository: UserResponseRepository) {
    this.repository = repository;
  }

  async getAllUserResponses(): Promise<UserResponse[]> {
    return await this.repository.fetchAllUserResponses();
  }

  async getUserResponseById(id: string): Promise<UserResponse> {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid user response ID');
    }

    const userResponse = await this.repository.fetchUserResponseById(id);
    if (!userResponse) {
      throw new Error(`User response with ID ${id} not found`);
    }

    return userResponse;
  }

  async createUserResponse(input: CreateUserResponseInput): Promise<UserResponse> {
    if (!input.quiz_user_id || !input.question_id || !input.choice_id) {
      throw new Error('Quiz user ID, question ID, and choice ID are required');
    }

    const sanitizedInput: CreateUserResponseInput = {
      quiz_user_id: input.quiz_user_id,
      question_id: input.question_id,
      choice_id: input.choice_id,
    };

    return await this.repository.createUserResponse(sanitizedInput);
  }

  async updateOrCreateUserResponse(
    quiz_user_id: string,
    question_id: string,
    choice_id: string
  ): Promise<UserResponse> {
    if (!quiz_user_id || !question_id || !choice_id) {
      throw new Error("Quiz user ID, question ID, and choice ID are required");
    }

    const existingResponse = await this.repository.fetchUserResponseByQuizUserAndQuestion(
      quiz_user_id,
      question_id
    );

    if (existingResponse) {
      await this.repository.deleteUserResponse(existingResponse.id);
    }

    return await this.repository.createUserResponse({
      quiz_user_id,
      question_id,
      choice_id,
    });
  }
}