// const redis = require('redis');

// const redisClient = redis.createClient({
//     url: process.env.REDIS_HOST,
//     socket: {
//         tls: true,
//         rejectUnauthorized: false
//     }
// });

// redisClient.on('error', (err) => console.log('Redis Client Error', err));
// redisClient.on('connect', () => console.log('Redis Client Connected'));

// (async () => {
//     try {
//         await redisClient.connect();
//     } catch (err) {
//         console.error('Failed to connect to Redis:', err);
//     }
// })();

// module.exports = redisClient;

