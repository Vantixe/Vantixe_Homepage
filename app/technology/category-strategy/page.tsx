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
  title: 'Category Strategy - Guided Strategy Platform',
  description:
    'A guided platform for category strategy: AI pre-drafts the analysis from your documents, data and market intelligence, every claim cited, every decision approved by your team. From category profile to tracked benefits.',
  alternates: {
    canonical: 'https://vantixe.ai/category-strategy',
  },
  openGraph: {
    title: 'Category Strategy - Guided Strategy Platform',
    description:
      'A guided platform for category strategy: AI pre-drafts the analysis from your documents, data and market intelligence, every claim cited, every decision approved by your team. From category profile to tracked benefits.',
    url: 'https://vantixe.ai/category-strategy',
  },
}

const strategy = products.find((p) => p.id === 'category-strategy')!

const demoSlides = [
  {
    image: '/images/demos/category-strategy/portfolio.png',
    label: 'One Portfolio',
    title: 'Every Category Strategy in One Place',
    description: 'Draft, in review, approved and archived: the whole strategy portfolio with status and phase for every category. Leadership can compare, challenge and steer instead of chasing slide decks.',
  },
  {
    image: '/images/demos/category-strategy/strategy-overview.png',
    label: 'Guided Methodology',
    title: 'One Best-Practice Path Through 21 Modules',
    description: 'From Category Profile through Market Analysis to Strategy and Mobilization, every module shows its status and ends with a written insight: the so-what that carries the strategy story.',
  },
  {
    image: '/images/demos/category-strategy/ai-drafting.png',
    label: 'Grounded AI',
    title: 'AI Drafts From Approved Intelligence',
    description: 'Each draft is grounded in approved market intelligence and your knowledge base, states its confidence, and cites the sources behind every claim. When evidence is thin, it says so.',
  },
  {
    image: '/images/demos/category-strategy/ai-review.png',
    label: 'Human Approval',
    title: 'Accept, Edit or Reject: Field by Field',
    description: 'Nothing enters the strategy without sign-off. Your team decides on every AI suggestion individually, and every decision is recorded in the audit trail.',
  },
  {
    image: '/images/demos/category-strategy/price-indices.png',
    label: 'Market Intelligence',
    title: 'Price Indices With Freshness Tracking',
    description: 'Commodity, labour and cost indices auto-synced from public sources, with change and volatility computed automatically. Stale series are flagged so decisions rest on current data.',
  },
  {
    image: '/images/demos/category-strategy/positioning.png',
    label: 'Strategic Positioning',
    title: 'Kraljic Positioning, Evidence First',
    description: 'Your captured evidence proposes a starting position, your team applies judgement on top, and the final quadrant anchors every value lever and initiative that follows.',
  },
]

const methodology = [
  {
    step: '1',
    title: 'Analyse',
    subtitle: 'Know the category, inside and out',
    description:
      'The category from the inside, the market from the outside: charter, stakeholders, spend, contracts, suppliers and demand, then Porter’s Five Forces, PESTLE, price indices, cost drivers, supplier long list, SWOT and risk.',
    tags: ['Spend Analysis', 'Porter’s Five Forces', 'PESTLE', 'Cost Drivers', 'SWOT', 'Risk'],
  },
  {
    step: '2',
    title: 'Strategise',
    subtitle: 'Turn analysis into choices',
    description:
      'Position the category on the Kraljic matrix, choose the value levers that fit, set objectives, and prioritise initiatives on an impact and ease matrix.',
    tags: ['Kraljic Positioning', 'Value Levers', 'Objectives', 'Initiatives', 'Prioritisation'],
  },
  {
    step: '3',
    title: 'Mobilise',
    subtitle: 'Make it happen',
    description:
      'An owned, tracked execution plan: implementation roadmap with owners and dates, RAPID decision governance, and a benefits tracker that records plan versus actual, period by period.',
    tags: ['Implementation Roadmap', 'RAPID Governance', 'Benefits Tracker'],
  },
]

const repository = [
  {
    title: 'No more blank pages',
    description:
      'A new strategy opens substantially drafted from your archive and live data. The team reacts, sharpens and decides instead of re-typing what the organisation already knew.',
  },
  {
    title: 'Memory that survives turnover',
    description:
      'When people move on, their category knowledge stays. A new category manager reads a what-we-know briefing in minutes, not weeks.',
  },
  {
    title: 'Gaps become a to-do list',
    description:
      'The repository is compared against the methodology, showing where knowledge is thin so the team puts effort where it is needed.',
  },
  {
    title: 'It compounds',
    description:
      'Year one digitises the archive. Every cycle after that adds approved strategies, decisions and market intelligence. The drafts get better every year.',
  },
]

const aiPrinciples = [
  {
    title: 'Every claim cited',
    description:
      'Each AI output links back to the document, data point or web source behind it. A reviewer can check any sentence in seconds.',
  },
  {
    title: 'Honest about confidence',
    description:
      'Every draft carries a confidence rating. When evidence is thin the platform says so instead of inventing an answer.',
  },
  {
    title: 'Accept, edit or reject',
    description:
      'AI suggestions are decided field by field. Nothing is saved automatically, and every decision is recorded.',
  },
  {
    title: 'Numbers are never invented',
    description:
      'Spend figures, price trends and cost models are computed from data. AI writes only the narrative around them.',
  },
]

const trust = [
  {
    title: 'Human in the loop',
    description: 'AI proposes; your team decides. No AI text enters a strategy without documented review.',
  },
  {
    title: 'Isolated deployment',
    description: 'Own application, own database, hosted in the region you choose. Full data residency.',
  },
  {
    title: 'Microsoft Entra SSO',
    description: 'Your identity provider and MFA policy; roles flow from your security groups.',
  },
  {
    title: 'Role-based access',
    description: 'Everyone sees only the categories in their remit, enforced in the platform.',
  },
  {
    title: 'Tamper-evident audit trail',
    description: 'Every edit, AI decision and approval recorded immutably and exportable.',
  },
  {
    title: 'Your branding and taxonomy',
    description: 'Logo, colours, category tree and performance measures are configuration, not custom code.',
  },
]

const delivery = [
  'Full strategy export to Word and PDF',
  'Executive one-pager and board-deck export in your corporate branding',
  'Sourcing handoff brief: requirements, suppliers and risks, ready for the RFx team',
  'Threaded comments on every module, down to a single field',
  'Approvals snapshot a version; restore or compare any time',
  'Read-only share view for anyone who only needs to read',
]

export default function CategoryStrategyPage() {
  return (
    <>
    <FAQSchema faqs={productFaqs['category-strategy']} />
    <ProductPageLayout
      product={strategy}
      ctaText="See Category Strategy in Action"
      demo={<ProductDemo slides={demoSlides} interval={6} className="mb-12" />}
    >
      {/* Methodology */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeInView>
            <SectionHeading
              label="The Methodology"
              title="One Journey From Data to Decision"
              subtitle="One standard, best-practice way of building category strategies, embedded in the tool itself. Every strategy is evidence-based and held to the same quality bar, whoever writes it."
              dark
              centered
            />
          </FadeInView>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {methodology.map((phase, i) => (
              <FadeInView key={phase.title} delay={i * 0.1}>
                <Card dark className="h-full">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-dark to-primary text-white flex items-center justify-center font-bold text-sm mb-4">
                    {phase.step}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{phase.title}</h3>
                  <p className="text-accent-mint text-sm font-medium mb-3">{phase.subtitle}</p>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">{phase.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {phase.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded text-xs font-medium bg-primary/15 text-accent-mint">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              </FadeInView>
            ))}
          </div>

          <FadeInView>
            <p className="text-center text-white/50 text-sm mt-10 max-w-2xl mx-auto">
              Every module ends with an insight written by your team: the so-what that carries the
              strategy story from first analysis to final recommendation.
            </p>
          </FadeInView>
        </div>
      </section>

      {/* Knowledge Repository */}
      <section className="section-padding border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeInView>
            <SectionHeading
              label="The Knowledge Repository"
              title="Your Archive Becomes Your Head Start"
              subtitle="Years of category knowledge sit locked in old decks, reports and spreadsheets. The platform turns that archive into a working asset: a repository that drafts the next strategy for you, and gets smarter with every cycle."
              dark
              centered
            />
          </FadeInView>

          {/* Flow */}
          <FadeInView>
            <div className="flex flex-wrap justify-center gap-3 mt-12 mb-12">
              {['Collect', 'Understand', 'Remember', 'Draft', 'Decide'].map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="px-5 py-2.5 rounded-full glass border border-white/10 text-white font-semibold text-sm">
                    <span className="text-accent-mint mr-2">{i + 1}</span>
                    {step}
                  </div>
                  {i < 4 && <span className="text-white/30">{'→'}</span>}
                </div>
              ))}
            </div>
          </FadeInView>

          <div className="grid md:grid-cols-2 gap-6">
            {repository.map((item, i) => (
              <FadeInView key={item.title} delay={i * 0.08}>
                <Card dark className="h-full">
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                </Card>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* AI with evidence */}
      <section className="section-padding border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeInView>
            <SectionHeading
              label="AI With Evidence"
              title="AI You Can Audit"
              subtitle="AI in this platform behaves like a careful analyst: it shows its sources, states its confidence, and never gets the final word."
              dark
              centered
            />
          </FadeInView>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {aiPrinciples.map((item, i) => (
              <FadeInView key={item.title} delay={i * 0.08}>
                <Card dark className="h-full">
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                </Card>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration & delivery */}
      <section className="section-padding border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeInView>
            <SectionHeading
              label="Collaboration & Delivery"
              title="Built by the Whole Organisation, Delivered to the Board"
              subtitle="Roles from administrator to lightweight stakeholder bring every business unit into the work, and the finished strategy leaves the platform in the formats your organisation already uses."
              dark
              centered
            />
          </FadeInView>

          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-4 mt-12 max-w-3xl mx-auto">
            {delivery.map((item, i) => (
              <FadeInView key={item} delay={i * 0.05}>
                <div className="flex items-start gap-3">
                  <span className="text-accent-mint mt-0.5">{'✓'}</span>
                  <span className="text-white/70 text-sm leading-relaxed">{item}</span>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise trust */}
      <section className="section-padding border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeInView>
            <SectionHeading
              label="Built for Control and Trust"
              title="Enterprise-Grade by Design"
              dark
              centered
            />
          </FadeInView>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {trust.map((item, i) => (
              <FadeInView key={item.title} delay={i * 0.06}>
                <Card dark className="h-full">
                  <h3 className="text-sm font-bold text-white mb-2">
                    <span className="text-accent-mint mr-2">{'✓'}</span>
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                </Card>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>
    </ProductPageLayout>
    </>
  )
}
