'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const categories = [
  { id: 'charitable', label: 'Charitable Donations' },
  { id: 'festival', label: 'Festival Donations' },
  { id: 'ekadashi', label: 'Ekadashi Donations' },
  { id: 'construction', label: 'Cultural Construction' },
  { id: 'other', label: 'Other Donations' },
]

const campaigns = [
  { slug: 'temple-construction', category: 'construction', emoji: '🏛️', title: 'Temple Construction', description: 'Help build the main temple hall with your donation. Be part of this sacred construction.' },
  { slug: 'anna-daan', category: 'charitable', emoji: '🍛', title: 'Anna Daan', description: 'Sponsor meals for hundreds of devotees and underprivileged families every day.' },
  { slug: 'poor-feeding', category: 'charitable', emoji: '🤲', title: 'Poor Feeding', description: 'Feed the hungry and destitute in our community. A hungry soul needs food before spirituality.' },
  { slug: 'gau-seva', category: 'charitable', emoji: '🐄', title: 'Gau Seva', description: 'Care and protection for holy cows — the backbone of our cultural and spiritual heritage.' },
  { slug: 'khichadi-distribution', category: 'festival', emoji: '🥘', title: 'Khichadi Distribution', description: 'Sponsor khichadi prasad distribution on auspicious days and festivals.' },
  { slug: 'gita-daan', category: 'other', emoji: '📖', title: 'Gita Daan', description: 'Donate Bhagavad Gita copies to students, hospitals, and spiritual seekers.' },
  { slug: 'general-donation', category: 'other', emoji: '🙏', title: 'General Donation', description: 'Your contribution goes directly to where it is needed most for the temple mission.' },
  { slug: 'makar-sankranti', category: 'festival', emoji: '🪁', title: 'Festival Seva', description: 'Support grand festival celebrations with puja arrangements, decorations, and prasad.' },
]

export default function CampaignSection() {
  const [activeCategory, setActiveCategory] = useState('charitable')
  const filtered = campaigns.filter(c => c.category === activeCategory)

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-10">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">All Sevas</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Support Every Seva</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Every campaign is a sacred cause. Choose the one that calls to your heart.</p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.id
                ? 'bg-gradient-to-r from-amber-600 to-red-700 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-amber-300'}`}>
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.length > 0 ? filtered.map((c, i) => (
            <motion.div key={c.slug}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group border border-gray-100">
              <div className="h-36 bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
                {c.emoji}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{c.title}</h3>
                <p className="text-gray-500 text-xs mb-4 leading-relaxed">{c.description}</p>
                <Link href={`/campaign/${c.slug}`}
                  className="block text-center bg-gradient-to-r from-amber-600 to-red-700 text-white py-2 rounded-full text-xs font-semibold hover:shadow-md transition-all">
                  Donate Now
                </Link>
              </div>
            </motion.div>
          )) : (
            <div className="col-span-4 text-center py-12 text-gray-400">
              <p className="text-4xl mb-2">🙏</p>
              <p>Campaigns coming soon for this category</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
