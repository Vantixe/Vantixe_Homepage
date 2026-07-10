'use client'

import { Button } from '@/components/ui/Button'
import { FadeInView } from '@/components/animations/FadeInView'

interface TechCTAProps {
  showExplore?: boolean
  /** Product slug to prefill the inquiry form (e.g. "tprm", "sourcing-agent"). */
  product?: string
}

export function TechCTA({ showExplore = true, product }: TechCTAProps) {
  const demoHref = product
    ? `/contact?topic=demo&product=${product}#form`
    : '/contact?topic=demo#form'

  return (
    <FadeInView>
      <div className="text-center">
        <div className="flex flex-wrap justify-center gap-4">
          {showExplore && (
            <Button href="https://vantixe.ai" variant="outline" size="lg" external>
              Explore Our Full Platform
            </Button>
          )}
          <Button href={demoHref} variant="primary" size="lg">
            Request a Demo
          </Button>
        </div>
      </div>
    </FadeInView>
  )
}
