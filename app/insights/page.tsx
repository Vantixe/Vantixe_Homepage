import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Procurement insights and thought leadership from Vantixe Advisory.',
  robots: { index: false, follow: false },
}

export default function InsightsPage() {
  return (
    <div className="pt-[72px]">
      <section className="section-padding">
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-text-primary mb-4">Insights</h1>
          <p className="text-lg text-text-muted mb-8">
            Procurement insights and thought leadership from our team.
          </p>
          <div className="bg-bg-light rounded-xl p-12">
            <p className="text-text-muted">
              Our insights section is coming soon. Check back for articles on
              procurement transformation, AI in procurement, and industry trends.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
