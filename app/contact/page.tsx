import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with us for donation queries, 80G certificates, receipts, or general information.',
}

export default function ContactPage() {
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91-XXXXXXXXXX'
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@divinemission.org'
  const address = process.env.NEXT_PUBLIC_CONTACT_ADDRESS || 'Your Address, City, State - PIN'

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-amber-900 to-red-950 pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-2">Get In Touch</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-amber-200/80 text-lg">We are here to help with any queries about donations, receipts, or seva.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Reach Out to Us</h2>
            {[
              { icon: '📞', label: 'Phone', value: phone, sub: 'Mon–Sat, 9 AM – 6 PM' },
              { icon: '📧', label: 'Email', value: email, sub: 'Response within 24 hours' },
              { icon: '📍', label: 'Address', value: address, sub: 'Temple Trust Office' },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex gap-4">
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-2xl shrink-0">{item.icon}</div>
                <div>
                  <p className="text-xs text-amber-600 font-semibold uppercase tracking-wider">{item.label}</p>
                  <p className="font-semibold text-gray-900 mt-0.5">{item.value}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}

            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
              <h3 className="font-bold text-amber-900 mb-2">For Receipt & 80G Certificate</h3>
              <p className="text-amber-700 text-sm leading-relaxed">
                Receipts are sent automatically to your email after successful payment. For 80G certificates, please email us your PAN number and receipt number.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <form className="space-y-4" action="mailto:info@divinemission.org" method="POST" encType="text/plain">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input type="text" name="name" required placeholder="Your full name"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input type="email" name="email" required placeholder="your@email.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" name="phone" placeholder="+91 XXXXXXXXXX"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea name="message" required rows={4} placeholder="How can we help you?"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none" />
              </div>
              <button type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-red-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all text-sm">
                Send Message 🙏
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
