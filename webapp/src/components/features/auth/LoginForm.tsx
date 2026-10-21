import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

type Props = {
  onLine?: () => void
  onGoogle?: () => void
  onEmail?: (email: string) => void
}

const social =
  'h-12 w-full gap-3 rounded-xl border-line bg-raised/70 text-[15px] hover:border-neon-violet/70 hover:bg-raised hover:shadow-neon-sm dark:bg-raised/70 dark:hover:bg-raised'

export function LoginForm({ onLine, onGoogle, onEmail }: Props) {
  return (
    <section className="neon-card relative w-full max-w-md space-y-7 p-6 backdrop-blur-xl sm:p-9">
      <header className="space-y-2 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight">
          Dink<span className="text-neon-magenta text-glow">Q</span>
        </h1>
        <p className="text-sm text-ink-muted">Fair, fast open play for your club.</p>
      </header>

      <div className="space-y-3">
        <Button type="button" variant="outline" className={social} onClick={onLine}>
          <LineIcon className="size-5" />
          Continue with LINE
        </Button>
        <Button type="button" variant="outline" className={social} onClick={onGoogle}>
          <GoogleIcon className="size-5" />
          Continue with Google
        </Button>
      </div>

      <div aria-hidden="true" className="flex items-center gap-3 text-xs uppercase tracking-widest text-ink-muted">
        <span className="h-px flex-1 bg-linear-to-r from-transparent to-line" />
        or
        <span className="h-px flex-1 bg-linear-to-l from-transparent to-line" />
      </div>

      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault()
          onEmail?.(String(new FormData(e.currentTarget).get('email')))
        }}
      >
        <Label htmlFor="email" className="text-neon-violet-soft">
          Email address
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="h-12 rounded-xl border-line bg-raised/60 text-base focus-visible:border-neon-violet focus-visible:shadow-neon-sm dark:bg-raised/60"
        />
        <Button
          type="submit"
          className="h-12 w-full rounded-xl bg-linear-to-r from-neon-violet to-neon-magenta text-[15px] font-semibold text-primary-foreground shadow-neon-sm hover:shadow-neon"
        >
          Send me a code
        </Button>
      </form>
    </section>
  )
}

// Simplified brand icons. Swap for the official LINE / Google assets before launch.
function LineIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#06C755"
        d="M12 2C6.48 2 2 5.8 2 10.5c0 2.6 1.3 4.9 3.4 6.5-.1.8-.5 2-1.2 3.1 0 0 2.4-.2 4.2-1.6 1 .3 2.4.5 3.6.5 5.52 0 10-3.8 10-8.5S17.52 2 12 2z"
      />
      <text x="12" y="12.7" textAnchor="middle" fontSize="5.6" fontWeight="800" fill="#fff" fontFamily="Arial, sans-serif">
        LINE
      </text>
    </svg>
  )
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}