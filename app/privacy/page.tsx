import type { Metadata } from 'next'
import Link from 'next/link'
import { CERTIFIED_COMPANY_PHRASE } from '@/lib/security'

/**
 * Privacy policy. The wording describes what the sites actually do today (see
 * the "Who we share it with" paragraph) and has not been checked by a lawyer.
 * Update EFFECTIVE_DATE when the owner approves it.
 */
const EFFECTIVE_DATE = '6 September 2026'
const CONTACT_EMAIL = 'hello@vantixe.com'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Vantixe Advisory Limited collects, uses and protects personal data on vantixe.com and vantixe.ai.',
  alternates: {
    canonical: 'https://www.vantixe.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy',
    description:
      'How Vantixe Advisory Limited collects, uses and protects personal data on vantixe.com and vantixe.ai.',
    url: 'https://www.vantixe.com/privacy',
  },
}

const linkClass = 'text-primary hover:underline'

function Email() {
  return (
    <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
      {CONTACT_EMAIL}
    </a>
  )
}

export default function PrivacyPage() {
  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-dark to-primary text-white py-20">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-white/80">
            What we collect, why, and the choices you have
          </p>
          <p className="text-sm text-white/60 mt-4">Effective {EFFECTIVE_DATE}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-[820px] mx-auto px-6 text-text-secondary leading-relaxed">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Who we are and what this covers</h2>
          <p className="mb-4">
            Vantixe Advisory Limited is a procurement advisory and software company in Hong Kong,
            at Unit 1603, The L. Plaza, 367-375 Queen&apos;s Road Central, Sheung Wan. This policy
            covers our websites vantixe.com and vantixe.ai and the enquiries and meetings that
            come from them. Personal data we handle for a client, in advisory engagements or in
            our software products, is governed by the agreement that client signs with us.
          </p>
          <p className="mb-10">
            For anything about your personal data, email <Email />.
          </p>

          <h2 className="text-2xl font-bold text-text-primary mb-4">What we collect</h2>
          <p className="mb-4">
            When you contact us through the website we receive what you type: your name, company,
            work email, your message, and any optional details such as phone number or a
            preferred time to call. When you book a meeting, Microsoft Bookings collects the
            details you enter and stores them in our calendar. When you email us, we keep the
            email.
          </p>
          <p className="mb-10">
            Our hosting provider records standard server logs for every visit: IP address,
            browser type, pages requested and time. We use them to run and protect the sites.
            We do not use Google Analytics or any other analytics service.
          </p>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Advertising</h2>
          <p className="mb-4">
            We advertise on LinkedIn and Google to reach procurement leaders in Hong Kong,
            Singapore and Macau. To see whether those ads work, both platforms place a small
            measurement tag on our sites. It records that you visited, whether you arrived from
            one of our ads, and whether you went on to send a message or book a meeting. It sets
            cookies to do so. Neither platform receives the contents of your message.
          </p>
          <p className="mb-10">
            You can block or delete these cookies in your browser; the sites work without them.
            You can also opt out at{' '}
            <a
              href="https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              LinkedIn
            </a>{' '}
            and{' '}
            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className={linkClass}>
              Google
            </a>
            .
          </p>

          <h2 className="text-2xl font-bold text-text-primary mb-4">How we use your information</h2>
          <ul className="list-disc pl-6 mb-10 space-y-2">
            <li>To answer your message, prepare a proposal or set up a demo you asked for.</li>
            <li>To send you our insights on procurement and AI, only if you asked for them. Every email has an unsubscribe link.</li>
            <li>To keep the sites running securely and to stop spam.</li>
            <li>To measure whether our advertising works.</li>
            <li>To keep the business records we are required to keep.</li>
          </ul>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Who we share it with</h2>
          <p className="mb-10">
            We do not sell personal data. We share it only with the service providers that run
            our websites, email and calendar, and with the advertising platforms for the
            measurement described above. Some of these providers are outside Hong Kong. We disclose
            data to authorities only when the law requires it.
          </p>

          <h2 className="text-2xl font-bold text-text-primary mb-4">How long we keep it</h2>
          <p className="mb-10">
            Messages and booking details stay in our mailbox and calendar for as long as we need
            them to handle your enquiry and to keep our business records. Server logs are kept by our hosting provider for a
            short period for security.
          </p>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Your rights</h2>
          <p className="mb-4">
            Under the Hong Kong Personal Data (Privacy) Ordinance you can ask for a copy of the
            personal data we hold about you, ask us to correct it, and tell us to stop using it
            for direct marketing. Under Singapore&apos;s Personal Data Protection Act you can ask
            for access and correction and withdraw consent. If you are somewhere else, we honour
            equivalent requests.
          </p>
          <p className="mb-10">
            Email <Email /> to use any of these rights. We may need to confirm who you are first.
            If you are not satisfied with our answer, you can complain to the Office of the
            Privacy Commissioner for Personal Data in Hong Kong or the Personal Data Protection
            Commission in Singapore.
          </p>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Security</h2>
          <p className="mb-10">
            {CERTIFIED_COMPANY_PHRASE}. Our information security management system covers how we
            operate these sites, our advisory work and the software products we build.{' '}
            <Link href="/technology/security" className={linkClass}>
              Read more about our security controls
            </Link>
            .
          </p>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Changes to this policy</h2>
          <p className="mb-10">
            When we change how we handle personal data, we update this page and the effective
            date at the top.
          </p>

          <p className="text-sm text-text-muted">
            Questions about this policy: <Email />
          </p>
        </div>
      </section>
    </div>
  )
}
