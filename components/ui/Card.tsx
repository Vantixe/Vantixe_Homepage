interface CardProps {
  children: React.ReactNode
  dark?: boolean
  hover?: boolean
  className?: string
}

export function Card({
  children,
  dark = false,
  hover = true,
  className = '',
}: CardProps) {
  const baseStyles = 'rounded-xl p-8 transition-all duration-250'
  const lightStyles = 'bg-white border-2 border-gray-100'
  const darkStyles = 'glass'
  const hoverStyles = hover
    ? dark
      ? 'hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(148,210,189,0.15)]'
      : 'hover:-translate-y-1 hover:shadow-card-hover hover:border-primary/30'
    : ''

  return (
    <div
      className={`${baseStyles} ${dark ? darkStyles : lightStyles} ${hoverStyles} ${className}`}
    >
      {children}
    </div>
  )
}
