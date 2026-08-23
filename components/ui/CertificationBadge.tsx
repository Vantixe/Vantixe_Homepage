import Image from 'next/image'
import { iso27001 } from '@/lib/security'

interface CertificationBadgeProps {
  /** 'base' is the compliant minimum. 'large' only scales up, never down. */
  size?: 'base' | 'large'
  className?: string
}

/**
 * The official certification lockup: the Quality Asia certification mark with
 * the standard and our certificate number beneath it, alongside the NABCB
 * accreditation symbol (IS-013).
 *
 * Artwork is the masters Quality Asia supplied on 21 August 2026. The only
 * processing applied was cropping fully transparent margin and scaling the
 * NABCB file down proportionally for web delivery. No redraw, no recolour, no
 * change of proportion. Never apply CSS filters, opacity or background removal
 * to these images.
 *
 * Sizing note. The two marks are NOT the same pixel height, deliberately. The
 * NABCB artwork is a composite: the blue symbol occupies the top 62% and the
 * wordmark and IS-013 number sit below it. Matching raw heights would leave the
 * Quality Asia hexagon visibly larger than the NABCB symbol. So the Quality
 * Asia mark is set to 62% of the NABCB artwork height, which makes the two
 * SYMBOLS optically equal, as PD-03 clause 2.2 requires ("neither has obvious
 * precedence or prominence over the other").
 *
 * The text form follows PD-03 Attachment 1, which specifies "ISO-YYYY" over
 * "QA-#####". Clause 3 says the mark may only be reproduced as shown there.
 *
 * The NABCB symbol must never appear without the Quality Asia mark, which is
 * why both live in this one component and neither is exposed separately.
 *
 * Quality Asia must approve this layout before it goes live.
 */

// 'base' is the floor: any smaller and the marks drop below the 15mm minimum.
// The ratio matches the optical size of the two symbols, not the file heights.
const HEIGHTS = { base: 100, large: 132 } as const
const QA_RATIO = 0.68

export function CertificationBadge({
  size = 'base',
  className = '',
}: CertificationBadgeProps) {
  const NABCB_H = HEIGHTS[size]
  const QA_H = Math.round(NABCB_H * QA_RATIO)

  return (
    <div
      className={`inline-flex items-start rounded-2xl bg-white ${
        size === 'large' ? 'gap-9 px-9 py-8' : 'gap-7 px-7 py-6'
      } ${className}`}
    >
      {/* Quality Asia certification mark, with the Attachment 1 caption */}
      <div className="flex flex-col items-center">
        <Image
          src="/images/certification/quality-asia-mark.png"
          alt="Quality Asia certification mark"
          width={Math.round((QA_H * 112) / 146)}
          height={QA_H}
          style={{ height: QA_H, width: 'auto' }}
          // Bypass Next's image optimizer. It recompresses and resamples, which
          // both mangles the alpha channel here (black halo) and would mean we
          // are not serving the supplied master unaltered. The files are 9KB
          // and 70KB, so there is nothing to gain by optimising them.
          unoptimized
        />
        <p
          className={`font-bold text-[#1a1a1a] mt-3 leading-none tracking-tight ${
            size === 'large' ? 'text-sm' : 'text-[11px]'
          }`}
        >
          ISO-27001
        </p>
        <p
          className={`font-medium text-[#7a7a7a] mt-1.5 leading-none tracking-tight ${
            size === 'large' ? 'text-sm' : 'text-[11px]'
          }`}
        >
          {`QA-${iso27001.certificateNumber.replace(/^QA/, '')}`}
        </p>
      </div>

      {/* NABCB accreditation symbol. Never render this on its own. */}
      <Image
        src="/images/certification/nabcb-is-013.png"
        alt="NABCB accreditation symbol IS-013"
        width={Math.round((NABCB_H * 241) / 320)}
        height={NABCB_H}
        style={{ height: NABCB_H, width: 'auto' }}
        unoptimized
      />
    </div>
  )
}
