import type { Metadata } from 'next'
import { FadeInView } from '@/components/animations/FadeInView'
import { GradientText } from '@/components/ui/GradientText'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Category Strategy - Coming Mid-2026',
  description:
    'AI-guided category strategy development and execution. Coming mid-2026 from Vantixe.',
}

const BOOKING_URL =
  'https://outlook.office.com/book/MeetingsWithMichael@vantixe.com/?ismsaljsauthenabled'

export default function CategoryStrategyPage() {
  return (
    <div className="pt-[72px] min-h-screen flex items-center justify-center">
      <div className="max-w-[700px] mx-auto px-6 text-center section-padding">
        <FadeInView>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-white/10 text-white/60 border border-white/20 mb-8">
            Coming Mid-2026
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <GradientText>Category Strategy</GradientText>
          </h1>

          <p className="text-xl text-white/60 leading-relaxed mb-6">
            AI-guided category strategy development and execution. Intelligent
            tools that guide procurement teams through category analysis, market
            intelligence, strategy creation, and execution planning - turning
            weeks of work into days.
          </p>

          <p className="text-white/40 text-sm mb-10">
            We&apos;re building something special. Get notified when it launches.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="outline" size="lg">
              Get Notified
            </Button>
            <Button href={BOOKING_URL} external variant="primary" size="lg">
              Discuss Early Access
            </Button>
          </div>

          {/* Link to live products */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="text-white/40 text-sm mb-4">
              In the meantime, explore our live products:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/technology/tprm" variant="ghost" className="text-accent-mint hover:text-white">
                TPRM {'\u2192'}
              </Button>
              <Button href="/technology/negotiation-agent" variant="ghost" className="text-accent-mint hover:text-white">
                Negotiation Agent {'\u2192'}
              </Button>
            </div>
          </div>
        </FadeInView>
      </div>
    </div>
  )
}
