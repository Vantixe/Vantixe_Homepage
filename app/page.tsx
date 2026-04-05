import { Hero } from '@/components/consulting/Hero'
import { TrustSignals } from '@/components/consulting/TrustSignals'
import { WhyVantixe } from '@/components/consulting/WhyVantixe'
import { ServicesGrid } from '@/components/consulting/ServicesGrid'
import { Leadership } from '@/components/consulting/Leadership'
import { ConsultingCTA } from '@/components/consulting/ConsultingCTA'
import { TechHero } from '@/components/technology/TechHero'
import { ProductPipeline } from '@/components/technology/ProductPipeline'
import { ProductShowcase } from '@/components/technology/ProductShowcase'
import { IntegrationHub } from '@/components/technology/IntegrationHub'
import { CustomAgents } from '@/components/technology/CustomAgents'
import { TechCTA } from '@/components/technology/TechCTA'

export default function HomePage() {
  return (
    <>
      {/* ===== CONSULTING SECTIONS (Bright Theme) ===== */}
      <Hero />
      <TrustSignals />

      {/* FT Banner */}
      <section className="py-12 bg-white">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <p className="text-lg text-text-muted leading-relaxed">
            Boutique advisory firms are proving that bigger isn&apos;t better.{' '}
            <strong className="text-primary">Focused is better</strong>. Just as
            specialist investment banks now rival bulge brackets in deal volumes,
            boutique consultancies are delivering superior outcomes through
            senior-led execution, focused mandates, and elimination of Big Four
            overhead and conflicts. Vantixe brings this proven model to procurement
            advisory.
          </p>
        </div>
      </section>

      <WhyVantixe />
      <ServicesGrid />
      <Leadership />
      <ConsultingCTA />

      {/* References */}
      <section className="py-8 bg-bg-light">
        <div className="max-w-[900px] mx-auto px-6">
          <h3 className="text-base text-text-muted mb-4">References</h3>
          <p className="text-sm text-text-muted leading-relaxed">
            [1] &quot;Boutique consultancy firms give the Big Four a run for their
            money,&quot; <em>Financial Times</em>, April 27, 2025.{' '}
            <a
              href="https://www.ft.com/content/c45f48c6-fbcd-4790-9dce-50586bb71741"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              ft.com
            </a>
          </p>
        </div>
      </section>

      {/* ===== THEME TRANSITION ===== */}
      <div className="h-48 bg-gradient-to-b from-bg-light via-[#0D1B2A] to-dark-bg" />

      {/* ===== TECHNOLOGY SECTION (Dark Theme) ===== */}
      <section className="bg-dark-bg section-padding relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(10,138,173,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <TechHero />
          <ProductPipeline />
          <ProductShowcase />
          <IntegrationHub />
          <CustomAgents />
          <TechCTA />
        </div>
      </section>
    </>
  )
}
