'use client'

import { StaggerChildren, StaggerItem } from '@/components/animations/StaggerChildren'
import { ProductCard } from './ProductCard'
import { products } from '@/lib/products'

const demoImages: Record<string, string> = {
  tprm: '/images/demos/tprm/dashboard.png',
  'sourcing-agent': '/images/demos/sourcing-agent/dashboard.png',
}

// Products with a video get a silent moving preview in their card; the
// screenshot stays as the fallback for products without one yet.
const demoVideos: Record<string, { src: string; poster: string }> = {
  tprm: {
    src: '/videos/tprm-promo.mp4',
    poster: '/videos/tprm-promo-poster.jpg',
  },
}

export function ProductShowcase() {
  return (
    <StaggerChildren className="grid md:grid-cols-3 gap-6 mb-20 items-stretch">
      {products.map((product) => (
        <StaggerItem key={product.id} className="flex">
          <ProductCard
            product={product}
            demoImage={demoImages[product.id]}
            demoVideo={demoVideos[product.id]}
          />
        </StaggerItem>
      ))}
    </StaggerChildren>
  )
}
