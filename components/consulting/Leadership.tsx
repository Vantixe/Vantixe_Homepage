'use client'

import Image from 'next/image'
import { FadeInView } from '@/components/animations/FadeInView'

export function Leadership() {
  return (
    <section className="section-padding">
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeInView>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-12">
            Leadership
          </h2>
        </FadeInView>

        <div className="grid md:grid-cols-[300px_1fr] gap-12 items-start">
          <FadeInView direction="left">
            <Image
              src="/images/michael-headshot.jpg"
              alt="Michael Seitz, Founder & Managing Director of Vantixe Advisory"
              width={300}
              height={400}
              className="rounded-xl shadow-card w-full"
            />
          </FadeInView>

          <FadeInView direction="right" delay={0.2}>
            <div>
              <p className="text-text-secondary leading-relaxed mb-6">
                Vantixe was founded by procurement advisory veterans with deep Big
                Four and top-tier consulting backgrounds. Our leadership team has
                built and scaled procurement practices across Asia-Pacific,
                delivering transformational results for Fortune 500 companies and
                industry leaders.
              </p>

              <h3 className="text-2xl font-bold text-text-primary">
                Michael Seitz
              </h3>
              <p className="text-text-muted mb-4">
                Founder &amp; Managing Director
                <br />
                Former KPMG Advisory Partner | Ex-GEP North Asia Leader
              </p>

              <p className="text-text-secondary leading-relaxed mb-4">
                Michael brings 18 years of procurement advisory excellence to
                Vantixe. As a former Partner at KPMG, he built and led the
                procurement advisory service line across Greater China, establishing
                a reputation for delivering measurable, transformational results.
              </p>

              <p className="text-text-secondary leading-relaxed mb-6">
                Most recently, Michael served as the leader for GEP&apos;s North Asia
                operations, overseeing consulting, managed services, and procurement
                technology across the region.
              </p>

              <h4 className="font-semibold text-text-primary mb-3">
                Our Team&apos;s Expertise
              </h4>
              <ul className="grid md:grid-cols-2 gap-2">
                {expertise.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  )
}

const expertise = [
  'Built procurement practices at KPMG and leading consultancies',
  'Led Fortune 500 procurement transformations',
  'Deep expertise across all procurement disciplines',
  'Strategic sourcing and category management',
  'Digital procurement and technology enablement',
  'Extensive Asia-Pacific networks and relationships',
]
