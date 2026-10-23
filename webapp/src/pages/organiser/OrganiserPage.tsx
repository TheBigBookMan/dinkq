import { useState } from "react";
import { useMyClubs } from "../../features/clubs/hooks";
import ClubCard from "../../features/organiser/components/ClubCard";
import LiveSessionCard from "../../features/organiser/components/LiveSessionCard";
import RecentSessionsCard from "../../features/organiser/components/RecentSessionsCard";
import { useLiveSession, useSessions } from "../../features/sessions/hooks";
import { AddPlayerDialog } from "../../features/players/components/AddPlayerDialog";

const OrganiserPage = () => {
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const clubData = useMyClubs();
  const liveSessionStats = useLiveSession();
  const sessions = useSessions();

  return (
    <div className="space-y-2 px-4 py-2">
      <header className='flex gap-4'>
        {clubData.clubIcon && <img src={clubData.clubIcon} className='w-8' />}
        <h1 className="text-2xl text-ink-muted">{clubData.clubName}</h1>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        <AddPlayerDialog
          open={addOpen}
          onOpenChange={setAddOpen}
          onSubmit={async (player) => {
            await new Promise((r) => setTimeout(r, 600)) // DUMMY: later, call your useAddPlayer mutation
            console.log(player)
          }}
        />
        <LiveSessionCard session={liveSessionStats} className="lg:col-span-2" />
        <ClubCard
          name={clubData.clubName}
          playerCount={clubData.playerCount}
          newThisMonth={clubData.newThisMonth}
          guestsToReview={clubData.guestsToReview}
          lastSessionAt={sessions[0].startedAt}
          onAddPlayer={() => setAddOpen(true)}
        />
        <RecentSessionsCard recentSessions={sessions} />
      </div>
    </div>
  )
}

export default OrganiserPage;