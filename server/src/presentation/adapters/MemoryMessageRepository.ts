import { Message } from '../../domain/Message';
import { MessageRepository } from '@usecase/interfaces/MessageRepository';

export class MemoryMessageRepository implements MessageRepository {
  messages: Message[];

  constructor() {
    this.messages = [];
  }

  addMessage(message: Message): void {
    this.messages.push(message);
  }

  editMessage(id: string, content: string, date: Date): void {
    this.messages = this.messages.map((message) => {
      if (message.id === id) {
        return new Message(message.id, message.user, date, content);
      }
      return message;
    });
  }

  async getMessage(id: string): Promise<Message | null> {
    const requestedMessage = this.messages.find((message) => message.id === id);

    return await requestedMessage || null;
  }

  async getAllMessages(): Promise<Array<Message>> {
    return this.messages;
  }
}
