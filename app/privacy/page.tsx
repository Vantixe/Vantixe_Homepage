import type { Metadata } from 'next'
import Link from 'next/link'
import { CERTIFIED_COMPANY_PHRASE } from '@/lib/security'

/**
 * Privacy policy. DRAFT for the owner's review: the wording below describes what
 * the site actually does today (see the processors table), but it has not been
 * checked by a lawyer. Update EFFECTIVE_DATE when the owner approves it.
 */
const EFFECTIVE_DATE = '5 September 2026'
const CONTACT_EMAIL = 'hello@vantixe.com'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Vantixe Advisory Limited collects, uses and protects personal data on vantixe.com and vantixe.ai, including the cookies and tracking tools we use and how to opt out.',
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

/** Third parties that process data on our behalf, one row each. Keep in step with the code. */
const processors = [
  {
    name: 'Vercel',
    purpose: 'Hosts both websites. Records standard server logs (IP address, browser, pages requested) to run and secure the service.',
    location: 'United States, with a global edge network',
    policy: 'https://vercel.com/legal/privacy-policy',
  },
  {
    name: 'Cloudflare Turnstile',
    purpose: 'Checks that a contact form submission comes from a person, not a bot. Processes browser signals and IP address for that check.',
    location: 'United States and European Union',
    policy: 'https://www.cloudflare.com/privacypolicy/',
  },
  {
    name: 'Resend',
    purpose: 'Delivers your contact form message to our mailbox as an email.',
    location: 'United States',
    policy: 'https://resend.com/legal/privacy-policy',
  },
  {
    name: 'Microsoft 365 and Microsoft Bookings',
    purpose: 'Our email and calendar. Messages you send us are stored in our mailbox. If you book a meeting, Microsoft Bookings collects the details you enter on its own pages.',
    location: 'Microsoft data centres for our tenant',
    policy: 'https://privacy.microsoft.com/privacystatement',
  },
  {
    name: 'Google Tag Manager and Google Ads',
    purpose: 'Measures whether visitors who arrive from a Google ad send us a message. Sets cookies for conversion measurement.',
    location: 'United States',
    policy: 'https://policies.google.com/privacy',
  },
  {
    name: 'LinkedIn Insight Tag',
    purpose: 'Records that you visited our site and which pages you viewed, and whether you arrived from a LinkedIn ad. Lets us measure our LinkedIn campaigns and show follow-up ads to visitors on LinkedIn. Sets LinkedIn cookies.',
    location: 'United States and European Union',
    policy: 'https://www.linkedin.com/legal/privacy-policy',
  },
]

const cookies = [
  {
    name: 'vantixe-domain',
    provider: 'Vantixe',
    purpose: 'Remembers whether you are on vantixe.com or vantixe.ai so the pages show the right design.',
    type: 'Strictly necessary, session',
  },
  {
    name: 'Google Ads conversion cookies',
    provider: 'Google',
    purpose: 'Link a message you send us to the Google ad you clicked, so we know which ads work.',
    type: 'Advertising measurement',
  },
  {
    name: 'LinkedIn Insight Tag cookies',
    provider: 'LinkedIn',
    purpose: 'Link your visit to a LinkedIn ad and let LinkedIn show you follow-up ads. LinkedIn also receives your IP address and the pages you viewed.',
    type: 'Advertising measurement and retargeting',
  },
  {
    name: 'Cloudflare Turnstile cookies',
    provider: 'Cloudflare',
    purpose: 'May be set while the bot check on the contact form runs.',
    type: 'Security',
  },
]

export default function PrivacyPage() {
  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-dark to-primary text-white py-20">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-white/80">
            What we collect on vantixe.com and vantixe.ai, why, and the choices you have
          </p>
          <p className="text-sm text-white/60 mt-4">Effective {EFFECTIVE_DATE}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-[820px] mx-auto px-6 text-text-secondary leading-relaxed">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Who we are</h2>
          <p className="mb-4">
            Vantixe Advisory Limited runs two websites: vantixe.com for our procurement advisory
            work and vantixe.ai for our software products. Both are covered by this policy. We
            are based at Unit 1603, The L. Plaza, 367-375 Queen&apos;s Road Central, Sheung Wan,
            Hong Kong. For anything about your personal data, email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
          <p className="mb-10">
            This policy applies to the websites only. Our software products are covered by the
            agreement each client signs with us.
          </p>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Information you give us</h2>
          <p className="mb-4">
            When you send a message through our contact form we receive what you type: what you
            need from us, your name, company, work email, and optionally your phone number,
            country, company size, a preferred time to call, and whether you would like to
            receive our occasional insights. The form is protected against bots by Cloudflare
            Turnstile. Your message is delivered to our mailbox by email and stored there.
          </p>
          <p className="mb-4">
            If you book a meeting, clicking the button first opens a short page on our own site
            that records the click for the advertising measurement described below, then takes
            you to Microsoft Bookings, where you enter your details. Bookings stores them in our
            calendar. If you email us directly, we keep the email.
          </p>
          <p className="mb-10">
            Please do not send us confidential information through the website. Use a secure
            channel we agree with you.
          </p>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Information collected automatically</h2>
          <p className="mb-4">
            Our hosting provider records standard server logs for every visit: your IP address,
            browser type, the pages you request and the time. We use these to run and protect
            the sites.
          </p>
          <p className="mb-4">
            We advertise on Google and LinkedIn. To see whether those ads bring us enquiries, the
            sites load Google Tag Manager with Google Ads conversion tracking, and the LinkedIn
            Insight Tag. Google learns when a visitor who clicked a Google ad sends us a message.
            LinkedIn learns that you visited, which pages you viewed, whether you came from a
            LinkedIn ad, and whether you went on to send a message or start a booking, and may use
            this to show you Vantixe ads on LinkedIn later. Both set
            cookies, listed below. Neither tool receives the contents of your message.
          </p>
          <p className="mb-10">
            We do not use Google Analytics or any other analytics service on these sites.
          </p>

          <h2 className="text-2xl font-bold text-text-primary mb-4">How we use your information</h2>
          <ul className="list-disc pl-6 mb-10 space-y-2">
            <li>To answer your message, prepare a proposal or set up a demo you asked for.</li>
            <li>To send you our insights on procurement and AI, only if you ticked the box. Every email has an unsubscribe link.</li>
            <li>To keep the sites running securely and to stop spam and abuse.</li>
            <li>To measure whether our advertising works and to show relevant ads on LinkedIn.</li>
            <li>To keep the business records we are required to keep.</li>
          </ul>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Who we share it with</h2>
          <p className="mb-6">
            We do not sell personal data. We share it only with the service providers below, who
            process it on our behalf, and with authorities when the law requires it.
          </p>
          <div className="overflow-x-auto mb-10">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left border-b-2 border-gray-200">
                  <th className="py-3 pr-4 font-semibold text-text-primary">Provider</th>
                  <th className="py-3 pr-4 font-semibold text-text-primary">What it does for us</th>
                  <th className="py-3 pr-4 font-semibold text-text-primary">Where data is processed</th>
                  <th className="py-3 font-semibold text-text-primary">Their policy</th>
                </tr>
              </thead>
              <tbody>
                {processors.map((p) => (
                  <tr key={p.name} className="border-b border-gray-100 align-top">
                    <td className="py-3 pr-4 font-medium text-text-primary whitespace-nowrap">{p.name}</td>
                    <td className="py-3 pr-4">{p.purpose}</td>
                    <td className="py-3 pr-4">{p.location}</td>
                    <td className="py-3">
                      <a href={p.policy} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Privacy policy
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Cookies and how to opt out</h2>
          <p className="mb-6">
            The sites set the following cookies. The advertising cookies are not needed for the
            site to work.
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left border-b-2 border-gray-200">
                  <th className="py-3 pr-4 font-semibold text-text-primary">Cookie</th>
                  <th className="py-3 pr-4 font-semibold text-text-primary">Set by</th>
                  <th className="py-3 pr-4 font-semibold text-text-primary">Purpose</th>
                  <th className="py-3 font-semibold text-text-primary">Type</th>
                </tr>
              </thead>
              <tbody>
                {cookies.map((c) => (
                  <tr key={c.name} className="border-b border-gray-100 align-top">
                    <td className="py-3 pr-4 font-medium text-text-primary">{c.name}</td>
                    <td className="py-3 pr-4 whitespace-nowrap">{c.provider}</td>
                    <td className="py-3 pr-4">{c.purpose}</td>
                    <td className="py-3">{c.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mb-4">You can stop the advertising cookies in three ways:</p>
          <ul className="list-disc pl-6 mb-10 space-y-2">
            <li>
              Block or delete cookies in your browser settings. The sites keep working without
              the advertising cookies.
            </li>
            <li>
              Opt out of LinkedIn ad tracking at{' '}
              <a
                href="https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                LinkedIn&apos;s opt-out page
              </a>
              , which works whether or not you have a LinkedIn account.
            </li>
            <li>
              Control Google ad personalisation at{' '}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google Ads Settings
              </a>
              .
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Where your data goes</h2>
          <p className="mb-10">
            We are in Hong Kong. The providers above process data in the United States and the
            European Union, and Microsoft in the region assigned to our tenant. Each provider is
            bound by its own privacy terms and by our agreement with it.
          </p>

          <h2 className="text-2xl font-bold text-text-primary mb-4">How long we keep it</h2>
          <p className="mb-10">
            Messages and booking details stay in our mailbox and calendar for as long as we need
            them to handle your enquiry and to keep our business records, then we delete them.
            Server logs are kept by our hosting provider for a short period for security. The
            advertising providers keep their own data under their own retention rules, which
            their policies describe.
          </p>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Your rights</h2>
          <p className="mb-4">
            Under the Hong Kong Personal Data (Privacy) Ordinance you can ask for a copy of the
            personal data we hold about you, ask us to correct it, and tell us to stop using it
            for direct marketing. Under Singapore&apos;s Personal Data Protection Act you can ask for
            access and correction and withdraw consent. If you are somewhere else, we will honour
            equivalent requests.
          </p>
          <p className="mb-4">
            To use any of these rights, email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
              {CONTACT_EMAIL}
            </a>
            . We may need to confirm who you are first. We answer within the time the law allows,
            and normally much faster.
          </p>
          <p className="mb-10">
            If you are not satisfied with our answer, you can complain to the Office of the
            Privacy Commissioner for Personal Data in Hong Kong, or to the Personal Data
            Protection Commission in Singapore.
          </p>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Security</h2>
          <p className="mb-10">
            {CERTIFIED_COMPANY_PHRASE}. Our information security management system covers how we
            operate these sites and the software products we build.{' '}
            <Link href="/technology/security" className="text-primary hover:underline">
              Read more about our security controls
            </Link>
            .
          </p>

          <h2 className="text-2xl font-bold text-text-primary mb-4">Changes to this policy</h2>
          <p className="mb-10">
            When we add or remove a service that handles personal data, we update this page and
            the effective date at the top.
          </p>

          <p className="text-sm text-text-muted">
            Questions about this policy:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
