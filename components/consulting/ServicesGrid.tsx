'use client'

import Link from 'next/link'
import { FadeInView } from '@/components/animations/FadeInView'
import { StaggerChildren, StaggerItem } from '@/components/animations/StaggerChildren'
import { Button } from '@/components/ui/Button'

const services = [
  {
    icon: '\uD83D\uDCCA',
    title: 'Cost Optimization',
    slug: 'cost-optimization',
    description:
      'Identify and capture savings opportunities across your entire procurement landscape. Our diagnostic approach uncovers quick wins and strategic initiatives.',
  },
  {
    icon: '\uD83D\uDD04',
    title: 'Procurement Transformation',
    slug: 'procurement-transformation',
    description:
      'End-to-end transformation programs that modernize your procurement function and deliver sustainable, measurable business impact.',
  },
  {
    icon: '\uD83C\uDF93',
    title: 'Capability Building & Training',
    slug: 'capability-building',
    description:
      'Custom procurement academies and training programs designed to build internal capabilities and drive long-term excellence.',
  },
  {
    icon: '\uD83C\uDFAF',
    title: 'Category Management & Strategy',
    slug: 'category-management',
    description:
      'Develop and execute winning strategies for key spending categories, driving value beyond cost reduction.',
  },
  {
    icon: '\uD83E\uDD1D',
    title: 'Supplier Management',
    slug: 'supplier-management',
    description:
      'Build strategic supplier relationships, optimize your supply base, and implement performance management frameworks.',
  },
  {
    icon: '\uD83D\uDEE1\uFE0F',
    title: 'Risk Management & Framework Development',
    slug: 'risk-management',
    description:
      'Identify, assess, and mitigate procurement and supply chain risks to ensure business continuity and resilience.',
  },
  {
    icon: '\uD83D\uDCBB',
    title: 'AI-Enabled Procurement Solutions',
    slug: 'ai-enabled-solutions',
    description:
      'Custom AI agents, workflow applications, and decision-support tools built for your specific procurement challenges. We don\u2019t recommend software - we build it.',
  },
]

export function ServicesGrid() {
  return (
    <section id="services" className="section-padding bg-bg-light">
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeInView>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Our Services
          </h2>
          <p className="text-lg text-text-muted max-w-[700px] mb-12">
            Comprehensive procurement solutions tailored to your business needs
          </p>
        </FadeInView>

        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <Link
                href={`/services/${service.slug}`}
                className="block bg-white border-2 border-gray-100 rounded-xl p-8 h-full hover:border-primary/30 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-250 no-underline group"
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-3">
                  {service.description}
                </p>
                <span className="text-primary text-sm font-medium group-hover:translate-x-1 transition-transform inline-block">
                  Learn more {'\u2192'}
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <div className="text-center mt-12">
          <Button href="/services">View All Services</Button>
        </div>
      </div>
    </section>
  )
}
