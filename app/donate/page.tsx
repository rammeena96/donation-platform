import { Metadata } from 'next'
import DonationForm from '@/components/donation/DonationForm'

export const metadata: Metadata = {
  title: 'Donate Now',
  description: 'Make a secure online donation for temple construction, gau seva, anna daan. 80G tax benefits. Powered by Razorpay.',
}

interface Props {
  searchParams: Promise<{ amount?: string; campaign?: string; campaignId?: string }>
}

export default async function DonatePage({ searchParams }: Props) {
  const params = await searchParams

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 pt-20">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Donate Now</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Make a Sacred Donation</h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Your contribution directly supports our divine mission. All donations are eligible for 80G tax benefit.
          </p>
        </div>

        <DonationForm
          campaignId={params.campaignId}
          campaignTitle={params.campaign}
        />

        {/* Trust Badges */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          {[
            { icon: '🔒', label: '256-bit SSL', sub: 'Secured' },
            { icon: '📋', label: '80G Eligible', sub: 'Tax Benefit' },
            { icon: '⚡', label: 'Instant', sub: 'Receipt' },
          ].map((b) => (
            <div key={b.label} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
              <div className="text-2xl mb-1">{b.icon}</div>
              <p className="text-xs font-semibold text-gray-900">{b.label}</p>
              <p className="text-xs text-gray-400">{b.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
