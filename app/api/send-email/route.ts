import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const { to, subject, body } = await request.json();

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email sending is not configured. Please add RESEND_API_KEY to environment variables.' },
        { status: 503 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: [to],
      subject: subject,
      html: body.replace(/\n/g, '<br>'),
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
