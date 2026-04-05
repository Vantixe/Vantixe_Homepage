import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: [
      'https://www.vantixe.com/sitemap.xml',
      'https://vantixe.ai/sitemap.xml',
    ],
  }
}
