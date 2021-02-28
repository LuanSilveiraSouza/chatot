import { User } from '../../../src/domain/User';
import { Message } from '../../../src/domain/Message';
import { quitAsync, clearAsync } from '../../../src/infra/redisDb';
import { RedisMessageRepository } from '../../../src/presentation/adapters/RedisMessageRepository';

const user = new User('111', 'John');

describe('MemoryMessageRepository Tests', () => {
  beforeEach(async (done) => {
    await clearAsync();
    done();
  });

  afterAll(async (done) => {
    await quitAsync();
    done();
  });

  test('It should add and retrieve a message', async () => {
    const repository = new RedisMessageRepository();

    const message = new Message('000', user, new Date(), 'Testing!');

    repository.addMessage(message);

    expect(await repository.getMessage('000')).toBeInstanceOf(Message);
  });
  test('It should try to retrieve a message that dont exists', async () => {
    const repository = new RedisMessageRepository();

    expect(await repository.getMessage('test')).toBeNull();
  });
  test('It should retrieve all messages', async () => {
    const repository = new RedisMessageRepository();

    const msg = new Message(
      '000',
      user,
      new Date('2021-01-01T09:00:00'),
      'Testing!'
    );
    const msg2 = new Message(
      '001',
      user,
      new Date('2021-01-01T10:00:00'),
      'OhMyGosh'
    );
    const msg3 = new Message(
      '002',
      user,
      new Date('2021-01-01T08:00:00'),
      'Redis is cool'
    );

    await repository.addMessage(msg);
    await repository.addMessage(msg2);
    await repository.addMessage(msg3);

    const messages = await repository.getAllMessages();

    expect(messages).toHaveLength(3);
    expect(messages[1].content).toBe('Testing!');
  });
});
