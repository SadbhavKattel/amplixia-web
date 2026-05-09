import { createHash } from "node:crypto";

/**
 * Stable, salted SHA-256 of a string.
 * Used to record IP fingerprints for abuse triage without storing raw IPs.
 */
export function sha256(value: string, salt = "amplixia"): string {
  return createHash("sha256").update(`${salt}:${value}`).digest("hex");
}
