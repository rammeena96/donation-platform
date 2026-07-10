import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about our divine mission — temple construction, gau seva, anna daan and spreading ancient wisdom for spiritual upliftment.',
}

const pillars = [
  { emoji: '🏛️', title: 'Temple Construction', desc: 'Building a grand temple that will serve as a spiritual beacon for generations, where devotees find peace, purpose, and divine blessings.' },
  { emoji: '🐄', title: 'Gau Seva', desc: 'Protecting and caring for holy cows, which are considered sacred in Hindu tradition. Over 250 cows are cared for daily in our gaushala.' },
  { emoji: '🍛', title: 'Anna Daan', desc: 'Feeding thousands of devotees and underprivileged people every day. Anna Daan is the highest form of charity mentioned in our scriptures.' },
  { emoji: '📚', title: 'Gita Daan', desc: 'Spreading the timeless wisdom of the Bhagavad Gita by distributing books to students, hospitals, and spiritual seekers across the country.' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <div className="bg-gradient-to-br from-amber-900 to-red-950 pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-2">Our Mission</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Divine Temple Trust</h1>
          <p className="text-amber-200/80 text-lg max-w-2xl mx-auto">
            A sacred endeavor to preserve, promote, and propagate the eternal values of Sanatan Dharma through service, devotion, and community.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-12">
        {/* Mission */}
        <div className="bg-amber-50 rounded-3xl p-8 md:p-12 border border-amber-100">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            We are committed to building a sacred temple complex that will serve as a spiritual center for generations to come. Our mission extends beyond brick and mortar — we nourish the hungry through Anna Daan, protect holy cows through Gau Seva, and spread the timeless wisdom of the Bhagavad Gita to all who seek it.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            Every donation received goes directly towards these causes. We maintain complete transparency in our operations and provide regular updates to all our donors.
          </p>
        </div>

        {/* Four Pillars */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Four Pillars of Our Mission</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((p) => (
              <div key={p.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-4">
                <div className="text-4xl shrink-0">{p.emoji}</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust & Transparency */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Trust & Transparency</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '📋', title: '80G Registered', desc: 'All donations are eligible for tax deduction under Section 80G of the Income Tax Act.' },
              { icon: '🔒', title: 'Secure Payments', desc: 'All payments processed through Razorpay with 256-bit SSL encryption. No card details stored.' },
              { icon: '📊', title: 'Regular Updates', desc: 'We share photos, videos, and detailed updates of all seva activities with donors.' },
            ].map((item) => (
              <div key={item.title} className="text-center p-4">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
