import Redis from 'ioredis';
import { captureException } from './monitoring/sentry';

const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  retryStrategy: (times: number) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  maxRetriesPerRequest: 3,
};

class RedisClient {
  private static instance: Redis;
  private static isConnected: boolean = false;

  static getInstance(): Redis {
    if (!RedisClient.instance) {
      RedisClient.instance = new Redis(redisConfig);
      
      RedisClient.instance.on('connect', () => {
        console.log('Redis connected');
        RedisClient.isConnected = true;
      });

      RedisClient.instance.on('error', (error) => {
        console.error('Redis error:', error);
        captureException(error);
        RedisClient.isConnected = false;
      });

      RedisClient.instance.on('close', () => {
        console.log('Redis connection closed');
        RedisClient.isConnected = false;
      });
    }

    return RedisClient.instance;
  }

  static async set(key: string, value: string, expireSeconds?: number): Promise<void> {
    try {
      const redis = RedisClient.getInstance();
      if (expireSeconds) {
        await redis.setex(key, expireSeconds, value);
      } else {
        await redis.set(key, value);
      }
    } catch (error) {
      captureException(error as Error);
      throw error;
    }
  }

  static async get(key: string): Promise<string | null> {
    try {
      const redis = RedisClient.getInstance();
      return await redis.get(key);
    } catch (error) {
      captureException(error as Error);
      throw error;
    }
  }

  static async del(key: string): Promise<void> {
    try {
      const redis = RedisClient.getInstance();
      await redis.del(key);
    } catch (error) {
      captureException(error as Error);
      throw error;
    }
  }

  static async increment(key: string): Promise<number> {
    try {
      const redis = RedisClient.getInstance();
      return await redis.incr(key);
    } catch (error) {
      captureException(error as Error);
      throw error;
    }
  }

  static async isConnected(): Promise<boolean> {
    return RedisClient.isConnected;
  }

  static async close(): Promise<void> {
    if (RedisClient.instance) {
      await RedisClient.instance.quit();
      RedisClient.isConnected = false;
    }
  }
}
