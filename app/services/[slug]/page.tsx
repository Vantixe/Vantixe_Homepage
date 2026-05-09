import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { servicePages } from '@/lib/services'
import { serviceFaqs } from '@/lib/faqs'
import { ServicePageLayout } from '@/components/consulting/ServicePageLayout'
import { FAQSchema } from '@/components/layout/FAQSchema'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = servicePages.find((s) => s.slug === slug)
  if (!service) return {}

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `https://www.vantixe.com/services/${service.slug}`,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://www.vantixe.com/services/${service.slug}`,
    },
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = servicePages.find((s) => s.slug === slug)

  if (!service) notFound()

  const faqs = serviceFaqs[service.slug]

  return (
    <>
      {faqs && <FAQSchema faqs={faqs} />}
      <ServicePageLayout data={service} />
    </>
  )
}
