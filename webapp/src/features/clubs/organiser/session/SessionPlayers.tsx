import { useState } from "react";
import type { RsvpStatus, SessionPlayer, SessionStatus } from "../../../sessions/types";

const RSVP: Record<RsvpStatus, { label: string; className: string }> = {
  going: { label: "Going", className: "border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan" },
  maybe: { label: "Maybe", className: "border-neon-amber/40 bg-neon-amber/10 text-neon-amber" },
  declined: { label: "Declined", className: "border-line bg-raised/50 text-ink-muted" },
};

function Toggle({ on, onLabel, offLabel, onClick }: { on: boolean; onLabel: string; offLabel: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`rounded-full border px-2.5 py-1 text-xs font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-neon-violet/60 ${
        on
          ? "border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan"
          : "border-neon-amber/40 bg-neon-amber/10 text-neon-amber"
      }`}
    >
      {on ? onLabel : offLabel}
    </button>
  );
}

type Overrides = Record<string, { here?: boolean; paid?: boolean }>;

export function SessionPlayers({ players, status }: { players: SessionPlayer[]; status: SessionStatus }) {
  // DUMMY: local state so the toggles visibly work; later, mutations with optimistic updates
  const [overrides, setOverrides] = useState<Overrides>({});

  const live = status === "LIVE";
  const done = status === "COMPLETED";
  const title = live ? "Players" : done ? "Attendance" : "Sign-ups";

  const rows = (done ? players.filter((p) => p.checkedIn) : players).map((p) => ({
    ...p,
    checkedIn: overrides[p.playerId]?.here ?? p.checkedIn,
    paid: overrides[p.playerId]?.paid ?? p.paid,
  }));

  const toggle = (id: string, key: "here" | "paid", current: boolean) =>
    setOverrides((prev) => ({ ...prev, [id]: { ...prev[id], [key]: !current } }));

  return (
    <section aria-labelledby="players-heading" className="neon-card p-5 sm:p-6">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h2 id="players-heading" className="font-display text-lg font-semibold">
          {title}
        </h2>
        <p className="text-sm text-ink-muted">{rows.length}</p>
      </div>

      {rows.length === 0 ? (
        <p className="text-sm text-ink-muted">{done ? "No one checked in." : "No one has signed up yet."}</p>
      ) : (
        <ul className="divide-y divide-line">
          {rows.map((p) => (
            <li key={p.playerId} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <div
                aria-hidden="true"
                className="grid size-9 shrink-0 place-items-center rounded-full border border-neon-violet/40 bg-raised text-sm font-semibold text-neon-violet-soft"
              >
                {p.name[0]?.toUpperCase()}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium">{p.name}</p>
                  {p.isGuest && (
                    <span className="shrink-0 rounded-full border border-neon-amber/40 bg-neon-amber/10 px-1.5 py-0.5 text-[10px] font-medium text-neon-amber">
                      Guest
                    </span>
                  )}
                </div>
                <p className="text-xs text-ink-muted">Rating {p.rating.toFixed(1)}</p>
              </div>

              <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
                {live && (
                  <Toggle on={p.checkedIn} onLabel="Here" offLabel="Not here" onClick={() => toggle(p.playerId, "here", p.checkedIn)} />
                )}
                {(live || done) && (
                  <Toggle on={p.paid} onLabel="Paid" offLabel="Unpaid" onClick={() => toggle(p.playerId, "paid", p.paid)} />
                )}
                {!live && !done && (
                  <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${RSVP[p.rsvp].className}`}>
                    {RSVP[p.rsvp].label}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}