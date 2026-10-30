import { Link, useParams } from "react-router-dom";
import LiveSessionCard from "../../features/organiser/components/LiveSessionCard";
import { useSession } from "../../features/sessions/hooks";
import { SessionActions } from "../../features/clubs/organiser/session/SessionActions";
import { SessionHeader } from "../../features/clubs/organiser/session/SessionHeader";
import { SessionMatches } from "../../features/clubs/organiser/session/SessionMatches";
import { SessionPlayers } from "../../features/clubs/organiser/session/SessionPlayers";
import { SessionStats } from "../../features/clubs/organiser/session/SessionStats";
import type { LiveSessionStats } from "../../features/sessions/types";

const SessionPage = () => {
  const { sessionId } = useParams();
  const { data: session, isPending, isError } = useSession(sessionId);

  if (isPending) return <p className="px-4 py-2 text-sm text-ink-muted">Loading session…</p>;
  if (isError || !session)
    return (
      <div className="space-y-3 px-4 py-2">
        <p className="text-sm">Session not found.</p>
        <Link to="/organiser/sessions" className="text-sm text-neon-cyan underline-offset-4 hover:underline">
          Back to sessions
        </Link>
      </div>
    );

  const { status } = session;

  // the live card wants LiveSessionStats; the page's own data has everything it needs
  const liveStats: LiveSessionStats = {
    ...session,
    liveSessionId: session.sessionId,
    arrivedCount: session.players.filter((p) => p.checkedIn).length,
    expectedCount: session.players.filter((p) => p.rsvp === "going").length,
    gamesInPlay: session.matches.filter((m) => m.status === "playing").length,
  };

  // DUMMY handlers: later, mutations (each of the destructive ones needs a confirm dialog first)
  const log = (what: string) => () => console.log(what, session.sessionId);

  return (
    <div className="space-y-4 px-4 py-2">
      <SessionHeader session={session} />

      {status === "LIVE" && <LiveSessionCard session={liveStats} />}
      {status === "COMPLETED" && <SessionStats session={session} />}

      <SessionActions
        session={session}
        onStart={log("start")}
        onEnd={log("end")}
        onEdit={log("edit")}
        onPostpone={log("postpone")}
        onCancel={log("cancel")}
      />

      {status === "LIVE" && (
        <SessionMatches
          title="Games in play"
          matches={session.matches.filter((m) => m.status === "playing")}
          emptyText="No games in play."
        />
      )}

      <SessionPlayers players={session.players} status={status} />

      {status === "COMPLETED" && (
        <SessionMatches title="Results" matches={session.matches} emptyText="No results were recorded." />
      )}
    </div>
  );
};

export default SessionPage;