import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Comprehensive procurement advisory services: cost optimization, transformation, category management, supplier management, risk management, digital procurement, and capability building.',
}

const BOOKING_URL =
  'https://outlook.office.com/book/MeetingsWithMichael@vantixe.com/?ismsaljsauthenabled'

const services = [
  {
    icon: '\uD83D\uDCCA',
    title: 'Cost Optimization',
    slug: 'cost-optimization',
    description:
      'Identify and capture savings opportunities across your entire procurement landscape. Our diagnostic approach uncovers quick wins and strategic initiatives, targeting 10-25% savings across addressable spend.',
  },
  {
    icon: '\uD83D\uDD04',
    title: 'Procurement Transformation',
    slug: 'procurement-transformation',
    description:
      'End-to-end transformation programs that modernize your procurement function. From operating model design to process optimization, we deliver sustainable, measurable business impact.',
  },
  {
    icon: '\uD83C\uDF93',
    title: 'Capability Building & Training',
    slug: 'capability-building',
    description:
      'Custom procurement academies and training programs designed to build internal capabilities and drive long-term excellence. Tailored curricula for all levels.',
  },
  {
    icon: '\uD83C\uDFAF',
    title: 'Category Management & Strategy',
    slug: 'category-management',
    description:
      'Develop and execute winning strategies for key spending categories. Market analysis, supplier landscape mapping, and execution roadmaps that drive value beyond cost reduction.',
  },
  {
    icon: '\uD83E\uDD1D',
    title: 'Supplier Management',
    slug: 'supplier-management',
    description:
      'Build strategic supplier relationships, optimize your supply base, and implement performance management frameworks. From SRM strategy to ongoing supplier development.',
  },
  {
    icon: '\uD83D\uDEE1\uFE0F',
    title: 'Risk Management & Framework Development',
    slug: 'risk-management',
    description:
      'Identify, assess, and mitigate procurement and supply chain risks. Framework development, risk mapping, and continuous monitoring to ensure business continuity and resilience.',
  },
  {
    icon: '\uD83D\uDCBB',
    title: 'AI-Enabled Procurement Solutions',
    slug: 'ai-enabled-solutions',
    description:
      'Leverage technology and AI to modernize procurement processes. Custom-built applications for KYC automation, supplier risk monitoring, guided category strategy, spend analytics, and predictive modeling.',
  },
]

export default function ServicesPage() {
  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-dark to-primary text-white py-20">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-white/80">
            Comprehensive procurement solutions tailored to your business needs
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="space-y-8">
            {services.map((service, i) => (
              <Link
                key={service.title}
                href={`/services/${service.slug}`}
                className={`grid md:grid-cols-[80px_1fr] gap-6 p-8 rounded-xl transition-all duration-250 hover:shadow-card-hover hover:-translate-y-0.5 no-underline block ${
                  i % 2 === 0 ? 'bg-white' : 'bg-bg-light'
                }`}
              >
                <div className="text-4xl">{service.icon}</div>
                <div>
                  <h2 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary">
                    {service.title}
                  </h2>
                  <p className="text-text-secondary leading-relaxed">
                    {service.description}
                  </p>
                  <span className="text-primary text-sm font-medium mt-3 inline-block">
                    Learn more {'\u2192'}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button variant="primary" size="lg" href={BOOKING_URL} external>
              Discuss Your Needs
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
