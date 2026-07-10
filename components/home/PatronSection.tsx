'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check } from 'lucide-react'

const tiers = [
  {
    title: 'Life Patron',
    amount: '₹1,00,000',
    color: 'from-amber-600 to-amber-700',
    badge: '🏅',
    features: [
      'Name inscribed in Temple Hall',
      'Annual Puja in your name',
      'Lifetime Maha Prasadam',
      'Spiritual Books Collection',
      '80G Tax Certificate',
      'Digital Donor Certificate',
      'Priority Darshan Pass',
    ],
  },
  {
    title: 'Founder Patron',
    amount: '₹5,00,000',
    color: 'from-red-700 to-red-800',
    badge: '👑',
    features: [
      'Name on Foundation Stone',
      'Dedicated Deity Seva',
      'Lifetime family membership',
      'Private darshan access',
      'Annual spiritual retreat',
      '80G Certificate',
      'Gold Donor Certificate',
      'Temple bell inscription',
    ],
    featured: true,
  },
]

export default function PatronSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Patron Program</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Become A Patron</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Become a pillar of this divine mission. Patrons receive lifetime recognition and exclusive privileges.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div key={tier.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-3xl overflow-hidden ${tier.featured ? 'ring-4 ring-amber-500 shadow-2xl scale-105' : 'shadow-lg'}`}>
              {tier.featured && (
                <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</div>
              )}
              <div className={`bg-gradient-to-br ${tier.color} p-8 text-white text-center`}>
                <div className="text-5xl mb-2">{tier.badge}</div>
                <h3 className="text-2xl font-bold">{tier.title}</h3>
                <p className="text-3xl font-bold mt-2 opacity-90">{tier.amount}</p>
                <p className="text-white/70 text-sm">one-time contribution</p>
              </div>
              <div className="p-6 bg-white">
                <ul className="space-y-2.5">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/#donate"
                  className={`block text-center bg-gradient-to-r ${tier.color} text-white py-3 rounded-full font-bold mt-6 hover:shadow-lg hover:scale-105 transition-all`}>
                  Become {tier.title}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
