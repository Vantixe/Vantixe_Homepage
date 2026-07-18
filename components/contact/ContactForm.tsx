'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'

type Intent = 'quote' | 'callback' | 'demo' | 'general' | 'press'

const INTENT_OPTIONS: { value: Intent; label: string; description: string }[] = [
  { value: 'quote', label: 'Get a quote or proposal', description: 'Scope a piece of work and receive a written proposal.' },
  { value: 'callback', label: 'Request a callback', description: 'Tell us when to call and we’ll fit your schedule.' },
  { value: 'demo', label: 'Book a product demo', description: 'See TPRM, Sourcing Agent or Category Strategy in action.' },
  { value: 'general', label: 'General inquiry', description: 'Anything else: questions, partnerships, ideas.' },
  { value: 'press', label: 'Speaking or press', description: 'Media, conferences, interviews.' },
]

const PRODUCT_OPTIONS = [
  { value: '', label: 'Select a product' },
  { value: 'tprm', label: 'TPRM: Third-Party Risk Management' },
  { value: 'sourcing-agent', label: 'Sourcing Agent: Quote Negotiation' },
  { value: 'category-strategy', label: 'Category Strategy: Guided Strategy Platform' },
  { value: 'all', label: 'The full platform' },
]

type Status = 'idle' | 'submitting' | 'success' | 'error'

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
}

export function ContactForm({ turnstileSiteKey }: ContactFormProps) {
  const searchParams = useSearchParams()
  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string>('')

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
        callback: (token: string) => setTurnstileToken(token),
        'error-callback': () => setTurnstileToken(''),
        'expired-callback': () => setTurnstileToken(''),
        theme: 'light',
      })
    }

    if (window.turnstile) {
      render()
      return
    }

    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement('script')
      script.id = SCRIPT_ID
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad&render=explicit'
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    }
    window.onTurnstileLoad = render

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [turnstileSiteKey])

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
      setStatus('success')

      // Notify Google Tag Manager of a successful lead submission so it can
      // record a Google Ads conversion. Carries the intent + product the user
      // selected, so conversions can be valued differently per product later.
      // Safe no-op if GTM isn't loaded (dataLayer just goes unread).
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          event: 'contact_form_submit',
          intent: payload.intent,
          product: payload.product,
        })
      }

      form.reset()
      setProduct('')
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current)
        setTurnstileToken('')
      }
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
