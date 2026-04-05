interface SectionHeadingProps {
  label?: string
  title: string
  subtitle?: string
  dark?: boolean
  centered?: boolean
  className?: string
}

export function SectionHeading({
  label,
  title,
  subtitle,
  dark = false,
  centered = false,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      {label && (
        <p
          className={`text-xs font-semibold tracking-[2px] uppercase mb-3 ${
            dark ? 'text-accent-mint' : 'text-primary'
          }`}
        >
          {label}
        </p>
      )}
      <h2
        className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${
          dark ? 'text-white' : 'text-text-primary'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base md:text-lg max-w-[700px] leading-relaxed ${
            centered ? 'mx-auto' : ''
          } ${dark ? 'text-white/70' : 'text-text-muted'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
