import { MessageRepository } from '../../usecase/interfaces/MessageRepository';
import { MemoryMessageRepository } from '../../presentation/adapters/MemoryMessageRepository';
import { RedisMessageRepository } from '../../presentation/adapters/RedisMessageRepository';

let messageRepository: MessageRepository = process.env.NODE_ENV == 'test' ? new MemoryMessageRepository() : new RedisMessageRepository();

export { messageRepository };