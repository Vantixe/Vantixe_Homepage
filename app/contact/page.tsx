import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Button } from '@/components/ui/Button'
import { ContactForm } from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Vantixe Advisory. Request a quote, book a product demo, schedule a meeting, or leave us a message. We respond within one business day.',
  alternates: {
    canonical: 'https://www.vantixe.com/contact',
  },
  openGraph: {
    title: 'Contact Vantixe Advisory',
    description:
      'Get in touch with Vantixe Advisory. Request a quote, book a product demo, schedule a meeting, or leave us a message. We respond within one business day.',
    url: 'https://www.vantixe.com/contact',
  },
}

const BOOKING_URL =
  'https://outlook.office.com/book/MeetingsWithMichael@vantixe.com/?ismsaljsauthenabled'

export default function ContactPage() {
  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-dark to-primary text-white py-20">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-white/80">
            Let&apos;s discuss how Vantixe can help transform your procurement
          </p>
        </div>
      </section>

      {/* Quick paths */}
      <section className="pt-20 pb-12">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Schedule */}
            <div className="bg-white border-2 border-gray-100 rounded-xl p-8 text-center hover:border-primary/30 transition-colors">
              <div className="text-3xl mb-4">{'📅'}</div>
              <h3 className="text-lg font-bold text-text-primary mb-2">
                Schedule a Meeting
              </h3>
              <p className="text-sm text-text-muted mb-4">
                Book a time directly with Michael Seitz
              </p>
              <Button href={BOOKING_URL} external size="sm">
                Book Now
              </Button>
            </div>

            {/* Email */}
            <div className="bg-white border-2 border-gray-100 rounded-xl p-8 text-center hover:border-primary/30 transition-colors">
              <div className="text-3xl mb-4">{'📧'}</div>
              <h3 className="text-lg font-bold text-text-primary mb-2">
                Email Us
              </h3>
              <p className="text-sm text-text-muted mb-4">
                We typically respond within 24 hours
              </p>
              <a
                href="mailto:hello@vantixe.com"
                className="text-primary font-semibold hover:underline"
              >
                hello@vantixe.com
              </a>
            </div>

            {/* Office */}
            <div className="bg-white border-2 border-gray-100 rounded-xl p-8 text-center hover:border-primary/30 transition-colors">
              <div className="text-3xl mb-4">{'🏢'}</div>
              <h3 className="text-lg font-bold text-text-primary mb-2">
                Our Office
              </h3>
              <p className="text-sm text-text-muted">
                Unit 1603, The L. Plaza
                <br />
                367-375 Queen&apos;s Road Central
                <br />
                Sheung Wan, Hong Kong
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <section className="pb-4">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="flex items-center gap-4 text-text-muted/60 text-sm">
            <div className="flex-1 h-px bg-gray-200" />
            <span>or leave us a message</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
        </div>
      </section>

      {/* Inquiry form */}
      <section id="form" className="pb-24 scroll-mt-24">
        <div className="max-w-[820px] mx-auto px-6">
          <Suspense fallback={<div className="h-[400px]" />}>
            <ContactForm turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} />
          </Suspense>
          <p className="text-center text-xs text-text-muted/70 mt-6">
            We respond within one business day. Please don&apos;t send confidential information via this form.
          </p>
        </div>
      </section>
    </div>
  )
}
