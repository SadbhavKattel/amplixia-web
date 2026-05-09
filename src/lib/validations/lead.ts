import { z } from "zod";

export const LEAD_SOURCES = [
  "CONTACT_FORM",
  "CONSULTATION_BOOKING",
  "NEWSLETTER",
  "REFERRAL",
  "OTHER",
] as const;
export type LeadSource = (typeof LEAD_SOURCES)[number];

export const PROJECT_TYPES = [
  "AI_AUTOMATION",
  "AI_AGENTS",
  "SAAS_DEVELOPMENT",
  "WEB_DEVELOPMENT",
  "CONSULTING",
  "DATA_ANALYTICS",
  "INTEGRATIONS",
  "OTHER",
] as const;

export const BUDGET_BANDS = [
  "UNDER_10K",
  "TEN_TO_25K",
  "TWENTY_FIVE_TO_50K",
  "FIFTY_TO_100K",
  "HUNDRED_PLUS",
  "UNDISCLOSED",
] as const;

export const TIMELINES = [
  "ASAP",
  "ONE_TO_THREE_MONTHS",
  "THREE_TO_SIX_MONTHS",
  "SIX_PLUS_MONTHS",
  "EXPLORING",
] as const;

export const PROJECT_TYPE_LABELS: Record<(typeof PROJECT_TYPES)[number], string> = {
  AI_AUTOMATION: "AI Automation",
  AI_AGENTS: "AI Agents",
  SAAS_DEVELOPMENT: "SaaS Development",
  WEB_DEVELOPMENT: "Web Development",
  CONSULTING: "AI Consulting",
  DATA_ANALYTICS: "Data & Analytics",
  INTEGRATIONS: "API / System Integrations",
  OTHER: "Something else",
};

export const BUDGET_LABELS: Record<(typeof BUDGET_BANDS)[number], string> = {
  UNDER_10K: "Under $10k",
  TEN_TO_25K: "$10k to $25k",
  TWENTY_FIVE_TO_50K: "$25k to $50k",
  FIFTY_TO_100K: "$50k to $100k",
  HUNDRED_PLUS: "$100k+",
  UNDISCLOSED: "Prefer not to say",
};

export const TIMELINE_LABELS: Record<(typeof TIMELINES)[number], string> = {
  ASAP: "ASAP",
  ONE_TO_THREE_MONTHS: "1 to 3 months",
  THREE_TO_SIX_MONTHS: "3 to 6 months",
  SIX_PLUS_MONTHS: "6+ months",
  EXPLORING: "Just exploring",
};

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .max(40)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v === "" ? undefined : v)),
  company: z
    .string()
    .trim()
    .max(160)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v === "" ? undefined : v)),
  projectType: z.enum(PROJECT_TYPES).optional(),
  budget: z.enum(BUDGET_BANDS).optional(),
  timeline: z.enum(TIMELINES).optional(),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a bit more (at least 20 characters)")
    .max(4000, "Please keep this under 4000 characters"),
  // Honeypot — must remain empty.
  website: z
    .string()
    .max(0, "spam")
    .optional()
    .or(z.literal("")),
  turnstileToken: z.string().optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept to proceed" }) }),
});

export type LeadInput = z.infer<typeof leadSchema>;
