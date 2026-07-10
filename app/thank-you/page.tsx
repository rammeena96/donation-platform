'use client'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function ThankYouContent() {
  const params = useSearchParams()
  const receipt = params.get('receipt')
  const amount = params.get('amount')

  return (
    <main className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-5xl mx-auto mb-6">
          🙏
        </div>
        <h1 className="text-3xl font-bold text-green-700 mb-2">Donation Successful!</h1>
        <p className="text-gray-600 mb-6">
          Jai Sri Krishna! Thank you for your generous contribution to this divine mission.
        </p>

        {(receipt || amount) && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 text-left space-y-2">
            {amount && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Amount Donated</span>
                <span className="font-bold text-amber-700">₹{Number(amount).toLocaleString('en-IN')}</span>
              </div>
            )}
            {receipt && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Receipt Number</span>
                <span className="font-mono font-bold text-gray-800">{receipt}</span>
              </div>
            )}
          </div>
        )}

        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-left">
          <p className="text-green-700 text-sm leading-relaxed">
            ✉️ A confirmation email with your receipt has been sent to your registered email address. Keep it for 80G tax deduction.
          </p>
        </div>

        <div className="italic text-amber-800 text-sm bg-amber-50 rounded-xl p-4 mb-8">
          "दातव्यमिति यद्दानं दीयतेऽनुपकारिणे"<br />
          <span className="text-gray-500 not-italic">Charity given without expectation — Bhagavad Gita 17.20</span>
        </div>

        <div className="flex flex-col gap-3">
          <Link href="/" className="bg-gradient-to-r from-amber-600 to-red-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
            Back to Home
          </Link>
          <Link href="/campaigns" className="border border-amber-300 text-amber-700 py-3 rounded-xl font-medium hover:bg-amber-50 transition-all text-sm">
            Explore More Campaigns
          </Link>
        </div>
      </div>
    </main>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-amber-50 flex items-center justify-center"><p className="text-amber-700">Loading...</p></div>}>
      <ThankYouContent />
    </Suspense>
  )
}
