'use client'

import { Button } from '@/components/ui/Button'
import { FadeInView } from '@/components/animations/FadeInView'

const BOOKING_URL =
  'https://outlook.office.com/book/MeetingsWithMichael@vantixe.com/?ismsaljsauthenabled'

export function TechCTA({ showExplore = true }: { showExplore?: boolean }) {
  return (
    <FadeInView>
      <div className="text-center">
        <div className="flex flex-wrap justify-center gap-4">
          {showExplore && (
            <Button href="https://vantixe.ai" variant="outline" size="lg" external>
              Explore Our Full Platform
            </Button>
          )}
          <Button href={BOOKING_URL} external variant="primary" size="lg">
            Book a Technology Demo
          </Button>
        </div>
      </div>
    </FadeInView>
  )
}
