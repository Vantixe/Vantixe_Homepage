import { Button } from '@/components/ui/Button'

const BOOKING_URL =
  'https://outlook.office.com/book/MeetingsWithMichael@vantixe.com/?ismsaljsauthenabled'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-primary-dark via-[#003844] to-text-primary text-white overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-1/2 -right-[20%] w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(10,138,173,0.15)_0%,transparent_70%)]" />
      <div className="absolute -bottom-[30%] -left-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(148,210,189,0.1)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-20">
        <h1 className="text-4xl md:text-5xl lg:text-[52px] font-bold leading-tight mb-2">
          Procurement Advisory
          <br />
          <span className="text-accent-mint">for a New Era</span>
        </h1>
        <p className="text-xl md:text-2xl font-light text-white/70 tracking-wide uppercase mb-6">
          Expert-Led. AI-Enabled. Results-Driven.
        </p>
        <p className="text-lg text-white/85 max-w-[700px] leading-relaxed mb-10">
          Vantixe delivers senior-level procurement expertise without the Big Four
          overhead. Seasoned procurement specialists with proven track records
          transform your procurement function, delivering measurable results at a
          fair price.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" size="lg" href={BOOKING_URL} external>
            Let&apos;s Talk - Schedule Now
          </Button>
          <Button variant="white" size="lg" href="#about">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}
