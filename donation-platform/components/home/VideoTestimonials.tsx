'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const videos = [
  { id: 'dQw4w9WgXcQ', title: 'Devotee shares experience after donating', name: 'Ramesh Sharma', city: 'Jaipur' },
  { id: 'dQw4w9WgXcQ', title: 'Life changed after Gau Seva donation', name: 'Priya Agarwal', city: 'Delhi' },
  { id: 'dQw4w9WgXcQ', title: 'Temple construction progress report', name: 'Suresh Kumar', city: 'Mumbai' },
]

export default function VideoTestimonials() {
  const [current, setCurrent] = useState(0)
  const prev = () => setCurrent(c => (c - 1 + videos.length) % videos.length)
  const next = () => setCurrent(c => (c + 1) % videos.length)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Real Stories</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Donor Testimonials</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Hear from devotees whose lives have been transformed through the act of giving.</p>
        </motion.div>

        <div className="relative">
          <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src={`https://www.youtube.com/embed/${videos[current].id}`}
              className="w-full h-full" allowFullScreen
              title={videos[current].title}
            />
          </div>
          <div className="flex items-center justify-between mt-4">
            <button onClick={prev} className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors">
              <ChevronLeft className="w-5 h-5 text-amber-700" />
            </button>
            <div className="text-center">
              <p className="font-semibold text-gray-900">{videos[current].name}</p>
              <p className="text-gray-500 text-sm">{videos[current].city}</p>
            </div>
            <button onClick={next} className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 transition-colors">
              <ChevronRight className="w-5 h-5 text-amber-700" />
            </button>
          </div>
          <div className="flex justify-center gap-2 mt-3">
            {videos.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-amber-600 w-6' : 'bg-gray-300'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
