'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { q: 'Is my donation secure?', a: 'Yes, all payments are processed through Razorpay, a PCI-DSS compliant payment gateway. We never store your card or UPI credentials. All transactions are encrypted and secure.' },
  { q: 'Will I get a receipt for my donation?', a: 'Yes, you will receive an email receipt immediately after your donation is processed. The receipt includes all details required for tax purposes including your PAN number and the amount donated.' },
  { q: 'Is this donation eligible for 80G tax deduction?', a: 'Yes, donations to our trust are eligible for tax deduction under Section 80G of the Income Tax Act. You will receive the 80G certificate along with your receipt.' },
  { q: 'Can I donate in someone else\'s name?', a: 'Yes, you can dedicate your donation in the name of a family member, friend, or loved one. Please mention this in the notes section during checkout.' },
  { q: 'What is the minimum donation amount?', a: 'There is no minimum donation. Every amount, however small, is gratefully accepted and contributes to the divine mission.' },
  { q: 'Can I set up a recurring donation?', a: 'Yes, you can set up monthly recurring donations. Please contact us at info@temple.org and our team will assist you with the setup.' },
  { q: 'How can I track the usage of my donation?', a: 'We publish regular updates, photos, and videos of the seva work being done with donor contributions. You can also contact us for specific updates about your donation.' },
  { q: 'Is the platform legally registered?', a: 'Yes, the trust is registered under the Indian Trusts Act and is duly registered with the Income Tax Department. All legal documents are available for verification.' },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">Everything you need to know before donating.</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="border border-gray-200 rounded-xl overflow-hidden hover:border-amber-300 transition-colors">
              <button className="w-full flex items-center justify-between p-5 text-left hover:bg-amber-50/50 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <span className="font-semibold text-gray-900 pr-4 text-sm md:text-base">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-amber-600 shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{faq.a}</p>
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
