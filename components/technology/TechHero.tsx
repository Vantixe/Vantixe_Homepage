'use client'

import { FadeInView } from '@/components/animations/FadeInView'
import { GradientText } from '@/components/ui/GradientText'

export function TechHero() {
  return (
    <div className="text-center mb-20">
      <FadeInView>
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase glass border-accent-mint/30 text-accent-mint mb-6">
          Vantixe Technology
        </span>
      </FadeInView>

      <FadeInView delay={0.1}>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          <GradientText>AI-Powered Procurement Technology</GradientText>
        </h2>
      </FadeInView>

      <FadeInView delay={0.2}>
        <p className="text-lg md:text-xl text-white/60 max-w-[700px] mx-auto">
          Enterprise-grade platforms built by procurement practitioners.
          Deployed. Proven. Built to Augment Your Team.
        </p>
      </FadeInView>
    </div>
  )
}
