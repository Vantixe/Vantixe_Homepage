import type { MetadataRoute } from 'next'
import { servicePages } from '@/lib/services'

export default function sitemap(): MetadataRoute.Sitemap {
  const comUrl = 'https://www.vantixe.com'
  const aiUrl = 'https://vantixe.ai'

  const serviceRoutes = servicePages.map((s) => ({
    url: `${comUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    // Consulting pages (vantixe.com)
    { url: comUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${comUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${comUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    ...serviceRoutes,
    { url: `${comUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },

    // Technology pages (vantixe.ai)
    { url: aiUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${aiUrl}/tprm`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${aiUrl}/negotiation-agent`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${aiUrl}/category-strategy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]
}
