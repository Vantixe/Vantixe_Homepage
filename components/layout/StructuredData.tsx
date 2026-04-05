export function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Vantixe Advisory Limited',
    alternateName: 'Vantixe',
    description:
      'Expert-led procurement consulting and AI-powered technology. Specialist-only teams delivering transformational results without Big Four overhead.',
    url: 'https://www.vantixe.com',
    logo: 'https://www.vantixe.com/images/logo.svg',
    image: 'https://www.vantixe.com/images/og-image.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Unit 1603, The L. Plaza, 367-375 Queen\'s Road Central',
      addressLocality: 'Sheung Wan',
      addressRegion: 'Hong Kong',
      addressCountry: 'HK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '22.2855',
      longitude: '114.1495',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@vantixe.com',
      contactType: 'Customer Service',
      availableLanguage: ['English', 'German'],
    },
    founder: {
      '@type': 'Person',
      name: 'Michael Seitz',
      jobTitle: 'Founder & Managing Director',
      description:
        'Former KPMG Advisory Partner and GEP North Asia Leader with 18 years of procurement advisory experience',
      alumniOf: [
        { '@type': 'Organization', name: 'KPMG' },
        { '@type': 'Organization', name: 'GEP' },
      ],
    },
    areaServed: [
      { '@type': 'Place', name: 'Hong Kong' },
      { '@type': 'Place', name: 'Greater China' },
      { '@type': 'Place', name: 'Asia-Pacific' },
    ],
    slogan: 'Procurement Excellence. Delivered.',
    knowsAbout: [
      'Procurement Consulting',
      'Strategic Sourcing',
      'Category Management',
      'AI in Procurement',
      'Third-Party Risk Management',
      'Digital Procurement',
    ],
  }

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Vantixe Technology Platform',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description:
      'AI-powered procurement technology platform including TPRM (Third-Party Risk Management), Quote Negotiation Agent, and Category Strategy tools.',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
    },
    author: {
      '@type': 'Organization',
      name: 'Vantixe Advisory Limited',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema),
        }}
      />
    </>
  )
}
