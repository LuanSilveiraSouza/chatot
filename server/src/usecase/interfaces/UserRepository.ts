import { User } from '@domain/User';

export interface UserRepository {
  users: User[];
  addUser(user: User): void;
  removeUser(id: string): User | null;
  getUser(id: string): User | null;
}