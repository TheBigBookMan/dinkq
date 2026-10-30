import { Button } from "../../../components/ui/button"

export function Security() {
  return (
    <section aria-labelledby="security-heading" className="neon-card p-5 sm:p-6">
      <h2 id="security-heading" className="mb-4 font-display text-lg font-semibold">
        Security
      </h2>

      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-medium">Sign out everywhere</p>
          <p className="text-sm text-ink-muted">Ends your session on every device, including this one.</p>
        </div>
        <Button variant="outline" size="sm" className="shrink-0">
          Sign out all
        </Button>
      </div>
    </section>
  )
}