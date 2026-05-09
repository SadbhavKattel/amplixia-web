import { z } from "zod";

/**
 * Centralized environment validation.
 * Failing fast at startup is preferable to runtime surprises in serverless code paths.
 */
const schema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  DATABASE_URL: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  LEAD_NOTIFICATION_FROM: z.string().optional(),
  LEAD_NOTIFICATION_TO: z.string().email().optional(),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().optional(),
  TURNSTILE_SECRET_KEY: z.string().optional(),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  // Log a structured summary; do not throw in build environments where some envs are intentionally absent.
  console.warn("[env] Invalid environment variables:", parsed.error.flatten().fieldErrors);
}

export const env = (parsed.success ? parsed.data : schema.parse({})) as z.infer<typeof schema>;

export const isProd = process.env.NODE_ENV === "production";
