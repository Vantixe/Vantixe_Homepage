import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Vantixe Advisory. Schedule a meeting, send us an email, or visit our office in Hong Kong.',
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

      {/* Contact Info */}
      <section className="section-padding">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Schedule */}
            <div className="bg-white border-2 border-gray-100 rounded-xl p-8 text-center hover:border-primary/30 transition-colors">
              <div className="text-3xl mb-4">{'\uD83D\uDCC5'}</div>
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
              <div className="text-3xl mb-4">{'\uD83D\uDCE7'}</div>
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
              <div className="text-3xl mb-4">{'\uD83C\uDFE2'}</div>
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

          {/* Note */}
          <div className="bg-bg-light rounded-xl p-8 text-center">
            <p className="text-text-muted text-sm">
              Prefer a more detailed conversation? Schedule a meeting above or
              send us an email describing your procurement challenges. We&apos;ll
              come prepared with relevant experience and ideas.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
