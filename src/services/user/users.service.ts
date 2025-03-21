import { CreateUserInput, User } from '@/entities/users.entity';
import { UserRepository } from './users.repository';

export class UserService {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.repository.fetchAllUsers();

    return users.map((user) => ({
      ...user,
      name: user.name.trim(),
    }));
  }

  async getUserById(id: string): Promise<User> {
    if (!id || typeof id !== 'string') {
      throw new Error('Invalid user ID');
    }

    const user = await this.repository.fetchUserById(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    return user;
  }

  async createUser(input: CreateUserInput): Promise<User> {

    if (!input.email || !input.name) {
      throw new Error('Email and name are required');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
      throw new Error('Invalid email format');
    }
    if (input.phone && !/^\+?[1-9]\d{1,14}$/.test(input.phone)) {
      throw new Error('Invalid phone number format');
    }

    const sanitizedInput: CreateUserInput = {
      name: input.name.trim(),
      email: input.email.toLowerCase(),
      phone: input.phone || null,
    };

    return await this.repository.createUser(sanitizedInput);
  }
}