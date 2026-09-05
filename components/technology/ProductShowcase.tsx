'use client'

import { StaggerChildren, StaggerItem } from '@/components/animations/StaggerChildren'
import { ProductCard } from './ProductCard'
import { products } from '@/lib/products'
import { getProductVideo } from '@/lib/videos'

const demoImages: Record<string, string> = {
  tprm: '/images/demos/tprm/dashboard.png',
  'sourcing-agent': '/images/demos/sourcing-agent/dashboard.png',
  'category-strategy': '/images/demos/category-strategy/portfolio.png',
}

export function ProductShowcase() {
  return (
    <StaggerChildren className="grid md:grid-cols-3 gap-6 mb-20 items-stretch">
      {products.map((product) => (
        <StaggerItem key={product.id} className="flex">
          <ProductCard
            product={product}
            demoImage={demoImages[product.id]}
            // Products with a film (lib/videos.ts) get a silent moving preview;
            // the screenshot stays as the fallback for products without one yet.
            demoVideo={getProductVideo(product.id)}
          />
        </StaggerItem>
      ))}
    </StaggerChildren>
  )
}
