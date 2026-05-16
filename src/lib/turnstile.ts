import { env } from "./env";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

interface VerifyResult {
  success: boolean;
  errorCodes?: string[];
}

/**
 * Verify a Cloudflare Turnstile token server-side.
 * Returns success=true automatically when secret is unset (local dev convenience).
 */
export async function verifyTurnstile(token: string | undefined, ip?: string): Promise<VerifyResult> {
  if (!env.TURNSTILE_SECRET_KEY) return { success: true };
  if (!token) return { success: false, errorCodes: ["missing-token"] };

  const body = new URLSearchParams();
  body.append("secret", env.TURNSTILE_SECRET_KEY);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      body,
      cache: "no-store",
    });
    const json = (await res.json()) as { success: boolean; "error-codes"?: string[] };
    return { success: json.success, errorCodes: json["error-codes"] };
  } catch {
    return { success: false, errorCodes: ["network-error"] };
  }
}
