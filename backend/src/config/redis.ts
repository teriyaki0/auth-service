import Redis from "ioredis";
import { config } from "../lib/config";

const redis = new Redis({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
});

export { redis };
