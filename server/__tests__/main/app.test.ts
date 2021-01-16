import request from 'supertest';
import { app } from '../../src/main/app';

describe('App Tests', () => {
  test('It should request the / route with a successfull return', async () => {
    await request(app)
      .get('/')
      .expect(200)
      .expect((response) => {
        response.body = {
          msg: 'Hello World!',
        };
      });
  });
});
