import nodemailer from 'nodemailer'

export function getEmailTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export async function sendReceiptEmail({
  to,
  name,
  amount,
  receiptNumber,
  campaignName,
  paymentId,
}: {
  to: string
  name: string
  amount: number
  receiptNumber: string
  campaignName?: string
  paymentId: string
}) {
  const transporter = getEmailTransporter()
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Divine Temple Trust'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  await transporter.sendMail({
    from: `"${siteName}" <${process.env.EMAIL_FROM}>`,
    to,
    subject: `Donation Receipt - ${receiptNumber} | ${siteName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #b45309, #dc2626); padding: 32px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">${siteName}</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0;">Donation Receipt</p>
        </div>
        <div style="padding: 32px;">
          <p style="color: #374151;">Dear <strong>${name}</strong>,</p>
          <p style="color: #374151;">Thank you for your generous contribution. Your donation has been received successfully.</p>
          <div style="background: #fef3c7; border-radius: 8px; padding: 24px; margin: 24px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #6b7280; width: 50%;">Receipt Number</td><td style="padding: 8px 0; color: #111827; font-weight: bold;">${receiptNumber}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b7280;">Payment ID</td><td style="padding: 8px 0; color: #111827;">${paymentId}</td></tr>
              ${campaignName ? `<tr><td style="padding: 8px 0; color: #6b7280;">Campaign</td><td style="padding: 8px 0; color: #111827;">${campaignName}</td></tr>` : ''}
              <tr><td style="padding: 8px 0; color: #6b7280;">Amount</td><td style="padding: 8px 0; color: #b45309; font-weight: bold; font-size: 18px;">₹${amount.toLocaleString('en-IN')}</td></tr>
            </table>
          </div>
          <p style="color: #374151;">This donation may qualify for 80G tax deduction. Please retain this receipt for your records.</p>
          <div style="text-align: center; margin: 24px 0;">
            <a href="${siteUrl}" style="background: #b45309; color: white; padding: 12px 32px; border-radius: 6px; text-decoration: none; font-weight: bold;">Visit Our Website</a>
          </div>
          <p style="color: #6b7280; font-size: 14px; text-align: center;">May your generosity bring blessings to you and your family 🙏</p>
        </div>
      </div>
    `,
  })
}
