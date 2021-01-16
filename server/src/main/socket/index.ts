import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { SocketRoute } from '../ports/socket';
import { routes } from './routes';

let io: Server;

const connect = (httpServer?: HttpServer) => {
	if (!io) {
		io = httpServer ? new Server(httpServer) : new Server();
	}
};

const getRoutes = () => {
	io.on('connection', (socket: Socket) => {
		console.log(socket.id);

		routes.map((route: SocketRoute) =>
			socket.on(route.path, (data) => route.handler(socket, data))
		);
	});
};

export { io, connect, getRoutes };
