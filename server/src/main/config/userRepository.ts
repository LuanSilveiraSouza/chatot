import { UserRepository } from '../../usecase/interfaces/UserRepository';
import { MemoryUserRepository } from '../../presentation/adapters/MemoryUserRepository';

let userRepository: UserRepository = new MemoryUserRepository();

export { userRepository };