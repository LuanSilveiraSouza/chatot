import {
  redisDb,
  getAsync,
  setAsync,
  getKeysAsync,
  quitAsync,
} from '../../src/infra/redisDb';

describe('Server Tests', () => {
  afterAll(async (done) => {
    await quitAsync();
    done();
  });

  test('It should set and get a key in a asyncronous way', async () => {
    const message = { id: '000', content: 'This is a test' };

    await setAsync(message.id, JSON.stringify(message));

    expect(JSON.parse((await getAsync('000')) || '')).toEqual({
      id: '000',
      content: 'This is a test',
    });
  });
});
