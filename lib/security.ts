/**
 * Single source of truth for every certification claim on the site.
 *
 * Why everything lives here:
 * Quality Asia's conditions for use of certificates (PD-03 Rev. 02, section 2.1)
 * require us to amend all advertising if the certified scope is reduced, and to
 * stop using the claim immediately if certification is suspended or withdrawn.
 * Keeping the facts in one module means a single edit takes the claim off every
 * page at once.
 *
 * Two rules bind the wording anywhere these values are rendered:
 *
 * 1. Section 2.6. Where we reference certification in words rather than using the
 *    certification symbol, we must use CERTIFIED_COMPANY_PHRASE below without
 *    variation. Do not paraphrase it.
 *
 * 2. Sections 2.1, 2.7 and 2.8. We must never word a claim so that a product,
 *    process or service appears to be certified. The certified thing is the
 *    information security management system. Write "our management system is
 *    certified", never "our platform is ISO 27001 certified".
 *
 * Also note: the IAF mark on the certificate may never be reproduced by us
 * (section 2.7), and the NABCB accreditation mark needs written permission from
 * Quality Asia and may only appear alongside their own mark. That is why this
 * site states the certification in words and carries no certification imagery.
 */

/** Fixed phrase required by PD-03 section 2.6. Use verbatim. */
export const CERTIFIED_COMPANY_PHRASE = 'An ISO 27001:2022 Certified Company'

/** Facts transcribed from certificate QA00224, issued 7 August 2026. */
export const iso27001 = {
  standard: 'ISO/IEC 27001:2022',
  legalEntity: 'Vantixe Advisory Limited',
  certificateNumber: 'QA00224',
  certificationBody: 'Quality Asia Certifications Private Limited',
  accreditationBody: 'NABCB',
  accreditationNumber: 'IS-013',
  initialCertification: '7 August 2026',
  firstSurveillance: '7 August 2027',
  secondSurveillance: '7 August 2028',
  validUntil: '6 August 2029',
  statementOfApplicability: 'SOA-001, Version 1.2 dated 17 July 2026',
  /** Verbatim from the certificate. Do not shorten or rephrase on the page. */
  scope:
    "The ISMS covers the development, operation, and delivery of Vantixe's Procurement Consulting Services and Procurement Software Products supported by a remote operating environment, in accordance with the Statement of Applicability, SOA-001, Version 1.2 dated 17 July 2026.",
} as const
// No verification URL here on purpose. Quality Asia's own certificate-validation
// page currently returns "Certificate Does Not Exist" and points visitors to
// iafcertsearch.org instead. Confirm which route actually resolves QA00224
// before publishing a "verify this certificate" link.

/** Short, compliant summary of the scope for use in strips and footers. */
export const SCOPE_SUMMARY =
  'The certified management system covers how we develop, operate and deliver our procurement software products and our consulting services.'

export const SECURITY_EMAIL = 'security@vantixe.com'

/**
 * Launch strip on the two homepages, announcing the new certification.
 *
 * Set to false to remove the strip from every page at once. Nothing else on the
 * site depends on it: the security page, the nav link and the footer line all
 * stay. Planned retirement is around 10 October 2026, roughly two months after
 * certification. Flipping this is the only change needed.
 */
export const SHOW_CERTIFICATION_STRIP = true

/**
 * Controls shown on the security page.
 *
 * Every line here must be true for every product it could be read against.
 * Where our products differ (dedicated deployment versus row-level isolation)
 * the wording says so rather than claiming the stronger case for all of them.
 */
/**
 * Every line here was verified against the actual products before publication
 * (encryption verification, August 2026: TLS on both production database
 * connections confirmed in the hosting dashboard; tenant isolation verified in
 * code). Do not add a claim without the same standard of evidence.
 */
export const dataProtectionControls = [
  {
    icon: 'lock',
    title: 'Encrypted in transit and at rest',
    description:
      'Traffic to and inside our platforms runs over TLS, database connections included. Stored data is encrypted at rest on managed cloud infrastructure.',
  },
  {
    icon: 'layers',
    title: 'Client data stays separate',
    description:
      'A dedicated application and database, or enforced row-level isolation. No client can reach another client’s data.',
  },
  {
    icon: 'key',
    title: 'Your identity provider',
    description:
      'Single sign-on through your own identity provider, under your MFA policy, with roles taken from your security groups.',
  },
  {
    icon: 'globe',
    title: 'Your hosting region',
    description:
      'For dedicated deployments you choose where the data lives, so residency requirements are met before anything is loaded.',
  },
  {
    icon: 'users',
    title: 'Least privilege by default',
    description:
      'Role-based access limits every person to the categories and suppliers in their remit. Nobody sees the whole estate because they happened to log in.',
  },
  {
    icon: 'chip',
    title: 'No AI training on your data',
    description:
      'Our products use commercial AI APIs whose terms exclude client data from model training. What you submit stays yours.',
  },
] as const
