import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import type { ServicePageData } from '@/lib/services'

const BOOKING_URL =
  'https://outlook.office.com/book/MeetingsWithMichael@vantixe.com/?ismsaljsauthenabled'

export function ServicePageLayout({ data }: { data: ServicePageData }) {
  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-dark via-[#003844] to-text-primary text-white py-20 min-h-[50vh] flex items-center">
        <div className="max-w-[1200px] mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{data.title}</h1>
          <p className="text-xl text-accent-mint font-light tracking-wide uppercase mb-6">
            {data.tagline}
          </p>
          <p className="text-lg text-white/85 max-w-[700px] leading-relaxed mb-8">
            {data.intro}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="lg" href={BOOKING_URL} external>
              {data.ctaButton}
            </Button>
            <Button variant="white" size="lg" href="/services">
              All Services
            </Button>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="section-padding">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="text-3xl font-bold text-text-primary mb-8">
            {data.challengeTitle}
          </h2>
          {data.challengeParagraphs.map((p, i) => (
            <p
              key={i}
              className="text-lg text-text-muted leading-relaxed mb-4"
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="section-padding bg-bg-light">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Our Approach
          </h2>
          <p className="text-lg text-text-muted max-w-[700px] mb-12">
            {data.approachIntro}
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {data.steps.map((step) => (
              <div
                key={step.number}
                className="bg-white border-2 border-gray-100 rounded-xl p-8 hover:border-primary/30 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-250"
              >
                <div className="text-4xl font-bold text-primary/20 mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="section-padding">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="text-3xl font-bold text-text-primary mb-8">
            What We Deliver
          </h2>
          <div className="bg-bg-light rounded-xl p-8">
            <ul className="space-y-3">
              {data.deliverables.map((d, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-text-secondary"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Tech Callout (only for Digital Procurement) */}
      {data.techCallout && (
        <section className="py-12 bg-gradient-to-r from-dark-bg to-dark-surface text-white">
          <div className="max-w-[800px] mx-auto px-6 text-center">
            <h3 className="text-2xl font-bold mb-4">
              {data.techCallout.title}
            </h3>
            <p className="text-white/70 mb-6">{data.techCallout.description}</p>
            <Button href={data.techCallout.href} variant="outline" size="lg">
              {data.techCallout.buttonText} {'\u2192'}
            </Button>
          </div>
        </section>
      )}

      {/* Why Vantixe */}
      <section className="section-padding bg-bg-light">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-bold text-text-primary mb-8">
            Why Work With Us
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {data.whyVantixe.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  &#x2713;
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="section-padding">
        <div className="max-w-[900px] mx-auto px-6">
          <h2 className="text-3xl font-bold text-text-primary mb-8">
            Related Services
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {data.relatedServices.map((rs) => {
              const isExternal = rs.href.startsWith('http')
              const Component = isExternal ? 'a' : Link
              return (
              <Component
                key={rs.title}
                href={rs.href}
                className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-primary/30 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-250 no-underline block"
              >
                <div className="text-3xl mb-3">{rs.icon}</div>
                <h3 className="text-base font-bold text-text-primary mb-2">
                  {rs.title}
                </h3>
                <p className="text-sm text-text-secondary">{rs.description}</p>
              </Component>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-primary-dark to-primary text-white text-center py-20">
        <div className="max-w-[600px] mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-white/80 mb-8">
            Let&apos;s discuss how we can help transform your procurement function.
          </p>
          <Button variant="primary" size="lg" href={BOOKING_URL} external>
            Book a Meeting
          </Button>
        </div>
      </section>
    </div>
  )
}
