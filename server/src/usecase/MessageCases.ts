import { Message } from '@domain/Message';
import { MessageRepository } from './interfaces/MessageRepository';

export const createMessage = async (
  repository: MessageRepository,
  message: Message
): Promise<boolean> => {
  await repository.addMessage(message);
  return true;
};

export const editMessage = (
  repository: MessageRepository,
  id: string,
  content: string
): boolean => {
  repository.editMessage(id, content, new Date());
  return true;
};
