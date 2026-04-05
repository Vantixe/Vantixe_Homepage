'use client'

import { FadeInView } from '@/components/animations/FadeInView'
import { GradientText } from '@/components/ui/GradientText'
import { MetricsBar } from '@/components/ui/MetricsBar'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'
import type { Product } from '@/lib/products'

const BOOKING_URL =
  'https://outlook.office.com/book/MeetingsWithMichael@vantixe.com/?ismsaljsauthenabled'

interface ProductPageLayoutProps {
  product: Product
  children: React.ReactNode
  ctaText?: string
  demo?: React.ReactNode
}

export function ProductPageLayout({
  product,
  children,
  ctaText = 'Request a Demo',
  demo,
}: ProductPageLayoutProps) {
  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(10,138,173,0.1)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <FadeInView>
            <StatusBadge
              status={product.status}
              label={product.statusLabel}
              className="mb-6"
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <GradientText>{product.name}</GradientText>
            </h1>
            <p className="text-xl text-white/70 max-w-[700px] mb-8">
              {product.description}
            </p>
          </FadeInView>

          {/* Demo area */}
          <FadeInView delay={0.2}>
            {demo || (
              <div className="relative rounded-2xl overflow-hidden glass border-white/10 h-64 md:h-80 flex items-center justify-center mb-12">
                <div className="absolute inset-0 bg-gradient-to-br from-dark-surface to-dark-elevated" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(10,138,173,0.08)_0%,transparent_70%)]" />
                <p className="relative text-white/30 text-sm">
                  Product demo coming soon
                </p>
              </div>
            )}
          </FadeInView>

          {/* Stats */}
          {product.stats.length > 0 && (
            <FadeInView delay={0.3}>
              <MetricsBar metrics={product.stats} dark />
            </FadeInView>
          )}
        </div>
      </section>

      {/* Page-specific content */}
      {children}

      {/* CTA */}
      <section className="section-padding text-center">
        <div className="max-w-[600px] mx-auto px-6">
          <FadeInView>
            <h2 className="text-3xl font-bold text-white mb-4">{ctaText}</h2>
            <p className="text-white/60 mb-8">
              See&nbsp;{product.shortName}&nbsp;in action with your own data. We&apos;ll set up a pilot in days, not months.
            </p>
            <Button href={BOOKING_URL} external variant="primary" size="lg">
              Book a Meeting
            </Button>
          </FadeInView>
        </div>
      </section>
    </div>
  )
}
