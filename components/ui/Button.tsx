import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'white' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  external?: boolean
  className?: string
  onClick?: () => void
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-cta text-white hover:bg-cta-hover shadow-md hover:shadow-lg',
  secondary:
    'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  white:
    'bg-white text-primary-dark hover:bg-bg-light shadow-md hover:shadow-lg',
  outline:
    'border border-white/20 text-white hover:bg-white/10',
  ghost:
    'text-primary hover:text-primary-dark hover:bg-primary/5',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  className = '',
  onClick,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-250 ease-in-out hover:-translate-y-0.5 cursor-pointer'

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
