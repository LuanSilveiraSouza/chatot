import { MessageRepository } from '../../usecase/interfaces/MessageRepository';
import { MemoryMessageRepository } from '../../presentation/adapters/MemoryMessageRepository';

let messageRepository: MessageRepository = new MemoryMessageRepository();

export { messageRepository };