// // const { promisify } = require('util');
// // const client = require('../../utils/connections/init-redis');

// // Redis package doesnt support promises out the box
// const asyncGET = promisify(client.GET).bind(client);
// const asyncDEL = promisify(client.DEL).bind(client);
// const asyncSET = promisify(client.SET).bind(client);
// const asyncSADD = promisify(client.SADD).bind(client);
// const asyncSMEMBERS = promisify(client.SMEMBERS).bind(client);
// const asyncSCARD = promisify(client.SCARD).bind(client);
// const asyncSREM = promisify(client.SREM).bind(client);
// const asyncINCR = promisify(client.INCR).bind(client);
// const asyncEXPIRE = promisify(client.EXPIRE).bind(client);
// const asyncSISMEMBER = promisify(client.SISMEMBER).bind(client);
// const asyncTTL = promisify(client.TTL).bind(client);

// // const asyncMULTI = promisify(client.MULTI).bind(client);
// // const asyncEXEC = promisify(client.MUL).bind(client);
// /**
//   * @type function
//   * @desc set a new key with value in redis
//   * @param string key
//   * @param string value
//   * @param o
//   * @return promise<>
//   * @errors redis errors.
// */

// const redisSET = async (key, value) => asyncSET(key, value, 'NX');

// /**
//   * @type function
//   * @desc set a new key with value in redis
//   * @param string key
//   * @param string value
//   * @param string expiration time in seconds
//   * @param o
//   * @return promise<>
//   * @errors redis errors.
// */

// const redisSETWithEX = async (key, value, exp) => asyncSET(key, value, 'EX', exp, 'NX');

// /**
//   * @type function
//   * @desc get a value by key
//   * @param string key
//   * @return promise<>
//   * @errors redis errors.
// */

// const redisGET = async (key) => asyncGET(key);

// /**
//   * @type function
//   * @desc delete a key
//   * @param string key
//   * @return promise<>
//   * @errors redis errors.
// */

// const redisDEL = async (key) => asyncDEL(key);

// /**
//   * @type function
//   * @desc add a value to a set
//   * @param string key
//   * @param string value
//   * @return promise<>
//   * @errors redis errors.
// */

// const redisSADD = async (key, member) => asyncSADD(key, member);

// const redisSCARD = async (key) => asyncSCARD(key);

// const redisSMEMBERS = async (key) => asyncSMEMBERS(key);

// const redisSREM = async (key, value) => asyncSREM(key, value);

// const redisINCR = async (key) => asyncINCR(key);

// const redisEXPIRE = async (key, exp) => asyncEXPIRE(key, exp);

// const redisSISMEMBER = async (setKey, memberKey) => asyncSISMEMBER(setKey, memberKey);

// const redisTTL = async (key) => asyncTTL(key);
// module.exports = {
//   redisGET,
//   redisSET,
//   redisDEL,
//   redisSADD,
//   redisSCARD,
//   redisSMEMBERS,
//   redisSREM,
//   redisSETWithEX,
//   redisINCR,
//   redisEXPIRE,
//   redisSISMEMBER,
//   redisTTL,
// };
