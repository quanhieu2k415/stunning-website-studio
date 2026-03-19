import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const ALLOWED_ORIGINS = [
  'https://haiantech.vn',
  'https://www.haiantech.vn',
  'http://localhost:8080',
  'http://localhost:5173',
];

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isValidPhone(phone: string): boolean {
  return /^[0-9\s\-+().]{8,15}$/.test(phone);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

interface RequestBody {
  name?: string;
  phone?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface ApiRequest {
  method: string;
  headers: Record<string, string>;
  body: RequestBody;
}

interface ApiResponse {
  setHeader: (key: string, value: string) => void;
  status: (code: number) => { end: () => void; json: (data: unknown) => void };
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  const origin = req.headers['origin'] || '';
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !phone || !message) {
      return res.status(400).json({ error: 'Missing required fields: name, phone, message' });
    }

    if (typeof name !== 'string' || name.length > 200) {
      return res.status(400).json({ error: 'Invalid name' });
    }

    if (!isValidPhone(phone)) {
      return res.status(400).json({ error: 'Invalid phone number' });
    }

    if (email && !isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    if (typeof message !== 'string' || message.length > 5000) {
      return res.status(400).json({ error: 'Invalid message' });
    }

    // Escape all user input for HTML to prevent XSS
    const safeName = escapeHtml(name.trim());
    const safePhone = escapeHtml(phone.trim());
    const safeEmail = email ? escapeHtml(email.trim()) : '';
    const safeSubject = subject ? escapeHtml(String(subject).trim()) : '';
    const safeMessage = escapeHtml(message.trim());

    const subjectText = safeSubject || 'Yêu cầu tư vấn mới';

    const { data, error } = await resend.emails.send({
      from: 'Hai An Technology <onboarding@resend.dev>',
      to: ['congnghehaiantn@gmail.com'],
      subject: `[Hai An Tech] ${subjectText} - ${safeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            Yêu Cầu Tư Vấn Mới
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold; background-color: #f9fafb; width: 150px;">
                Họ và tên
              </td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">
                ${safeName}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold; background-color: #f9fafb;">
                Số điện thoại
              </td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">
                <a href="tel:${safePhone}" style="color: #2563eb;">${safePhone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold; background-color: #f9fafb;">
                Email
              </td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">
                ${safeEmail ? `<a href="mailto:${safeEmail}" style="color: #2563eb;">${safeEmail}</a>` : 'Không cung cấp'}
              </td>
            </tr>
            ${safeSubject ? `
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold; background-color: #f9fafb;">
                Chủ đề
              </td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">
                ${safeSubject}
              </td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold; background-color: #f9fafb; vertical-align: top;">
                Nội dung
              </td>
              <td style="padding: 10px; border: 1px solid #e5e7eb; white-space: pre-wrap;">
                ${safeMessage}
              </td>
            </tr>
          </table>

          <p style="margin-top: 20px; color: #6b7280; font-size: 12px;">
            Email này được gửi từ form liên hệ trên website Hai An Technology
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(400).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
