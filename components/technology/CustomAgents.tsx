'use client'

import { FadeInView } from '@/components/animations/FadeInView'
import { customAgents } from '@/lib/products'

export function CustomAgents() {
  return (
    <div className="mb-20">
      <FadeInView>
        <div className="glass rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Beyond Products: Bespoke AI Agents
          </h3>
          <p className="text-white/60 max-w-xl mx-auto mb-8">
            In consulting engagements, we build custom AI agents tailored to your
            specific procurement challenges.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {customAgents.map((agent) => (
              <span
                key={agent}
                className="px-4 py-2 rounded-full text-sm font-medium glass border-white/10 text-white/80 hover:text-accent-mint hover:border-accent-mint/30 transition-colors"
              >
                {agent}
              </span>
            ))}
          </div>
        </div>
      </FadeInView>
    </div>
  )
}
