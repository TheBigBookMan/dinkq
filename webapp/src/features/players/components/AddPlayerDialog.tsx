import { useState } from 'react'
import { Button } from '../../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'

export type NewPlayer = { name: string; rating: number }

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (player: NewPlayer) => void | Promise<void> // throw to show an error
  title?: string
  description?: string
  submitLabel?: string
}

export function AddPlayerDialog({
  open,
  onOpenChange,
  onSubmit,
  title = 'Add player',
  description = 'Add someone to your club roster.',
  submitLabel = 'Add player',
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="neon-card border-line sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {/* Radix unmounts this when closed, so the form resets itself every time */}
        <AddPlayerForm
          submitLabel={submitLabel}
          onCancel={() => onOpenChange(false)}
          onSubmit={async (player) => {
            await onSubmit(player)
            onOpenChange(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

function AddPlayerForm({
  submitLabel,
  onSubmit,
  onCancel,
}: {
  submitLabel: string
  onSubmit: (player: NewPlayer) => Promise<void>
  onCancel: () => void
}) {
  const [name, setName] = useState('')
  const [rating, setRating] = useState('3.0')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (pending) return

    const trimmed = name.trim()
    const value = Number(rating)
    if (!trimmed) return setError('Enter a name.')
    if (!Number.isFinite(value) || value < 1 || value > 8) return setError('Rating must be between 1.0 and 8.0.')

    setError(null)
    setPending(true)
    try {
      await onSubmit({ name: trimmed, rating: value })
    } catch {
      setError("Couldn't add the player. Try again.")
      setPending(false)
    }
    // on success the dialog closes and this form unmounts, so no reset needed
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="player-name">Name</Label>
        <Input
          id="player-name"
          autoFocus
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Somchai"
          className="h-11 bg-raised/70"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="player-rating">Skill rating</Label>
        <Input
          id="player-rating"
          type="number"
          inputMode="decimal"
          min={1}
          max={8}
          step={0.1}
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="h-11 bg-raised/70"
        />
        <p className="text-xs text-ink-muted">DUPR-style, 1.0 to 8.0. Used to balance teams. You can change it later.</p>
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={pending}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={pending}
          className="bg-linear-to-r from-neon-violet to-neon-magenta font-semibold text-primary-foreground shadow-neon-sm hover:shadow-neon"
        >
          {pending ? 'Adding…' : submitLabel}
        </Button>
      </div>
    </form>
  )
}