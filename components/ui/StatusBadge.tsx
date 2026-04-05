interface StatusBadgeProps {
  status: 'live' | 'coming-soon'
  label: string
  className?: string
}

export function StatusBadge({ status, label, className = '' }: StatusBadgeProps) {
  if (status === 'live') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-mint/15 text-accent-mint border border-accent-mint/30 ${className}`}
      >
        <span className="w-2 h-2 rounded-full bg-accent-mint pulse-dot" />
        {label}
      </span>
    )
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/60 border border-white/20 ${className}`}
    >
      {label}
    </span>
  )
}
