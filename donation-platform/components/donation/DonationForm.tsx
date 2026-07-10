'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Heart, Shield, Award } from 'lucide-react'

declare global {
  interface Window { Razorpay: any }
}

const schema = z.object({
  donorName: z.string().min(2, 'Name is required'),
  donorEmail: z.string().email('Valid email required'),
  donorPhone: z.string().min(10, 'Valid phone required'),
  donorPan: z.string().optional(),
  donorAddress: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const presetAmounts = [101, 501, 1100, 5100, 11000]

interface DonationFormProps {
  campaignId?: string
  campaignTitle?: string
}

export default function DonationForm({ campaignId, campaignTitle }: DonationFormProps) {
  const [amount, setAmount] = useState<number | ''>('')
  const [customAmount, setCustomAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [receiptNumber, setReceiptNumber] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const finalAmount = amount || Number(customAmount)

  const loadRazorpay = () => {
    return new Promise<boolean>(resolve => {
      if (window.Razorpay) { resolve(true); return }
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const onSubmit = async (data: FormData) => {
    if (!finalAmount || finalAmount < 1) { alert('Please enter a valid donation amount'); return }
    setLoading(true)
    try {
      const loaded = await loadRazorpay()
      if (!loaded) { alert('Payment gateway failed to load. Please try again.'); setLoading(false); return }

      const orderRes = await fetch('/api/donations/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, amount: finalAmount, campaignId }),
      })
      const order = await orderRes.json()
      if (!orderRes.ok) throw new Error(order.error)

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: process.env.NEXT_PUBLIC_SITE_NAME || 'Divine Temple Trust',
        description: campaignTitle ? `Donation - ${campaignTitle}` : 'Temple Donation',
        order_id: order.orderId,
        prefill: { name: data.donorName, email: data.donorEmail, contact: data.donorPhone },
        theme: { color: '#b45309' },
        handler: async (response: any) => {
          const verifyRes = await fetch('/api/donations/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            }),
          })
          const result = await verifyRes.json()
          if (result.success) {
            setReceiptNumber(result.receiptNumber)
            setSuccess(true)
          } else {
            alert('Payment verification failed. Please contact support.')
          }
          setLoading(false)
        },
        modal: { ondismiss: () => setLoading(false) },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err: any) {
      alert(err.message || 'Something went wrong')
      setLoading(false)
    }
  }

  if (success) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 shadow-xl text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">🙏</div>
        <h3 className="text-2xl font-bold text-green-700 mb-2">Donation Successful!</h3>
        <p className="text-gray-600 mb-2">Thank you for your generous contribution.</p>
        <p className="text-sm text-gray-500 mb-6">Receipt: <span className="font-mono font-semibold text-amber-700">{receiptNumber}</span></p>
        <p className="text-sm text-gray-500">A receipt has been sent to your email. May your seva bring blessings to you and your family. 🌸</p>
        <button onClick={() => { setSuccess(false); setAmount(''); setCustomAmount('') }}
          className="mt-6 px-6 py-2.5 bg-amber-600 text-white rounded-full text-sm font-semibold hover:bg-amber-700 transition-colors">
          Donate Again
        </button>
      </motion.div>
    )
  }

  return (
    <div id="donate" className="bg-white rounded-3xl p-6 md:p-8 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-red-600 rounded-full flex items-center justify-center">
          <Heart className="w-5 h-5 text-white" fill="white" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-lg">{campaignTitle ? `Donate to ${campaignTitle}` : 'Make a Donation'}</h3>
          <p className="text-gray-500 text-xs">Secure • Instant Receipt • 80G Eligible</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Amount Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Amount</label>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {presetAmounts.map(a => (
              <button type="button" key={a} onClick={() => { setAmount(a); setCustomAmount('') }}
                className={`py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${amount === a
                  ? 'border-amber-500 bg-amber-50 text-amber-700'
                  : 'border-gray-200 text-gray-700 hover:border-amber-300'}`}>
                ₹{a.toLocaleString('en-IN')}
              </button>
            ))}
          </div>
          <input type="number" placeholder="Enter custom amount (₹)" value={customAmount}
            onChange={e => { setCustomAmount(e.target.value); setAmount('') }}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:border-amber-400 focus:outline-none"
          />
        </div>

        {/* Donor Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Full Name *</label>
            <input {...register('donorName')} placeholder="Your full name"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-amber-400 focus:outline-none" />
            {errors.donorName && <p className="text-red-500 text-xs mt-1">{errors.donorName.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number *</label>
            <input {...register('donorPhone')} placeholder="10-digit mobile number"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-amber-400 focus:outline-none" />
            {errors.donorPhone && <p className="text-red-500 text-xs mt-1">{errors.donorPhone.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Email Address *</label>
          <input {...register('donorEmail')} placeholder="email@example.com" type="email"
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-amber-400 focus:outline-none" />
          {errors.donorEmail && <p className="text-red-500 text-xs mt-1">{errors.donorEmail.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">PAN Number (for 80G)</label>
            <input {...register('donorPan')} placeholder="ABCDE1234F" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-amber-400 focus:outline-none uppercase" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Address (optional)</label>
            <input {...register('donorAddress')} placeholder="City, State" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:border-amber-400 focus:outline-none" />
          </div>
        </div>

        {finalAmount > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
            <p className="text-amber-700 font-bold text-xl">₹{finalAmount.toLocaleString('en-IN')}</p>
            <p className="text-amber-600 text-xs">Total Donation Amount</p>
          </div>
        )}

        <button type="submit" disabled={loading || !finalAmount}
          className="w-full py-4 bg-gradient-to-r from-amber-600 to-red-700 text-white rounded-xl font-bold text-base hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]">
          {loading ? '⏳ Processing...' : '🙏 Proceed to Donate'}
        </button>

        <div className="flex items-center justify-center gap-4 text-xs text-gray-500 pt-2">
          <div className="flex items-center gap-1"><Shield className="w-3 h-3 text-green-500" /> Secured by Razorpay</div>
          <div className="flex items-center gap-1"><Award className="w-3 h-3 text-blue-500" /> 80G Eligible</div>
        </div>
      </form>
    </div>
  )
}
