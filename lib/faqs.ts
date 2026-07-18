export interface FAQItem {
  question: string
  answer: string
}

export const serviceFaqs: Record<string, FAQItem[]> = {
  'cost-optimization': [
    {
      question: 'What savings can procurement cost optimization typically deliver?',
      answer:
        'Most organisations achieve 10-25% savings across addressable spend categories. The range depends on spend maturity, supplier market dynamics and how much of the spend has been competitively tested recently. We quantify the opportunity during our initial spend diagnostic before any engagement commitment.',
    },
    {
      question: 'How long does a cost optimization engagement take?',
      answer:
        'A typical engagement runs 2-12 months depending on scope. The first 2-3 weeks focus on spend diagnostics and opportunity mapping, followed by execution of savings initiatives and benefits tracking. Quick wins are often captured within the first month. Structural and more complex initiatives - very often the ones with higher savings - can take six months or more to implement.',
    },
    {
      question:
        'What sourcing techniques do you use beyond competitive tendering?',
      answer:
        'We deploy should-cost modelling to challenge supplier pricing at the component level, e-Auctions for commoditised categories, linear performance pricing to tie cost to measurable outcomes, total cost of ownership analysis, specification rationalisation, demand consolidation and innovative commercial structures like gain-sharing agreements.',
    },
    {
      question: 'How do you ensure savings actually hit the P&L?',
      answer:
        'We establish a benefits tracking methodology from day one that distinguishes between identified, committed and realised savings. We align with your finance team on measurement criteria, reporting cadence and budget impact - ensuring savings translate from paper commitments into actual P&L results. The methodology we apply varies by savings type. In addition, we have successfully deployed so-called Spend Control Towers - providing 360-degree visibility to ensure there is no cost leakage elsewhere in the organisation.',
    },
  ],
  'procurement-transformation': [
    {
      question: 'What does procurement transformation actually involve?',
      answer:
        'Procurement transformation is a structured redesign of how the procurement function operates. It covers organisational structure, processes, roles, governance, technology and stakeholder engagement. Most organisations aim to move procurement from a transactional purchasing function to a strategic value creator aligned with business objectives. Increasingly, we see procurement departments designing their operating models around the capabilities AI offers today - and will offer tomorrow.',
    },
    {
      question: 'How long does a procurement transformation programme take?',
      answer:
        'The design phase - assessment, target operating model, role definition and transition planning - typically takes 10-16 weeks. The change management aspect is typically underestimated and can take an additional 1-3 months before go-live. Implementation timelines vary depending on organisational complexity, but most programmes show measurable progress within the first quarter and complete the transition over 6-12 months.',
    },
    {
      question: 'How does AI fit into procurement transformation?',
      answer:
        'We design operating models with AI embedded from day one - identifying where AI agents, automated workflows and intelligent decision support can augment human capability across the source-to-pay cycle. This frees procurement teams from repetitive tasks and redirects them toward strategic, high-impact work. Teams that design for AI now gain compounding value as the technology evolves.',
    },
    {
      question: 'What operating model options do you typically recommend?',
      answer:
        'The right model depends on organisational size, maturity and strategy. Common options include centre of excellence, hub-and-spoke, shared services, and hybrid models. We use structured workshops to co-design the model with your leadership team - ensuring it reflects your strategic priorities and is practical to implement.',
    },
  ],
  'category-management': [
    {
      question: 'What is procurement category management?',
      answer:
        'Category management is a strategic approach to procurement that groups similar spend into categories and manages each one with a tailored strategy. Rather than buying reactively contract-by-contract, it involves analysing supply markets, understanding cost drivers, developing sourcing strategies and executing against a defined roadmap - delivering sustained value beyond one-off price reductions.',
    },
    {
      question: 'What spend categories does Vantixe cover?',
      answer:
        'Our team has deep experience creating category strategies across a wide range of direct and indirect categories including professional services, IT and telecoms, facilities management, logistics, MRO, marketing, engineering services and construction, among others.',
    },
    {
      question: 'What is the deliverable of a category strategy engagement?',
      answer:
        'The primary deliverable is a fully documented category strategy covering spend analysis, supply market assessment, strategic objectives, value levers, sourcing approach, implementation roadmap with responsibilities and timelines, and a benefits tracking methodology. We also provide the toolkit and templates so your team can replicate the process across other categories.',
    },
    {
      question: 'How is this different from just running an RFP?',
      answer:
        'An RFP is one sourcing tactic. Category management is the strategic framework that determines whether an RFP is even the right approach. It considers the full range of value levers: demand management, specification optimisation, supply base restructuring, contract innovation, total cost of ownership - not just competitive bidding. The result is more sustainable value creation.',
    },
  ],
  'supplier-management': [
    {
      question: 'What does a supplier management framework include?',
      answer:
        'A complete framework covers five areas: supplier registration and data management, qualification and onboarding, performance measurement (KPIs and scorecards), segmentation with differentiated engagement strategies, and supplier development programmes for strategic partners. We design each element to integrate with your existing procurement processes and systems.',
    },
    {
      question: 'How do you measure supplier performance?',
      answer:
        'We design scorecards with KPIs tailored to the supplier segment - typically covering delivery performance, quality, cost competitiveness, responsiveness, compliance and innovation contribution. The framework includes measurement cadence, data collection methods, review governance and escalation protocols for underperformance.',
    },
    {
      question: 'What is supplier segmentation and why does it matter?',
      answer:
        'Supplier segmentation classifies your supply base into tiers based on strategic importance, spend value and risk. It ensures you invest relationship management effort where it matters most: strategic suppliers get joint business planning and innovation collaboration, while transactional suppliers are managed efficiently through standardised processes. Without segmentation, procurement teams either over-manage low-value suppliers or under-manage critical ones.',
    },
  ],
  'risk-management': [
    {
      question:
        'What types of procurement risk does your framework cover?',
      answer:
        'Our framework addresses financial risk (supplier insolvency, credit exposure), operational risk (supply disruption, capacity constraints), compliance risk (regulatory changes, sanctions exposure), geopolitical risk (trade conflicts, country risk), ESG risk (environmental, social and governance failures) and concentration risk (single-source dependency, geographic concentration).',
    },
    {
      question:
        'How is procurement risk management different from enterprise risk management?',
      answer:
        'Enterprise risk management operates at the corporate level. Procurement risk management focuses specifically on the supply base and third-party relationships - assessing risks at the supplier, category and supply market level. It is embedded into sourcing decisions, supplier management and category strategies rather than managed as a separate corporate function. Risks identified at the supply level roll up to the enterprise level, enabling overall tracking through Key Risk Indicators.',
    },
    {
      question:
        'Do you provide ongoing risk monitoring or is this a one-time assessment?',
      answer:
        'We design frameworks for continuous monitoring - including early warning indicators, review cadence and escalation protocols. For automated, always-on screening, our TPRM platform provides continuous sanctions, PEP monitoring, and supplier onboarding assessment across your entire supplier base with real-time alerts when risk profiles change.',
    },
  ],
  'capability-building': [
    {
      question:
        "How is Vantixe's training different from CIPS or other procurement certifications?",
      answer:
        "Certifications like CIPS provide broad theoretical knowledge. Our programmes are custom-built around your organisation's specific skill gaps, spend categories and strategic priorities. We follow a 30/70 model: 30% structured training and 70% applied coaching on live work. The result is behaviour change, not just knowledge transfer.",
    },
    {
      question: 'What does the Train-the-Trainer approach include?',
      answer:
        'We prepare selected members of your team to deliver the training independently after we leave. This includes facilitator guides, participant workbooks, case studies, assessment tools and a coaching playbook. We co-deliver initial sessions with your trainers, then observe and provide feedback as they take the lead. The goal is self-sufficiency - not ongoing dependency on external trainers.',
    },
    {
      question: 'How do you measure the impact of procurement training?',
      answer:
        'We baseline individual competencies at the start using a structured assessment framework mapped against proficiency levels. At programme close, we re-assess using the same framework - giving you a clear, data-backed picture of capability uplift. We also track applied outcomes: strategies developed, negotiations led, supplier reviews conducted. Based on this assessment, we identify training needs by team, level and individual, and structure the training programme accordingly.',
    },
  ],
  'ai-enabled-solutions': [
    {
      question:
        'What kind of AI applications does Vantixe build for procurement?',
      answer:
        'We build targeted, purpose-built tools - not enterprise platforms. Examples include AI agents that automate supplier pre-qualification screening, guided workflows for category strategy development, dashboards that monitor supplier risk signals in real time, spend anomaly detection models, and document extraction tools for quotes and contracts. Each solution is designed around a specific procurement workflow gap.',
    },
    {
      question:
        'Do you build custom solutions or sell off-the-shelf software?',
      answer:
        'Both. We have enterprise-grade products (TPRM platform and Sourcing Agent, both currently live) that are deployed and proven. In addition, through our Consulting+ model, we build custom tools during advisory engagements - when we identify a gap that can be solved with a focused digital solution. These are delivered as consulting deliverables that the client owns and operates independently.',
    },
    {
      question:
        'Can custom AI tools integrate with our existing ERP or procurement platform?',
      answer:
        'Yes. Our tools are designed to sit alongside or on top of existing systems: SAP, Oracle, Coupa, Ariba or whatever platform you operate. We build integrations via APIs and standard data exchange formats. The solutions complement your existing technology rather than replacing it.',
    },
  ],
}

export const productFaqs: Record<string, FAQItem[]> = {
  tprm: [
    {
      question: 'What sanctions lists does the TPRM platform screen against?',
      answer:
        'The platform screens against 40+ global sanctions and watchlists including OFAC (SDN, Consolidated), UN Security Council, EU Consolidated, UK HMT, and PEP databases. Lists are updated automatically with version tracking, and administrators can enable or disable individual lists to match their compliance requirements.',
    },
    {
      question:
        'How does the platform handle false positives in sanctions screening?',
      answer:
        'Each match is presented with a confidence score, source list, entity type and alias details. Compliance analysts can review the full context, mark matches as confirmed or false positive, and record their reasoning. All decisions are captured in an immutable audit log. Configurable sensitivity settings (lenient, balanced, strict) let you tune the balance between thoroughness and noise.',
    },
    {
      question:
        'How many entities can the TPRM platform monitor continuously?',
      answer:
        'The platform supports continuous monitoring for up to 200,000 entities. Daily delta screening automatically detects new matches, removals or changes across all enabled lists and alerts your team in real time. This means your supplier base is screened continuously without any manual effort.',
    },
    {
      question: 'What AI capabilities does the TPRM platform include?',
      answer:
        'The platform includes an AI Copilot for contextual compliance questions on any page, one-click AI due diligence reports covering litigation, regulatory actions, adverse media and ESG risk, and intelligent deduplication that detects duplicate entities across batch uploads and KYC submissions. AI models are configurable: you choose the provider, temperature and usage limits.',
    },
  ],
  'sourcing-agent': [
    {
      question: 'What does the Sourcing Agent do?',
      answer:
        'The Sourcing Agent runs the full procurement sourcing cycle. Buyers build an RFQ in a single-page builder, the agent distributes tokenized invitation links to selected suppliers, suppliers respond via a structured form or email reply, and the agent benchmarks every line item against historical and competitive data, drafts data-backed negotiation emails and queues them for approval. It can also run sourcing cycles on a schedule via recurring templates.',
    },
    {
      question:
        'How do suppliers respond - do they need a login or a portal account?',
      answer:
        'No. Each invited supplier receives an email with an HMAC-signed response link valid until the RFQ deadline. Clicking the link opens a public form where the supplier enters per-line-item pricing, lead time and notes. Suppliers can also reply by email - the inbound pipeline extracts the quote from PDF, Excel or Word attachments. Both channels feed the same Quote pipeline, so the buyer sees a unified comparison view regardless of how each supplier responded.',
    },
    {
      question: 'Does the agent send negotiation emails without human approval?',
      answer:
        'By default, all outbound emails - whether RFQ invitations or negotiation responses - are queued for human review before sending. Organisations can configure approval rules based on their risk appetite, allowing auto-send for routine cases while requiring buyer sign-off on higher-value or more complex negotiations. Threshold gates can be tuned by dollar amount, extraction confidence, supplier familiarity and discount depth.',
    },
    {
      question:
        'How does the agent determine whether a price is competitive?',
      answer:
        "The agent applies a 4-level price analysis - RFQ-level comparison across all responding suppliers, same-supplier price history, cross-supplier market data and part number matching. The result is a data-driven target price and negotiation rationale for every line item, grounded in your organisation's actual purchasing history. Every claim in the negotiation email references real data; a second AI proofread pass blocks any hallucinated reference before send.",
    },
    {
      question: 'Can the agent run sourcing cycles on a schedule?',
      answer:
        'Yes. Buyers can save any RFQ as a recurring sourcing template - linked items, linked suppliers, default closing window and frequency. On each cycle the scheduler creates a draft RFQ for review or auto-distributes it if the template is trusted. Useful for monthly recurring categories such as kitchen supplies, office consumables or scheduled MRO sourcing.',
    },
  ],
  'category-strategy': [
    {
      question: 'What is the Category Strategy platform?',
      answer:
        'A guided web application that takes procurement teams through the full category strategy process: category profiling, market analysis, strategy development and execution planning, across 21 guided modules. It replaces the scattered Word and PowerPoint process with one living, versioned strategy per category that the whole organisation can review, comment on and approve.',
    },
    {
      question: 'How does the AI work, and can we trust its output?',
      answer:
        'AI pre-drafts each module from your own documents, spend data and market intelligence. Every claim is cited to its source, every draft carries a confidence rating, and when evidence is thin the platform says so instead of inventing an answer. Nothing is saved automatically: your team accepts, edits or rejects suggestions field by field, and every decision is recorded in a tamper-evident audit trail.',
    },
    {
      question: 'What data does the platform work with?',
      answer:
        'Your past strategies, market studies and reports (PowerPoint, Word, PDF, Excel), your spend data and contract register, public price indices with automatic freshness tracking, and AI web research. External feeds and APIs such as price index providers can be connected per client on request. Spend figures and price trends are always computed from data; AI writes only the narrative around them.',
    },
    {
      question: 'How is the platform deployed and secured?',
      answer:
        'Each client gets an isolated deployment: own application, own database, hosted in the region you choose for full data residency. Sign-in uses your Microsoft Entra identity provider with your MFA policy, roles flow from your security groups, and role-based access limits everyone to the categories in their remit. Branding, category tree and performance measures are configured per client.',
    },
    {
      question: 'How do we get started?',
      answer:
        'Request a demo and we will walk your team through the platform with realistic sample data. A pilot can be set up quickly: we configure your category tree and branding, load your spend and contract data, and your team builds its first strategies with our support alongside.',
    },
  ],
}
