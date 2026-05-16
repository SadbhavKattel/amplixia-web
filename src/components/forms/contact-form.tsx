"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea, FieldError, FieldHint } from "@/components/ui/input";
import { Turnstile } from "./turnstile";
import { submitLead, type LeadActionState } from "@/app/actions/lead";
import {
  BUDGET_BANDS,
  BUDGET_LABELS,
  PROJECT_TYPES,
  PROJECT_TYPE_LABELS,
  TIMELINES,
  TIMELINE_LABELS,
  type LeadSource,
} from "@/lib/validations/lead";

interface FormFields {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: (typeof PROJECT_TYPES)[number] | "";
  budget?: (typeof BUDGET_BANDS)[number] | "";
  timeline?: (typeof TIMELINES)[number] | "";
  message: string;
  website?: string;
  consent: boolean;
}

export function ContactForm({
  source = "CONTACT_FORM",
}: {
  source?: LeadSource;
}) {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      projectType: "",
      budget: "",
      timeline: "",
      message: "",
      website: "",
      consent: false,
    },
  });

  const [token, setToken] = React.useState<string>("");
  const [state, setState] = React.useState<LeadActionState>({ status: "idle" });

  const onSubmit = handleSubmit(async (values) => {
    setState({ status: "idle" });
    const data: Record<string, string> = {
      name: values.name,
      email: values.email,
      phone: values.phone ?? "",
      company: values.company ?? "",
      projectType: values.projectType ?? "",
      budget: values.budget ?? "",
      timeline: values.timeline ?? "",
      message: values.message,
      website: values.website ?? "",
      consent: values.consent ? "on" : "",
      turnstileToken: token,
    };

    const result = await submitLead({ source, data });
    setState(result);

    if (result.status === "error" && result.fieldErrors) {
      for (const [field, messages] of Object.entries(result.fieldErrors)) {
        if (messages?.[0]) {
          setError(field as keyof FormFields, { type: "server", message: messages[0] });
        }
      }
    }

    if (result.status === "success") {
      reset();
      setToken("");
    }
  });

  if (state.status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-success/30 bg-success/5 p-8"
      >
        <div className="font-mono text-xs uppercase tracking-[0.16em] text-success">
          Got it
        </div>
        <h2 className="mt-3 text-display-md font-semibold">Thanks for reaching out.</h2>
        <p className="mt-3 max-w-prose text-fg-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" required>
            Full name
          </Label>
          <Input
            id="name"
            autoComplete="name"
            invalid={!!errors.name}
            {...register("name", { required: "Please enter your name", maxLength: 120 })}
          />
          <FieldError message={errors.name?.message} />
        </div>
        <div>
          <Label htmlFor="email" required>
            Work email
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            invalid={!!errors.email}
            {...register("email", { required: "Enter a valid email" })}
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="company">Company</Label>
          <Input id="company" autoComplete="organization" {...register("company")} />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" autoComplete="tel" {...register("phone")} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <Label htmlFor="projectType">Project type</Label>
          <Select id="projectType" {...register("projectType")}>
            <option value="">Select…</option>
            {PROJECT_TYPES.map((p) => (
              <option key={p} value={p}>
                {PROJECT_TYPE_LABELS[p]}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="budget">Budget</Label>
          <Select id="budget" {...register("budget")}>
            <option value="">Select…</option>
            {BUDGET_BANDS.map((b) => (
              <option key={b} value={b}>
                {BUDGET_LABELS[b]}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="timeline">Timeline</Label>
          <Select id="timeline" {...register("timeline")}>
            <option value="">Select…</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t}>
                {TIMELINE_LABELS[t]}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="message" required>
          What are you trying to do?
        </Label>
        <Textarea
          id="message"
          placeholder="What you want to build, what success looks like, anything we should know. The more specific, the better we can reply."
          invalid={!!errors.message}
          {...register("message", {
            required: "Please tell us a bit about the project",
            minLength: { value: 20, message: "At least 20 characters" },
            maxLength: { value: 4000, message: "Please keep this under 4000 characters" },
          })}
        />
        <FieldError message={errors.message?.message} />
        <FieldHint>Need an NDA before you share details? Just ask.</FieldHint>
      </div>

      {/* Honeypot. Hidden from users and assistive tech. */}
      <div aria-hidden className="hidden" tabIndex={-1}>
        <label>
          Website
          <input type="text" autoComplete="off" tabIndex={-1} {...register("website")} />
        </label>
      </div>

      <div className="flex items-start gap-3">
        <input
          id="consent"
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-border accent-fg"
          {...register("consent", { required: "Please accept to proceed" })}
        />
        <label htmlFor="consent" className="text-sm text-fg-muted">
          OK to contact me about this. We won't share your info with anyone.
        </label>
      </div>
      <FieldError message={errors.consent?.message} />

      {turnstileSiteKey && <Turnstile siteKey={turnstileSiteKey} onToken={setToken} />}

      {state.status === "error" && (
        <div
          role="alert"
          className="rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger"
        >
          {state.message}
        </div>
      )}

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" disabled={isSubmitting} size="lg">
          {isSubmitting ? "Sending…" : "Send brief"}
        </Button>
        <p className="text-xs text-fg-subtle">
          Or email{" "}
          <a className="underline hover:text-fg" href="mailto:services@amplixia.com">
            services@amplixia.com
          </a>
        </p>
      </div>
    </form>
  );
}
