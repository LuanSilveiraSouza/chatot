import { Message } from '../../domain/Message';
import { MessageRepository } from '@usecase/interfaces/MessageRepository';
import { getAsync, setAsync, getKeysAsync } from '../../infra/redisDb';

export class RedisMessageRepository implements MessageRepository {
  async addMessage(message: Message): Promise<void> {
    await setAsync(message.id, JSON.stringify(message));
  }

  editMessage(id: string, content: string, date: Date): void {}

  async getMessage(id: string): Promise<Message | null> {
    const result = await getAsync(id);

    const requestedMessage = result ? JSON.parse(result) : null;

    return requestedMessage
      ? new Message(
          requestedMessage.id,
          requestedMessage.user,
          requestedMessage.date,
          requestedMessage.content
        )
      : null;
  }

  async getAllMessages(): Promise<Array<Message>> {
    const keys = await getKeysAsync('*');

    const messages: Message[] = [];

    for (const key of keys.reverse()) {
      const message = await this.getMessage(key);

      if (message) messages.push(message);
    }

    return messages;
  }
}
