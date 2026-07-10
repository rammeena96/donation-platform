import { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
  title: 'All Campaigns',
  description: 'Browse all donation campaigns — temple construction, gau seva, anna daan, and more sacred causes.',
}

const fallbackCampaigns = [
  { slug: 'square-feet-seva', emoji: '🏗️', title: 'Square Feet Seva', description: 'Sponsor square feet of the temple construction.', category: 'construction', raisedAmount: 2500000, goalAmount: 10000000 },
  { slug: 'anna-daan', emoji: '🍛', title: 'Anna Daan Seva', description: 'Feed hundreds of devotees and the needy.', category: 'charitable', raisedAmount: 850000, goalAmount: 2000000 },
  { slug: 'cow-shed-seva', emoji: '🐄', title: 'Cow Shed Seva', description: 'Build a shelter for holy cows.', category: 'construction', raisedAmount: 680000, goalAmount: 2000000 },
  { slug: 'gau-seva', emoji: '🥛', title: 'Gau Seva', description: 'Support daily care of cows in our gaushala.', category: 'charitable', raisedAmount: 1200000, goalAmount: 3000000 },
  { slug: 'poor-feeding', emoji: '🤲', title: 'Poor Feeding', description: 'Provide nutritious meals to those in need.', category: 'charitable', raisedAmount: 320000, goalAmount: 1000000 },
  { slug: 'khichadi-distribution', emoji: '🥘', title: 'Khichadi Distribution', description: 'Khichadi prasad on auspicious Ekadashi days.', category: 'ekadashi', raisedAmount: 150000, goalAmount: 500000 },
  { slug: 'gita-daan', emoji: '📖', title: 'Gita Daan', description: 'Donate Bhagavad Gita copies to seekers.', category: 'other', raisedAmount: 75000, goalAmount: 250000 },
  { slug: 'general-donation', emoji: '🙏', title: 'General Donation', description: 'Support the overall mission wherever needed.', category: 'other', raisedAmount: 450000, goalAmount: null },
]

async function getCampaigns() {
  try {
    return await prisma.campaign.findMany({ where: { isActive: true }, orderBy: { createdAt: 'desc' } })
  } catch {
    return fallbackCampaigns
  }
}

function formatAmount(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)} Cr`
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)} L`
  return `₹${n.toLocaleString('en-IN')}`
}

export default async function CampaignsPage() {
  const campaigns = await getCampaigns()

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-amber-900 to-red-950 pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-2">All Sevas</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Choose Your Seva</h1>
          <p className="text-amber-200/80 text-lg max-w-2xl mx-auto">
            Every campaign is a sacred opportunity to serve the divine. Choose the seva closest to your heart.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {campaigns.map((c: {
            slug: string
            emoji?: string
            title: string
            description: string
            category: string
            raisedAmount: number
            goalAmount?: number | null
          }) => {
            const progress = c.goalAmount ? Math.min(Math.round((c.raisedAmount / c.goalAmount) * 100), 100) : null
            return (
              <div key={c.slug} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-amber-200 transition-all group flex flex-col">
                <div className="h-40 bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                  {c.emoji || '🙏'}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs text-amber-600 font-semibold uppercase tracking-wider mb-1">{c.category}</span>
                  <h3 className="font-bold text-gray-900 text-base mb-2">{c.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{c.description}</p>

                  {progress !== null && (
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span className="font-semibold text-amber-600">{formatAmount(c.raisedAmount)}</span>
                        <span>{formatAmount(c.goalAmount!)}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${progress}%` }} />
                      </div>
                      <p className="text-right text-xs text-amber-600 font-semibold mt-1">{progress}%</p>
                    </div>
                  )}

                  <Link
                    href={`/campaign/${c.slug}`}
                    className="mt-4 block text-center bg-gradient-to-r from-amber-600 to-red-700 text-white py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg transition-all"
                  >
                    Donate Now 🙏
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
