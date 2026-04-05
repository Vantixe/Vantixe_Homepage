'use client'

import { StaggerChildren, StaggerItem } from '@/components/animations/StaggerChildren'
import { ProductCard } from './ProductCard'
import { products } from '@/lib/products'

const demoImages: Record<string, string> = {
  tprm: '/images/demos/tprm/dashboard.png',
  'negotiation-agent': '/images/demos/negotiation-agent/dashboard.png',
}

export function ProductShowcase() {
  return (
    <StaggerChildren className="grid md:grid-cols-3 gap-6 mb-20 items-stretch">
      {products.map((product) => (
        <StaggerItem key={product.id} className="flex">
          <ProductCard
            product={product}
            demoImage={demoImages[product.id]}
          />
        </StaggerItem>
      ))}
    </StaggerChildren>
  )
}
