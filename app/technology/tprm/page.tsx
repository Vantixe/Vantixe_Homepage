import type { Metadata } from 'next'
import { ProductPageLayout } from '@/components/technology/ProductPageLayout'
import { ProductDemo } from '@/components/technology/ProductDemo'
import { FadeInView } from '@/components/animations/FadeInView'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { products } from '@/lib/products'

export const metadata: Metadata = {
  title: 'TPRM - Third-Party Risk Management',
  description:
    'Enterprise-grade compliance platform: automated KYC, sanctions & PEP screening across 40+ lists, continuous monitoring for 200K entities, and AI-powered due diligence reports.',
}

const tprm = products.find((p) => p.id === 'tprm')!

const demoSlides = [
  {
    image: '/images/demos/tprm/dashboard.png',
    label: 'Command Center',
    title: 'KYC Dashboard',
    description: 'Complete visibility across all suppliers - risk levels, compliance status, pending reviews and expiring certifications at a glance.',
  },
  {
    image: '/images/demos/tprm/kyc-invite.png',
    label: 'Automated Onboarding',
    title: 'KYC Questionnaire Invitations',
    description: 'Suppliers receive branded email invitations with unique reference numbers, deadline tracking and automatic reminders.',
  },
  {
    image: '/images/demos/tprm/supplier-clean.png',
    label: 'Streamlined Reviews',
    title: 'Supplier Detail & Approval',
    description: 'Full KYC profile with screening results, document uploads, approval workflows and complete audit history.',
  },
  {
    image: '/images/demos/tprm/supplier-risk.png',
    label: 'Instant Detection',
    title: 'High-Risk Entity Flagged',
    description: 'Every entity screened across 40+ global sanctions lists automatically. Match scores, source details and risk levels ready for analyst review.',
  },
  {
    image: '/images/demos/tprm/ai-copilot.png',
    label: 'AI-Powered Analysis',
    title: 'AI Copilot',
    description: 'Ask questions about any match. Get background on sanctioned individuals and companies, risk assessments with reasoning, and clear next-step recommendations for the buyer.',
  },
  {
    image: '/images/demos/tprm/batch-screening.png',
    label: 'Scale',
    title: 'Batch Sanctions Screening',
    description: 'Upload your entire supplier base and screen thousands of entities in one go. CSV upload, automatic sanctions and PEP checks, risk-scored results in minutes - not days.',
  },
  {
    image: '/images/demos/tprm/monitoring.png',
    label: 'Always Watching',
    title: 'Continuous Monitoring',
    description: 'Onboarded suppliers are monitored continuously. When sanctions lists change, the platform detects new matches automatically and alerts your team.',
  },
]

export default function TPRMPage() {
  return (
    <ProductPageLayout
      product={tprm}
      ctaText="See TPRM in Action"
      demo={<ProductDemo slides={demoSlides} interval={6} className="mb-12" />}
    >
      {/* Workflow */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeInView>
            <SectionHeading
              label="Platform Overview"
              title="End-to-End Third-Party Risk Lifecycle"
              subtitle="From initial onboarding and KYC collection through real-time screening, continuous monitoring, and AI-assisted due diligence. All in a single platform."
              dark
              centered
            />
          </FadeInView>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {workflow.map((step, i) => (
              <FadeInView key={step.title} delay={i * 0.1}>
                <Card dark className="h-full">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-dark to-primary text-white flex items-center justify-center font-bold text-sm mb-4">
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">
                    {step.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded text-xs font-medium bg-primary/15 text-accent-mint"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Screening Engine */}
      <section className="section-padding border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeInView>
            <SectionHeading
              label="Screening Engine"
              title="Multi-Source Intelligence, One Decision"
              subtitle="The platform aggregates and cross-references data from global regulatory lists, PEP databases, and corporate registries."
              dark
              centered
            />
          </FadeInView>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {screeningPillars.map((pillar, i) => (
              <FadeInView key={pillar.title} delay={i * 0.1}>
                <Card dark className="h-full">
                  <h3 className="text-lg font-bold text-white mb-4">
                    {pillar.title}
                  </h3>
                  <ul className="space-y-2">
                    {pillar.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-white/70"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-mint mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </FadeInView>
            ))}
          </div>

          {/* Flow */}
          <FadeInView delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-12">
              {screeningFlow.map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="px-4 py-2 rounded-lg glass text-white/80 text-sm font-medium">
                    {step}
                  </span>
                  {i < screeningFlow.length - 1 && (
                    <span className="text-accent-mint">{'\u2192'}</span>
                  )}
                </div>
              ))}
            </div>
          </FadeInView>
        </div>
      </section>

      {/* AI Capabilities */}
      <section className="section-padding border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeInView>
            <SectionHeading
              label="Artificial Intelligence"
              title="AI-Powered Compliance Intelligence"
              subtitle="Powered by configurable, leading generative AI providers, the platform delivers on-demand research, contextual assistance, and automated due diligence report generation."
              dark
              centered
            />
          </FadeInView>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {aiCapabilities.map((cap, i) => (
              <FadeInView key={cap.title} delay={i * 0.1}>
                <Card dark className="h-full">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-4">{cap.description}</p>
                  <ul className="space-y-1.5">
                    {cap.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-white/70"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </Card>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

    </ProductPageLayout>
  )
}

const workflow = [
  {
    title: 'KYC Onboarding & Questionnaire',
    description:
      'Invite third parties via email to complete a dynamic, multi-level questionnaire (L1/L2/L3) with document uploads. Suppliers can save progress, resume later, and receive automated deadline reminders.',
    tags: ['Auto-reminders', 'Doc uploads', 'Save & resume', 'Multi-level'],
  },
  {
    title: 'Sanctions & PEP Screening',
    description:
      'Every submitted entity is automatically screened against global sanctions and PEP lists including OFAC, UN, EU, and UK. Configurable fuzzy matching catches name variations and aliases.',
    tags: ['OFAC', 'UN', 'EU', 'UK', 'PEP', 'Fuzzy match'],
  },
  {
    title: 'Review & Decision Workflow',
    description:
      'Compliance analysts review flagged matches with full context: match score, source list, alias details, and entity type. Every decision is captured in an immutable audit log.',
    tags: ['Escalation', 'Audit trail', 'False positive mgmt'],
  },
  {
    title: 'Continuous Monitoring & Alerts',
    description:
      'Approved entities are placed on a continuous monitoring list (up to 200K). Daily delta screening detects new matches, removals, or changes across all lists.',
    tags: ['Daily delta', 'Change detection', 'Auto-alerts'],
  },
]

const screeningPillars = [
  {
    title: 'Sanctions Screening',
    items: [
      '40+ global sanctions lists with version tracking',
      'OFAC, UN, EU, UK HMT, and more',
      'Configurable sensitivity (lenient / balanced / strict)',
      'Best-practice fuzzy matching for name variations, transliterations and aliases',
      'Sub-second lookups across the full database',
      'Admin-configurable list toggles (enable/disable per list)',
    ],
  },
  {
    title: 'PEP Screening',
    items: [
      'Politically Exposed Persons data feed',
      'Separate sensitivity configuration from sanctions',
      'Automatic sanctions and PEP checks on KYC submission, batch upload and quick check',
      'Match scoring with risk level assignment',
      'Data freshness monitoring',
      'Version tracking and update alerts',
    ],
  },
  {
    title: 'Corporate Intelligence',
    items: [
      'UBO (Beneficial Owner) lookup',
      'Persons with Significant Control (PSC) data',
      'Ownership percentage and control type visibility',
      'UBO screening against sanctions & PEP',
      'Cached results with configurable freshness',
    ],
  },
]

const screeningFlow = [
  'Entity Submitted',
  'Sanctions Check',
  'PEP Check',
  'UBO Lookup',
  'Risk Score',
  'Analyst Review',
]

const aiCapabilities = [
  {
    title: 'AI Due Diligence Reports',
    description:
      'One-click generation of comprehensive risk reports for any supplier or monitored entity - covering legal, regulatory, reputational and ESG dimensions.',
    features: [
      'Litigation, lawsuits and legal proceedings screening',
      'Regulatory enforcement actions and sanctions history',
      'Adverse media and negative news detection',
      'ESG risk assessment across Environmental, Social, Governance',
      'Export as branded PDF with full source attribution',
    ],
  },
  {
    title: 'AI Copilot Assistant',
    description:
      'A context-aware AI chat assistant available on every page of the platform.',
    features: [
      'Page-aware context (supplier, batch, monitoring)',
      'Quick action suggestions per page type',
      'Natural language compliance Q&A',
      'Token usage tracking and rate limits',
      'Configurable model, temperature, and limits',
    ],
  },
  {
    title: 'Intelligent Deduplication',
    description:
      'Advanced entity matching automatically detects duplicates across batch uploads, KYC submissions, and manual entries.',
    features: [
      'Cross-source duplicate detection',
      'Normalized name comparison',
      'Type-aware matching (company vs individual)',
      'KYC-to-screening entity linking suggestions',
      'One-click confirm or reject link',
    ],
  },
  {
    title: 'Smart Alerts & Notifications',
    description:
      'Multi-channel notification system with configurable triggers for real-time compliance awareness.',
    features: [
      'Email alerts for new sanctions matches',
      'KYC deadline reminders (configurable days)',
      'Expiry notifications (1-month, 1-week)',
      'Bounce handling with automatic retry',
      'Per-user notification preferences',
    ],
  },
]

