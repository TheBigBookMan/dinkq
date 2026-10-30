import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { mockClubSettings } from '../../../mock/clubSettings'
import { useClub } from '../hooks'
import type { ClubSettingsValues } from '../type'
import { CheckInSettings } from './settings/CheckInSettings'
import { DangerSettings } from './settings/DangerSettings'
import { MatchmakingSettings } from './settings/MatchmakingSettings'
import { MemberSettings } from './settings/MemberSettings'
import { SessionSettings } from './settings/SessionSettings'

const ClubSettings = () => {
  const { clubId } = useParams()
  const club = useClub(clubId)
  // DUMMY: later useClubSettings(clubId) for the values and a mutation for changes
  const [s, setS] = useState<ClubSettingsValues>(mockClubSettings)

  if (!club) return null // ClubLayout handles loading and not-found

  function update(patch: Partial<ClubSettingsValues>) {
    setS((prev) => ({ ...prev, ...patch }))
    console.log('save', patch) // DUMMY: later, PATCH the club's settings (optimistic update)
  }

  return (
    <div className="space-y-4">
      <SessionSettings s={s} onChange={update} />
      <CheckInSettings s={s} onChange={update} />
      <MatchmakingSettings s={s} onChange={update} />
      <MemberSettings s={s} onChange={update} />
      <DangerSettings clubName={club.clubName} />
    </div>
  )
}

export default ClubSettings