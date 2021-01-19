import { atom } from 'recoil';
import type { User } from 'src/types/User';

export const userState = atom<User>({
  key: 'userState',
  default: {},
});
