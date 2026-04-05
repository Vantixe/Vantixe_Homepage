'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { getTechUrl, getConsultingUrl } from '@/lib/domains'

interface NavLink {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

const consultingLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Cost Optimization', href: '/services/cost-optimization' },
      { label: 'Procurement Transformation', href: '/services/procurement-transformation' },
      { label: 'Category Management', href: '/services/category-management' },
      { label: 'Supplier Management', href: '/services/supplier-management' },
      { label: 'Risk Management', href: '/services/risk-management' },
      { label: 'Capability Building', href: '/services/capability-building' },
      { label: 'AI-Enabled Solutions', href: '/services/digital-procurement' },
    ],
  },
  { label: 'Contact', href: '/contact' },
]

const techLinks: NavLink[] = [
  { label: 'Platform', href: '/technology' },
  { label: 'TPRM', href: '/technology/tprm' },
  { label: 'Negotiation Agent', href: '/technology/negotiation-agent' },
  { label: 'Category Strategy', href: '/technology/category-strategy' },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  // Read domain from cookie (set by middleware) - available on first render, no flash
  const isOnAiDomain = typeof document !== 'undefined'
    ? document.cookie.includes('vantixe-domain=ai')
    : false

  // On vantixe.ai the pathname won't have /technology prefix (middleware rewrites it)
  const isTech = pathname.startsWith('/technology') || isOnAiDomain

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  const navLinks = isTech ? techLinks : consultingLinks

  const crossLink = isTech
    ? { label: 'Advisory', href: getConsultingUrl('/'), arrow: true }
    : { label: 'Technology', href: getTechUrl('/'), arrow: true }

  function resolveHref(href: string) {
    if (isTech && isOnAiDomain) {
      return href.replace(/^\/technology/, '') || '/'
    }
    if (!isTech && href.startsWith('/technology')) {
      return getTechUrl(href)
    }
    return href
  }

  function isExternal(href: string) {
    return href.startsWith('http')
  }

  function isActive(link: NavLink) {
    if (pathname === link.href) return true
    if (link.children?.some((c) => pathname === c.href)) return true
    return false
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTech
          ? scrolled
            ? 'bg-dark-bg/90 backdrop-blur-xl shadow-lg border-b border-white/5'
            : 'bg-transparent'
          : scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-md'
            : 'bg-white'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link href={isTech ? (isOnAiDomain ? '/' : '/technology') : '/'} className="flex-shrink-0">
          {isTech ? (
            <Image
              src="/images/logo-white.svg"
              alt="Vantixe"
              width={140}
              height={37}
              priority
            />
          ) : (
            <Image
              src="/images/logo-navbar.svg"
              alt="Vantixe"
              width={140}
              height={37}
              priority
            />
          )}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const href = resolveHref(link.href)
            const hasDropdown = link.children && link.children.length > 0

            return (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => hasDropdown && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {isExternal(href) ? (
                  <a
                    href={href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(link)
                        ? isTech
                          ? 'text-accent-mint bg-white/10'
                          : 'text-primary bg-primary/5'
                        : isTech
                          ? 'text-white/80 hover:text-white hover:bg-white/5'
                          : 'text-text-secondary hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {link.label}
                    {hasDropdown && <span className="ml-1 text-xs opacity-50">&#9662;</span>}
                  </a>
                ) : (
                  <Link
                    href={href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center ${
                      isActive(link)
                        ? isTech
                          ? 'text-accent-mint bg-white/10'
                          : 'text-primary bg-primary/5'
                        : isTech
                          ? 'text-white/80 hover:text-white hover:bg-white/5'
                          : 'text-text-secondary hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {link.label}
                    {hasDropdown && <span className="ml-1 text-xs opacity-50">&#9662;</span>}
                  </Link>
                )}

                {/* Dropdown */}
                {hasDropdown && openDropdown === link.label && (
                  <div
                    className={`absolute top-full left-0 mt-1 py-2 rounded-xl shadow-lg min-w-[240px] ${
                      isTech
                        ? 'bg-dark-elevated/95 backdrop-blur-xl border border-white/10'
                        : 'bg-white border border-gray-100'
                    }`}
                  >
                    {link.children!.map((child) => {
                      const childHref = resolveHref(child.href)
                      const ChildComponent = isExternal(childHref) ? 'a' : Link

                      return (
                        <ChildComponent
                          key={child.href}
                          href={childHref}
                          className={`block px-4 py-2.5 text-sm transition-colors ${
                            pathname === child.href
                              ? isTech
                                ? 'text-accent-mint bg-white/5'
                                : 'text-primary bg-primary/5'
                              : isTech
                                ? 'text-white/70 hover:text-white hover:bg-white/5'
                                : 'text-text-secondary hover:text-primary hover:bg-primary/5'
                          }`}
                        >
                          {child.label}
                        </ChildComponent>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}

          {/* Divider */}
          <div
            className={`w-px h-6 mx-2 ${
              isTech ? 'bg-white/20' : 'bg-gray-200'
            }`}
          />

          {/* Cross-domain link */}
          <a
            href={crossLink.href}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              isTech
                ? 'text-cta border border-cta/30 hover:bg-cta/10'
                : 'text-white bg-cta hover:bg-cta-hover'
            }`}
          >
            {crossLink.label} {crossLink.arrow && '\u2192'}
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 transition-all ${
              isTech ? 'bg-white' : 'bg-text-primary'
            } ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`w-6 h-0.5 transition-all ${
              isTech ? 'bg-white' : 'bg-text-primary'
            } ${mobileOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`w-6 h-0.5 transition-all ${
              isTech ? 'bg-white' : 'bg-text-primary'
            } ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className={`md:hidden border-t ${
            isTech
              ? 'bg-dark-bg/95 backdrop-blur-xl border-white/10'
              : 'bg-white border-gray-100'
          }`}
        >
          <div className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => {
              const href = resolveHref(link.href)
              const NavComponent = isExternal(href) ? 'a' : Link

              return (
                <div key={link.href}>
                  <NavComponent
                    href={href}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                      isActive(link)
                        ? isTech
                          ? 'text-accent-mint bg-white/10'
                          : 'text-primary bg-primary/5'
                        : isTech
                          ? 'text-white/80'
                          : 'text-text-secondary'
                    }`}
                  >
                    {link.label}
                  </NavComponent>

                  {/* Mobile sub-items */}
                  {link.children?.map((child) => {
                    const childHref = resolveHref(child.href)
                    const ChildComponent = isExternal(childHref) ? 'a' : Link
                    return (
                      <ChildComponent
                        key={child.href}
                        href={childHref}
                        className={`block px-8 py-2 text-sm ${
                          isTech ? 'text-white/50' : 'text-text-muted'
                        }`}
                      >
                        {child.label}
                      </ChildComponent>
                    )
                  })}
                </div>
              )
            })}
            <div
              className={`my-2 h-px ${isTech ? 'bg-white/10' : 'bg-gray-100'}`}
            />
            <a
              href={crossLink.href}
              className={`px-4 py-3 rounded-lg text-sm font-semibold ${
                isTech ? 'text-cta' : 'text-cta'
              }`}
            >
              {crossLink.label} {'\u2192'}
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
