'use client'

import { useEffect } from 'react'
import { BOOKING_URL } from '@/lib/booking'

/**
 * Optional event-specific LinkedIn conversion for "booking started". The
 * page-load rule ("URL contains /book") in Campaign Manager is what counts;
 * this call is an extra signal when the id is configured.
 */
const CONVERSION_ID = process.env.NEXT_PUBLIC_LINKEDIN_BOOKING_CONVERSION_ID

const INSIGHT_SCRIPT_SELECTOR = 'script[src*="li.lms-analytics/insight.min.js"]'
/** The inline snippet that injects the tag is an afterInteractive script and may run after this effect. */
const SCRIPT_POLL_MS = 50
const SCRIPT_POLL_MAX_MS = 300
/** The tag's own page-view beacon has to leave the browser before we navigate away. */
const BEACON_GRACE_MS = 250
/** Hard cap, so a blocked or hanging tag never strands the visitor. */
const TOTAL_CAP_MS = 1200

interface LinkedInTrack {
  (action: string, payload?: Record<string, unknown>): void
  q?: unknown[][]
}

declare global {
  interface Window {
    lintrk?: LinkedInTrack
  }
}

/**
 * Interstitial for the booking link. Records the visit on our own domain (the
 * Insight Tag in the root layout fires on this page load), queues the optional
 * conversion event, waits briefly for the tag to load, then replaces the
 * current history entry with Microsoft Bookings so Back never lands here.
 */
export function BookRedirect() {
  // React StrictMode runs this effect twice in development only; the cleanup
  // cancels the first run's timers, and the duplicate queued 'track' call is
  // harmless (LinkedIn dedupes within the session, and it never happens in
  // production builds).
  useEffect(() => {
    let done = false
    const timers: number[] = []

    const go = () => {
      if (done) return
      done = true
      timers.forEach((t) => window.clearTimeout(t))
      window.location.replace(BOOKING_URL)
    }
    const goAfterGrace = () => {
      timers.push(window.setTimeout(go, BEACON_GRACE_MS))
    }

    if (CONVERSION_ID) {
      // If the tag has not run yet, create LinkedIn's own queue shim; the real
      // script replays the queue when it loads. Same shape as the inline snippet.
      if (!window.lintrk) {
        const shim: LinkedInTrack = (a, b) => {
          shim.q!.push([a, b])
        }
        shim.q = []
        window.lintrk = shim
      }
      const id = /^\d+$/.test(CONVERSION_ID) ? Number(CONVERSION_ID) : CONVERSION_ID
      window.lintrk('track', { conversion_id: id })
    }

    // Wait for the tag to actually load, so its page-view beacon is sent before
    // we leave. Where the tag is absent (no partner id) or blocked, fall through fast.
    const started = Date.now()
    const waitForScript = () => {
      const script = document.querySelector<HTMLScriptElement>(INSIGHT_SCRIPT_SELECTOR)
      if (script) {
        script.addEventListener('load', goAfterGrace, { once: true })
        script.addEventListener('error', go, { once: true })
        // If the script had already finished before we attached the listener,
        // 'load' never fires. Two signals cover that: the browser's resource
        // timing table lists the file once its download completed, and the real
        // tag replaces the queue shim with its own function (no .q). The cap
        // below covers every other case.
        const alreadyLoaded = () => {
          if (done) return
          const downloaded = performance.getEntriesByName(script.src).some((e) => (e as PerformanceResourceTiming).responseEnd > 0)
          if (downloaded || (window.lintrk && !('q' in window.lintrk))) goAfterGrace()
          else timers.push(window.setTimeout(alreadyLoaded, SCRIPT_POLL_MS))
        }
        alreadyLoaded()
        return
      }
      if (Date.now() - started < SCRIPT_POLL_MAX_MS) {
        timers.push(window.setTimeout(waitForScript, SCRIPT_POLL_MS))
      } else {
        go()
      }
    }
    waitForScript()
    timers.push(window.setTimeout(go, TOTAL_CAP_MS))

    return () => {
      done = true
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [])

  return (
    <section className="min-h-screen bg-gradient-to-br from-primary-dark to-primary text-white flex items-center justify-center px-6 pt-[72px]">
      <div role="status" aria-live="polite" className="text-center max-w-[560px]">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Opening the booking calendar…</h1>
        <p className="text-white/80 mb-8">
          You are being taken to Michael Seitz&apos;s calendar on Microsoft Bookings.
        </p>
        <a href={BOOKING_URL} className="text-white underline underline-offset-4 hover:text-white/80">
          If nothing happens, open the calendar directly
        </a>
        <noscript>
          <p className="mt-4">
            <a href={BOOKING_URL} className="text-white underline underline-offset-4">
              Open the booking calendar
            </a>
          </p>
        </noscript>
      </div>
    </section>
  )
}
