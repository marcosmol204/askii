const redis = require('redis');

const client = redis.createClient({
  port: 14710,
  host: 'redis-14710.c241.us-east-1-4.ec2.cloud.redislabs.com',
  password: process.env.REDIS_PASSWORD,
});

client.on('connect', () => {
  console.log('Redis is connected');
});

client.on('ready', () => {
  console.log('Redis is ready');
});

client.on('end', () => {
  console.log('Redis is disconnected');
});

process.on('SIGINT', () => {
  client.quit();
  process.exit(0);
});

module.exports = client;
