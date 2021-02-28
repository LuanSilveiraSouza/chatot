import { Message } from '../../domain/Message';
import { messageRepository } from '../config/messageRepository';
import { createMessage } from '../../usecase/MessageCases';
import { Socket, Server } from 'socket.io';
import { User } from '../../domain/User';
import { createUser, removeUser } from '../../usecase/UserCases';
import { userRepository } from '../config/userRepository';
import { SocketRoute } from '../ports/socket';

const routes: SocketRoute[] = [
  {
    path: 'login',
    handler: async (server: Server, socket: Socket, data: any) => {
      if ('name' in data) {
        const user = new User(socket.id, data.name);

        createUser(userRepository, user);

        socket.emit('login_success', user);
        server.emit('user_list', userRepository.users);
        server.emit('messages', await messageRepository.getAllMessages());
      } else {
        socket.emit('login_error', { msg: 'User in wrong format' });
      }
    },
  },
  {
    path: 'message',
    handler: async (server: Server, socket: Socket, data: any) => {
      if ('content' in data && 'user' in data) {
        const message = new Message(
          new Date().getTime().toString(),
          data.user,
          new Date(),
          data.content
        );

        await createMessage(messageRepository, message);
        server.emit('message', message);
      }
      socket.emit('message_error', { msg: 'Content or user not informed' });
    },
  },
  {
    path: 'disconnect',
    handler: (server: Server, socket: Socket, data: any) => {
      const user = removeUser(userRepository, socket.id);

      server.emit('offline', user);
      server.emit('user_list', userRepository.users);
    },
  },
];

export { routes };
