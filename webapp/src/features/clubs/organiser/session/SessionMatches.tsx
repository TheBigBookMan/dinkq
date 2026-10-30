import type { SessionMatch } from "../../../sessions/types";
type Props = { title: string; matches: SessionMatch[]; emptyText: string };

export function SessionMatches({ title, matches, emptyText }: Props) {
  return (
    <section aria-label={title} className="neon-card p-5 sm:p-6">
      <h2 className="mb-4 font-display text-lg font-semibold">{title}</h2>

      {matches.length === 0 ? (
        <p className="text-sm text-ink-muted">{emptyText}</p>
      ) : (
        <ul className="divide-y divide-line">
          {matches.map((m) => (
            <li key={m.matchId} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <span className="shrink-0 rounded-md border border-line bg-raised/50 px-2 py-1 text-xs font-medium text-ink-muted">
                Court {m.court}
              </span>
              <p className="min-w-0 flex-1 text-sm">
                {m.team1.join(" & ")} <span className="text-ink-muted">vs</span> {m.team2.join(" & ")}
              </p>
              {m.status === "playing" ? (
                <span className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-neon-magenta">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-neon-magenta opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-neon-magenta" />
                  </span>
                  Playing
                </span>
              ) : (
                m.score && (
                  <span className="shrink-0 font-display text-lg font-semibold tabular-nums">
                    {m.score[0]}–{m.score[1]}
                  </span>
                )
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}