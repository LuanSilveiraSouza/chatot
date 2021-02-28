import redis from 'redis';
import { promisify } from 'util';

const redisDb = redis.createClient({
  host: 'redis',
  db: process.env.REDIS_DATABASE,
});

const getAsync = promisify(redisDb.get).bind(redisDb);
const setAsync = promisify(redisDb.set).bind(redisDb);
const getKeysAsync = promisify(redisDb.keys).bind(redisDb);
const quitAsync = promisify(redisDb.quit).bind(redisDb);
const clearAsync = promisify(redisDb.flushdb).bind(redisDb);

export { redisDb, getAsync, setAsync, getKeysAsync, quitAsync, clearAsync };
