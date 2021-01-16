import { Message } from '@domain/Message';

export interface MessageRepository {
  messages: Message[];
  addMessage(message: Message): void;
  editMessage(id: string, content: string, date: Date): void;
  getMessage(id: string): Message | null;
}