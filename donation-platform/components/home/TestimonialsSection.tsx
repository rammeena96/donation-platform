'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  { name: 'Ramesh Agarwal', designation: 'Business Owner', location: 'Jaipur', text: "Donating to this temple has been one of the most fulfilling experiences of my life. The team is transparent, the work is genuine, and the blessings are real. My business has flourished since I started contributing.", rating: 5 },
  { name: 'Sunita Devi', designation: 'Homemaker', location: 'Delhi', text: "I donated for Anna Daan and received photos of the seva being performed in my family's name. The receipt arrived promptly, the 80G certificate was perfect. Highly recommend everyone to participate.", rating: 5 },
  { name: 'Dr. Vikram Sharma', designation: 'Doctor', location: 'Mumbai', text: "This platform is a genuine and transparent initiative. The updates they send, the care they put into every seva — it is evident that this is a mission driven by faith and dedication.", rating: 5 },
  { name: 'Kavita Singh', designation: 'Teacher', location: 'Varanasi', text: "I have donated for Gau Seva and the impact photos they share are heartwarming. The cows are well cared for and the team is extremely responsive to queries. A blessed initiative.", rating: 5 },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)

  return (
    <section className="py-20 bg-amber-50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Devotees Say</h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div key={current}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-red-500 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6">
                {testimonials[current].name[0]}
              </div>
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-8 italic">"{testimonials[current].text}"</p>
              <div>
                <p className="font-bold text-gray-900">{testimonials[current].name}</p>
                <p className="text-gray-500 text-sm">{testimonials[current].designation} · {testimonials[current].location}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={() => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length)}
              className="p-3 rounded-full bg-white shadow hover:shadow-md hover:bg-amber-50 transition-all">
              <ChevronLeft className="w-5 h-5 text-amber-700" />
            </button>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-amber-600 w-8' : 'bg-gray-300'}`} />
            ))}
            <button onClick={() => setCurrent(c => (c + 1) % testimonials.length)}
              className="p-3 rounded-full bg-white shadow hover:shadow-md hover:bg-amber-50 transition-all">
              <ChevronRight className="w-5 h-5 text-amber-700" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
