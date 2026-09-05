import { productVideos } from '@/lib/videos'
import type { ProductVideoId } from '@/lib/videos'

interface VideoSchemaProps {
  name: string
  description: string
  /** Absolute URL of the video file. */
  contentUrl: string
  /** Absolute URL of the poster image. */
  thumbnailUrl: string
  /** ISO date, e.g. "2026-07-11". */
  uploadDate: string
  /** ISO 8601 duration, e.g. "PT1M35S". */
  duration: string
}

/** VideoObject JSON-LD so search engines can surface the video. */
function VideoSchema(props: VideoSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: props.name,
    description: props.description,
    contentUrl: props.contentUrl,
    thumbnailUrl: props.thumbnailUrl,
    uploadDate: props.uploadDate,
    duration: props.duration,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface ProductVideoSchemasProps {
  /** Origin the page is served from, e.g. DOMAINS.consulting. */
  origin: string
  /** Product ids to emit schema for. Defaults to every product with a film. */
  productIds?: ProductVideoId[]
}

/**
 * VideoObject JSON-LD for product films, one block per product. Used by the
 * pages that show the films: both homepages (every film, via the product
 * cards) and each product page (its own film).
 */
export function ProductVideoSchemas({ origin, productIds }: ProductVideoSchemasProps) {
  const ids = productIds ?? (Object.keys(productVideos) as ProductVideoId[])
  return (
    <>
      {ids.map((id) => {
        const video = productVideos[id]
        return (
          <VideoSchema
            key={id}
            name={video.name}
            description={video.description}
            contentUrl={`${origin}${video.src}`}
            thumbnailUrl={`${origin}${video.poster}`}
            uploadDate={video.uploadDate}
            duration={video.duration}
          />
        )
      })}
    </>
  )
}
