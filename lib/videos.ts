/**
 * Self-hosted product promo videos.
 *
 * One entry per product that has a film. Consumed by the product card
 * (ambient preview), the product page hero (framed player) and the
 * VideoObject JSON-LD on every page that shows the film, so the file paths
 * and the search-engine description live in exactly one place.
 *
 * Files live in public/videos/, compressed with ffmpeg (CRF 26, faststart)
 * with a poster frame that shows product UI rather than a title card.
 */
export interface ProductVideoAsset {
  /** Site-relative video URL. */
  src: string
  /** Site-relative poster image URL. */
  poster: string
  /** Accessible name of the player, also the VideoObject name. */
  name: string
  /** VideoObject description. */
  description: string
  /** ISO date the film was published, e.g. "2026-07-11". */
  uploadDate: string
  /** ISO 8601 duration, e.g. "PT1M35S". */
  duration: string
}

export const productVideos = {
  tprm: {
    src: '/videos/tprm-promo.mp4',
    poster: '/videos/tprm-promo-poster.jpg',
    name: 'See TPRM in Action: Automated Third-Party Risk Management',
    description:
      'Automated supplier onboarding, sanctions and PEP screening, continuous monitoring and AI-powered due diligence with Vantixe TPRM.',
    uploadDate: '2026-07-11',
    duration: 'PT1M35S',
  },
  'sourcing-agent': {
    src: '/videos/autonomous-sourcing-promo.mp4',
    poster: '/videos/autonomous-sourcing-promo-poster.jpg',
    name: 'See Autonomous Sourcing and Negotiation in Action',
    description:
      'AI agents build the RFQ, collect supplier quotes, benchmark every price and draft the negotiation with Vantixe Autonomous Sourcing and Negotiation.',
    uploadDate: '2026-09-02',
    duration: 'PT1M50S',
  },
} satisfies Record<string, ProductVideoAsset>

export type ProductVideoId = keyof typeof productVideos

/** The film for a product id, or undefined for products without one. */
export function getProductVideo(id: string): ProductVideoAsset | undefined {
  return (productVideos as Record<string, ProductVideoAsset>)[id]
}
