import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Divine Temple Trust donation platform.',
}

const sections = [
  {
    title: 'Information We Collect',
    body: 'We collect your name, email address, phone number, PAN number, and address when you make a donation. Payment information is processed securely through Razorpay and we do not store card or banking details on our servers.',
  },
  {
    title: 'How We Use Your Information',
    body: 'Your information is used to process your donation, send receipts, generate 80G certificates, and communicate important updates about our mission. We do not sell, trade, or share your personal information with third parties.',
  },
  {
    title: 'Payment Security',
    body: 'All payment transactions are processed through Razorpay, which uses industry-standard 256-bit SSL encryption and is PCI-DSS Level 1 compliant. We never store your payment credentials.',
  },
  {
    title: 'Data Retention',
    body: 'We retain your donation records as required by Indian tax law for a period of 7 years. You may request deletion of your personal data by contacting us, subject to legal retention requirements.',
  },
  {
    title: 'Cookies',
    body: 'We use minimal cookies necessary for the functioning of the website including session management. We do not use tracking cookies or third-party advertising cookies.',
  },
  {
    title: 'Your Rights',
    body: 'You have the right to access, correct, or delete your personal information. Contact us at the email below to exercise these rights. We will respond within 30 days.',
  },
  {
    title: 'Contact for Privacy',
    body: `For privacy-related queries, contact us at: ${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'privacy@divinemission.org'}`,
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-amber-900 pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-amber-200/70 text-sm">Last updated: January 2025</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 space-y-8">
          <p className="text-gray-600 leading-relaxed">
            Divine Temple Trust is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you use our donation platform.
          </p>
          {sections.map((s) => (
            <div key={s.title} className="border-t border-gray-100 pt-6">
              <h2 className="text-lg font-bold text-amber-900 mb-3">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
