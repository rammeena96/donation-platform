'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import DonationForm from '@/components/donation/DonationForm'
import { ArrowLeft, Users, Target, TrendingUp } from 'lucide-react'
import FAQSection from '@/components/home/FAQSection'

interface Campaign {
  id: string; slug: string; title: string; description: string;
  longDesc?: string | null; goalAmount?: number | null; raisedAmount: number;
  image?: string | null; videoUrl?: string | null; category: string; emoji?: string;
}

export default function CampaignPage({ campaign }: { campaign: Campaign }) {
  const progress = campaign.goalAmount ? Math.min((campaign.raisedAmount / campaign.goalAmount) * 100, 100) : null

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-20 bg-gradient-to-br from-amber-950 to-red-950">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <Link href="/" className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <div className="inline-flex items-center gap-2 bg-amber-600/20 border border-amber-500/30 text-amber-300 px-3 py-1.5 rounded-full text-xs font-medium mb-4">
                {campaign.category.charAt(0).toUpperCase() + campaign.category.slice(1)} Seva
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{campaign.title}</h1>
              <p className="text-amber-100/80 text-lg mb-6">{campaign.description}</p>

              {progress !== null && (
                <div className="bg-white/10 rounded-2xl p-5 mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-amber-300 font-semibold">₹{campaign.raisedAmount.toLocaleString('en-IN')} raised</span>
                    <span className="text-amber-100/60">of ₹{campaign.goalAmount!.toLocaleString('en-IN')} goal</span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1.5, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
                  </div>
                  <p className="text-amber-400 font-bold mt-2 text-right">{progress.toFixed(1)}% Complete</p>
                </div>
              )}

              <div className="flex gap-6 text-center">
                <div>
                  <p className="text-2xl font-bold text-amber-400">₹{campaign.raisedAmount.toLocaleString('en-IN')}</p>
                  <p className="text-amber-100/60 text-xs">Total Raised</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-400">1,000+</p>
                  <p className="text-amber-100/60 text-xs">Donors</p>
                </div>
                {campaign.goalAmount && (
                  <div>
                    <p className="text-2xl font-bold text-amber-400">{progress?.toFixed(0)}%</p>
                    <p className="text-amber-100/60 text-xs">Goal Reached</p>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              {campaign.videoUrl ? (
                <div className="aspect-video bg-black rounded-2xl overflow-hidden">
                  <iframe src={`https://www.youtube.com/embed/${campaign.videoUrl}`} className="w-full h-full" allowFullScreen />
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-amber-800/40 to-amber-900/40 rounded-2xl flex items-center justify-center">
                  <span className="text-8xl">{(campaign as any).emoji || '🕉️'}</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content + Form */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Long Description */}
            <div className="lg:col-span-2 space-y-8">
              {campaign.longDesc && (
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Campaign</h2>
                  <div className="prose prose-amber max-w-none text-gray-600 leading-relaxed">
                    {campaign.longDesc.split('\n').map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                </div>
              )}

              {/* Donor Privileges */}
              <div className="bg-gradient-to-br from-amber-900 to-red-950 rounded-2xl p-8 text-white">
                <h2 className="text-xl font-bold mb-6">What You Receive</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { emoji: '📋', text: '80G Tax Certificate' },
                    { emoji: '🏅', text: 'Digital Seva Certificate' },
                    { emoji: '🍱', text: 'Maha Prasadam' },
                    { emoji: '📚', text: 'Spiritual Books' },
                  ].map(item => (
                    <div key={item.text} className="flex items-center gap-2 text-sm">
                      <span>{item.emoji}</span>
                      <span className="text-amber-100/80">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Donation Form */}
            <div className="sticky top-24">
              <DonationForm campaignId={campaign.id} campaignTitle={campaign.title} />
            </div>
          </div>
        </div>
      </section>

      <FAQSection />
    </>
  )
}
