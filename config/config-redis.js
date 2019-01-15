const redis = require("redis");
const bluebird = require("bluebird");
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let cache;

if (process.env.NODE_ENV === "production") {
    cache = redis.createClient(process.env.REDIS_URL);
} else {
    cache = redis.createClient();
}

cache.on("connect", function () {
    console.log("REDIS: Connected");
});

module.exports = cache;