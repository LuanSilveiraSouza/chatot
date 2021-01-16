import { User } from '@domain/User';

export interface UserRepository {
  users: User[];
  addUser(user: User): void;
  removeUser(id: string): void;
  getUser(id: string): User | null;
}