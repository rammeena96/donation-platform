import Link from 'next/link'
import { Heart, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-red-700 rounded-full flex items-center justify-center text-2xl">🕉</div>
              <div>
                <p className="text-white font-bold text-lg">Divine Temple Trust</p>
                <p className="text-amber-400 text-sm">Seva • Dharma • Shakti</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6 text-gray-400">
              We are dedicated to the construction of a grand temple that will serve as a spiritual beacon for generations. Your donations help us build a divine abode where devotees can find peace, purpose, and blessings.
            </p>
            <div className="flex gap-4">
              {['facebook', 'instagram', 'youtube', 'twitter'].map(s => (
                <a key={s} href={`https://${s}.com`} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors text-sm font-bold">
                  {s[0].toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/campaigns', label: 'All Campaigns' },
                { href: '/campaign/square-feet-seva', label: 'Square Feet Seva' },
                { href: '/campaign/anna-daan', label: 'Anna Daan' },
                { href: '/campaign/gau-seva', label: 'Gau Seva' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map(l => (
                <li key={l.href}><Link href={l.href} className="hover:text-amber-400 transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span>123 Temple Road, Sacred City, India - 302001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="tel:+911234567890" className="hover:text-amber-400">+91 12345 67890</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:info@temple.org" className="hover:text-amber-400">info@temple.org</a>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-gray-800 rounded-lg text-xs">
              <p className="text-amber-400 font-semibold mb-1">80G Tax Benefit Available</p>
              <p>Registration No: XXXXX/80G/2024</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Divine Temple Trust. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-amber-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-amber-400">Terms of Use</Link>
            <Link href="/refund-policy" className="hover:text-amber-400">Refund Policy</Link>
          </div>
          <p className="flex items-center gap-1">Made with <Heart className="w-3 h-3 text-red-500" /> for Dharma</p>
        </div>
      </div>
    </footer>
  )
}
