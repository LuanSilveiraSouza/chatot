import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';

let io: Server;

const connect = (httpServer: HttpServer) => {
    if (!io) {
        io = new Server(httpServer);
    }
}

export { io, connect };
