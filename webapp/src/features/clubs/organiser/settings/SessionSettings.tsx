import { Input } from '../../../../components/ui/input'
import { useId, useState } from 'react'
import { Label } from '../../../../components/ui/label'
import type { ClubSettingsValues } from '../../type'
import { SwitchRow } from './SwitchRow'

type Props = { s: ClubSettingsValues; onChange: (patch: Partial<ClubSettingsValues>) => void }

const selectClass =
  'h-10 rounded-md border border-line bg-raised/70 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-neon-violet/60'

// saves on blur, and puts the old value back if what was typed is out of range
function NumberRow({
  title, description, value, min, max, step = 1, suffix, onCommit,
}: {
  title: string
  description: string
  value: number
  min: number
  max: number
  step?: number
  suffix?: string
  onCommit: (value: number) => void
}) {
  const id = useId()
  const [text, setText] = useState(String(value))

  function commit() {
    const n = Number(text)
    const valid = text.trim() !== '' && Number.isFinite(n) && n >= min && n <= max && (step !== 1 || Number.isInteger(n))
    if (!valid) return setText(String(value))
    if (n !== value) onCommit(n)
  }

  return (
    <div className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <div className="min-w-0 space-y-1">
        <Label htmlFor={id} className="text-sm font-medium">{title}</Label>
        <p className="text-sm text-ink-muted">{description}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
          className="h-10 w-20 bg-raised/70"
        />
        {suffix && <span className="text-sm text-ink-muted">{suffix}</span>}
      </div>
    </div>
  )
}

export function SessionSettings({ s, onChange }: Props) {
  const lengthId = useId()

  return (
    <section aria-labelledby="sessions-heading" className="neon-card p-5 sm:p-6">
      <h2 id="sessions-heading" className="mb-4 font-display text-lg font-semibold">Sessions</h2>

      <div className="divide-y divide-line">
        <SwitchRow
          title="Create the next session automatically"
          description="When a session finishes, a new listing is created from your regular schedule."
          checked={s.autoCreateNextSession}
          onCheckedChange={(v) => onChange({ autoCreateNextSession: v })}
        />

        <SwitchRow
          title="Invite players automatically"
          description="Invite people to the next session as soon as it's created."
          checked={s.autoInvite}
          onCheckedChange={(v) => onChange({ autoInvite: v })}
        >
          <select
            aria-label="Who to invite"
            value={s.autoInviteWho}
            onChange={(e) => onChange({ autoInviteWho: e.target.value as ClubSettingsValues['autoInviteWho'] })}
            className={`${selectClass} w-full`}
          >
            <option value="last-session">Players from the last session</option>
            <option value="active">Active players (played in the last 30 days)</option>
            <option value="everyone">Everyone on the roster</option>
          </select>
        </SwitchRow>

        <NumberRow
          title="Default courts"
          description="How many courts a new session starts with."
          value={s.defaultCourts}
          min={1}
          max={50}
          onCommit={(n) => onChange({ defaultCourts: n })}
        />

        <div className="flex items-center justify-between gap-4 py-4">
          <div className="min-w-0 space-y-1">
            <Label htmlFor={lengthId} className="text-sm font-medium">Session length</Label>
            <p className="text-sm text-ink-muted">How long a new session runs by default.</p>
          </div>
          <select
            id={lengthId}
            value={s.sessionHours}
            onChange={(e) => onChange({ sessionHours: Number(e.target.value) })}
            className={`${selectClass} shrink-0`}
          >
            {[1, 1.5, 2, 2.5, 3, 3.5, 4].map((h) => (
              <option key={h} value={h}>{h} {h === 1 ? 'hour' : 'hours'}</option>
            ))}
          </select>
        </div>

        <NumberRow
          title="Price per session"
          description="Per player. Set 0 for free sessions."
          value={s.pricePerSession}
          min={0}
          max={100000}
          suffix="THB"
          onCommit={(n) => onChange({ pricePerSession: n })}
        />
      </div>
    </section>
  )
}