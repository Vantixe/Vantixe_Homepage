import { Button } from '@/components/ui/Button'

const BOOKING_URL =
  'https://outlook.office.com/book/MeetingsWithMichael@vantixe.com/?ismsaljsauthenabled'

export function ConsultingCTA() {
  return (
    <section className="bg-gradient-to-br from-primary-dark to-primary text-white text-center py-20">
      <div className="max-w-[700px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Transform Your Procurement?
        </h2>
        <p className="text-lg text-white/85 mb-8">
          Let&apos;s discuss how Vantixe can deliver senior-level expertise without
          the Big Four overhead. Book a meeting, or send us your brief and we&apos;ll
          come back within one business day.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" size="lg" href={BOOKING_URL} external>
            Book a Meeting
          </Button>
          <Button variant="white" size="lg" href="/contact?topic=quote#form">
            Request a Quote
          </Button>
        </div>
      </div>
    </section>
  )
}
