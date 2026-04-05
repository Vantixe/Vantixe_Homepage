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
    id: 'negotiation-agent',
    name: 'Quote Negotiation Agent',
    shortName: 'Negotiation Agent',
    tagline: 'AI-powered quote extraction, benchmarking, and autonomous negotiation',
    description:
      'AI-powered procurement automation that monitors your inbox, extracts supplier quotes, analyzes pricing, and negotiates better deals - autonomously.',
    status: 'live',
    statusLabel: 'Live',
    href: '/technology/negotiation-agent',
    stats: [
      { value: '<30s', label: 'Quote Extraction' },
      { value: '4-Level', label: 'Price Analysis' },
      { value: '24/7', label: 'Inbox Monitoring' },
      { value: '100%', label: 'Audit Trail' },
    ],
    features: [
      'Intelligent Inbox Monitoring',
      'Multi-Format Document Extraction',
      '4-Level Price Analysis',
      'AI-Drafted Negotiations',
    ],
  },
  {
    id: 'category-strategy',
    name: 'Category Strategy',
    shortName: 'Category Strategy',
    tagline: 'AI-guided category strategy development and execution',
    description:
      'Intelligent tools that guide procurement teams through category strategy creation, market analysis, and execution planning - turning weeks of work into days.',
    status: 'coming-soon',
    statusLabel: '2026',
    href: '/technology/category-strategy',
    stats: [],
    features: [],
  },
]

export const customAgents = [
  'Compliance Detection Agent',
  'Split Order Detection Agent',
  'Spend Classification Agent',
  'Contract Analysis Agent',
]
