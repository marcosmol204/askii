// const redis = require('redis');

// const client = redis.createClient({
//   port: process.env.REDIS_PORT,
//   host: process.env.REDIS_HOST,
//   password: process.env.REDIS_PASSWORD,
// });

// client.on('connect', () => {
//   console.log('Redis is connected');
// });

// client.on('ready', () => {
//   console.log('Redis is ready');
// });

// client.on('end', () => {
//   console.log('Redis is disconnected');
// });

// process.on('SIGINT', () => {
//   client.quit();
//   // eslint-disable-next-line no-process-exit
//   process.exit(0);
// });

// module.exports = client;
