import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { SocketRoute } from '../@types/socket';
import { routes } from './routes';

let io: Server;

const connect = (httpServer: HttpServer) => {
	if (!io) {
		io = new Server(httpServer);
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
