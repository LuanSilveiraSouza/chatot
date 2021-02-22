import { Message } from '@domain/Message';

export interface MessageRepository {
  addMessage(message: Message): void;
  editMessage(id: string, content: string, date: Date): void;
  getMessage(id: string): Promise<Message | null>;
}