import request from 'supertest';
import { httpServer } from '../../src/main/server';

describe('Server Tests', () => {
  afterAll((done) => {
    httpServer.close(() => done());
  });

  test('It should verify if server process is running', async () => {
    await request(httpServer)
      .get('/')
      .expect(200)
      .expect((response) => {
        response.body = {
          msg: 'Hello World!',
        };
      });
  });
});
