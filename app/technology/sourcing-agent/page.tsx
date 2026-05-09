import type { Metadata } from 'next'
import { ProductPageLayout } from '@/components/technology/ProductPageLayout'
import { ProductDemo } from '@/components/technology/ProductDemo'
import { FAQSchema } from '@/components/layout/FAQSchema'
import { FadeInView } from '@/components/animations/FadeInView'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { products } from '@/lib/products'
import { productFaqs } from '@/lib/faqs'

export const metadata: Metadata = {
  title: 'Sourcing Agent',
  description:
    'AI agent that runs your full sourcing cycle - build the RFQ, distribute to suppliers, collect responses (form or email), benchmark prices, draft and send negotiations, and recur on schedule.',
  alternates: {
    canonical: 'https://vantixe.ai/sourcing-agent',
  },
  openGraph: {
    title: 'Sourcing Agent',
    description:
      'AI agent that runs your full sourcing cycle - build the RFQ, distribute to suppliers, collect responses (form or email), benchmark prices, draft and send negotiations, and recur on schedule.',
    url: 'https://vantixe.ai/sourcing-agent',
  },
}

const agent = products.find((p) => p.id === 'sourcing-agent')!

const demoSlides = [
  {
    image: '/images/demos/sourcing-agent/dashboard.png',
    label: 'Full Visibility',
    title: 'Your Sourcing Pipeline at a Glance',
    description: 'No more pricing data trapped in email threads. The dashboard gives buyers a single view of every active sourcing event - inbound or outbound - with incoming quotes and cumulative savings in one place.',
  },
  {
    image: '/images/demos/sourcing-agent/sourcing-events.png',
    label: 'Automatic Organisation',
    title: 'Quotes Grouped Into Sourcing Events',
    description: 'Whether suppliers respond via the structured form or by email reply, every quote lands in the same RFQ-grouped view. Side-by-side comparison across all responding suppliers, no manual sorting required.',
  },
  {
    image: '/images/demos/sourcing-agent/quote-comparison.png',
    label: 'Instant Benchmarking',
    title: 'Every Price Benchmarked Across Suppliers',
    description: 'Line-item-level comparison across all responding suppliers. Instantly see who is cheapest, who is most expensive and where the negotiation opportunities are - across every item in the RFQ.',
  },
  {
    image: '/images/demos/sourcing-agent/draft-email.png',
    label: 'AI-Composed',
    title: 'Data-Backed Negotiation, Ready to Send',
    description: 'The agent drafts a professional negotiation email with target prices derived from a 4-level price analysis: RFQ-level comparison, same-supplier history, cross-supplier market data and part number matches. The internal strategy brief shows the buyer the full rationale and savings potential.',
  },
]

export default function SourcingAgentPage() {
  return (
    <>
    <FAQSchema faqs={productFaqs['sourcing-agent']} />
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
              title="A 7-Step Sourcing Lifecycle"
              subtitle="From building the RFQ to closing the cycle, the agent handles each step with full auditability - and runs again on schedule."
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
                      {'▶'}
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
              subtitle="Every feature is designed to save your buyers time, surface pricing insights, and maintain full control over what goes out to suppliers."
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
    </>
  )
}

const pipeline = [
  { icon: '📋', label: 'Build RFQ', sub: 'Items, suppliers, terms' },
  { icon: '📤', label: 'Distribute', sub: 'Tokenized links' },
  { icon: '📥', label: 'Collect', sub: 'Form or email' },
  { icon: '📊', label: 'Benchmark', sub: '4-level analysis' },
  { icon: '✍️', label: 'Negotiate', sub: 'AI-drafted' },
  { icon: '✅', label: 'Approve & Send', sub: 'Threshold gates' },
  { icon: '🔁', label: 'Repeat', sub: 'Recurring templates' },
]

const features = [
  {
    icon: '📋',
    title: 'RFQ Builder',
    description:
      'Single-page builder for line items, suppliers, deadlines, T&Cs and attachments. Excel template import or clone-from-template for recurring sourcing cycles.',
  },
  {
    icon: '📤',
    title: 'Tokenized Supplier Distribution',
    description:
      'Invitation emails sent from your own mailbox with HMAC-signed response links. Suppliers complete a structured form - no login, no shared passwords, deadline-bound access.',
  },
  {
    icon: '📥',
    title: 'Dual-Channel Collection',
    description:
      'Suppliers respond via the structured form or by email reply. Both feed the same Quote pipeline so buyers see one unified view regardless of how the supplier responded.',
  },
  {
    icon: '📄',
    title: 'Multi-Format Document Extraction',
    description:
      'Reads quotes from PDF, Excel and Word attachments. AI-powered extraction pulls supplier names, quote numbers, line items, quantities, unit prices and totals with high confidence scoring.',
  },
  {
    icon: '📈',
    title: '4-Level Price Analysis',
    description:
      'Benchmarks every quoted price using RFQ-level comparison, same-supplier history, cross-supplier market data and part number matching. Calculates optimal target prices automatically.',
  },
  {
    icon: '📆',
    title: 'RFQ Grouping & Sourcing Events',
    description:
      'Automatically clusters related quotes into sourcing events. Compare suppliers side-by-side with line-item-level breakdowns and launch batch negotiations across all respondents.',
  },
  {
    icon: '📝',
    title: 'AI-Drafted Negotiations',
    description:
      'Generates professional negotiation emails with data-backed counteroffers. Every claim references real pricing data. A separate AI proofread pass ensures accuracy before anything is sent.',
  },
  {
    icon: '🛡️',
    title: 'Configurable Approval Workflows',
    description:
      'Threshold gates control what sends automatically vs. what gets queued for human review. Rules based on dollar amount, extraction confidence, supplier familiarity and discount depth.',
  },
  {
    icon: '🔁',
    title: 'Recurring Sourcing Templates',
    description:
      'Named templates with frequency, linked items and suppliers. The scheduler creates a draft RFQ on each cycle - or auto-distributes if you trust the template.',
  },
]

const safety = [
  {
    icon: '🔒',
    title: 'Human-in-the-Loop by Default',
    description:
      'Emails are queued for approval unless all auto-send criteria are met. You decide the thresholds.',
  },
  {
    icon: '🚫',
    title: 'Data-Backed Only',
    description:
      'Every negotiation strategy and target price references real pricing data from your database. Strict guardrails ensure accuracy.',
  },
  {
    icon: '🔍',
    title: 'AI Proofread Pass',
    description:
      'Every composed email is verified by a second AI check for hallucinated claims before it reaches anyone.',
  },
  {
    icon: '📝',
    title: 'Full Audit Trail',
    description:
      'Every pipeline step is logged with timestamps, confidence scores and decision rationale.',
  },
  {
    icon: '🏢',
    title: 'Multi-Tenant Isolation',
    description:
      'Row-level security ensures each client\'s data is completely isolated. No cross-tenant leakage.',
  },
  {
    icon: '🔑',
    title: 'Tokenized Supplier Access',
    description:
      'HMAC-signed response links expire at the RFQ deadline. No supplier login or portal account required.',
  },
]
