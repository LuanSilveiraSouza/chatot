import { Message } from '../../src/domain/Message';
import { User } from '../../src/domain/User';

const user = new User('111', 'John');
const date = new Date();

describe('Message Tests', () => {
  test('It should create a Message with all parameters', () => {
    const message = new Message('123', user.id, date, 'Hello Buddies!');

    expect(message.id).toBe('123');
    expect(message.userId).toBe('111');
    expect(message.date).toBe(date);
    expect(message.content).toBe('Hello Buddies!');
  });
  test('It should update the Message content and its date', () => {
    const message = new Message('123', user.id, date, 'Hello Buddies!');

    expect(message.date).toBe(date);
    expect(message.content).toBe('Hello Buddies!');

    message.setContent('Changing...');
    message.setDate(new Date());

    expect(message.date.getTime()).toBeGreaterThan(date.getTime());
    expect(message.content).not.toBe('Hello Buddies!');
  });
});
