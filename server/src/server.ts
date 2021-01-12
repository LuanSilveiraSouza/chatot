import http from 'http';
import { Socket } from 'socket.io';

import { app } from './app';
import { io, connect } from './socket';

const httpServer = http.createServer(app);

connect(httpServer);

io.on('connection', (socket: Socket) => {
	console.log(socket.id);

	io.on('disconnect', () => {
		console.log('Disconnected');
	});
});

httpServer.listen(3030, () => console.log('Server running at port 3030'));
