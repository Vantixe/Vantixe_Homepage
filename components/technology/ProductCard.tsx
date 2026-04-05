'use client'

import Image from 'next/image'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { getTechUrl } from '@/lib/domains'
import type { Product } from '@/lib/products'

interface ProductCardProps {
  product: Product
  /** Optional screenshot to show instead of placeholder */
  demoImage?: string
}

export function ProductCard({ product, demoImage }: ProductCardProps) {
  const href = getTechUrl(product.href)

  return (
    <a
      href={href}
      className="group flex flex-col glass rounded-2xl overflow-hidden hover:shadow-[0_0_40px_rgba(148,210,189,0.1)] transition-all duration-300 hover:-translate-y-1 h-full"
    >
      {/* Demo area */}
      <div className="relative h-48 bg-gradient-to-br from-dark-surface to-dark-elevated flex items-center justify-center overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(10,138,173,0.1)_0%,transparent_70%)]" />
        {demoImage ? (
          <Image
            src={demoImage}
            alt={product.name}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : product.status === 'coming-soon' ? (
          <div className="absolute inset-0 bg-dark-bg/60 flex items-center justify-center">
            <span className="text-white/40 text-sm font-medium">
              Coming Mid-2026
            </span>
          </div>
        ) : (
          <p className="text-white/30 text-sm">Demo video coming soon</p>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-white group-hover:text-accent-mint transition-colors">
            {product.name}
          </h3>
          <StatusBadge status={product.status} label={product.statusLabel} />
        </div>

        <p className="text-white/60 text-sm leading-relaxed mb-4">
          {product.tagline}
        </p>

        {/* Stats */}
        {product.stats.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            {product.stats.slice(0, 4).map((stat) => (
              <div key={stat.label}>
                <div className="text-accent-mint font-bold text-sm">
                  {stat.value}
                </div>
                <div className="text-white/40 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto text-accent-cyan text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
          Explore {'\u2192'}
        </div>
      </div>
    </a>
  )
}
