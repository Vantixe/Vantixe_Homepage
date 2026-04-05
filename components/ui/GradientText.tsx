interface GradientTextProps {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'span'
}

export function GradientText({
  children,
  className = '',
  as: Component = 'span',
}: GradientTextProps) {
  return (
    <Component className={`gradient-text ${className}`}>
      {children}
    </Component>
  )
}
