import type { ClubSettingsValues } from '../../type'
import { SwitchRow } from './SwitchRow'

type Props = { s: ClubSettingsValues; onChange: (patch: Partial<ClubSettingsValues>) => void }

export function CheckInSettings({ s, onChange }: Props) {
  return (
    <section aria-labelledby="checkin-heading" className="neon-card p-5 sm:p-6">
      <h2 id="checkin-heading" className="mb-4 font-display text-lg font-semibold">Check-in & payments</h2>

      <div className="divide-y divide-line">
        <SwitchRow
          title="Self check-in"
          description="Players check themselves in with the session QR code or join link."
          checked={s.selfCheckIn}
          onCheckedChange={(v) => onChange({ selfCheckIn: v })}
        />
        <SwitchRow
          title="Allow guests"
          description="Let people who aren't on your roster join a session as a guest."
          checked={s.allowGuests}
          onCheckedChange={(v) => onChange({ allowGuests: v })}
        />
        <SwitchRow
          title="Track payments"
          description="Mark who has paid for each session."
          checked={s.trackPayments}
          onCheckedChange={(v) => onChange({ trackPayments: v })}
        />
      </div>
    </section>
  )
}