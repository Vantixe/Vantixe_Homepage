import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import { servicePages } from '@/lib/services'
import { DOMAINS } from '@/lib/domains'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers()
  const host = headersList.get('host') || ''
  const isAi = host.includes('vantixe.ai')

  if (isAi) {
    // Technology pages only (vantixe.ai)
    return [
      { url: DOMAINS.technology, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
      { url: `${DOMAINS.technology}/tprm`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
      { url: `${DOMAINS.technology}/negotiation-agent`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
      { url: `${DOMAINS.technology}/category-strategy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ]
  }

  // Consulting pages only (vantixe.com)
  const serviceRoutes = servicePages.map((s) => ({
    url: `${DOMAINS.consulting}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    { url: DOMAINS.consulting, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${DOMAINS.consulting}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${DOMAINS.consulting}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    ...serviceRoutes,
    { url: `${DOMAINS.consulting}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]
}
