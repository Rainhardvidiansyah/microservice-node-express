const redis = require('redis');

const redisClient = new redis.createClient({
    host: 'localhost',
    port: 6379
});



redisClient.on('', () => {
    console.log("Connected to redis");
});

redisClient.on('error', (err) => {
    console.error(`Error connecting to Redis: ${err}`);
});



module.exports = redisClient;