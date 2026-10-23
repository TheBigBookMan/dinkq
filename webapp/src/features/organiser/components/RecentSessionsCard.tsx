import type { SessionData } from "react-router-dom";
import { SessionTile } from "../../sessions/components/SessionTile";

interface RecentSessionsCardProps {
  recentSessions: SessionData[];
}

const RecentSessionsCard = ({recentSessions}: RecentSessionsCardProps) => {
  return (
    <section aria-labelledby="recent-heading" className="neon-card min-h-40 p-5 sm:p-6 lg:col-span-3">
      <h2 id="recent-heading" className="font-display text-lg font-semibold">
        Recent sessions
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {recentSessions.map((s: SessionData) => (
          <li key={s.id}>
            <SessionTile id={s.id} startedAt={s.startedAt} playerCount={s.playerCount} paidCount={s.paidCount} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default RecentSessionsCard;