import { User } from '@domain/User';
import { UserRepository } from './interfaces/UserRepository';

export const createUser = (repository: UserRepository, user: User): boolean => {
  const userExist = repository.getUser(user.id);

  if (!userExist) {
    repository.addUser(user);
    return true;
  }

  return false;
};

export const removeUser = (
  repository: UserRepository,
  id: string
): User | null => {
  return repository.removeUser(id);
};
