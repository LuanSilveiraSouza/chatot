import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { SocketRoute } from '../ports/socket';
import { routes } from './routes';

const options = { cors: { origin: '*' } };

let io: Server;

const connect = (httpServer?: HttpServer) => {
  if (!io) {
    io = httpServer ? new Server(httpServer, options) : new Server(options);
  }
};

const getRoutes = () => {
  io.on('connection', (socket: Socket) => {
    routes.forEach((route: SocketRoute) =>
      socket.on(route.path, (data) => route.handler(io, socket, data))
    );
  });
};

export { io, connect, getRoutes };
