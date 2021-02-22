import redis from 'redis';
import { promisify } from 'util';

const redisDb = redis.createClient({
  host: 'redis',
});

const getAsync = promisify(redisDb.get).bind(redisDb);
const setAsync = promisify(redisDb.set).bind(redisDb);
const getKeysAsync = promisify(redisDb.keys).bind(redisDb);

export { redisDb, getAsync, setAsync, getKeysAsync };
