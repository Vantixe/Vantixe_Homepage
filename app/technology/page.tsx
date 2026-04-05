import type { Metadata } from 'next'
import { TechHero } from '@/components/technology/TechHero'
import { ProductPipeline } from '@/components/technology/ProductPipeline'
import { ProductShowcase } from '@/components/technology/ProductShowcase'
import { IntegrationHub } from '@/components/technology/IntegrationHub'
import { CustomAgents } from '@/components/technology/CustomAgents'
import { TechCTA } from '@/components/technology/TechCTA'

export const metadata: Metadata = {
  title: 'Technology Platform',
  description:
    'AI-powered procurement technology by Vantixe. Enterprise-grade platforms for third-party risk management, quote negotiation, and category strategy.',
}

export default function TechnologyPage() {
  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(10,138,173,0.1)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <TechHero />

          {/* Philosophy */}
          <div className="glass rounded-2xl p-8 md:p-12 mb-20 max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-bold text-white mb-4">
              Built by Practitioners, Not Just Engineers
            </h3>
            <p className="text-white/60 leading-relaxed">
              Most procurement tech is built by software companies that understand
              technology but not procurement. Vantixe is different. Our platforms
              are designed by procurement experts who have spent decades in the
              trenches - then built by engineers who turn that expertise into
              enterprise-grade software. The result: technology that actually solves
              real procurement problems.
            </p>
          </div>

          <ProductPipeline />
          <ProductShowcase />
          <IntegrationHub />
          <CustomAgents />
          <TechCTA showExplore={false} />
        </div>
      </section>
    </div>
  )
}
