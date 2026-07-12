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
export function VideoSchema(props: VideoSchemaProps) {
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
