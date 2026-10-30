import { useState } from 'react'
import { Button } from '../../../../components/ui/button'
import { Label } from '../../../../components/ui/label'
import { Textarea } from '../../../../components/ui/textarea'

type Props = {
  isGuest: boolean
  notes: string
  onSaveNotes: (notes: string) => void
  onMakeMember: () => void
  onRemove: () => void
}

export function PlayerActions({ isGuest, notes, onSaveNotes, onMakeMember, onRemove }: Props) {
  const [text, setText] = useState(notes)

  return (
    <section aria-labelledby="tools-heading" className="neon-card space-y-5 p-5 sm:p-6">
      <h2 id="tools-heading" className="font-display text-lg font-semibold">
        Organiser tools
      </h2>

      <div className="space-y-2">
        <Label htmlFor="player-notes">Private notes</Label>
        <Textarea
          id="player-notes"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={1000}
          rows={3}
          placeholder="Only organisers can see these."
          className="bg-raised/70"
        />
        <div className="flex justify-end">
          <Button size="sm" disabled={text === notes} onClick={() => onSaveNotes(text.trim())}>
            Save notes
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-line pt-4">
        {isGuest && (
          <Button variant="outline" size="sm" onClick={onMakeMember}>
            Make a member
          </Button>
        )}
        <Button variant="outline" size="sm" onClick={onRemove} className="text-destructive hover:text-destructive">
          Remove from club
        </Button>
      </div>
    </section>
  )
}