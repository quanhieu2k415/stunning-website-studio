import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
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

    const subjectText = subject || 'Yêu cầu tư vấn mới';
    
    const { data, error } = await resend.emails.send({
      from: 'Hai An Technology <onboarding@resend.dev>',
      to: ['congnghehaiantn@gmail.com'],
      subject: `[Hai An Tech] ${subjectText} - ${name}`,
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
                ${name}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold; background-color: #f9fafb;">
                Số điện thoại
              </td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">
                <a href="tel:${phone}" style="color: #2563eb;">${phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold; background-color: #f9fafb;">
                Email
              </td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">
                ${email ? `<a href="mailto:${email}" style="color: #2563eb;">${email}</a>` : 'Không cung cấp'}
              </td>
            </tr>
            ${subject ? `
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold; background-color: #f9fafb;">
                Chủ đề
              </td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">
                ${subject}
              </td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold; background-color: #f9fafb; vertical-align: top;">
                Nội dung
              </td>
              <td style="padding: 10px; border: 1px solid #e5e7eb; white-space: pre-wrap;">
                ${message}
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
