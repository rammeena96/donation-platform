'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

const donations = [
  { slug: 'square-feet-seva', emoji: '🏗️', title: 'Square Feet Seva', description: 'Sponsor one or more square feet of the temple construction. Every brick laid is a testament to your devotion.', amount: '₹1,100/sq.ft' },
  { slug: 'anna-daan', emoji: '🍛', title: 'Anna Daan Seva', description: 'Feed hundreds of devotees and the needy with nutritious meals. Anna Daan is the highest form of charity.', amount: '₹501' },
  { slug: 'cow-shed-seva', emoji: '🐄', title: 'Cow Shed Seva', description: 'Help build a modern gaushala to care for and protect holy cows, an integral part of our spiritual heritage.', amount: '₹2,100' },
  { slug: 'gau-seva', emoji: '🥛', title: 'Gau Seva', description: 'Support the daily care, feeding, and medical needs of cows residing in our gaushala.', amount: '₹251/month' },
  { slug: 'general-donation', emoji: '🕉️', title: 'Temple Donation', description: 'Make a general donation to support the overall development of the temple complex and daily activities.', amount: 'Any Amount' },
]

export default function PopularDonations() {
  return (
    <section className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Popular Sevas</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Choose Your Seva</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Every form of contribution is a sacred offering. Find the seva that resonates with your heart.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {donations.map((d, i) => (
            <motion.div key={d.slug}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-amber-100 hover:border-amber-300">
              <div className="h-40 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                {d.emoji}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{d.title}</h3>
                <p className="text-gray-500 text-xs mb-3 leading-relaxed line-clamp-3">{d.description}</p>
                <p className="text-amber-600 font-bold text-sm mb-3">{d.amount}</p>
                <Link href={`/campaign/${d.slug}`}
                  className="block text-center bg-gradient-to-r from-amber-600 to-red-700 text-white py-2 rounded-full text-xs font-semibold hover:shadow-md transition-all hover:scale-105">
                  Donate Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
