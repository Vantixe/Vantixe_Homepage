'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'

type Intent = 'quote' | 'callback' | 'demo' | 'general' | 'press'

const INTENT_OPTIONS: { value: Intent; label: string; description: string }[] = [
  { value: 'quote', label: 'Get a quote or proposal', description: 'Scope a piece of work and receive a written proposal.' },
  { value: 'callback', label: 'Request a callback', description: 'Tell us when to call and we’ll fit your schedule.' },
  { value: 'demo', label: 'Book a product demo', description: 'See TPRM, Autonomous Sourcing or Category Strategy in action.' },
  { value: 'general', label: 'General inquiry', description: 'Anything else: questions, partnerships, ideas.' },
  { value: 'press', label: 'Speaking or press', description: 'Media, conferences, interviews.' },
]

const PRODUCT_OPTIONS = [
  { value: '', label: 'Select a product' },
  { value: 'tprm', label: 'TPRM: Third-Party Risk Management' },
  { value: 'sourcing-agent', label: 'Autonomous Sourcing and Negotiation' },
  { value: 'category-strategy', label: 'Category Strategy: Guided Strategy Platform' },
  { value: 'all', label: 'The full platform' },
]

type Status = 'idle' | 'submitting' | 'success' | 'error'

const INTENT_VALUES: string[] = INTENT_OPTIONS.map((o) => o.value)
const PRODUCT_VALUES: string[] = PRODUCT_OPTIONS.map((o) => o.value).filter(Boolean)

/** Real page load after a successful submission, so ad platforms can count it by URL. */
const THANK_YOU_PATH = '/thank-you'
/** How long to let Google Tag Manager finish its tags before we navigate away. */
const GTM_EVENT_TIMEOUT_MS = 1500
/** If the browser never left (navigation blocked), show the inline confirmation instead. */
const SUCCESS_FALLBACK_MS = 4000
/**
 * Two thresholds, because "the script never loaded" and "the challenge is taking
 * a while" deserve different patience.
 *
 * A script that never ran is definitive and worth reporting quickly. A widget
 * that HAS rendered may simply be waiting on a person to click an interactive
 * challenge, and telling them it failed while they are solving it would send a
 * live lead to email for no reason. So the second threshold is generous.
 */
const TURNSTILE_SCRIPT_TIMEOUT_MS = 10000
const TURNSTILE_SOLVE_TIMEOUT_MS = 40000

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string
      reset: (widgetId?: string) => void
      remove: (widgetId?: string) => void
    }
    onTurnstileLoad?: () => void
    dataLayer?: Record<string, unknown>[]
  }
}

interface ContactFormProps {
  turnstileSiteKey?: string
  /**
   * True when Google Tag Manager is loaded on the page (NEXT_PUBLIC_GTM_ID set).
   * Then the redirect waits for GTM's eventCallback so the Google Ads conversion
   * request is not cut off. When false there is nothing to wait for.
   */
  gtmConfigured?: boolean
}

export function ContactForm({ turnstileSiteKey, gtmConfigured = false }: ContactFormProps) {
  const searchParams = useSearchParams()
  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string>('')
  /** Mirrors turnstileToken. The watchdog below closes over stale state otherwise. */
  const turnstileTokenRef = useRef('')
  /**
   * The bot check could not load or gave up. The submit button stays disabled
   * either way (never send unverified), but the visitor is told why and given
   * another way to reach us, instead of staring at a dead button.
   */
  const [turnstileUnavailable, setTurnstileUnavailable] = useState(false)

  // Redirect bookkeeping. Refs, not state: the GTM callback and the fallback
  // timer both close over these, and exactly one of them may navigate.
  const navigatedRef = useRef(false)
  const redirectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const leaveListenerRef = useRef<((event: MouseEvent) => void) | null>(null)

  function clearPendingRedirect() {
    if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current)
    if (successTimerRef.current) clearTimeout(successTimerRef.current)
    redirectTimerRef.current = null
    successTimerRef.current = null
    if (leaveListenerRef.current) document.removeEventListener('click', leaveListenerRef.current, true)
    leaveListenerRef.current = null
  }

  const [intent, setIntent] = useState<Intent>('general')
  const [product, setProduct] = useState<string>('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  // Prefill from query params: ?topic=demo&product=tprm
  useEffect(() => {
    const topic = searchParams.get('topic')
    const productParam = searchParams.get('product')
    if (topic && ['quote', 'callback', 'demo', 'general', 'press'].includes(topic)) {
      setIntent(topic as Intent)
    }
    if (productParam) {
      setProduct(productParam)
    }
  }, [searchParams])

  // Load + render Turnstile when site key is configured
  useEffect(() => {
    if (!turnstileSiteKey) return
    if (typeof window === 'undefined') return

    const SCRIPT_ID = 'cf-turnstile-script'

    function render() {
      if (!turnstileRef.current || !window.turnstile) return
      if (widgetIdRef.current) return // already rendered
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: turnstileSiteKey,
        callback: (token: string) => {
          turnstileTokenRef.current = token
          setTurnstileToken(token)
          setTurnstileUnavailable(false)
        },
        // Cloudflare reporting a problem it cannot recover from: a hostname
        // missing from the widget's allowlist, or a challenge that failed.
        'error-callback': () => {
          turnstileTokenRef.current = ''
          setTurnstileToken('')
          setTurnstileUnavailable(true)
        },
        // Expiry is normal and self-healing: the widget fetches a new token, so
        // drop the spent one without alarming anybody.
        'expired-callback': () => {
          turnstileTokenRef.current = ''
          setTurnstileToken('')
        },
        theme: 'light',
      })
    }

    // Neither callback fires when the script never runs at all, which is the
    // common case: an extension, a corporate proxy or a DNS filter blocking
    // Cloudflare. Without this the visitor is left with a completed form, a
    // permanently dead button and no explanation, and the enquiry is lost with
    // nothing recorded anywhere.
    const scriptWatchdog = setTimeout(() => {
      const neverAppeared = !window.turnstile || !widgetIdRef.current
      if (!turnstileTokenRef.current && neverAppeared) setTurnstileUnavailable(true)
    }, TURNSTILE_SCRIPT_TIMEOUT_MS)

    // The widget rendered but no token ever arrived: a challenge that cannot
    // complete for this visitor. Slower to fire, so somebody working through an
    // interactive challenge is not interrupted. If they do solve it, the success
    // callback clears the notice again.
    const solveWatchdog = setTimeout(() => {
      if (!turnstileTokenRef.current) setTurnstileUnavailable(true)
    }, TURNSTILE_SOLVE_TIMEOUT_MS)

    if (window.turnstile) {
      render()
    } else {
      if (!document.getElementById(SCRIPT_ID)) {
        const script = document.createElement('script')
        script.id = SCRIPT_ID
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad&render=explicit'
        script.async = true
        script.defer = true
        script.onerror = () => setTurnstileUnavailable(true)
        document.head.appendChild(script)
      }
      window.onTurnstileLoad = render
    }

    return () => {
      clearTimeout(scriptWatchdog)
      clearTimeout(solveWatchdog)
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [turnstileSiteKey])

  // Back from /thank-you can restore this page from the back-forward cache with
  // the button still disabled. Reset so a second message can be sent.
  useEffect(() => {
    function onPageShow(event: PageTransitionEvent) {
      if (event.persisted) {
        // Timers armed before the redirect are frozen with the page and would
        // resume here: the success card would replace the restored form, or a
        // pending redirect timer would send the visitor forward again.
        clearPendingRedirect()
        navigatedRef.current = false
        setStatus('idle')
        // A Turnstile token is single-use and the one in memory was spent on the
        // send that just succeeded. Ask the widget for a fresh one.
        turnstileTokenRef.current = ''
        setTurnstileToken('')
        setTurnstileUnavailable(false)
        if (widgetIdRef.current && window.turnstile) window.turnstile.reset(widgetIdRef.current)
      }
    }
    window.addEventListener('pageshow', onPageShow)
    return () => {
      window.removeEventListener('pageshow', onPageShow)
      // Leaving the page another way (a navbar link) must not fire a stale redirect.
      clearPendingRedirect()
    }
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      intent: data.get('intent'),
      product: data.get('product') || null,
      name: data.get('name'),
      company: data.get('company'),
      email: data.get('email'),
      phone: data.get('phone') || null,
      country: data.get('country') || null,
      companySize: data.get('companySize') || null,
      message: data.get('message'),
      preferredTime: data.get('preferredTime') || null,
      subscribe: data.get('subscribe') === 'on',
      website: data.get('website'), // honeypot, must be empty
      turnstileToken,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Submission failed. Please try again.')
      }
      // Honeypot filled: the API answered 200 on purpose so the bot believes it
      // succeeded. Mirror that here. No tracking event, no redirect.
      if (typeof payload.website === 'string' && payload.website.trim() !== '') {
        setStatus('success')
        return
      }

      // Land on a real page so LinkedIn (URL rule: contains /thank-you) can count
      // the lead. Carry what the visitor actually submitted, validated against
      // the option lists, so reporting can separate demo requests by product.
      const params = new URLSearchParams()
      const intentValue = String(payload.intent ?? '')
      const productValue = String(payload.product ?? '')
      if (INTENT_VALUES.includes(intentValue)) params.set('topic', intentValue)
      if (PRODUCT_VALUES.includes(productValue)) params.set('product', productValue)
      const query = params.toString()
      const target = query ? `${THANK_YOU_PATH}?${query}` : THANK_YOU_PATH

      const go = () => {
        if (navigatedRef.current) return
        navigatedRef.current = true
        clearPendingRedirect()
        window.location.assign(target)
      }

      // The visitor can still click a link during the short GTM wait. That is
      // a choice to leave: drop the pending redirect at once, rather than let
      // the timer fire while the new page is still loading and yank them to
      // /thank-you. Plain left clicks only; a new-tab click keeps them here.
      const onLeaveClick = (event: MouseEvent) => {
        const link = event.target instanceof Element ? event.target.closest('a[href]') : null
        if (!link) return
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
        if ((link as HTMLAnchorElement).target === '_blank') return
        navigatedRef.current = true
        clearPendingRedirect()
      }
      leaveListenerRef.current = onLeaveClick
      document.addEventListener('click', onLeaveClick, true)

      // Tell Google Tag Manager about the lead (Google Ads conversion). With GTM
      // on the page, navigate from its eventCallback so the conversion request
      // completes; the timer is the fallback if GTM never calls back.
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: 'contact_form_submit',
        intent: payload.intent,
        product: payload.product,
        ...(gtmConfigured ? { eventCallback: go, eventTimeout: GTM_EVENT_TIMEOUT_MS } : {}),
      })
      redirectTimerRef.current = setTimeout(go, gtmConfigured ? GTM_EVENT_TIMEOUT_MS : 0)

      // If the browser is still here after this long, the navigation was blocked.
      // Show the confirmation so the visitor knows the message went through.
      successTimerRef.current = setTimeout(() => setStatus('success'), SUCCESS_FALLBACK_MS)
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Submission failed. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white border-2 border-accent-mint/40 rounded-2xl p-10 md:p-14 text-center shadow-sm">
        <div className="text-4xl mb-4">{'✓'}</div>
        <h3 className="text-2xl font-bold text-text-primary mb-3">Thanks, we’ve got it.</h3>
        <p className="text-text-muted max-w-md mx-auto">
          Michael or someone on the Vantixe team will be in touch within one business day.
          For anything urgent, email{' '}
          <a href="mailto:hello@vantixe.com" className="text-primary hover:underline">hello@vantixe.com</a>.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm text-primary font-semibold hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  const inputClass =
    'w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-text-primary placeholder:text-text-muted/60 focus:border-primary focus:outline-none transition-colors'
  const labelClass = 'block text-sm font-semibold text-text-primary mb-2'

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border-2 border-gray-100 rounded-2xl p-8 md:p-10 shadow-sm"
      noValidate
    >
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-text-primary mb-2">Leave us a message</h3>
        <p className="text-text-muted text-sm">
          Whatever you need: a quote, a callback, a product demo, or just a question. This form gets to the right person.
        </p>
      </div>

      {/* Intent */}
      <fieldset className="mb-8">
        <legend className={labelClass}>What can we help with? <span className="text-cta">*</span></legend>
        <div className="grid sm:grid-cols-2 gap-3">
          {INTENT_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                intent === opt.value
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-primary/30'
              }`}
            >
              <input
                type="radio"
                name="intent"
                value={opt.value}
                checked={intent === opt.value}
                onChange={() => setIntent(opt.value)}
                className="mt-1 accent-primary"
                required
              />
              <span className="flex-1">
                <span className="block text-sm font-semibold text-text-primary">{opt.label}</span>
                <span className="block text-xs text-text-muted mt-0.5">{opt.description}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Product (only for demo) */}
      {intent === 'demo' && (
        <div className="mb-6">
          <label htmlFor="product" className={labelClass}>
            Which product? <span className="text-cta">*</span>
          </label>
          <select
            id="product"
            name="product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            required
            className={inputClass}
          >
            {PRODUCT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Name + Company */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="name" className={labelClass}>
            Your name <span className="text-cta">*</span>
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>
            Company <span className="text-cta">*</span>
          </label>
          <input id="company" name="company" type="text" required autoComplete="organization" className={inputClass} />
        </div>
      </div>

      {/* Email + Phone */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="email" className={labelClass}>
            Work email <span className="text-cta">*</span>
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone {intent === 'callback' && <span className="text-cta">*</span>}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required={intent === 'callback'}
            placeholder={intent === 'callback' ? 'Required for callback' : 'Optional'}
            className={inputClass}
          />
        </div>
      </div>

      {/* Country + Company size */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="country" className={labelClass}>Country / region</label>
          <input id="country" name="country" type="text" autoComplete="country-name" placeholder="Optional" className={inputClass} />
        </div>
        <div>
          <label htmlFor="companySize" className={labelClass}>Company size</label>
          <select id="companySize" name="companySize" defaultValue="" className={inputClass}>
            <option value="">Optional</option>
            <option value="1-50">1-50 employees</option>
            <option value="51-250">51-250</option>
            <option value="251-1000">251-1,000</option>
            <option value="1001-5000">1,001-5,000</option>
            <option value="5001+">5,001+</option>
          </select>
        </div>
      </div>

      {/* Preferred time (only for callback) */}
      {intent === 'callback' && (
        <div className="mb-6">
          <label htmlFor="preferredTime" className={labelClass}>
            Preferred time to call
          </label>
          <input
            id="preferredTime"
            name="preferredTime"
            type="text"
            placeholder="e.g. weekday mornings HKT, or Wed/Thu 2-5pm GMT"
            className={inputClass}
          />
        </div>
      )}

      {/* Message */}
      <div className="mb-6">
        <label htmlFor="message" className={labelClass}>
          Tell us about your needs <span className="text-cta">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="A few sentences on what you’re working on, what you’re hoping to get out of this, and any timing."
          className={inputClass}
        />
      </div>

      {/* Subscribe */}
      <label className="flex items-start gap-3 mb-6 cursor-pointer">
        <input type="checkbox" name="subscribe" className="mt-1 accent-primary" />
        <span className="text-sm text-text-muted">
          I’d like to receive occasional Vantixe insights on procurement and AI (no more than monthly, unsubscribe anytime).
        </span>
      </label>

      {/* Honeypot: hidden from real users, attractive to bots */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <label htmlFor="website">Website (leave blank)</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Turnstile */}
      {turnstileSiteKey && (
        <div className="mb-6">
          <div ref={turnstileRef} />
          {turnstileUnavailable && (
            <div className="mt-3 p-4 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-900">
              The security check could not load, so this form cannot be sent from this browser.
              It is usually a browser extension or a network blocking Cloudflare. Please email{' '}
              <a href="mailto:hello@vantixe.com" className="font-semibold underline">
                hello@vantixe.com
              </a>{' '}
              instead and we will reply within one business day.
            </div>
          )}
        </div>
      )}

      {/* Error */}
      {status === 'error' && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {/* Submit */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-xs text-text-muted">
          By submitting you agree we may contact you about your inquiry. We don’t share your details.
        </p>
        <button
          type="submit"
          disabled={status === 'submitting' || (Boolean(turnstileSiteKey) && !turnstileToken)}
          className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-cta text-white font-semibold shadow-md hover:bg-cta-hover hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  )
}
