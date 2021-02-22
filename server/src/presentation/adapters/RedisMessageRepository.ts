import { Message } from '../../domain/Message';
import { MessageRepository } from '@usecase/interfaces/MessageRepository';
import { getAsync, setAsync, getKeysAsync } from '../../infra/redisDb';

export class RedisMessageRepository implements MessageRepository {
  async addMessage(message: Message): Promise<void> {
    await setAsync(message.id, JSON.stringify(message));
  }

  editMessage(id: string, content: string, date: Date): void {}

  async getMessage(id: string): Promise<Message | null> {
    let requestedMessage = null;

    requestedMessage = JSON.parse((await getAsync(id)) || '');

    return (
      new Message(
        requestedMessage.id,
        requestedMessage.user,
        requestedMessage.date,
        requestedMessage.content
      ) || null
    );
  }
}
