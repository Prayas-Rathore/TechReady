import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const GMAIL_USER = Deno.env.get('GMAIL_USER')! // your-email@yourdomain.com
const GMAIL_APP_PASSWORD = Deno.env.get('GMAIL_APP_PASSWORD')! // Google App Password
const SUPPORT_EMAIL = 'support@mockithub.ai'

// Helper to send email via Gmail SMTP
async function sendGmailEmail(to: string, subject: string, html: string, replyTo?: string) {
  const response = await fetch('https://api.smtp2go.com/v3/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: Deno.env.get('SMTP2GO_API_KEY'),
      to: [to],
      sender: GMAIL_USER,
      subject: subject,
      html_body: html,
      custom_headers: replyTo ? [{ header: 'Reply-To', value: replyTo }] : [],
    }),
  })
  
  return response
}

serve(async (req) => {
  try {
    const { name, email, subject, message, queryId } = await req.json()

    // 1. Email to support
    await sendGmailEmail(
      SUPPORT_EMAIL,
      `New Contact Form: ${subject}`,
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #0ea5e9;">New Contact Form Submission</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          <div style="background: white; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3>Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 20px; color: #64748b; font-size: 12px;">
            Query ID: ${queryId}
          </p>
        </div>
      `,
      email // reply-to
    )

    // 2. Confirmation to user
    await sendGmailEmail(
      email,
      'We received your message!',
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #0ea5e9;">Thank You for Contacting Us!</h2>
          <p>Hi ${name},</p>
          <p>We've received your message and will get back to you within 24-48 hours.</p>
          <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Your message:</strong></p>
            <p style="white-space: pre-wrap; color: #475569;">${message}</p>
          </div>
          <p>Best regards,<br/>MockITHub Team</p>
        </div>
      `
    )

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})