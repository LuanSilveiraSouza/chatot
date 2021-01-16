import { User } from '@domain/User';
import { UserRepository } from '@usecase/interfaces/UserRepository';

export class MemoryUserRepository implements UserRepository {
  users: User[];

  constructor() {
    this.users = [];
  }

  addUser(User: User): void {
    this.users.push(User);
  }

  removeUser(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  getUser(id: string): User | null {
    const requestedUser = this.users.find((user) => user.id === id);

    return requestedUser || null;
  }
}