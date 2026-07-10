'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart, ChevronDown } from 'lucide-react'

const quickAmounts = [
  { amount: 101, label: '₹101' },
  { amount: 501, label: '₹501' },
  { amount: 1100, label: '₹1,100' },
  { amount: 5100, label: '₹5,100' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-950 via-red-950 to-amber-900">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Animated particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div key={i}
          className="absolute text-4xl opacity-20"
          style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
          animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}>
          🪔
        </motion.div>
      ))}

      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 pt-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 bg-amber-600/20 border border-amber-500/30 text-amber-300 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            <span>🙏</span> Join 10,000+ Devotees in this Divine Mission
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Be a Part of Building
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">
              This Divine Temple
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-amber-100/80 mb-10 max-w-2xl mx-auto">
            Your seva today becomes a sacred brick in the foundation of a spiritual legacy that will inspire generations.
          </p>

          {/* Quick Donate Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {quickAmounts.map(({ amount, label }) => (
              <Link key={amount} href={`/#donate?amount=${amount}`}
                className="bg-white/10 hover:bg-amber-600 border border-white/20 hover:border-amber-600 text-white px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 backdrop-blur-sm text-sm md:text-base">
                {label}
              </Link>
            ))}
            <Link href="/#donate"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 text-sm md:text-base">
              Custom Amount
            </Link>
          </div>

          <Link href="/#donate"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-2xl shadow-red-900/50">
            <Heart className="w-5 h-5" fill="white" />
            Donate Now & Earn Blessings
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          {[
            { value: '₹2.5Cr+', label: 'Raised' },
            { value: '10,000+', label: 'Donors' },
            { value: '50+', label: 'Campaigns' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-amber-400">{stat.value}</p>
              <p className="text-amber-200/70 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="mt-10 text-amber-300/60 flex justify-center">
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </div>
    </section>
  )
}
