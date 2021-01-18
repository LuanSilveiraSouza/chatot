import { Socket, io as socketio } from 'socket.io-client';
import { httpServer, port } from '../../../src/main/server';

describe('Server Tests', () => {
  let socket: Socket;
  let socketB: Socket;

  beforeEach((done) => {
    socket = socketio(`ws://localhost:${port}`, {
      path: '/socket.io',
    });

    socket.on('connect', () => {
      done();
    });
  });

  beforeEach((done) => {
    socketB = socketio(`ws://localhost:${port}`, {
      path: '/socket.io',
    });

    socketB.on('connect', () => {
      done();
    });
  });

  afterEach((done) => {
    if (socket.connected) {
      socket.disconnect();
    }

    done();
  });

  afterEach((done) => {
    if (socketB.connected) {
      socketB.disconnect();
    }

    done();
  });

  afterAll((done) => {
    httpServer.close();

    done();
  });

  test('It should emit a valid login action', (done) => {
    socket.emit('login', { id: '000', name: 'test_user' });

    socket.on('login', (data: any) => {
      try {
        expect(data).toEqual({ id: '000', name: 'test_user' });

        done();
      } catch (error) {
        done(error);
      }
    });
  });
  test('It should emit a valid offline action', (done) => {
    const expected = socket.id;

    socketB.on('offline', (data: any) => {
      try {
        expect(data).toBe(expected);

        done();
      } catch (error) {
        done(error);
      }
    });
    socket.disconnect();
  });
  test('It should emit a valid message action', (done) => {
    socket.emit('message', { content: 'Hello!' });

    socket.on('message', (data: any) => {
      try {
        expect(data).toEqual({ content: 'Hello!' });

        done();
      } catch (error) {
        done(error);
      }
    });
  });
  test('It should emit a valid login action and another socket receive it', (done) => {
    socket.emit('login', { id: '000', name: 'test_user' });

    socketB.on('login', (data: any) => {
      console.log(data);

      try {
        console.log(data);

        expect(data).toEqual({ id: '000', name: 'test_user' });

        done();
      } catch (error) {
        done(error);
      }
    });
  });
  test('It should emit a valid message action and another socket receive it', (done) => {
    socketB.emit('message', { content: 'Hello Buddy!' });

    socket.on('message', (data: any) => {
      console.log(data);

      try {
        console.log(data);

        expect(data).toEqual({ content: 'Hello Buddy!' });

        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
