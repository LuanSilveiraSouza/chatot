import { User } from '../../src/domain/User';

describe('User Tests', () => {
  test('It should create a User', () => {
    const user = new User('111', 'John');

    expect(user.id).toBe('111');
    expect(user.name).toBe('John');
  });
});
