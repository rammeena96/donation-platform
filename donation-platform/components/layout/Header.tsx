'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/campaigns', label: 'Campaigns' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-red-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🕉</span>
            </div>
            <div>
              <p className={`font-bold text-sm md:text-base leading-tight ${isScrolled ? 'text-amber-800' : 'text-white'}`}>
                {process.env.NEXT_PUBLIC_SITE_NAME || 'Divine Temple Trust'}
              </p>
              <p className={`text-xs ${isScrolled ? 'text-amber-600' : 'text-amber-200'}`}>Seva • Dharma • Shakti</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className={`text-sm font-medium transition-colors hover:text-amber-500 ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/#donate" className="hidden md:flex items-center gap-2 bg-gradient-to-r from-amber-600 to-red-700 text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all">
              <Heart className="w-4 h-4" />
              Donate Now
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className={`md:hidden p-2 rounded-lg ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white border-t shadow-xl">
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                  className="text-gray-700 font-medium py-2 border-b border-gray-100 hover:text-amber-600 transition-colors">
                  {link.label}
                </Link>
              ))}
              <Link href="/#donate" onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-red-700 text-white px-5 py-3 rounded-full font-semibold mt-2">
                <Heart className="w-4 h-4" /> Donate Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
