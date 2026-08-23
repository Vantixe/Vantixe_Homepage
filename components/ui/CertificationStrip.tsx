import Link from 'next/link'
import { FadeInView } from '@/components/animations/FadeInView'
import { CertificationBadge } from '@/components/ui/CertificationBadge'
import { CERTIFIED_COMPANY_PHRASE, SCOPE_SUMMARY } from '@/lib/security'

interface CertificationStripProps {
  dark?: boolean
  className?: string
}

/**
 * Slim announcement strip for the new ISO 27001 certification.
 * Rendering is controlled by SHOW_CERTIFICATION_STRIP in lib/security.ts.
 */
export function CertificationStrip({
  dark = false,
  className = '',
}: CertificationStripProps) {
  return (
    <FadeInView className={className}>
      <div
        className={`rounded-2xl px-6 py-6 md:px-8 flex flex-col sm:flex-row sm:items-center gap-6 md:gap-8 ${
          dark
            ? 'glass border-white/10'
            : 'bg-white border border-gray-200 shadow-card'
        }`}
      >
        <CertificationBadge
          className={`flex-shrink-0 self-start sm:self-center ${
            // On the light homepage the white tile would vanish into the white
            // card, so give it an edge. Border is on the tile, not the marks.
            dark ? '' : 'border border-gray-200'
          }`}
        />

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-1.5">
            <p
              className={`text-base md:text-lg font-semibold ${
                dark ? 'text-white' : 'text-text-primary'
              }`}
            >
              {CERTIFIED_COMPANY_PHRASE}
            </p>
            <span
              className={`text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full ${
                dark
                  ? 'bg-accent-mint/15 text-accent-mint'
                  : 'bg-primary/10 text-primary'
              }`}
            >
              New
            </span>
          </div>
          <p
            className={`text-sm leading-relaxed ${
              dark ? 'text-white/60' : 'text-text-muted'
            }`}
          >
            {SCOPE_SUMMARY}
          </p>
        </div>

        <Link
          href="/technology/security"
          className={`flex-shrink-0 text-sm font-semibold transition-colors ${
            dark
              ? 'text-accent-mint hover:text-white'
              : 'text-primary hover:text-primary-dark'
          }`}
        >
          Security details {'→'}
        </Link>
      </div>
    </FadeInView>
  )
}
