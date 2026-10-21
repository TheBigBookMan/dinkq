import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import GoogleIcon from '../../../assets/icons/google-icon.svg';
import LineIcon from '../../../assets/icons/line-icon.svg';

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
          <img src={LineIcon} className="size-5" />
          Continue with LINE
        </Button>
        <Button type="button" variant="outline" className={social} onClick={onGoogle}>
          <img src={GoogleIcon} className="size-5" />
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

