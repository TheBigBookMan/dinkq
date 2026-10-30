export function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`shrink-0 rounded-full border px-3 py-1.5 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-neon-violet/60 ${
        active
          ? 'border-neon-violet bg-neon-violet/15 text-neon-violet-soft shadow-neon-sm'
          : 'border-line bg-raised/50 text-ink-muted hover:border-neon-violet/50 hover:text-foreground'
      }`}
    >
      {children}
    </button>
  )
}