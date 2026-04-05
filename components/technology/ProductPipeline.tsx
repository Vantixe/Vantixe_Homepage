'use client'

import { motion } from 'framer-motion'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { products } from '@/lib/products'

export function ProductPipeline() {
  return (
    <div className="mb-20">
      {/* Desktop: horizontal pipeline */}
      <div className="hidden md:flex items-center justify-center gap-0">
        {products.map((product, i) => (
          <div key={product.id} className="flex items-center">
            {/* Node */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="flex flex-col items-center gap-3 px-6"
            >
              <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center text-3xl border border-accent-mint/20 hover:border-accent-mint/50 transition-colors">
                {product.id === 'tprm' && '\uD83D\uDEE1\uFE0F'}
                {product.id === 'negotiation-agent' && '\uD83E\uDD16'}
                {product.id === 'category-strategy' && '\uD83C\uDFAF'}
              </div>
              <div className="text-center">
                <p className="text-white font-semibold text-sm">
                  {product.shortName}
                </p>
                <StatusBadge
                  status={product.status}
                  label={product.statusLabel}
                  className="mt-1"
                />
              </div>
            </motion.div>

            {/* Connector line */}
            {i < products.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 + 0.3, duration: 0.6 }}
                className="w-24 h-0.5 bg-gradient-to-r from-accent-mint/60 to-accent-cyan/60 origin-left"
              />
            )}
          </div>
        ))}
      </div>

      {/* Mobile: vertical pipeline */}
      <div className="md:hidden flex flex-col items-center gap-0">
        {products.map((product, i) => (
          <div key={product.id} className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex items-center gap-4 w-full max-w-xs"
            >
              <div className="w-16 h-16 rounded-xl glass flex items-center justify-center text-2xl border border-accent-mint/20 flex-shrink-0">
                {product.id === 'tprm' && '\uD83D\uDEE1\uFE0F'}
                {product.id === 'negotiation-agent' && '\uD83E\uDD16'}
                {product.id === 'category-strategy' && '\uD83C\uDFAF'}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  {product.shortName}
                </p>
                <StatusBadge
                  status={product.status}
                  label={product.statusLabel}
                  className="mt-1"
                />
              </div>
            </motion.div>

            {i < products.length - 1 && (
              <div className="w-0.5 h-8 bg-gradient-to-b from-accent-mint/40 to-accent-cyan/40 my-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
