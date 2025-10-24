'use client';

import { useState } from 'react';

interface Recipient {
  name: string;
  email: string;
  company: string;
  role: string;
}

interface GeneratedEmail {
  subject: string;
  body: string;
}

export default function Home() {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [currentRecipient, setCurrentRecipient] = useState<Recipient>({
    name: '',
    email: '',
    company: '',
    role: ''
  });
  const [generatedEmails, setGeneratedEmails] = useState<{ [key: string]: GeneratedEmail }>({});
  const [loading, setLoading] = useState<string | null>(null);
  const [purpose, setPurpose] = useState('');
  const [yourName, setYourName] = useState('');
  const [yourCompany, setYourCompany] = useState('');

  const addRecipient = () => {
    if (currentRecipient.name && currentRecipient.email) {
      setRecipients([...recipients, currentRecipient]);
      setCurrentRecipient({ name: '', email: '', company: '', role: '' });
    }
  };

  const removeRecipient = (index: number) => {
    setRecipients(recipients.filter((_, i) => i !== index));
  };

  const generateEmail = async (recipient: Recipient, index: number) => {
    setLoading(recipient.email);
    try {
      const response = await fetch('/api/generate-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient,
          purpose,
          yourName,
          yourCompany
        }),
      });

      const data = await response.json();
      setGeneratedEmails({
        ...generatedEmails,
        [recipient.email]: data
      });
    } catch (error) {
      console.error('Error generating email:', error);
      alert('Failed to generate email. Please try again.');
    } finally {
      setLoading(null);
    }
  };

  const generateAllEmails = async () => {
    for (let i = 0; i < recipients.length; i++) {
      await generateEmail(recipients[i], i);
    }
  };

  const sendEmail = async (recipient: Recipient) => {
    const email = generatedEmails[recipient.email];
    if (!email) return;

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: recipient.email,
          subject: email.subject,
          body: email.body,
        }),
      });

      if (response.ok) {
        alert(`Email sent to ${recipient.name}!`);
      } else {
        alert('Failed to send email. Please check your API keys.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Cold Email Generator
          </h1>
          <p className="text-lg text-gray-600">
            Generate personalized, attractive cold emails with AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Information</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Company
                </label>
                <input
                  type="text"
                  value={yourCompany}
                  onChange={(e) => setYourCompany(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Acme Inc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Purpose
                </label>
                <textarea
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Describe what you want to achieve with this email..."
                  rows={3}
                />
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Recipients</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={currentRecipient.name}
                  onChange={(e) => setCurrentRecipient({ ...currentRecipient, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Jane Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={currentRecipient.email}
                  onChange={(e) => setCurrentRecipient({ ...currentRecipient, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="jane@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  value={currentRecipient.company}
                  onChange={(e) => setCurrentRecipient({ ...currentRecipient, company: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Tech Corp"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <input
                  type="text"
                  value={currentRecipient.role}
                  onChange={(e) => setCurrentRecipient({ ...currentRecipient, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="CEO"
                />
              </div>

              <button
                onClick={addRecipient}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Add Recipient
              </button>
            </div>

            {recipients.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Recipients ({recipients.length})
                </h3>
                <div className="space-y-2">
                  {recipients.map((recipient, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{recipient.name}</p>
                        <p className="text-sm text-gray-600">{recipient.email}</p>
                        <p className="text-sm text-gray-500">
                          {recipient.role} at {recipient.company}
                        </p>
                      </div>
                      <button
                        onClick={() => removeRecipient(index)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={generateAllEmails}
                  disabled={!purpose || !yourName || !yourCompany}
                  className="w-full mt-4 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Generate All Emails
                </button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Generated Emails</h2>
            
            {recipients.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>Add recipients to start generating emails</p>
              </div>
            ) : (
              <div className="space-y-6">
                {recipients.map((recipient, index) => {
                  const email = generatedEmails[recipient.email];
                  const isLoading = loading === recipient.email;

                  return (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">{recipient.name}</h3>
                        {!email && !isLoading && (
                          <button
                            onClick={() => generateEmail(recipient, index)}
                            disabled={!purpose || !yourName || !yourCompany}
                            className="bg-indigo-600 text-white py-1 px-3 rounded text-sm hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                          >
                            Generate
                          </button>
                        )}
                      </div>

                      {isLoading && (
                        <div className="text-center py-8">
                          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                          <p className="mt-2 text-gray-600">Generating email...</p>
                        </div>
                      )}

                      {email && (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Subject
                            </label>
                            <input
                              type="text"
                              value={email.subject}
                              onChange={(e) => setGeneratedEmails({
                                ...generatedEmails,
                                [recipient.email]: { ...email, subject: e.target.value }
                              })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Body
                            </label>
                            <textarea
                              value={email.body}
                              onChange={(e) => setGeneratedEmails({
                                ...generatedEmails,
                                [recipient.email]: { ...email, body: e.target.value }
                              })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                              rows={10}
                            />
                          </div>
                          <button
                            onClick={() => sendEmail(recipient)}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                          >
                            Send Email
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
