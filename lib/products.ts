export interface Product {
  id: string
  name: string
  shortName: string
  tagline: string
  description: string
  status: 'live' | 'coming-soon'
  statusLabel: string
  href: string
  stats: { value: string; label: string }[]
  features: string[]
}

export const products: Product[] = [
  {
    id: 'tprm',
    name: 'Third-Party Risk Management',
    shortName: 'TPRM',
    tagline: 'Automated KYC, sanctions screening, and AI-powered compliance intelligence',
    description:
      'An enterprise-grade compliance platform that automates KYC due diligence, sanctions and PEP screening, continuous monitoring, and AI-powered risk intelligence - bringing what used to take days down to minutes.',
    status: 'live',
    statusLabel: 'Live',
    href: '/technology/tprm',
    stats: [
      { value: '40+', label: 'Sanctions Lists' },
      { value: '686K+', label: 'PEP Entries' },
      { value: '200K', label: 'Monitoring Capacity' },
      { value: 'AI', label: 'Due Diligence Reports' },
    ],
    features: [
      'KYC Onboarding & Questionnaire',
      'Sanctions & PEP Screening',
      'Review & Decision Workflow',
      'Continuous Monitoring & Alerts',
    ],
  },
  {
    id: 'sourcing-agent',
    name: 'Sourcing Agent',
    shortName: 'Sourcing Agent',
    tagline: 'Autonomous sourcing - RFQ creation, supplier outreach, quote analysis and AI negotiation in one agent',
    description:
      'AI agent that runs your full sourcing cycle - build the RFQ, distribute to suppliers, collect responses (form or email), benchmark prices, draft and send negotiations, and recur on schedule.',
    status: 'live',
    statusLabel: 'Live',
    href: '/technology/sourcing-agent',
    stats: [
      { value: 'End-to-End', label: 'Sourcing Cycle' },
      { value: '4-Level', label: 'Price Analysis' },
      { value: '<30s', label: 'Quote Extraction' },
      { value: '100%', label: 'Audit Trail' },
    ],
    features: [
      'RFQ Builder & Distribution',
      'Dual-Channel Quote Collection',
      '4-Level Price Analysis',
      'AI-Drafted Negotiations',
    ],
  },
  {
    id: 'category-strategy',
    name: 'Category Strategy',
    shortName: 'Category Strategy',
    tagline: 'AI-guided category strategy development and execution - from scattered slide decks to one living strategy',
    description:
      'A guided platform that takes procurement teams from category analysis to a tracked execution plan. AI pre-drafts every module from your documents, data and market intelligence - every claim cited, every decision approved by your team.',
    status: 'live',
    statusLabel: 'Live',
    href: '/technology/category-strategy',
    stats: [
      { value: '21', label: 'Guided Modules' },
      { value: '10+', label: 'Frameworks Built In' },
      { value: '100%', label: 'AI Output Human-Approved' },
      { value: 'End-to-End', label: 'Charter to Tracked Benefits' },
    ],
    features: [
      'Guided 21-Module Methodology',
      'Knowledge Repository & AI Drafting',
      'Market & Cost Intelligence',
      'Versioned Approvals & Exports',
    ],
  },
]

export const customAgents = [
  'Compliance Detection Agent',
  'Split Order Detection Agent',
  'Spend Classification Agent',
  'Contract Analysis Agent',
]
