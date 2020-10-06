import { Request, Response, NextFunction } from "express";
import redis from 'redis';
import { RateLimiterRedis, RateLimiterMemory } from 'rate-limiter-flexible';
import AppError from "@shared/errors/AppError";

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 60, // 5 requests
  duration: 60, // per 1 second by IP
  inmemoryBlockOnConsumed: 150,
  inmemoryBlockDuration: 60,
  insuranceLimiter: new RateLimiterMemory({
    points: 60,
    duration: 60,
  }),
});

export default async function rateLimiter(request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    await limiter.consume(request.ip);

    return next();
  } catch (error) {
    throw new AppError('Too many requests', 429);
  }
}
