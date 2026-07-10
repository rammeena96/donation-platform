'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const verses = [
  {
    sanskrit: 'दातव्यमिति यद्दानं दीयतेऽनुपकारिणे । देशे काले च पात्रे च तद्दानं सात्त्विकं स्मृतम् ॥',
    translation: 'Charity given to the worthy person at the right place and right time, without expectation of anything in return, is called Sattvic charity.',
    source: 'Bhagavad Gita 17.20',
    explanation: 'The highest form of charity is one given without any expectation of reward, recognition, or reciprocation. When we donate to build this temple, we perform Sattvic Dana — the purest act of charity that cleanses the soul and elevates consciousness.',
    emoji: '📖',
  },
  {
    sanskrit: 'न हि ज्ञानेन सदृशं पवित्रमिह विद्यते',
    translation: 'There is nothing as purifying as knowledge in this world.',
    source: 'Bhagavad Gita 4.38',
    explanation: 'The temple will be a center of divine knowledge and wisdom. Your donation to build this sacred space ensures that thousands will gain access to the highest spiritual knowledge for generations to come.',
    emoji: '🕉️',
  },
  {
    sanskrit: 'अन्नदाता सुखी भव',
    translation: 'May the one who provides food be always happy and prosperous.',
    source: 'Ancient Sanskrit Blessing',
    explanation: 'Anna Daan — the gift of food — is considered the greatest of all charities. By sponsoring meals for devotees and the needy, you invoke the blessings of all the devas and ancestors upon your family.',
    emoji: '🙏',
  },
  {
    sanskrit: 'गावो विश्वस्य मातरः',
    translation: 'Cows are the mothers of the entire universe.',
    source: 'Vedic Scripture',
    explanation: 'The cow holds a sacred place in our culture. Your Gau Seva donation ensures the protection and care of these divine animals, earning you immeasurable punya (merit) and the blessings of Kamdhenu.',
    emoji: '🐄',
  },
]

export default function ScripturalImportance() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 bg-amber-950 text-white">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-2">Sacred Knowledge</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Scriptural Importance of Donation</h2>
          <p className="text-amber-100/70 max-w-xl mx-auto">Our scriptures have always emphasized the transformative power of charity. Learn what the ancient texts say about Dana.</p>
        </motion.div>

        <div className="space-y-4">
          {verses.map((v, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white/10 rounded-2xl overflow-hidden border border-white/10">
              <button className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{v.emoji}</span>
                  <div>
                    <p className="font-semibold text-amber-200 text-sm">{v.source}</p>
                    <p className="text-white/70 text-xs mt-0.5 line-clamp-1">{v.translation}</p>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-amber-400 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden">
                    <div className="px-5 pb-5">
                      <div className="bg-amber-900/50 rounded-xl p-4 mb-4">
                        <p className="text-amber-300 font-serif text-lg italic leading-relaxed">{v.sanskrit}</p>
                      </div>
                      <p className="text-amber-100/80 text-sm font-medium mb-3">"{v.translation}"</p>
                      <p className="text-amber-100/60 text-sm leading-relaxed">{v.explanation}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
