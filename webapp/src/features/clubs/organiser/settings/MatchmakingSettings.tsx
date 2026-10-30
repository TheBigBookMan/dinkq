import type { ClubSettingsValues } from '../../type'
import { SwitchRow } from './SwitchRow'

type Props = { s: ClubSettingsValues; onChange: (patch: Partial<ClubSettingsValues>) => void }

export function MatchmakingSettings({ s, onChange }: Props) {
  return (
    <section aria-labelledby="matchmaking-heading" className="neon-card p-5 sm:p-6">
      <h2 id="matchmaking-heading" className="mb-4 font-display text-lg font-semibold">Matchmaking</h2>

      <div className="divide-y divide-line">
        <SwitchRow
          title="Avoid repeat partners"
          description="Try not to put the same pairs together again in the same session."
          checked={s.avoidRepeatPartners}
          onCheckedChange={(v) => onChange({ avoidRepeatPartners: v })}
        />
        <SwitchRow
          title="Match based on level"
          description="Matching players based on similar level."
          checked={s.matchOnLevel}
          onCheckedChange={(v) => onChange({ matchOnLevel: v })}
        />
      </div>
    </section>
  )
}