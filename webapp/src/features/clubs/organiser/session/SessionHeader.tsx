import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import type { SessionDetail, SessionStatus } from "../../../sessions/types";

const dateFmt = new Intl.DateTimeFormat(undefined, { weekday: "long", day: "numeric", month: "long" });
const timeFmt = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" });

const STATUS: Record<SessionStatus, { label: string; className: string }> = {
  SCHEDULED: { label: "Scheduled", className: "border-neon-violet/40 bg-neon-violet/10 text-neon-violet-soft" },
  LIVE: { label: "Live", className: "border-neon-magenta/40 bg-neon-magenta/10 text-neon-magenta" },
  COMPLETED: { label: "Completed", className: "border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan" },
  POSTPONED: { label: "Postponed", className: "border-neon-amber/40 bg-neon-amber/10 text-neon-amber" },
  CANCELED: { label: "Canceled", className: "border-line bg-raised/50 text-ink-muted" },
};

const BANNER: Partial<Record<SessionStatus, string>> = {
  POSTPONED: "This session is postponed. Reschedule it to give players the new time.",
  CANCELED: "This session was canceled. Sign-ups are kept for reference.",
};

export function SessionHeader({ session }: { session: SessionDetail }) {
  const start = new Date(session.startedAt);
  const end = new Date(session.endsAt);
  const valid = !Number.isNaN(start.getTime());
  const badge = STATUS[session.status];
  const banner = BANNER[session.status];

  return (
    <section aria-labelledby="session-title" className="neon-card space-y-4 p-5 sm:p-6">
      <Link to="/organiser/sessions" className="inline-flex items-center gap-1 text-sm text-ink-muted transition hover:text-foreground">
        <ArrowLeftIcon className="size-4" />
        Sessions
      </Link>

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <p className="text-xs uppercase tracking-wider text-ink-muted">{session.clubName}</p>
          <h1 id="session-title" className="font-display text-xl font-semibold">
            {valid ? dateFmt.format(start) : "Session"}
          </h1>
          {valid && (
            <p className="text-sm text-ink-muted">
              {timeFmt.format(start)}
              {!Number.isNaN(end.getTime()) && ` – ${timeFmt.format(end)}`} · {session.courtCount}{" "}
              {session.courtCount === 1 ? "court" : "courts"} · {session.pricePerPlayer} THB
            </p>
          )}
        </div>
        <span className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${badge.className}`}>
          {badge.label}
        </span>
      </div>

      {session.notes && <p className="rounded-lg border border-line bg-raised/50 p-3 text-sm text-ink-muted">{session.notes}</p>}
      {banner && <p className="text-sm text-ink-muted">{banner}</p>}
    </section>
  );
}