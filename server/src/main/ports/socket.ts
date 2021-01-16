import { Socket } from 'socket.io';

export interface SocketRoute {
    path: string;
    handler: (socket: Socket, data: any) => void;
}