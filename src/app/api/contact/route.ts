import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const { name, email, business, details, budget } = await req.json();

    if (!name || !email || !business || !details || !budget) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: ['services@amplixia.com'],
      replyTo: email,
      subject: `${business} - ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Email:</strong> ${email}</p>
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

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    console.error("Error sending email:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
