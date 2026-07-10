'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Heart } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-amber-600 to-red-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {[...Array(5)].map((_, i) => (
          <motion.div key={i} className="absolute text-6xl"
            style={{ left: `${i * 25}%`, top: '20%' }}
            animate={{ y: [-20, 20, -20], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity }}>
            🪔
          </motion.div>
        ))}
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="text-amber-200 font-semibold text-sm uppercase tracking-widest mb-4">Join Us Today</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Be A Part Of Building<br />
            <span className="text-amber-200">This Divine Mission</span>
          </h2>
          <p className="text-xl text-amber-100/80 mb-10 max-w-2xl mx-auto">
            Your donation today becomes a sacred part of a temple that will stand for centuries. Let your name be part of this divine legacy.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/#donate"
              className="inline-flex items-center gap-3 bg-white text-amber-700 hover:bg-amber-50 px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-2xl">
              <Heart className="w-5 h-5" fill="currentColor" />
              Donate Now
            </Link>
            <Link href="/campaigns"
              className="inline-flex items-center gap-3 bg-white/20 hover:bg-white/30 text-white border border-white/40 px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105">
              View All Campaigns
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
