import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions for Divine Temple Trust donation platform.',
}

const sections = [
  { title: 'Acceptance of Terms', body: 'By accessing and using this donation platform, you accept and agree to be bound by these terms. If you do not agree, please do not use this platform.' },
  { title: 'Donation Policy', body: 'All donations made through this platform are voluntary contributions to Divine Temple Trust. Donations are non-refundable once processed. All funds are used exclusively for the charitable purposes described in each campaign.' },
  { title: 'Tax Benefits (80G)', body: 'Donations are eligible for income tax deduction under Section 80G of the Income Tax Act, 1961. We will provide proper receipts and certificates. We are not responsible for tax advice — please consult your tax advisor.' },
  { title: 'Payment Processing', body: 'Payments are processed by Razorpay Payment Gateway. By making a donation, you agree to Razorpay\'s terms of service. We do not store any payment credentials on our servers.' },
  { title: 'Accuracy of Information', body: 'You agree to provide accurate, complete, and current information when making a donation. Providing false information (including PAN numbers) may result in ineligibility for tax benefits and certificate issuance.' },
  { title: 'Use of Funds', body: 'Funds raised are used for temple construction, gau seva, anna daan, and other charitable purposes as described. We maintain full transparency and publish regular updates on fund utilization.' },
  { title: 'Limitation of Liability', body: 'Divine Temple Trust shall not be liable for any indirect, incidental, or consequential damages arising from your use of this platform. Our maximum liability is limited to the amount you donated.' },
  { title: 'Modifications', body: 'We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the revised terms. We will notify registered users of material changes.' },
  { title: 'Governing Law', body: 'These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Rajasthan, India.' },
]

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-amber-900 pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Terms &amp; Conditions</h1>
          <p className="text-amber-200/70 text-sm">Last updated: January 2025</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 space-y-8">
          <p className="text-gray-600 leading-relaxed">
            Please read these terms carefully before making a donation. By using this platform, you agree to be bound by these terms and conditions.
          </p>
          {sections.map((s, i) => (
            <div key={s.title} className="border-t border-gray-100 pt-6">
              <h2 className="text-lg font-bold text-amber-900 mb-3">
                <span className="text-amber-400 mr-2">{String(i + 1).padStart(2, '0')}.</span>{s.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
