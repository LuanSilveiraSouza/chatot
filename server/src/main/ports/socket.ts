import { Socket, Server } from 'socket.io';

export interface SocketRoute {
    path: string;
    handler: (server: Server, socket: Socket, data: any) => void;
}