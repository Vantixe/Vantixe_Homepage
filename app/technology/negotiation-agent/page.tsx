import type { Metadata } from 'next'
import { ProductPageLayout } from '@/components/technology/ProductPageLayout'
import { ProductDemo } from '@/components/technology/ProductDemo'
import { FadeInView } from '@/components/animations/FadeInView'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { products } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Quote Negotiation Agent',
  description:
    'AI-powered procurement automation that monitors your inbox, extracts supplier quotes in <30s, benchmarks pricing with 4-level analysis, and drafts negotiation emails autonomously.',
}

const agent = products.find((p) => p.id === 'negotiation-agent')!

const demoSlides = [
  {
    image: '/images/demos/negotiation-agent/dashboard.png',
    label: 'Full Visibility',
    title: 'Your Negotiation Pipeline at a Glance',
    description: 'No more pricing data trapped in email threads. The dashboard gives buyers a single view of all active sourcing events, incoming quotes and cumulative savings - replacing spreadsheets and inbox searching.',
  },
  {
    image: '/images/demos/negotiation-agent/sourcing-events.png',
    label: 'Automatic Organisation',
    title: 'Quotes Grouped Into Sourcing Events',
    description: 'The agent monitors your inbox 24/7, extracts quotes from PDF, Excel and Word attachments, and automatically groups them by RFQ. What used to take hours of manual sorting happens in seconds.',
  },
  {
    image: '/images/demos/negotiation-agent/quote-comparison.png',
    label: 'Instant Benchmarking',
    title: 'Every Price Benchmarked Across Suppliers',
    description: 'Line-item-level comparison across all responding suppliers. Instantly see who is cheapest, who is most expensive and where the negotiation opportunities are - across every item in the RFQ.',
  },
  {
    image: '/images/demos/negotiation-agent/draft-email.png',
    label: 'AI-Composed',
    title: 'Data-Backed Negotiation, Ready to Send',
    description: 'The agent drafts a professional negotiation email with target prices derived from the 4-level price analysis: RFQ-level comparison, same-supplier history, cross-supplier market data and part number matches. The internal strategy brief shows the buyer the full rationale and savings potential.',
  },
]

export default function NegotiationAgentPage() {
  return (
    <ProductPageLayout
      product={agent}
      ctaText="See It In Action"
      demo={<ProductDemo slides={demoSlides} interval={6} className="mb-12" />}
    >
      {/* Pipeline */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeInView>
            <SectionHeading
              label="How It Works"
              title="A 9-Step Autonomous Pipeline"
              subtitle="From the moment a supplier email arrives to the negotiation response being sent, the agent handles each step with full auditability."
              dark
              centered
            />
          </FadeInView>

          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {pipeline.map((step, i) => (
              <FadeInView key={step.label} delay={i * 0.08}>
                <div className="flex items-center gap-3">
                  <div className="glass rounded-xl p-5 text-center w-28 hover:border-accent-mint/30 hover:-translate-y-1 transition-all border border-white/10">
                    <div className="text-2xl mb-2">{step.icon}</div>
                    <div className="text-xs font-semibold text-white">
                      {step.label}
                    </div>
                    <div className="text-[10px] text-white/40 mt-1">
                      {step.sub}
                    </div>
                  </div>
                  {i < pipeline.length - 1 && (
                    <span className="text-accent-mint hidden md:block">
                      {'\u25B6'}
                    </span>
                  )}
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeInView>
            <SectionHeading
              label="Capabilities"
              title="Built for Procurement Teams"
              subtitle="Every feature is designed to save your buyers time, surface pricing insights, and maintain full control over what gets sent to suppliers."
              dark
              centered
            />
          </FadeInView>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {features.map((feature, i) => (
              <FadeInView key={feature.title} delay={i * 0.1}>
                <Card dark className="h-full">
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="section-padding border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeInView>
            <SectionHeading
              label="Trust & Safety"
              title="You Stay in Control"
              subtitle="The agent is powerful but never reckless. Every safeguard ensures you can trust the system to act on your behalf - or pause and review first."
              dark
              centered
            />
          </FadeInView>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {safety.map((item, i) => (
              <FadeInView key={item.title} delay={i * 0.1}>
                <div className="flex gap-4 glass rounded-xl p-6">
                  <div className="text-2xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-white/60 text-sm">{item.description}</p>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>
    </ProductPageLayout>
  )
}

const pipeline = [
  { icon: '\uD83D\uDCE8', label: 'Fetch Email', sub: 'Scan inbox' },
  { icon: '\uD83D\uDD0D', label: 'Classify', sub: 'Quote or not?' },
  { icon: '\uD83D\uDCCB', label: 'Extract', sub: 'Parse line items' },
  { icon: '\uD83D\uDCBE', label: 'Save Quote', sub: 'Store & index' },
  { icon: '\uD83D\uDCCA', label: 'Analyze', sub: 'Price benchmark' },
  { icon: '\uD83C\uDFAF', label: 'Strategize', sub: 'Pick approach' },
  { icon: '\u270D\uFE0F', label: 'Compose', sub: 'Draft response' },
  { icon: '\u2705', label: 'Threshold', sub: 'Auto or approve' },
  { icon: '\uD83D\uDCE4', label: 'Send/Queue', sub: 'Act or escalate' },
]

const features = [
  {
    icon: '\uD83D\uDCE7',
    title: 'Intelligent Inbox Monitoring',
    description:
      'Connects to your Microsoft 365 mailbox and automatically identifies supplier quote emails, filtering out noise. Supports historical backfill to build pricing intelligence from day one.',
  },
  {
    icon: '\uD83D\uDCC4',
    title: 'Multi-Format Document Extraction',
    description:
      'Reads quotes from PDF, Excel, and Word attachments. AI-powered extraction pulls supplier names, quote numbers, line items, quantities, unit prices, and totals with high confidence scoring.',
  },
  {
    icon: '\uD83D\uDCC8',
    title: '4-Level Price Analysis',
    description:
      'Benchmarks every quoted price using RFQ-level comparison, same-supplier history, cross-supplier market data, and part number matching. Calculates optimal target prices automatically.',
  },
  {
    icon: '\uD83D\uDCE6',
    title: 'RFQ Grouping & Sourcing Events',
    description:
      'Automatically clusters related quotes into sourcing events. Compare suppliers side-by-side with line-item-level breakdowns and launch batch negotiations across all respondents.',
  },
  {
    icon: '\uD83D\uDCDD',
    title: 'AI-Drafted Negotiations',
    description:
      'Generates professional negotiation emails with data-backed counteroffers. Every claim references real pricing data. A separate AI proofread pass ensures accuracy before anything is sent.',
  },
  {
    icon: '\uD83D\uDEE1\uFE0F',
    title: 'Configurable Approval Workflows',
    description:
      'Threshold gates control what sends automatically vs. what gets queued for human review. Rules based on dollar amount, extraction confidence, supplier familiarity, and discount depth.',
  },
]

const safety = [
  {
    icon: '\uD83D\uDD12',
    title: 'Human-in-the-Loop by Default',
    description:
      'Emails are queued for approval unless all auto-send criteria are met. You decide the thresholds.',
  },
  {
    icon: '\uD83D\uDEAB',
    title: 'Data-Backed Only',
    description:
      'Every negotiation strategy and target price references real pricing data from your database. Strict guardrails ensure accuracy.',
  },
  {
    icon: '\uD83D\uDD0D',
    title: 'AI Proofread Pass',
    description:
      'Every composed email is verified by a second AI check for hallucinated claims before it reaches anyone.',
  },
  {
    icon: '\uD83D\uDCDD',
    title: 'Full Audit Trail',
    description:
      'Every pipeline step is logged with timestamps, confidence scores, and decision rationale.',
  },
  {
    icon: '\uD83C\uDFE2',
    title: 'Multi-Tenant Isolation',
    description:
      'Row-level security ensures each client\'s data is completely isolated. No cross-tenant leakage.',
  },
  {
    icon: '\uD83E\uDDEA',
    title: 'Dry-Run Mode',
    description:
      'Test the full pipeline without sending any real emails. Validate extraction and strategy before going live.',
  },
]
