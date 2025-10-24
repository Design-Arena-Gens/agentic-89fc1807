import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(request: NextRequest) {
  try {
    const { recipient, purpose, yourName, yourCompany } = await request.json();

    const prompt = `You are an expert at writing compelling cold emails. Generate a professional, personalized, and attractive cold email with the following details:

Sender: ${yourName} from ${yourCompany}
Recipient: ${recipient.name}, ${recipient.role} at ${recipient.company}
Email: ${recipient.email}
Purpose: ${purpose}

Create an email that:
1. Has a compelling subject line that will get opened
2. Starts with a personalized greeting
3. Quickly establishes relevance and value
4. Is concise and easy to read (3-4 short paragraphs max)
5. Has a clear call to action
6. Sounds natural and human, not overly salesy
7. Shows you've done research about their company/role

Return the response in the following JSON format:
{
  "subject": "The email subject line",
  "body": "The complete email body"
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert cold email writer. Always respond with valid JSON containing "subject" and "body" fields.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error generating email:', error);
    return NextResponse.json(
      { error: 'Failed to generate email' },
      { status: 500 }
    );
  }
}
