'use client'
import { motion } from 'framer-motion'
import { QrCode, Smartphone, Building2, CreditCard } from 'lucide-react'
import DonationForm from '@/components/donation/DonationForm'

export default function PaymentSection() {
  const upiId = process.env.NEXT_PUBLIC_UPI_ID || 'temple@upi'
  
  return (
    <section id="donate" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-12">
          <p className="text-amber-600 font-semibold text-sm uppercase tracking-widest mb-2">Donate Now</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Multiple Ways to Donate</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Choose the payment method that's most convenient for you.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: Payment Methods */}
          <div className="space-y-4">
            {/* Razorpay */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center"><CreditCard className="w-5 h-5 text-blue-600" /></div>
                <div>
                  <h3 className="font-bold text-gray-900">Card / Net Banking / Wallet</h3>
                  <p className="text-gray-500 text-xs">Powered by Razorpay — 100% Secure</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">Pay using any Credit Card, Debit Card, Net Banking, or digital wallet. All transactions are encrypted and secure.</p>
            </motion.div>

            {/* UPI */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center"><Smartphone className="w-5 h-5 text-green-600" /></div>
                <div>
                  <h3 className="font-bold text-gray-900">UPI Direct</h3>
                  <p className="text-gray-500 text-xs">Google Pay, PhonePe, Paytm</p>
                </div>
              </div>
              <div className="bg-green-50 rounded-xl p-3">
                <p className="text-green-800 font-mono font-bold text-lg">{upiId}</p>
                <p className="text-green-700 text-xs mt-1">Send directly from any UPI app</p>
              </div>
            </motion.div>

            {/* Bank Transfer */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center"><Building2 className="w-5 h-5 text-purple-600" /></div>
                <div>
                  <h3 className="font-bold text-gray-900">Bank Transfer / NEFT</h3>
                  <p className="text-gray-500 text-xs">For large donations</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Account Name</span><span className="font-semibold">Divine Temple Trust</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Account No</span><span className="font-mono">XXXXXXXXXXXX</span></div>
                <div className="flex justify-between"><span className="text-gray-500">IFSC Code</span><span className="font-mono">BANKXXXX</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Bank</span><span>State Bank of India</span></div>
              </div>
            </motion.div>

            {/* QR */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center"><QrCode className="w-5 h-5 text-amber-600" /></div>
                <div>
                  <h3 className="font-bold text-gray-900">Scan QR Code</h3>
                  <p className="text-gray-500 text-xs">Quick scan & pay</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                  <QrCode className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-gray-500 text-xs">Configure your UPI QR code in the admin settings panel.</p>
              </div>
            </motion.div>
          </div>

          {/* Right: Donation Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <DonationForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
