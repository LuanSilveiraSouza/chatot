import { Socket, io as socketio } from 'socket.io-client';
import { userRepository } from '../../../src/main/config/userRepository';
import { User } from '../../../src/domain/User';
import { httpServer, port } from '../../../src/main/server';

describe('Server Tests', () => {
  let socket: Socket;
  let socketB: Socket;

  beforeEach((done) => {
    userRepository.users = [];

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
    httpServer.close(() => done());
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
  test('It should emit a valid login', (done) => {
    socket.emit('login', { name: 'test_user' });

    socket.on('login_success', (data: User) => {
      expect(data.name).toBe('test_user');
      expect(parseInt(data.id)).toBeLessThan(new Date().getTime());

      done();
    });
  });
  test('It should emit a invalid login', (done) => {
    socket.emit('login', { test: 'whatever' });

    socket.on('login_error', (data: any) => {
      expect(User.isUser(data)).toBeFalsy();
      expect(data).toEqual({ msg: 'User in wrong format' });

      done();
    });
  });
  test('It should emit a valid login action and another socket receive it', (done) => {
    socket.emit('login', { name: 'test_user' });

    socketB.on('user_list', (data: any) => {
      try {
        console.log(data);

        expect(data).toHaveLength(1);
        expect(User.isUser(data[0])).toBeTruthy();
        expect(data[0].name).toBe('test_user');

        done();
      } catch (error) {
        done(error);
      }
    });
  });
  test('It should emit a valid message action and another socket receive it', (done) => {
    socketB.emit('message', { content: 'Hello Buddy!' });

    socket.on('message', (data: any) => {
      try {
        expect(data).toEqual({ content: 'Hello Buddy!' });

        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
