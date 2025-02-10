import { createClient } from "redis";
import { config } from "../lib/config";

const redis = createClient({
  socket: {
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
  },
});

redis.connect();

export { redis };
