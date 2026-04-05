export function TrustSignals() {
  const signals = [
    {
      icon: '\uD83C\uDFC6',
      title: 'Founded by Former KPMG Advisory Partner',
      description: 'Built and led procurement practices at Big 4',
    },
    {
      icon: '\uD83D\uDCBC',
      title: 'Seasoned Specialists',
      description: 'Deep expertise across all procurement disciplines',
    },
    {
      icon: '\uD83C\uDF0F',
      title: 'Asia-Pacific Network',
      description: 'Extensive connections across Greater China and beyond',
    },
  ]

  return (
    <section className="py-12 bg-bg-light">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {signals.map((signal) => (
            <div key={signal.title} className="text-center">
              <div className="text-3xl mb-3">{signal.icon}</div>
              <h4 className="text-base font-semibold text-text-primary mb-1">
                {signal.title}
              </h4>
              <p className="text-sm text-text-muted">{signal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
