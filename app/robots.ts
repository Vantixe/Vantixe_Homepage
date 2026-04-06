import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import { DOMAINS } from '@/lib/domains'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers()
  const host = headersList.get('host') || ''
  const isAi = host.includes('vantixe.ai')

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: isAi
      ? `${DOMAINS.technology}/sitemap.xml`
      : `${DOMAINS.consulting}/sitemap.xml`,
  }
}
