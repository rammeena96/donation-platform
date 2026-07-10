import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SessionWrapper from '@/components/SessionWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://divinemission.org'),
  title: {
    default: 'Divine Temple Trust - Donate for Temple Construction',
    template: '%s | Divine Temple Trust',
  },
  description: 'Support the construction of a grand temple. Donate for Temple Construction, Anna Daan, Gau Seva, and more. 80G Tax benefits available.',
  keywords: ['temple donation', 'seva', 'anna daan', 'gau seva', '80g donation', 'charitable trust'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'Divine Temple Trust',
    title: 'Divine Temple Trust - Donate for Temple Construction',
    description: 'Support the construction of a grand temple. 80G Tax benefits available.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Divine Temple Trust' }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          <Header />
          <main>{children}</main>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  )
}
