'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Footer() {
  const pathname = usePathname()
  const isTech = pathname.startsWith('/technology')

  return (
    <footer
      className={`${
        isTech ? 'bg-dark-bg border-t border-white/5' : 'bg-bg-navy'
      } text-white py-16`}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-2">VANTIXE</h3>
            <p className="text-white/60 text-sm">
              Procurement Excellence. Delivered.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="/services"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Services
              </Link>
              <a
                href="https://vantixe.ai"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Technology
              </a>
              <Link
                href="/contact"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">
              Contact
            </h4>
            <div className="flex flex-col gap-2 text-sm text-white/70">
              <a
                href="mailto:hello@vantixe.com"
                className="hover:text-white transition-colors"
              >
                hello@vantixe.com
              </a>
              <p>Unit 1603, The L. Plaza</p>
              <p>367-375 Queen&apos;s Road Central</p>
              <p>Sheung Wan, Hong Kong</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Vantixe Advisory Limited. All
            rights reserved.
          </p>
          <p className="text-xs text-white/30 max-w-xl text-center md:text-right">
            Information on this site is for general informational purposes only
            and does not create a client relationship. Please do not submit
            confidential information via this website.
          </p>
        </div>
      </div>
    </footer>
  )
}
