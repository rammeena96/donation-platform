import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import CampaignPage from '@/components/campaign/CampaignPage'

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const fb = fallbackCampaigns[slug]
  const campaign = await getCampaignData(slug).catch(() => null)
  const c = campaign || fb
  if (!c) return { title: 'Campaign Not Found' }
  return {
    title: c.title,
    description: c.description,
  }
}

async function getCampaignData(slug: string) {
  try {
    return await prisma.campaign.findUnique({ where: { slug, isActive: true } })
  } catch {
    return null
  }
}

const fallbackCampaigns: Record<string, {
  id: string; slug: string; title: string; description: string;
  goalAmount: number | null; raisedAmount: number; category: string; emoji: string;
}> = {
  'square-feet-seva': { id: 'demo-1', slug: 'square-feet-seva', title: 'Square Feet Seva', description: 'Sponsor one or more square feet of the temple construction. Each square foot represents your permanent place in this divine structure.', goalAmount: 5000000, raisedAmount: 2250000, category: 'construction', emoji: '🏗️' },
  'anna-daan': { id: 'demo-2', slug: 'anna-daan', title: 'Anna Daan Seva', description: 'Sponsor meals for hundreds of devotees and the needy. Anna Daan is the highest form of charity.', goalAmount: 1000000, raisedAmount: 650000, category: 'charitable', emoji: '🍛' },
  'gau-seva': { id: 'demo-3', slug: 'gau-seva', title: 'Gau Seva', description: 'Support the daily care, feeding, and medical needs of holy cows in our gaushala.', goalAmount: 2000000, raisedAmount: 800000, category: 'charitable', emoji: '🐄' },
  'cow-shed-seva': { id: 'demo-6', slug: 'cow-shed-seva', title: 'Cow Shed Seva', description: 'Help build a modern gaushala to care for and protect holy cows, an integral part of our spiritual heritage.', goalAmount: 2000000, raisedAmount: 680000, category: 'construction', emoji: '🐮' },
  'poor-feeding': { id: 'demo-4', slug: 'poor-feeding', title: 'Poor Feeding', description: 'Help feed underprivileged families in our community. Your contribution ensures no one sleeps hungry.', goalAmount: 500000, raisedAmount: 320000, category: 'charitable', emoji: '🤲' },
  'khichadi-distribution': { id: 'demo-7', slug: 'khichadi-distribution', title: 'Khichadi Distribution', description: 'Distribute khichadi to the poor and needy on auspicious Ekadashi occasions.', goalAmount: 500000, raisedAmount: 150000, category: 'ekadashi', emoji: '🫕' },
  'gita-daan': { id: 'demo-8', slug: 'gita-daan', title: 'Gita Daan', description: 'Donate Bhagavad Gita books to spread the divine wisdom across the world.', goalAmount: 250000, raisedAmount: 75000, category: 'other', emoji: '📖' },
  'general-donation': { id: 'demo-5', slug: 'general-donation', title: 'General Donation', description: 'Make a general donation to support all temple activities and development.', goalAmount: null, raisedAmount: 1500000, category: 'other', emoji: '🙏' },
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  let campaign: typeof fallbackCampaigns[string] | Awaited<ReturnType<typeof getCampaignData>> = null

  campaign = await getCampaignData(slug).catch(() => null)
  if (!campaign) {
    campaign = fallbackCampaigns[slug] || null
    if (!campaign) notFound()
  }

  return <CampaignPage campaign={campaign as Parameters<typeof CampaignPage>[0]['campaign']} />
}

export async function generateStaticParams() {
  return Object.keys(fallbackCampaigns).map(slug => ({ slug }))
}
