import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "./env";

/**
 * Lead form rate limiter.
 *
 * In production we use Upstash sliding-window. If credentials are absent (local dev,
 * preview without secrets) we fall back to a permissive in-memory limiter so the
 * surface keeps working without short-circuiting to "denied".
 */

let limiter: { limit: (id: string) => Promise<{ success: boolean; remaining: number }> };

if (env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
  });

  const upstash = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "10 m"),
    analytics: true,
    prefix: "amplixia:lead",
  });

  limiter = {
    async limit(id) {
      const r = await upstash.limit(id);
      return { success: r.success, remaining: r.remaining };
    },
  };
} else {
  const memory = new Map<string, { count: number; resetAt: number }>();
  const WINDOW_MS = 10 * 60 * 1000;
  const MAX = 5;

  limiter = {
    async limit(id) {
      const now = Date.now();
      const record = memory.get(id);
      if (!record || record.resetAt < now) {
        memory.set(id, { count: 1, resetAt: now + WINDOW_MS });
        return { success: true, remaining: MAX - 1 };
      }
      record.count += 1;
      const success = record.count <= MAX;
      return { success, remaining: Math.max(0, MAX - record.count) };
    },
  };
}

export const leadRateLimiter = limiter;
