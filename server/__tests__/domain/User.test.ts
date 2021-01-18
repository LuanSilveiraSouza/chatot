import { User } from '../../src/domain/User';

describe('User Tests', () => {
  test('It should create a User', () => {
    const user = new User('111', 'John');

    expect(user.id).toBe('111');
    expect(user.name).toBe('John');
  });
  test('It should validate if a object is a User', () => {
    const user1 = { };
    const user2 = { id: '123' };
    const user3 = { id: '987', name: 'TestUser3' };
    const user4 = new User('159', 'TestUser4');

    expect(User.isUser(user1)).toBeFalsy();
    expect(User.isUser(user2)).toBeFalsy();
    expect(User.isUser(user3)).toBeTruthy();
    expect(User.isUser(user4)).toBeTruthy();
  });
});
