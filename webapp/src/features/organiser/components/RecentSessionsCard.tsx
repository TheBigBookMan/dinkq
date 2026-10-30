import { SessionTile } from "../../sessions/components/SessionTile";
import type { SessionSummary } from "../../sessions/types";

interface RecentSessionsCardProps {
  recentSessions: SessionSummary[];
  showClub?: boolean; // show the club name on each tile, for organisers with several clubs
}

// This needs better optimisation for recent sessions rather than pulling all of the sessions
const RecentSessionsCard = ({ recentSessions, showClub = false }: RecentSessionsCardProps) => {
  return (
    <section aria-labelledby="recent-heading" className="neon-card min-h-40 p-5 sm:p-6 lg:col-span-3">
      <h2 id="recent-heading" className="font-display text-lg font-semibold">
        Recent sessions
      </h2>

      {recentSessions.length === 0 ? (
        <p className="mt-4 text-sm text-ink-muted">No sessions yet.</p>
      ) : (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {recentSessions.map((s) => (
            <li key={s.sessionId}>
              <SessionTile session={s} showClub={showClub} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default RecentSessionsCard;