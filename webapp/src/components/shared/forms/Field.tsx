import { Label } from "../../ui/label"

type Props = {
  id: string
  label: string
  error?: string
  hint?: string
  children: React.ReactNode
}

export function Field({ id, label, error, hint, children }: Props) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : (
        hint && <p className="text-xs text-ink-muted">{hint}</p>
      )}
    </div>
  )
}