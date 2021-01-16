import { Socket, io } from 'socket.io-client';
import { httpServer, port } from '../../../src/main/server';

describe('Server Tests', () => {
  let socket: Socket;

  beforeEach((done) => {
    socket = io(`ws://localhost:${port}`, {
      path: '/socket.io',
    });

    done();
  });

  afterAll(async (done) => {
    await httpServer.close();

    done();
  });

  test('It should emit a valid login action', async () => {
    socket.on('connect', () => {
      socket.emit('login', { id: '000', name: 'test_user' });

      socket.on('login', (data: any) => {
        expect(data).toBe({ id: '000', name: 'test_user' });
      });

      socket.disconnect();
    });
  });
});
