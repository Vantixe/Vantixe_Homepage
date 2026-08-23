import type { Metadata } from 'next'
import { FadeInView } from '@/components/animations/FadeInView'
import { GradientText } from '@/components/ui/GradientText'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { CertificationBadge } from '@/components/ui/CertificationBadge'
import { ControlIcon } from '@/components/ui/ControlIcon'
import {
  SECURITY_EMAIL,
  dataProtectionControls,
  iso27001,
} from '@/lib/security'

export const metadata: Metadata = {
  title: 'Security',
  description:
    'Vantixe Advisory Limited is an ISO 27001:2022 certified company. How we protect procurement data: encryption in transit and at rest, client data isolation, single sign-on and least-privilege access.',
  alternates: {
    canonical: 'https://vantixe.ai/security',
  },
  openGraph: {
    title: 'Security',
    description:
      'Vantixe Advisory Limited is an ISO 27001:2022 certified company. How we protect procurement data across our platforms.',
    url: 'https://vantixe.ai/security',
  },
}

export default function SecurityPage() {
  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(10,138,173,0.1)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
            <FadeInView>
              <p className="text-xs font-semibold tracking-[2px] uppercase text-accent-mint mb-4">
                Security
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <GradientText>Your data. Protected.</GradientText>
              </h1>
              <p className="text-xl text-white/70 max-w-[620px] mb-8">
                Procurement data is some of the most sensitive data a company
                holds. Supplier terms, pricing, ownership records, screening
                results. We run information security as an audited management
                system, and an accredited body checks that we actually do it.
              </p>
              <Button href={`mailto:${SECURITY_EMAIL}`} variant="primary">
                Talk to our security team
              </Button>
            </FadeInView>

            <FadeInView delay={0.15} className="lg:justify-self-end">
              <CertificationBadge size="large" />
            </FadeInView>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="section-padding border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeInView>
            <SectionHeading
              dark
              centered
              title="How we protect your data"
              className="mb-14"
            />
          </FadeInView>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataProtectionControls.map((control, i) => (
              <FadeInView key={control.title} delay={i * 0.07}>
                <div className="glass rounded-2xl p-7 h-full">
                  <div className="w-11 h-11 rounded-xl bg-accent-mint/10 flex items-center justify-center mb-5">
                    <ControlIcon name={control.icon} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2.5 leading-snug">
                    {control.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {control.description}
                  </p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeInView>
            <div className="glass rounded-2xl p-8 md:p-12 text-center max-w-[760px] mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Running a security review?
              </h2>
              <p className="text-white/60 leading-relaxed mb-8">
                We will send the certificate, complete your security
                questionnaire, and walk your team through the architecture of
                the product you are evaluating.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href={`mailto:${SECURITY_EMAIL}`} variant="primary">
                  {SECURITY_EMAIL}
                </Button>
                <Button href="/contact?topic=security#form" variant="outline">
                  Send us a question
                </Button>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Responsible disclosure. One line is the whole feature. */}
      <section className="pb-12">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-sm text-white/50">
            Found a security issue in one of our products?{' '}
            <a
              href={`mailto:${SECURITY_EMAIL}`}
              className="text-accent-mint hover:text-white transition-colors font-medium"
            >
              {SECURITY_EMAIL}
            </a>
            {' '}reaches the people who can fix it.
          </p>
        </div>
      </section>

      {/* Certificate footnote. Small on purpose: buyers who need it will look. */}
      <section className="pb-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-xs text-white/35 leading-relaxed max-w-[820px]">
            {iso27001.legalEntity} operates an {iso27001.standard} certified
            information security management system. The certified scope covers
            the development, operation and delivery of our procurement software
            products and consulting services. Certification applies to the
            management system, not to individual products.
          </p>
        </div>
      </section>
    </div>
  )
}
