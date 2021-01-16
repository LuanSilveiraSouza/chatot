import { io, Socket } from 'socket.io-client';

let socket: Socket;

const connectSocket = () => {
  if (!socket) {
    socket = io('http://localhost:3001', {
      path: '/socket.io',
    });
  }
};

export { socket, connectSocket };
