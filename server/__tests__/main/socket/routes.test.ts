import { Socket, io as socketio } from 'socket.io-client';
import { userRepository } from '../../../src/main/config/userRepository';
import { User } from '../../../src/domain/User';
import { httpServer, port } from '../../../src/main/server';
import { Message } from '../../../src/domain/Message';

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
  test('It should emit a valid login and another socket receive it', (done) => {
    socket.emit('login', { name: 'test_user' });

    socketB.on('user_list', (data: any) => {
      try {
        expect(data).toHaveLength(1);
        expect(User.isUser(data[0])).toBeTruthy();
        expect(data[0].name).toBe('test_user');

        done();
      } catch (error) {
        done(error);
      }
    });
  });
  test('It should emit a valid message and another socket receive it', (done) => {
    expect.assertions(2);

    socket.emit('login', { name: 'test_user' });

    socket.on('login_success', (data: User) => {
      socket.emit('message', { user: data, content: 'Hello Buddy!' });
    });

    socket.on('message', (data: any) => {
      try {
        expect(Message.isMessage(data)).toBeTruthy();
        expect(data.content).toBe('Hello Buddy!');

        done();
      } catch (error) {
        done(error);
      }
    });
  });
  test('It should emit a invalid message', (done) => {
    expect.assertions(2);

    socket.emit('login', { name: 'test_user' });

    socket.on('login_success', (data: User) => {
      socket.emit('message', { user: data });
    });

    socket.on('message_error', (data: any) => {
      try {
        expect(Message.isMessage(data)).toBeFalsy();
        expect(data).toEqual({ msg: 'Content or user not informed' });

        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
