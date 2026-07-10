'use client'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { useEffect, useState } from 'react'

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count.toLocaleString('en-IN')}{suffix}</span>
}

const impacts = [
  { emoji: '🏛️', label: 'Temple Construction', value: 45, suffix: '%', desc: 'Temple structure completed' },
  { emoji: '🐄', label: 'Gau Seva', value: 250, suffix: '+', desc: 'Cows protected daily' },
  { emoji: '🍛', label: 'Annadaan', value: 500, suffix: '+', desc: 'Meals served daily' },
  { emoji: '🤲', label: 'Poor Feeding', value: 10000, suffix: '+', desc: 'Families helped' },
]

export default function ImpactSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Our Impact</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The Difference Your Seva Makes</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Every rupee donated creates ripples of positive change in our community and beyond.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {impacts.map((item, i) => (
            <motion.div key={item.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all text-center border border-amber-100">
              <div className="text-4xl mb-3">{item.emoji}</div>
              <p className="text-3xl md:text-4xl font-bold text-amber-600 mb-1">
                <CountUp target={item.value} suffix={item.suffix} />
              </p>
              <p className="font-semibold text-gray-900 text-sm mb-1">{item.label}</p>
              <p className="text-gray-500 text-xs">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
