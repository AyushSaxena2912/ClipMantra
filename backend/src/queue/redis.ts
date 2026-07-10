import Redis from "ioredis";

const redisOptions = {
  maxRetriesPerRequest: null,
  retryStrategy(times: number) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  reconnectOnError(err: Error) {
    const targetError = "READONLY";
    if (err.message.includes(targetError)) {
      return true;
    }
    return false;
  },
  tls: {
    rejectUnauthorized: false,
  },
};

// Main Redis client
export const redis = new Redis(process.env.REDIS_URL!, redisOptions);

// Separate Redis client for Pub/Sub
export const redisSubscriber = new Redis(process.env.REDIS_URL!, redisOptions);

// CONNECTION LOGGING
redis.on("connect", () => {
  console.log("Redis connected (main client)");
});

redisSubscriber.on("connect", () => {
  console.log("Redis connected (subscriber client)");
});

redis.on("error", (err) => {
  console.error("Redis error (main):", err);
});

redisSubscriber.on("error", (err) => {
  console.error("Redis error (subscriber):", err);
});