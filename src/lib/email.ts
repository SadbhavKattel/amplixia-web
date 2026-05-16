import { Resend } from "resend";
import { env } from "./env";

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

interface LeadEmailPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message: string;
  source: string;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function leadHtml(p: LeadEmailPayload) {
  const row = (k: string, v?: string) =>
    v
      ? `<tr><td style="padding:8px 12px;color:#64748b;font-size:13px;width:140px">${escapeHtml(k)}</td><td style="padding:8px 12px;color:#0f172a;font-size:14px">${escapeHtml(v)}</td></tr>`
      : "";

  return `<!doctype html>
<html><body style="font-family:ui-sans-serif,system-ui,sans-serif;background:#f8fafc;margin:0;padding:24px;color:#0f172a">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
    <div style="padding:20px 24px;border-bottom:1px solid #e2e8f0">
      <div style="font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#64748b">New ${escapeHtml(p.source)}</div>
      <div style="font-size:18px;font-weight:600;margin-top:4px">${escapeHtml(p.name)}${p.company ? ` · ${escapeHtml(p.company)}` : ""}</div>
    </div>
    <table style="width:100%;border-collapse:collapse">
      ${row("Email", p.email)}
      ${row("Phone", p.phone)}
      ${row("Project", p.projectType)}
      ${row("Budget", p.budget)}
      ${row("Timeline", p.timeline)}
    </table>
    <div style="padding:16px 24px;border-top:1px solid #e2e8f0">
      <div style="font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#64748b">Message</div>
      <div style="margin-top:6px;white-space:pre-wrap;font-size:14px;line-height:1.55">${escapeHtml(p.message)}</div>
    </div>
  </div>
</body></html>`;
}

export async function sendLeadNotification(payload: LeadEmailPayload) {
  if (!resend || !env.LEAD_NOTIFICATION_FROM || !env.LEAD_NOTIFICATION_TO) {
    return { delivered: false, reason: "email-not-configured" };
  }
  const { error } = await resend.emails.send({
    from: env.LEAD_NOTIFICATION_FROM,
    to: env.LEAD_NOTIFICATION_TO,
    replyTo: payload.email,
    subject: `[Amplixia] ${payload.source}: ${payload.name}${payload.company ? ` (${payload.company})` : ""}`,
    html: leadHtml(payload),
  });
  return { delivered: !error, reason: error?.message };
}
