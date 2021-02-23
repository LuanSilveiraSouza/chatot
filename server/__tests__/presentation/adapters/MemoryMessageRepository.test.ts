import { User } from '../../../src/domain/User';
import { Message } from '../../../src/domain/Message';
import { MemoryMessageRepository } from '../../../src/presentation/adapters/MemoryMessageRepository';

const user = new User('111', 'John');

describe('MemoryMessageRepository Tests', () => {
  test('It should add a message', () => {
    const repository = new MemoryMessageRepository();

    const message = new Message('000', user, new Date(), 'Testing!');

    expect(repository.messages).toHaveLength(0);

    repository.addMessage(message);

    expect(repository.messages).toHaveLength(1);
    expect(repository.messages[0]).toBeInstanceOf(Message);
    expect(repository.messages[0].id).toBe(message.id);
  });
  test('It should retrieve a message that dont exists', async () => {
    const repository = new MemoryMessageRepository();

    expect(await repository.getMessage('test')).toBeNull();
  });
});
