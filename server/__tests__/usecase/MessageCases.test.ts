import { User } from '../../src/domain/User';
import { Message } from '../../src/domain/Message';
import { createMessage, editMessage } from '../../src/usecase/MessageCases';
import { MemoryMessageRepository } from '../../src/presentation/adapters/MemoryMessageRepository';

const user = new User('111', 'John');

describe('MessageCases Tests', () => {
  test('It should add a message', () => {
    const repository = new MemoryMessageRepository();

    const message = new Message('000', user.id, new Date(), 'Testing!');

    expect(createMessage(repository, message)).toBeTruthy();
  });
  test('It should add a message and edit it after the addition', () => {
    const repository = new MemoryMessageRepository();

    const message = new Message('000', user.id, new Date(), 'Testing!');

    expect(createMessage(repository, message)).toBeTruthy();

    expect(editMessage(repository, '000', 'Whops')).toBeTruthy();
  });
});
