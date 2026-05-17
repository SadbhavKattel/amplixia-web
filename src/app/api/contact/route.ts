import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, business, details, budget } = await req.json();

    if (!name || !email || !business || !details || !budget) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Default resend domain allows sending from onboarding@resend.dev to the registered account email
    const data = await resend.emails.send({
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

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
