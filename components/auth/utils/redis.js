const { promisify } = require('util');

const client = require('../../../src/init-redis');

// Redis package doesnt support promises out the box
const getAsync = promisify(client.GET).bind(client);
const delAsync = promisify(client.DEL).bind(client);
const setAsync = promisify(client.SET).bind(client);

/**
  * @type function
  * @desc set a new key with value in DB
  * @param string key
  * @param string value
  * @return promise<>
  * @errors redis errors.
*/

const redisSet = async (key, value) => {
  const yearInSecond = 31535993;
  const expiration = 'EX';
  return setAsync(key, value, expiration, yearInSecond);
};

/**
  * @type function
  * @desc get a value by key
  * @param string key
  * @return promise<>
  * @errors redis errors.
*/

const redisGet = async (key) => getAsync(key);

/**
  * @type function
  * @desc delete a key
  * @param string key
  * @return promise<>
  * @errors redis errors.
*/

const redisDel = async (key) => delAsync(key);

module.exports = {
  redisGet, redisSet, redisDel,
};
