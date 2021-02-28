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

  removeUser(id: string): User | null {
    let requestedUser = null;

    this.users = this.users.filter((user: User) => {
      if (user.id === id) {
        requestedUser = user;
      } else {
        return user;
      }
    });

    return requestedUser;
  }

  getUser(id: string): User | null {
    const requestedUser = this.users.find((user) => user.id === id);

    return requestedUser || null;
  }
}
