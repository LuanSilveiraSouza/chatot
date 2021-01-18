import { Message } from '../../src/domain/Message';
import { User } from '../../src/domain/User';

const user = new User('111', 'John');
const date = new Date();

describe('Message Tests', () => {
  test('It should create a Message with all parameters', () => {
    const message = new Message('123', user, date, 'Hello Buddies!');

    expect(message.id).toBe('123');
    expect(message.user).toBeInstanceOf(User);
    expect(message.user.name).toBe('John');
    expect(message.date).toBe(date);
    expect(message.content).toBe('Hello Buddies!');
  });
  test('It should update the Message content and its date', () => {
    const message = new Message('123', user, date, 'Hello Buddies!');

    expect(message.date).toBe(date);
    expect(message.content).toBe('Hello Buddies!');

    message.setContent('Changing...');
    message.setDate(new Date());

    expect(message.date.getTime()).toBeGreaterThan(date.getTime());
    expect(message.content).not.toBe('Hello Buddies!');
  });
  test('It should validate if a object is a User', () => {
    const message1 = {};
    const message2 = { id: '123' };
    const message3 = { id: '987', content: 'TestMessage3' };
    const message4 = { id: '987', user, content: 'TestMessage3', date };
    const message5 = new Message('159', user, date, 'TestMessage4');

    expect(Message.isMessage(message1)).toBeFalsy();
    expect(Message.isMessage(message2)).toBeFalsy();
    expect(Message.isMessage(message3)).toBeFalsy();
    expect(Message.isMessage(message4)).toBeTruthy();
    expect(Message.isMessage(message5)).toBeTruthy();
  });
});
