import type { Metadata } from 'next'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Vantixe Advisory was founded by former KPMG Partner Michael Seitz to deliver expert-led procurement consulting without Big Four overhead.',
}

const BOOKING_URL =
  'https://outlook.office.com/book/MeetingsWithMichael@vantixe.com/?ismsaljsauthenabled'

export default function AboutPage() {
  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-dark to-primary text-white py-20">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Vantixe</h1>
          <p className="text-xl text-white/80">
            Expert-led procurement consulting without Big Four overhead
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="max-w-[900px] mx-auto px-6">
          <h2 className="text-3xl font-bold text-text-primary mb-6">Our Story</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Vantixe was founded on a simple premise: the best procurement advisory
            doesn&apos;t require the overhead of a Big Four firm. By combining
            senior-level expertise with AI-powered tools, we deliver superior
            outcomes at a fair price.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            Our team has built and led procurement practices at KPMG, GEP, and
            other leading firms across Asia-Pacific. We&apos;ve seen firsthand how
            the traditional model burdens clients with unnecessary costs while
            delegating work to junior staff. Vantixe was created to change that.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section className="section-padding bg-bg-light">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="grid md:grid-cols-[250px_1fr] gap-10">
            <Image
              src="/images/michael-headshot.jpg"
              alt="Michael Seitz"
              width={250}
              height={333}
              className="rounded-xl shadow-card"
            />
            <div>
              <h2 className="text-3xl font-bold text-text-primary mb-1">
                Michael Seitz
              </h2>
              <p className="text-text-muted mb-6">
                Founder &amp; Managing Director
                <br />
                Former KPMG Advisory Partner | Ex-GEP North Asia Leader
              </p>
              <p className="text-text-secondary leading-relaxed mb-4">
                Michael brings 18 years of procurement advisory excellence. As a
                former Partner at KPMG, he built and led the procurement advisory
                service line across Greater China. Most recently, he served as
                GEP&apos;s North Asia leader, overseeing consulting, managed
                services, and procurement technology.
              </p>
              <p className="text-text-secondary leading-relaxed">
                His extensive network and deep industry expertise enable Vantixe to
                deliver unparalleled value to clients across industries and
                geographies throughout Asia-Pacific.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-primary-dark to-primary text-white text-center py-20">
        <div className="max-w-[600px] mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Let&apos;s Work Together</h2>
          <p className="text-white/80 mb-8">
            Ready to see what senior-led procurement consulting can achieve?
          </p>
          <Button variant="primary" size="lg" href={BOOKING_URL} external>
            Schedule a Meeting
          </Button>
        </div>
      </section>
    </div>
  )
}
