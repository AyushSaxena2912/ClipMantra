import Redis from "ioredis";

/*
  Main Redis client
*/
export const redis = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
});

/*
  Separate Redis client for Pub/Sub
*/
export const redisSubscriber = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
});

/* ----------------------------- */
/* CONNECTION LOGGING            */
/* ----------------------------- */

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