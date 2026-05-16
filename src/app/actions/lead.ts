"use server";

import { headers } from "next/headers";
import { leadSchema, type LeadSource } from "@/lib/validations/lead";
import { leadRateLimiter } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import { sendLeadNotification } from "@/lib/email";
import { sha256 } from "@/lib/hash";
import {
  PROJECT_TYPE_LABELS,
  BUDGET_LABELS,
  TIMELINE_LABELS,
} from "@/lib/validations/lead";

export type LeadActionState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string; fieldErrors?: Record<string, string[]> };

const RAW_OK_FALLBACK = (msg: string): LeadActionState => ({
  status: "success",
  message: msg,
});

function getClientIp(h: Headers): string {
  const xff = h.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return h.get("x-real-ip") ?? "unknown";
}

interface SubmitArgs {
  source: LeadSource;
  data: Record<string, FormDataEntryValue | undefined>;
}

/**
 * Submit a lead. Hardened with: Zod validation, honeypot, Turnstile, sliding-window rate limit,
 * IP hashing for triage, optional Resend notification, and an optional Prisma write when DATABASE_URL is set.
 */
export async function submitLead({
  source,
  data,
}: SubmitArgs): Promise<LeadActionState> {
  const h = await headers();
  const ip = getClientIp(h);
  const userAgent = h.get("user-agent") ?? undefined;
  const referrer = h.get("referer") ?? undefined;

  const rate = await leadRateLimiter.limit(ip);
  if (!rate.success) {
    return {
      status: "error",
      message: "Too many submissions from this address. Try again in a few minutes.",
    };
  }

  const parsed = leadSchema.safeParse({
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company,
    projectType: data.projectType || undefined,
    budget: data.budget || undefined,
    timeline: data.timeline || undefined,
    message: data.message,
    website: data.website,
    turnstileToken: data.turnstileToken,
    consent: data.consent === "on" || data.consent === "true",
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const input = parsed.data;

  // Honeypot. We respond like success to keep bots from probing.
  if (input.website) return RAW_OK_FALLBACK("Thanks, we'll be in touch.");

  const turnstile = await verifyTurnstile(input.turnstileToken, ip);
  if (!turnstile.success) {
    return {
      status: "error",
      message:
        "We couldn't verify that you're not a bot. Refresh and try again, or email services@amplixia.com.",
    };
  }

  // Persist if a DB is configured. Failure to persist must not block the lead.
  let persisted = false;
  if (process.env.DATABASE_URL) {
    try {
      const { prisma } = await import("@/lib/prisma");
      await prisma.lead.create({
        data: {
          source,
          name: input.name,
          email: input.email,
          phone: input.phone,
          company: input.company,
          projectType: input.projectType,
          budget: input.budget,
          timeline: input.timeline,
          message: input.message,
          ipHash: sha256(ip),
          userAgent,
          referrer,
        },
      });
      persisted = true;
    } catch (e) {
      console.error("[lead] persist failed", e);
    }
  }

  // Email notification. Best-effort; we don't fail the user if email is misconfigured.
  try {
    await sendLeadNotification({
      name: input.name,
      email: input.email,
      phone: input.phone,
      company: input.company,
      projectType: input.projectType
        ? PROJECT_TYPE_LABELS[input.projectType]
        : undefined,
      budget: input.budget ? BUDGET_LABELS[input.budget] : undefined,
      timeline: input.timeline ? TIMELINE_LABELS[input.timeline] : undefined,
      message: input.message,
      source: source.replace("_", " ").toLowerCase(),
    });
  } catch (e) {
    console.error("[lead] email failed", e);
  }

  if (!persisted && !process.env.RESEND_API_KEY) {
    // Dev fallback so you can verify the form without infra wired up.
    console.info("[lead] received (no infra configured):", {
      source,
      ...input,
      turnstileToken: undefined,
    });
  }

  return {
    status: "success",
    message:
      "We got your message and will get back to you within one business day.",
  };
}
