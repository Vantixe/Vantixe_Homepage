'use client'

import { FadeInView } from '@/components/animations/FadeInView'

export function WhyVantixe() {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeInView>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Why Vantixe?
          </h2>
          <p className="text-lg text-text-muted max-w-[700px] mb-12">
            The consulting industry has experienced two major disruptions. Vantixe
            is built to leverage both for your benefit.
          </p>
        </FadeInView>

        {/* Disruption Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <FadeInView delay={0.1}>
            <div className="bg-white border-2 border-gray-100 rounded-xl p-8 h-full hover:border-primary/30 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-250">
              <div className="text-4xl font-bold text-primary/20 mb-4">01</div>
              <h3 className="text-xl font-bold text-text-primary mb-4">
                Structural Advantage
              </h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                The past few years proved that expensive corporate infrastructure is
                unnecessary for consulting excellence. The global shift to remote
                collaboration validated what boutique firms already knew: premium
                office towers, marble lobbies, and extensive back-office teams
                don&apos;t improve client outcomes - they simply burden clients with
                overhead costs.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Vantixe operates on this validated model: lean structure, senior
                specialists delivering on-site, and agile execution without
                bureaucracy. You pay for expertise working directly with your teams -
                not for infrastructure that adds no value.
              </p>
            </div>
          </FadeInView>

          <FadeInView delay={0.2}>
            <div className="bg-white border-2 border-gray-100 rounded-xl p-8 h-full hover:border-primary/30 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-250">
              <div className="text-4xl font-bold text-primary/20 mb-4">02</div>
              <h3 className="text-xl font-bold text-text-primary mb-4">
                The AI Transformation
              </h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                Artificial intelligence has fundamentally changed procurement
                consulting economics. Tasks that once required teams of junior
                analysts (spend data analysis, supplier research, market
                intelligence, benchmarking, RFP drafting) are now handled by
                AI-powered workflows with greater speed and accuracy.
              </p>
              <p className="text-text-secondary leading-relaxed mb-4">
                At Vantixe, AI isn&apos;t an add-on. It&apos;s integrated into every
                engagement. Our senior specialists use AI-powered analytics,
                automation tools, and decision support systems to amplify their
                expertise.
              </p>
              <ul className="space-y-2 text-text-secondary text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Spend analytics completed in days, not weeks
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Custom-built apps for real-time supplier risk monitoring
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Market intelligence gathered and synthesized at scale
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Category strategies developed with comprehensive data backing
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  Continuous insight generation, not static reports
                </li>
              </ul>
            </div>
          </FadeInView>
        </div>

        {/* Differentiators */}
        <FadeInView>
          <div className="bg-bg-light rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-text-primary mb-8 text-center">
              The Vantixe Advantage
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {differentiators.map((d) => (
                <div key={d.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    &#x2713;
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">
                      {d.title}
                    </h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {d.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  )
}

const differentiators = [
  {
    title: 'Specialist-Only Teams',
    description:
      'Every consultant on your project is a procurement expert with real-world experience. No junior analysts. No learning curves. Just seasoned specialists delivering results.',
  },
  {
    title: 'Senior-Led, On-Site Delivery',
    description:
      'Your engagement is delivered by senior specialists on-site, not just overseen. Vantixe seniors are present throughout execution, working directly with your teams to drive results.',
  },
  {
    title: 'Compelling Value',
    description:
      'We eliminate the structural conflict of junior leverage models, passing savings to clients while ensuring senior-led delivery. You pay for expertise and outcomes, not overhead.',
  },
  {
    title: 'AI-Enhanced Delivery',
    description:
      'Technology built into every engagement. AI-powered analytics for spend analysis, custom-built apps for supplier risk and KYC, guided category strategy tools, and automation for repetitive tasks.',
  },
]
