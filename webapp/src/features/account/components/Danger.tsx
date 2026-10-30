import { Button } from "../../../components/ui/button"

export function Danger() {
  return (
    <section aria-labelledby="danger-heading" className="neon-card border-destructive/40 p-5 sm:p-6">
      <h2 id="danger-heading" className="mb-4 font-display text-lg font-semibold">
        Danger zone
      </h2>

      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-medium">Delete account</p>
          <p className="text-sm text-ink-muted">Permanently delete your account and personal data.</p>
        </div>
        <Button variant="destructive" size="sm" className="shrink-0">
          Delete account
        </Button>
      </div>
    </section>
  )
}