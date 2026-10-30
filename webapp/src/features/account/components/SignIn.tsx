import { Button } from "../../../components/ui/button"

type Provider = { id: string; label: string; connected: boolean }

export function SignIn({ providers }: { providers: Provider[] }) {
  const connectedCount = providers.filter((p) => p.connected).length

  return (
    <section aria-labelledby="signin-heading" className="neon-card p-5 sm:p-6">
      <h2 id="signin-heading" className="mb-4 font-display text-lg font-semibold">
        Sign-in methods
      </h2>

      <ul className="divide-y divide-line">
        {providers.map((p) => (
          <li key={p.id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
            <div className="min-w-0 space-y-1">
              <p className="text-sm font-medium">{p.label}</p>
              <p className="text-sm text-ink-muted">{p.connected ? 'Connected' : 'Not connected'}</p>
            </div>
            {p.connected ? (
              // can't disconnect the last remaining method
              <Button variant="outline" size="sm" className="shrink-0" disabled={connectedCount === 1}>
                Disconnect
              </Button>
            ) : (
              <Button variant="outline" size="sm" className="shrink-0">
                Connect
              </Button>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}