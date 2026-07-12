'use client'

import { useEffect, useRef } from 'react'

interface ProductVideoProps {
  /** Video file URL. Attached lazily when the player nears the viewport. */
  src: string
  poster: string
  /** Accessible name for the video element. */
  label: string
  className?: string
  /**
   * Ambient mode: a silent moving preview with no controls or frame that
   * fills its parent box. For card thumbnails inside links, where nested
   * player controls would fight the link click.
   */
  ambient?: boolean
}

/**
 * Self-hosted product video, dark-theme framed to match ProductDemo.
 *
 * Plays muted on loop while in view, pauses when scrolled away, and only
 * downloads the video file once the visitor scrolls near it (the poster is
 * all that loads up front). In the default framed mode, native controls let
 * visitors pause and replay; a manual pause is respected and never
 * auto-resumed.
 */
export function ProductVideo({
  src,
  poster,
  label,
  className = '',
  ambient = false,
}: ProductVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const userPausedRef = useRef(false)
  const autoPausingRef = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reduced motion + ambient: the preview can never play (no
          // controls), so keep the poster and skip the download entirely.
          if (ambient && reduceMotion) return
          // Attach the file only once the player is near the viewport, so
          // visitors who never scroll here download nothing but the poster.
          if (!video.src) {
            video.src = src
          }
          if (!reduceMotion && !userPausedRef.current && video.paused) {
            // Set muted imperatively right before play(): React does not
            // reliably write the muted attribute to the DOM, and browsers
            // silently block unmuted autoplay.
            video.muted = true
            video.play().catch(() => {
              // Autoplay can still be blocked (e.g. iOS Low Power Mode);
              // the poster (and controls, when framed) remain usable.
            })
          }
        } else if (!video.paused) {
          // Flag BEFORE pausing so the pause handler can tell an automatic
          // scroll-away pause apart from the visitor pressing pause.
          autoPausingRef.current = true
          video.pause()
        }
      },
      { rootMargin: '300px 0px' },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [src, ambient])

  const video = (
    // eslint-disable-next-line jsx-a11y/media-has-caption -- the video is designed for silent playback and carries no speech
    <video
      ref={videoRef}
      poster={poster}
      // Ambient previews are decorative inside a link that already has an
      // accessible name from the card text; hide them from assistive tech.
      aria-hidden={ambient || undefined}
      aria-label={ambient ? undefined : label}
      controls={!ambient}
      loop
      muted
      playsInline
      preload="none"
      className={
        ambient
          ? `absolute inset-0 w-full h-full object-cover object-top ${className}`
          : 'w-full h-full object-cover'
      }
      onPause={() => {
        if (autoPausingRef.current) {
          autoPausingRef.current = false
        } else if (!ambient) {
          // Only framed mode has controls, so only there can a pause be a
          // deliberate visitor choice. Ambient pauses are system-initiated
          // (tab switch, low power mode) and must not block auto-resume.
          userPausedRef.current = true
        }
      }}
      onPlay={() => {
        userPausedRef.current = false
      }}
    />
  )

  if (ambient) {
    return video
  }

  return (
    <div
      className={`aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(10,138,173,0.15)] bg-dark-bg ${className}`}
    >
      {video}
    </div>
  )
}
