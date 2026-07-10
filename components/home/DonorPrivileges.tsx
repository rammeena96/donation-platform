'use client'
import { motion } from 'framer-motion'
import { useRef } from 'react'

const privileges = [
  { emoji: '🍱', title: 'Maha Prasadam', description: 'Receive blessed prasadam from the temple directly to your home as a mark of divine grace.' },
  { emoji: '📚', title: 'Spiritual Books', description: 'Get curated spiritual literature including Bhagavad Gita, scriptures, and devotional texts.' },
  { emoji: '📋', title: '80G Tax Benefit', description: 'Your donation qualifies for income tax deduction under Section 80G of the Income Tax Act.' },
  { emoji: '🏅', title: 'Digital Certificate', description: 'Receive a beautifully crafted digital seva certificate with your name inscribed in gold.' },
  { emoji: '📿', title: 'Sacred Rudraksha', description: 'A blessed Rudraksha mala energized in the temple for major donors as a divine blessing.' },
  { emoji: '🔔', title: 'Temple Bell Inscription', description: 'Your name will be inscribed on the temple bell for lifetime donors, resonating in every prayer.' },
]

export default function DonorPrivileges() {
  return (
    <section className="py-20 bg-gradient-to-br from-amber-900 to-red-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-2">Donor Benefits</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your Privileges as a Donor</h2>
          <p className="text-amber-100/70 max-w-xl mx-auto">When you donate, you receive much more than a receipt — you receive blessings, recognition, and divine grace.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {privileges.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center hover:bg-white/15 transition-all cursor-default">
              <div className="text-4xl mb-3">{p.emoji}</div>
              <h3 className="text-white font-bold text-sm mb-2">{p.title}</h3>
              <p className="text-amber-100/60 text-xs leading-relaxed">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
