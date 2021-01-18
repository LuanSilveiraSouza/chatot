import { Socket, Server } from 'socket.io';
import { SocketRoute } from '../ports/socket';

const routes: SocketRoute[] = [
  {
    path: 'login',
    handler: (server: Server, socket: Socket, data: any) => {
      server.emit('login', data);
    },
  },
  {
    path: 'message',
    handler: (server: Server, socket: Socket, data: any) => {
      server.emit('message', data);
    },
  },
  {
    path: 'disconnect',
    handler: (server: Server, socket: Socket, data: any) => {
      server.emit('offline', socket.id);
    },
  },
];

export { routes };
