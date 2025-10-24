# AI Cold Email Generator

An intelligent cold email generation tool powered by OpenAI's GPT-4 that creates personalized, attractive emails to help you reach out to prospects effectively.

## Features

- **AI-Powered Email Generation**: Uses GPT-4o-mini to create compelling, personalized cold emails
- **Recipient Management**: Add multiple recipients with their details (name, email, company, role)
- **Customizable Purpose**: Define your outreach goal to tailor the email content
- **Email Preview & Editing**: Review and edit generated emails before sending
- **Batch Generation**: Generate emails for all recipients at once
- **Email Sending**: Send emails directly through the Resend API
- **Modern UI**: Clean, responsive interface built with Next.js and Tailwind CSS

## Live Demo

Visit the deployed application: [https://agentic-89fc1807.vercel.app](https://agentic-89fc1807.vercel.app)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key (for email generation)
- Resend API key (for email sending)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Design-Arena-Gens/agentic-89fc1807.git
cd agentic-89fc1807
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
OPENAI_API_KEY=your_openai_api_key_here
RESEND_API_KEY=your_resend_api_key_here
FROM_EMAIL=your_verified_email@yourdomain.com
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key for generating emails
- `RESEND_API_KEY`: Your Resend API key for sending emails
- `FROM_EMAIL`: The verified email address to send from (must be verified in Resend)

## Usage

1. **Enter Your Information**:
   - Fill in your name
   - Enter your company name
   - Describe the purpose of your outreach

2. **Add Recipients**:
   - Enter recipient details (name, email, company, role)
   - Click "Add Recipient" to add them to the list
   - Add as many recipients as needed

3. **Generate Emails**:
   - Click "Generate All Emails" to create personalized emails for all recipients
   - Or generate emails individually by clicking "Generate" for each recipient

4. **Review & Edit**:
   - Review the generated subject lines and email bodies
   - Edit any content as needed

5. **Send Emails**:
   - Click "Send Email" to send the email to the recipient
   - Note: Email sending requires valid API keys configured

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-4o-mini
- **Email Service**: Resend
- **Deployment**: Vercel

## API Routes

### POST /api/generate-email

Generates a personalized cold email using AI.

**Request Body**:
```json
{
  "recipient": {
    "name": "Jane Smith",
    "email": "jane@company.com",
    "company": "Tech Corp",
    "role": "CEO"
  },
  "purpose": "Introduce our product",
  "yourName": "John Doe",
  "yourCompany": "Acme Inc."
}
```

**Response**:
```json
{
  "subject": "Email subject line",
  "body": "Email body content"
}
```

### POST /api/send-email

Sends an email using the Resend API.

**Request Body**:
```json
{
  "to": "recipient@example.com",
  "subject": "Email subject",
  "body": "Email body"
}
```

## Development

### Build for Production

```bash
npm run build
```

### Run Production Build

```bash
npm start
```

## Deployment

This project is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel and add the required environment variables in the Vercel dashboard.

## Notes

- The application requires valid API keys to function properly
- Email sending requires a verified sender email in Resend
- Generated emails are personalized based on recipient information and your specified purpose
- All emails can be edited before sending

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
