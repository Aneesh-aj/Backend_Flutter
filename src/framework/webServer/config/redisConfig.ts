import {Redis} from "@upstash/redis"
export const redis = new Redis({
  url: process.env.redisURL || "",
  token: process.env.redisToken || "",
})

// await redis.set('foo', 'bar');
// const data = await redis.get('foo');