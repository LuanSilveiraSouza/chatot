import { User } from '../../src/domain/User';
import { createUser } from '../../src/usecase/UserCases';
import { MemoryUserRepository } from '../../src/presentation/adapters/MemoryUserRepository';

describe('UserCases Tests', () => {
  test('It should create a user and try do create again', () => {
    const repository = new MemoryUserRepository();

    const user = new User('111', 'John');

    expect(createUser(repository, user)).toBeTruthy();
    expect(createUser(repository, user)).toBeFalsy();
  });
});
