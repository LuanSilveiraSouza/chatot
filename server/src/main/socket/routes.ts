import { Socket } from 'socket.io';
import { SocketRoute } from '../ports/socket';

const routes: SocketRoute[] = [
	{
		path: 'login',
		handler: (socket: Socket, data: any) => {
      socket.emit('login', data);
		},
	},
	{
		path: 'disconnect',
		handler: (socket: Socket, data) => {
			socket.emit('offline', data);
		},
	},
];

export { routes };
