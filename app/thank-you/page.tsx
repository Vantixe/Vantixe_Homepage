import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

/**
 * Landing page after a successful contact form submission. A real page load
 * on our own domain, so LinkedIn's page-load conversion rule ("URL contains
 * /thank-you") can count it. The query string (?topic=...&product=...) is set
 * by the form from what the visitor submitted and is read by the ad platforms;
 * here it only picks a heading variant through a fixed lookup.
 */
export const metadata: Metadata = {
  title: 'Thanks',
  description: 'Your message to Vantixe Advisory has been received. We respond within one business day.',
  robots: { index: false, follow: false },
  alternates: {
    canonical: 'https://www.vantixe.com/thank-you',
  },
}

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const HEADINGS: Record<string, string> = {
  demo: 'Thanks, your demo request is in.',
  quote: 'Thanks, your request for a proposal is in.',
  callback: 'Thanks, your callback request is in.',
}
const DEFAULT_HEADING = 'Thanks, we have your message.'

export default async function ThankYouPage({ searchParams }: Props) {
  const { topic } = await searchParams
  // Own keys only: "constructor" or "__proto__" in the URL would otherwise
  // resolve to Object.prototype members and crash the render.
  const heading =
    typeof topic === 'string' && Object.hasOwn(HEADINGS, topic) ? HEADINGS[topic] : DEFAULT_HEADING

  return (
    <div>
      {/* Dark hero runs under the fixed navbar, so the white tech-domain logo stays readable. */}
      <section className="bg-gradient-to-br from-primary-dark to-primary text-white pt-[72px]">
        <div className="max-w-[900px] mx-auto px-6 py-20 text-center">
          <div className="text-4xl mb-4">{'✓'}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{heading}</h1>
          <p className="text-xl text-white/80">We respond within one business day.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-[640px] mx-auto px-6 text-center">
          <p className="text-text-secondary leading-relaxed mb-8">
            Michael or someone on the Vantixe team will be in touch within one business day. For
            anything urgent, email{' '}
            <a href="mailto:hello@vantixe.com" className="text-primary hover:underline">
              hello@vantixe.com
            </a>
            .
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/" variant="primary">
              Back to the homepage
            </Button>
            <Link
              href="/contact#form"
              className="inline-flex items-center px-6 py-3 text-primary font-semibold hover:underline"
            >
              Send another message
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
