import type { ClubSettingsValues } from '../../type'
import { SwitchRow } from './SwitchRow'

type Props = { s: ClubSettingsValues; onChange: (patch: Partial<ClubSettingsValues>) => void }

export function MemberSettings({ s, onChange }: Props) {
  return (
    <section aria-labelledby="members-heading" className="neon-card p-5 sm:p-6">
      <h2 id="members-heading" className="mb-4 font-display text-lg font-semibold">Members & privacy</h2>

      <div className="divide-y divide-line">
        <SwitchRow
          title="Approve new members"
          description="People who ask to join wait for your approval."
          checked={s.approveNewMembers}
          onCheckedChange={(v) => onChange({ approveNewMembers: v })}
        />
        <SwitchRow
          title="Show ratings to players"
          description="Display ratings on the leaderboard and TV screen. Turn off to keep them organiser-only."
          checked={s.showRatingsToPlayers}
          onCheckedChange={(v) => onChange({ showRatingsToPlayers: v })}
        />
      </div>
    </section>
  )
}