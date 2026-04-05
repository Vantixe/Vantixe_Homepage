import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { StructuredData } from '@/components/layout/StructuredData'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.vantixe.com'),
  title: {
    default: 'Vantixe Advisory | Procurement Excellence. Delivered.',
    template: '%s | Vantixe',
  },
  description:
    'Expert-led procurement consulting and AI-powered technology in Hong Kong. Specialist-only teams delivering transformational results without Big Four overhead.',
  keywords: [
    'procurement advisory',
    'procurement consulting',
    'cost optimization',
    'procurement transformation',
    'AI procurement',
    'TPRM',
    'negotiation agent',
    'Hong Kong',
  ],
  authors: [{ name: 'Vantixe Advisory Limited' }],
  openGraph: {
    type: 'website',
    url: 'https://www.vantixe.com/',
    title: 'Vantixe Advisory | Procurement Excellence. Delivered.',
    description:
      'Expert-led procurement consulting without Big Four overhead. Specialist-only teams at fair prices.',
    images: [{ url: '/images/og-image.jpg' }],
  },
  verification: {
    google: 'F9xwCbbnv0sj3K3dIDGDoXAD2aIuMmUC9IDGUOkWKJg',
  },
  alternates: {
    canonical: 'https://www.vantixe.com/',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <StructuredData />
        {/* Prefetch the other domain so cross-domain switches are faster */}
        <link rel="dns-prefetch" href="https://vantixe.ai" />
        <link rel="dns-prefetch" href="https://www.vantixe.com" />
        <link rel="preconnect" href="https://vantixe.ai" />
        <link rel="preconnect" href="https://www.vantixe.com" />
      </head>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
