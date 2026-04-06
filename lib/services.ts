export interface ServiceStep {
  number: string
  title: string
  description: string
}

export interface DiffItem {
  title: string
  description: string
}

export interface RelatedService {
  icon: string
  title: string
  description: string
  href: string
}

export interface ServicePageData {
  slug: string
  title: string
  tagline: string
  intro: string
  ctaButton: string
  challengeTitle: string
  challengeParagraphs: string[]
  approachIntro: string
  steps: ServiceStep[]
  deliverables: string[]
  whyVantixe: DiffItem[]
  relatedServices: RelatedService[]
  metaTitle: string
  metaDescription: string
  /** If set, adds a special tech callout linking to /technology */
  techCallout?: {
    title: string
    description: string
    buttonText: string
    href: string
  }
}

export const servicePages: ServicePageData[] = [
  {
    slug: 'cost-optimization',
    title: 'Cost Optimization',
    tagline: 'Deliver Measurable Savings Without Compromising Quality or Supply',
    intro: 'Cost reduction remains a core expectation of every procurement function - but sustainable savings require more than renegotiating contracts. We deploy advanced techniques that most procurement teams don\u2019t have in-house: should-cost modelling and cost breakdown analysis to challenge supplier pricing at the component level, e-Auctions and competitive tension strategies for volume categories, linear performance pricing to align cost with measurable output, and total cost of ownership models that capture the full picture beyond unit price. Combined with rigorous spend analytics, deep category expertise and years of benchmarking data, we identify and capture savings opportunities that standard sourcing approaches miss.',
    ctaButton: 'Explore Your Savings Potential',
    challengeTitle: 'Beyond Price - The Real Cost Reduction Opportunity',
    challengeParagraphs: [
      'Many organisations focus cost reduction efforts on the visible portion of spend - large contracts, known suppliers and familiar categories. This leaves significant value on the table in fragmented tail spend, unchallenged specifications, maverick buying and missed consolidation opportunities.',
      'At the same time, simply driving down price can erode supplier relationships, increase supply risk and reduce innovation. The most effective cost reduction programmes take a balanced approach: combining price competitiveness with total cost analysis, demand management and strategic supplier engagement.',
      'The challenge is compounded by limited spend visibility, inconsistent data quality and procurement teams stretched thin across operational demands. Without a structured methodology and dedicated focus, savings targets become aspirational rather than achievable.',
    ],
    approachIntro: 'We follow a structured four-step methodology - from spend diagnostics through to P&L realisation - ensuring savings are identified, captured and sustained.',
    steps: [
      { number: '01', title: 'Spend Diagnostics & Opportunity Mapping', description: 'We go beyond basic spend cube analysis. Our diagnostics combine transaction-level spend data with price and cost benchmarks drawn from years of category engagements across industries. We segment by category, supplier, contract status and price competitiveness - identifying not just where you spend, but where you overpay and why. The output is a prioritised savings pipeline with quantified opportunities and confidence levels.' },
      { number: '02', title: 'Advanced Sourcing Strategy', description: 'For each priority category, we deploy the right lever - not just competitive tendering. Our toolkit includes should-cost modelling and cost breakdown analysis to challenge supplier margins at component level, e-Auctions for commoditised categories, linear performance pricing to tie cost to measurable outcomes, specification rationalisation, demand consolidation, make-vs-buy analysis, and innovative commercial structures like gain-sharing and outcome-based contracts.' },
      { number: '03', title: 'Execution & Commercial Negotiation', description: 'We lead or support sourcing execution with the analytical rigour that gives you leverage at the negotiation table. Every negotiation is backed by cost models, market data and supplier-specific intelligence - not generic benchmarks. From RFx design through bid evaluation to contract award, our approach is structured, transparent and audit-ready.' },
      { number: '04', title: 'Benefits Tracking & P&L Realisation', description: 'Savings are only real when they hit the P&L. We establish a benefits tracking methodology that distinguishes between identified, committed and realised savings - with clear accountability, reporting cadence and finance alignment to ensure targets translate into actual budget impact.' },
    ],
    deliverables: [
      'Detailed spend analysis with category segmentation and supplier mapping',
      'Savings opportunity pipeline with prioritisation matrix',
      'Category-specific sourcing strategies with defined levers',
      'Market intelligence and supply market assessments',
      'Should-cost models and total cost of ownership analyses',
      'RFx documentation and bid evaluation frameworks',
      'Negotiation strategy and supplier engagement plans',
      'Benefits tracking dashboard with realisation methodology',
      'Savings governance and reporting framework',
      'Knowledge transfer and capability handover',
    ],
    whyVantixe: [
      { title: 'Rigorous Analytical Foundation', description: 'We don\u2019t guess - we build our recommendations on robust data analysis, market intelligence and proven methodologies. Every savings opportunity is substantiated and pressure-tested.' },
      { title: 'Advanced Sourcing Levers', description: 'We go beyond competitive tendering. Our strategies incorporate total cost of ownership analysis, specification challenges, demand management, contract restructuring and innovative commercial models.' },
      { title: 'Category Depth Across Sectors', description: 'Our team brings deep expertise across multiple spend categories - from facilities management and IT to engineering services, MRO and professional services.' },
      { title: 'Savings That Stick', description: 'We embed benefits tracking from day one and support our clients through to P&L realisation. Our focus is on sustainable savings - not just paper commitments.' },
    ],
    relatedServices: [
      { icon: '\uD83C\uDFAF', title: 'Category Management', description: 'Build long-term category plans that sustain savings beyond the initial wave.', href: '/services/category-management' },
      { icon: '\uD83D\uDD04', title: 'Procurement Transformation', description: 'Address structural barriers to cost reduction.', href: '/services/procurement-transformation' },
      { icon: '\uD83D\uDEE1\uFE0F', title: 'Risk Management', description: 'Balance cost optimisation with supply chain resilience.', href: '/services/risk-management' },
    ],
    metaTitle: 'Cost Optimization | Strategic Sourcing',
    metaDescription: 'Procurement cost optimization and strategic sourcing in Hong Kong. Spend analysis, should-cost modeling, negotiation support, benefits tracking. Vantixe Advisory.',
  },
  {
    slug: 'procurement-transformation',
    title: 'Procurement Transformation',
    tagline: 'From Tactical Purchasing to Strategic Value Creation',
    intro: 'Procurement functions are under growing pressure to deliver more than cost savings. Stakeholders expect agility, resilience, innovation and strategic business partnering - yet many organisations still operate with legacy structures, fragmented processes and limited spend visibility. At the same time, AI is fundamentally reshaping what procurement operating models can achieve. Teams that design their operating models with AI at the core - embedding it into processes, decision-making and day-to-day workflows - free up resources from repetitive, lower-value tasks and redirect them toward strategic, high-impact work. We help procurement leaders design and implement a target operating model that is AI-ready from the ground up: agile enough to adopt new capabilities as they emerge, and structured to deliver compounding value as the technology evolves.',
    ctaButton: 'Talk to Us About Your Transformation',
    challengeTitle: 'Why Transformation Matters',
    challengeParagraphs: [
      'Most procurement organisations have grown organically over time - adding headcount to meet demand, layering processes on top of legacy systems, and operating in silos across business units. The result is an operating model that may have served the organisation well in the past but is no longer fit for purpose.',
      'Common symptoms include lengthy cycle times for sourcing activities, duplication of effort across teams, limited strategic engagement with the business, low spend under management and inconsistent adoption of leading practices.',
      'Transformation is not about incremental improvement. It is about fundamentally rethinking how procurement is structured, how it engages with stakeholders, and how it creates value - then building the capabilities and governance to sustain that change over time.',
    ],
    approachIntro: 'We structure procurement transformation around four phases - each building on the last to move from diagnosis to a fully implementable operating model.',
    steps: [
      { number: '01', title: 'Assess & Diagnose', description: 'We start with a rapid yet thorough assessment of the current operating model. This includes analysing organisational structure, process maturity, technology landscape, spend distribution, and stakeholder perception.' },
      { number: '02', title: 'Design the AI-Ready Target Operating Model', description: 'Working collaboratively through structured workshops, we design a target operating model tailored to the organisation\u2019s strategy, size and maturity. Critically, we embed AI into the operating model design from day one - identifying where AI agents, automated workflows and intelligent decision support can augment human capability across the source-to-pay cycle. Key design elements include organisational structure, AI-augmented process framework, service delivery model, and roles designed for human-AI collaboration.' },
      { number: '03', title: 'Define Roles & FTE Distribution', description: 'We translate the operating model into practical detail: role profiles, competency requirements, FTE estimates by category and activity, and an updated RACI matrix.' },
      { number: '04', title: 'Plan the Transition', description: 'Every transformation needs a structured change management plan. We develop a phased transition roadmap covering communication strategy, stakeholder engagement, quick wins, training needs and risk mitigation.' },
    ],
    deliverables: [
      'Current-state operating model assessment and maturity benchmark',
      'Target operating model design covering organisation, processes, roles and governance',
      'Service delivery model options (e.g. centre of excellence, hub-and-spoke, shared services)',
      'Process framework aligned to the new operating model',
      'Role profiles and competency mapping',
      'FTE distribution analysis across categories and activities',
      'Change management plan with phased transition roadmap',
      'Stakeholder engagement strategy and communication plan',
      'Quick-win identification for early value demonstration',
      'Benefits tracking methodology and KPI framework',
    ],
    whyVantixe: [
      { title: 'Practitioner-Led, Not Slide-Driven', description: 'Our consultants are experienced procurement practitioners who have led transformation programmes from the inside. We bring practical knowledge of what works in real organisations.' },
      { title: 'Collaborative Workshop Approach', description: 'We believe the best operating models are co-created with the people who will operate them. Our workshop-based approach drives alignment, builds ownership and accelerates decision-making.' },
      { title: 'Deep Understanding of Procurement', description: 'We understand the nuances of procurement - from category management and supplier development to compliance governance and stakeholder engagement.' },
      { title: 'End-to-End Scope', description: 'We don\u2019t stop at the strategy slide. We take our clients through assessment, design, detailed planning and transition support.' },
    ],
    relatedServices: [
      { icon: '\uD83E\uDD16', title: 'Quote Negotiation Agent', description: 'See AI-augmented procurement in action - our autonomous agent that monitors, extracts, benchmarks and negotiates supplier quotes.', href: 'https://vantixe.ai/negotiation-agent' },
      { icon: '\uD83C\uDFAF', title: 'Category Management', description: 'Align your category approach to the new operating model.', href: '/services/category-management' },
      { icon: '\uD83D\uDCCA', title: 'Cost Optimization', description: 'Capture quick wins during and after transformation.', href: '/services/cost-optimization' },
    ],
    metaTitle: 'Procurement Transformation Consulting',
    metaDescription: 'End-to-end procurement transformation in Hong Kong. Operating model design, process optimization, organizational restructuring, change management. Vantixe Advisory.',
  },
  {
    slug: 'category-management',
    title: 'Category Management Process Design & Enablement',
    tagline: 'Turn Spend Intelligence Into Strategic Advantage',
    intro: 'Category management is the backbone of a high-performing procurement function. It shifts the focus from transactional purchasing to strategic management of supply markets, supplier relationships and total value. We help organisations build and execute category strategies that are grounded in data, aligned with business objectives and designed to deliver sustained competitive advantage.',
    ctaButton: 'Strengthen Your Category Approach',
    challengeTitle: 'From Ad-Hoc Buying to Strategic Category Management',
    challengeParagraphs: [
      'Many procurement teams operate category-by-category in name only. In practice, sourcing decisions are driven by contract expiry dates, stakeholder requests or immediate cost pressures rather than by a deliberate strategy.',
      'Without a structured category management approach, organisations miss opportunities to consolidate spend, develop strategic suppliers, introduce innovation, mitigate supply risk and optimise total cost of ownership.',
      'Effective category management requires a combination of analytical rigour, market intelligence, cross-functional collaboration and disciplined execution. It also requires a clear methodology and toolkit that procurement teams can apply consistently.',
    ],
    approachIntro: 'We structure category management engagements around four phases - from diagnostic profiling through to executable roadmaps.',
    steps: [
      { number: '01', title: 'Category Profiling', description: 'We build a comprehensive profile of the category: scope definition, spend analysis (historic and projected), supplier landscape, contract portfolio, buying channel analysis and stakeholder mapping.' },
      { number: '02', title: 'Market & Supply Analysis', description: 'We conduct external market analysis including supply market structure, competitive dynamics, pricing trends, cost drivers and risk factors. Tools such as Porter\u2019s Five Forces, PESTLE analysis and Kraljic positioning help determine the optimal sourcing approach.' },
      { number: '03', title: 'Strategy Development', description: 'We develop the category strategy: defining strategic objectives, identifying value levers (cost, quality, innovation, risk, sustainability), selecting sourcing approaches and prioritising improvement initiatives.' },
      { number: '04', title: 'Roadmap & Execution', description: 'We translate the strategy into an actionable roadmap with defined initiatives, timelines, responsibilities (using RAPID or RACI frameworks) and measurable targets.' },
    ],
    deliverables: [
      'Category tree and scope definition',
      'Detailed spend analysis with historic trends and forward projections',
      'Supplier Pareto analysis and supplier risk assessments',
      'Market intelligence reports covering supply structure, cost drivers and pricing trends',
      'Kraljic portfolio positioning and strategic segmentation',
      'Category strategy document with defined objectives, levers and initiatives',
      'Cross-functional stakeholder alignment and endorsement',
      'Implementation roadmap with RACI/RAPID responsibilities',
      'Savings and benefits tracking methodology',
      'Category management toolkit and templates for ongoing use',
    ],
    whyVantixe: [
      { title: 'Proven Methodology, Practical Application', description: 'Our category strategy methodology follows industry-leading practice but is always adapted to the organisation\u2019s maturity, capacity and priorities.' },
      { title: 'Cross-Functional Facilitation', description: 'We bring experience in facilitating cross-functional workshops that align procurement, operations, engineering, finance and end-users around a common strategy.' },
      { title: 'Data-Driven Insights', description: 'Every strategy is built on thorough analysis of spend data, market intelligence and supplier performance.' },
      { title: 'Building Internal Capability', description: 'We don\u2019t just write strategies - we build capability. Our engagements include knowledge transfer, template handover and coaching.' },
    ],
    relatedServices: [
      { icon: '\uD83C\uDF93', title: 'Capability Building - Category Strategy Coaching', description: 'Hands-on 1-on-1 coaching supporting your team through the full category strategy development cycle.', href: '/services/capability-building' },
      { icon: '\uD83C\uDFAF', title: 'Category Strategy App', description: 'Our AI-guided category strategy tool - turning weeks of analysis into structured, data-backed strategies.', href: 'https://vantixe.ai/category-strategy' },
      { icon: '\uD83D\uDCCA', title: 'Cost Optimization', description: 'Execute savings levers identified in the category strategy.', href: '/services/cost-optimization' },
    ],
    metaTitle: 'Category Management & Strategy Consulting',
    metaDescription: 'Category management process design and enablement in Hong Kong. Spend analysis, market intelligence, strategy development, implementation support. Vantixe Advisory.',
  },
  {
    slug: 'supplier-management',
    title: 'Supplier Management',
    tagline: 'Build Stronger, Smarter Supplier Relationships',
    intro: 'Your suppliers are a critical extension of your organisation\u2019s capability. How you select, develop, manage and govern them directly impacts cost, quality, innovation and risk. We help organisations design and implement supplier management frameworks that move beyond transactional oversight to create genuine partnership value.',
    ctaButton: 'Elevate Your Supplier Relationships',
    challengeTitle: 'Beyond Contract Compliance - Managing Suppliers Strategically',
    challengeParagraphs: [
      'Supplier management in most organisations is reactive: tracking deliveries, resolving disputes and managing contract renewals. While necessary, these operational activities represent only a fraction of the value that structured supplier management can deliver.',
      'Organisations that manage suppliers strategically - segmenting the supply base, investing in key relationships, measuring performance against defined KPIs and collaborating on improvement and innovation - consistently outperform those that don\u2019t.',
      'Common challenges include fragmented supplier data, inconsistent qualification processes, limited visibility of supplier performance across the organisation, and the absence of a structured framework for escalation, development and relationship governance.',
    ],
    approachIntro: 'We structure supplier management around five pillars - covering the full lifecycle from registration through to strategic development and innovation.',
    steps: [
      { number: '01', title: 'Supplier Registration & Data Management', description: 'We help establish efficient supplier registration processes - from self-service portals and data collection requirements to validation workflows and master data governance.' },
      { number: '02', title: 'Supplier Qualification & Onboarding', description: 'We design fit-for-purpose qualification frameworks that balance rigour with efficiency. This includes prequalification criteria, risk-based assessment tiers, compliance verification and streamlined onboarding.' },
      { number: '03', title: 'Performance Management', description: 'We develop supplier performance management frameworks including KPI definition, scorecard design, measurement cadence and review governance.' },
      { number: '04', title: 'Segmentation & Relationship Strategy', description: 'We help organisations segment their supply base and define differentiated engagement strategies - from transactional management of commodity suppliers to deep strategic partnerships.' },
      { number: '05', title: 'Supplier Development & Innovation', description: 'For strategic suppliers, we support the design of joint improvement programmes, innovation collaboration frameworks and long-term value creation plans.' },
    ],
    deliverables: [
      'Supplier management framework design and governance model',
      'Supplier registration and onboarding process redesign',
      'Qualification criteria and risk-based assessment methodology',
      'Supplier segmentation model with differentiated engagement strategies',
      'Supplier performance scorecard and KPI framework',
      'Review cadence and escalation governance',
      'Supplier development programme design for strategic partners',
      'Technology requirements specification for supplier management systems',
      'Process documentation and standard operating procedures',
      'Training and capability transfer for procurement teams',
    ],
    whyVantixe: [
      { title: 'End-to-End Framework Design', description: 'We cover the full supplier lifecycle - from registration and qualification through performance management, development and exit.' },
      { title: 'Process & System Alignment', description: 'We bring experience in designing supplier management processes that integrate with ERP and procurement platforms.' },
      { title: 'Risk-Aware Approach', description: 'Our frameworks incorporate financial risk assessment, ESG compliance, supply continuity and geopolitical exposure.' },
      { title: 'Balancing Governance With Efficiency', description: 'Our designs balance appropriate governance and compliance with practical efficiency - ensuring the framework is adopted and sustained.' },
    ],
    relatedServices: [
      { icon: '\uD83C\uDF93', title: 'Capability Building - SRM Coaching', description: 'Structured coaching for supplier relationship meetings - from preparation through observation and debrief.', href: '/services/capability-building' },
      { icon: '\uD83D\uDEE1\uFE0F', title: 'TPRM Platform', description: 'Automated KYC, sanctions screening, and continuous supplier risk monitoring - our live compliance platform.', href: 'https://vantixe.ai/tprm' },
      { icon: '\uD83C\uDFAF', title: 'Category Management', description: 'Align supplier strategies with category objectives.', href: '/services/category-management' },
    ],
    metaTitle: 'Supplier Management Consulting',
    metaDescription: 'Supplier management framework design in Hong Kong. Supplier qualification, performance scorecards, SRM governance, supplier development. Vantixe Advisory.',
  },
  {
    slug: 'risk-management',
    title: 'Risk Management & Framework Development',
    tagline: 'Anticipate, Mitigate, Protect',
    intro: 'Supply chain disruptions, geopolitical instability, supplier financial distress, regulatory changes and ESG compliance - procurement risk has never been more complex or consequential. We help organisations build structured risk management capabilities within their procurement function.',
    ctaButton: 'Strengthen Your Procurement Risk Posture',
    challengeTitle: 'Risk Is Not a Spreadsheet Exercise',
    challengeParagraphs: [
      'Most procurement teams acknowledge the importance of risk management, but few have a structured, systematic approach embedded in their daily operations. Risk registers - when they exist - are static documents reviewed quarterly at best.',
      'The landscape of procurement risk has expanded significantly. Supply chain concentration, sole-source dependencies, geopolitical trade conflicts, regulatory changes, cyber threats, climate-related disruptions and ESG compliance failures all represent material risks.',
      'Effective procurement risk management requires proactive identification, structured assessment, embedded mitigation actions and continuous monitoring. It must be integrated into sourcing decisions, supplier management and category strategies.',
    ],
    approachIntro: 'We build procurement risk management capability through four structured phases - from identification through to continuous monitoring.',
    steps: [
      { number: '01', title: 'Risk Identification & Mapping', description: 'We identify and categorise risks across the supply base: financial stability, operational dependency, geographic concentration, regulatory exposure, ESG compliance, capacity constraints and market volatility.' },
      { number: '02', title: 'Risk Assessment & Prioritisation', description: 'Using structured assessment methodologies, we evaluate each risk by likelihood and impact - creating a prioritised risk heat map.' },
      { number: '03', title: 'Mitigation Strategy Development', description: 'For each prioritised risk, we develop practical mitigation strategies: dual sourcing, safety stock policies, contract protections, supplier development plans, market monitoring triggers and contingency sourcing plans.' },
      { number: '04', title: 'Monitoring & Governance', description: 'We design risk monitoring frameworks that integrate into the procurement operating rhythm - including early warning indicators, review cadence, escalation protocols and reporting dashboards.' },
    ],
    deliverables: [
      'Procurement risk taxonomy and categorisation framework',
      'Supply base risk mapping across categories and key suppliers',
      'Risk assessment methodology with likelihood/impact scoring',
      'Prioritised risk heat map and risk register',
      'Mitigation strategy for high-priority risks',
      'Contingency and business continuity plans for critical supply categories',
      'Risk monitoring framework with early warning indicators',
      'Governance model including review cadence, escalation protocols and reporting',
      'Integration of risk management into sourcing and supplier management processes',
      'Training and awareness programme for procurement teams',
    ],
    whyVantixe: [
      { title: 'Practical, Not Theoretical', description: 'We build risk management frameworks that procurement teams will actually use. Our approach is embedded into existing workflows.' },
      { title: 'Integrated With Procurement Operations', description: 'We integrate risk assessment into sourcing decisions, category strategies and supplier management - ensuring it becomes part of how procurement operates.' },
      { title: 'Experience Across Complex Supply Chains', description: 'Our team has experience managing procurement risk in complex, regulated and infrastructure-heavy environments.' },
      { title: 'Building Resilience, Not Just Compliance', description: 'We go beyond risk registers and checklists. Our goal is to build genuine supply chain resilience.' },
    ],
    relatedServices: [
      { icon: '\uD83D\uDEE1\uFE0F', title: 'TPRM Platform', description: 'Our live third-party risk management platform - automated KYC, sanctions screening across 40+ lists, and continuous monitoring for up to 200K entities.', href: 'https://vantixe.ai/tprm' },
      { icon: '\uD83E\uDD1D', title: 'Supplier Management', description: 'Monitor and manage supplier-level risk as part of ongoing supplier governance.', href: '/services/supplier-management' },
      { icon: '\uD83C\uDFAF', title: 'Category Management', description: 'Embed risk considerations into category planning and sourcing decisions.', href: '/services/category-management' },
    ],
    metaTitle: 'Procurement Risk Management Consulting',
    metaDescription: 'Procurement risk management and framework development in Hong Kong. Risk mapping, mitigation strategies, monitoring governance, supply chain resilience. Vantixe Advisory.',
  },
  {
    slug: 'capability-building',
    title: 'Capability Building & Training',
    tagline: 'From Dependent on Advisors to Self-Sufficient Excellence',
    intro: 'Procurement excellence is not sustained by consultants - it is sustained by capable teams. We design and deliver procurement academies, structured training programs, and hands-on coaching that build the skills, confidence, and tools your people need to perform independently. Our goal is not to create dependency - it is to make ourselves redundant.',
    ctaButton: 'Discuss Your Academy',
    challengeTitle: 'Why Capability Building Matters',
    challengeParagraphs: [
      'Many procurement teams operate below their potential - not because of a lack of effort, but because of a lack of structured development. Skills are picked up on the job, inconsistently, and often without exposure to leading practices.',
      'At the same time, procurement leaders face a difficult reality: external consultants deliver results, but the capability often walks out the door with them. Training courses provide theoretical knowledge, but without structured application and coaching, new skills rarely translate into changed behaviour.',
      'Effective capability building requires a diagnostic understanding of where skills gaps exist, a structured curriculum aligned to those gaps, hands-on coaching that bridges theory and practice, and a sustainable model - such as Train-the-Trainer - that ensures knowledge stays within the organisation.',
    ],
    approachIntro: 'We structure capability building around four pillars - each designed to create lasting impact, not just a temporary uplift.',
    steps: [
      { number: '01', title: 'Assess & Diagnose', description: 'We conduct structured competency assessments across the procurement skill set. Using a competency matrix mapped against proficiency levels, we identify individual and organisational skill gaps. The output is a capability heat map.' },
      { number: '02', title: 'Procurement Academy - Structured Training', description: 'We design a tailored training curriculum delivered as a Procurement Academy. Training is practical and scenario-based. We use a Train-the-Trainer (TTT) approach ensuring your team can deliver the training independently.' },
      { number: '03', title: '1-on-1 Coaching - Learning by Doing', description: 'We pair structured training with hands-on coaching where team members apply new skills to live work - developing category strategies, preparing for supplier negotiations, or leading SRM meetings.' },
      { number: '04', title: 'Measure, Sustain & Transfer', description: 'Competency scores are re-assessed at programme close. Internal trainers are equipped with materials and facilitator guides. Development plans are established with clear milestones.' },
    ],
    deliverables: [
      'Competency assessment framework with proficiency-level mapping',
      'Organisational capability heat map identifying priority skill gaps',
      'Individual development plans with defined milestones',
      'Custom training curriculum aligned to assessment findings',
      'Training materials, facilitator guides, and participant workbooks',
      'Train-the-Trainer programme enabling internal delivery',
      '1-on-1 coaching for category strategy and SRM development',
      'Coaching playbooks and structured feedback templates',
      'Post-programme competency re-assessment and progress report',
      'Knowledge transfer package for sustained internal capability',
    ],
    whyVantixe: [
      { title: 'Practitioners, Not Trainers', description: 'Our training is delivered by consultants who do this work every day - not professional trainers reading slides.' },
      { title: 'Applied Learning Model', description: 'We follow a 30/70 principle: 30% structured training, 70% applied coaching on live work. Skills transfer happens when people apply new knowledge to real challenges.' },
      { title: 'Built to Be Self-Sustaining', description: 'Our Train-the-Trainer approach and comprehensive handover materials ensure your organisation can continue delivering training independently.' },
      { title: 'Measurable Capability Uplift', description: 'We baseline competencies at the start and re-assess at programme close. You get a clear, data-backed picture of the capability improvement delivered.' },
    ],
    relatedServices: [
      { icon: '\uD83D\uDD04', title: 'Procurement Transformation', description: 'Embed capability building into a broader transformation of the procurement operating model.', href: '/services/procurement-transformation' },
      { icon: '\uD83C\uDFAF', title: 'Category Management', description: 'Design the category management frameworks your team is being trained to execute.', href: '/services/category-management' },
      { icon: '\uD83E\uDD1D', title: 'Supplier Management', description: 'Build the SRM governance framework that underpins supplier engagement capability.', href: '/services/supplier-management' },
    ],
    metaTitle: 'Capability Building & Procurement Training',
    metaDescription: 'Procurement capability building and training programmes in Hong Kong. Competency assessment, procurement academies, coaching, Train-the-Trainer. Vantixe Advisory.',
  },
  {
    slug: 'ai-enabled-solutions',
    title: 'AI-Enabled Procurement Solutions',
    tagline: 'Custom AI Agents and Applications Built for Your Procurement Challenges',
    intro: 'Off-the-shelf procurement platforms solve generic problems. But the most impactful digital solutions are the ones designed around your specific processes, data, and decision points. Vantixe combines deep procurement domain expertise with hands-on technology development to build custom AI agents, workflow applications, and decision-support tools that solve the problems your existing systems cannot. We don\u2019t recommend software - we build it.',
    ctaButton: 'Explore What We Can Build',
    challengeTitle: 'Why Generic Tools Fall Short',
    challengeParagraphs: [
      'Procurement teams are drowning in manual processes that don\u2019t fit neatly into any off-the-shelf platform. ERP and S2P systems handle the transactional backbone but leave significant gaps in areas like supplier risk triage, category strategy guidance, spend anomaly detection, compliance screening, and knowledge management.',
      'The real opportunity is not another enterprise platform. It is building targeted, intelligent tools that sit on top of or alongside existing systems - purpose-built to address the specific workflow bottlenecks and decision gaps that matter most to the organisation.',
      'As part of what we call Consulting+, when we identify a gap during an advisory engagement that can be bridged with a focused digital tool, we design, build and hand it over as a consulting deliverable. These are lightweight, purpose-built applications that the client can host and operate independently - not multi-year platform projects, but practical tools that solve a specific, well-defined problem identified during the engagement.',
    ],
    approachIntro: 'We follow a structured four-phase approach - from problem identification through to deployed, adopted solutions that deliver measurable value.',
    steps: [
      { number: '01', title: 'Problem Discovery & Scoping', description: 'We work with procurement teams to identify the highest-impact pain points - processes that are manual, repetitive, error-prone, or dependent on individual knowledge. The output is a prioritised opportunity map.' },
      { number: '02', title: 'Solution Design', description: 'We design targeted solutions - whether an AI agent that automates supplier pre-qualification screening, a guided workflow for category strategy development, a dashboard that monitors supplier risk signals, or a triage tool that routes procurement requests.' },
      { number: '03', title: 'Build & Iterate', description: 'We build working applications rapidly using modern development approaches. We use AI and machine learning where they add genuine value: NLP for document analysis, predictive models for spend forecasting, classification models for risk scoring, and LLMs for guided decision support.' },
      { number: '04', title: 'Deploy & Embed', description: 'We deploy solutions into the procurement team\u2019s daily workflow - integrated with existing systems where needed. We measure success by whether the solution becomes part of how the team actually works.' },
    ],
    deliverables: [
      'Process and workflow mapping identifying automation opportunities',
      'Solution design documents with user stories and architecture',
      'Custom-built AI agents for procurement-specific tasks',
      'Workflow applications for guided processes (e.g. category strategy, supplier qualification)',
      'Dashboards and monitoring tools with real-time data integration',
      'Machine learning models for spend analytics, risk scoring, and forecasting',
      'Integration with existing ERP and procurement platforms',
      'User training and adoption support',
      'Technical documentation and maintenance guides',
      'Iterative enhancement based on user feedback and evolving requirements',
    ],
    whyVantixe: [
      { title: 'We Build, Not Just Advise', description: 'Unlike traditional consultancies that recommend technology, we design and develop custom solutions in-house. The people who understand the problem also build the solution.' },
      { title: 'Procurement Domain Expertise Baked In', description: 'Our applications are designed by procurement practitioners, not generic developers. Every workflow, decision tree, and data model reflects how procurement actually works.' },
      { title: 'AI Where It Matters', description: 'We apply AI and machine learning pragmatically - to solve specific, high-value problems like document classification, risk signal detection, spend pattern analysis, and guided decision support.' },
      { title: 'Rapid, Iterative Delivery', description: 'We build working tools fast. Our iterative approach means you see a functional prototype early, provide feedback on something real, and get a production-ready solution.' },
    ],
    relatedServices: [
      { icon: '\uD83D\uDCCA', title: 'Cost Optimization', description: 'Use spend analytics and should-cost models powered by data intelligence.', href: '/services/cost-optimization' },
      { icon: '\uD83D\uDD04', title: 'Procurement Transformation', description: 'Digital enablement as a core pillar of operating model modernisation.', href: '/services/procurement-transformation' },
      { icon: '\uD83C\uDF93', title: 'Capability Building & Training', description: 'Train teams to leverage new digital tools and AI-assisted workflows.', href: '/services/capability-building' },
    ],
    metaTitle: 'AI-Enabled Procurement Solutions | Custom AI Agents & Apps',
    metaDescription: 'Custom AI agents and procurement applications built for your specific requirements. Consulting+ deliverables, spend analytics, supplier risk monitoring, workflow automation. Vantixe Advisory.',
    techCallout: {
      title: 'See Our Live Products',
      description: 'In addition to custom solutions built during consulting engagements, we have developed enterprise-grade products that are deployed and proven - including our TPRM compliance platform and Quote Negotiation Agent.',
      buttonText: 'Explore Our Technology Platform',
      href: 'https://vantixe.ai',
    },
  },
]
