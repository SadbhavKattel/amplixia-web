import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { env } from '@/lib/env';

export async function POST(req: Request) {
  try {
    const apiKey = env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const { name, email, business, details, budget } = await req.json();

    const cleanEmail = typeof email === 'string' ? email.trim() : '';

    if (!name || !cleanEmail || !business || !details || !budget) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json({ error: "Invalid email address format. Please enter a valid email (e.g. you@example.com)." }, { status: 400 });
    }

    const fromEmail = env.LEAD_NOTIFICATION_FROM || 'Contact Form <services@amplixia.com>';
    const toEmail = env.LEAD_NOTIFICATION_TO || 'services@amplixia.com';

    console.log(`[contact-api] Attempting to send email. From: ${fromEmail}, To: ${toEmail}, ReplyTo: ${cleanEmail}`);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: cleanEmail,
      subject: `${business} - ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${cleanEmail}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <br/>
        <h3>Project Details:</h3>
        <p>${details.replace(/\n/g, '<br/>')}</p>
      `
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("[contact-api] Email sent successfully:", data);
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    console.error("Error sending email:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
