'use client'

import { CountUp } from '@/components/animations/CountUp'

interface Metric {
  value: string
  label: string
}

interface MetricsBarProps {
  metrics: Metric[]
  dark?: boolean
  className?: string
}

export function MetricsBar({ metrics, dark = false, className = '' }: MetricsBarProps) {
  return (
    <div
      className={`grid gap-0 rounded-2xl overflow-hidden ${
        metrics.length === 4
          ? 'grid-cols-2 md:grid-cols-4'
          : `grid-cols-2 md:grid-cols-${metrics.length}`
      } ${dark ? 'glass' : 'bg-white shadow-card'} ${className}`}
    >
      {metrics.map((metric, i) => (
        <div
          key={i}
          className={`p-8 text-center ${
            i < metrics.length - 1
              ? dark
                ? 'md:border-r md:border-white/10'
                : 'md:border-r md:border-gray-100'
              : ''
          }`}
        >
          <div
            className={`text-3xl font-bold ${
              dark ? 'text-accent-mint' : 'text-primary-dark'
            }`}
          >
            <CountUp value={metric.value} />
          </div>
          <div
            className={`text-sm mt-1 uppercase tracking-wide ${
              dark ? 'text-white/60' : 'text-text-muted'
            }`}
          >
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  )
}
