import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { Field } from "../../components/shared/forms/Field";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { useMyClubs } from "../../features/clubs/hooks";
import { mockClubSettings } from "../../mock/clubSettings";
import { useCreateSession } from "../../features/sessions/hooks";

const dateFmt = new Intl.DateTimeFormat(undefined, { weekday: "short", day: "numeric", month: "short" });
const timeFmt = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" });

// <input type="date"> wants yyyy-mm-dd in local time
const toDateInput = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const HOURS = [1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6];

const inputClass = "h-11 bg-raised/70 [color-scheme:dark]"; // color-scheme keeps the native picker icons visible
const selectClass =
  "h-11 w-full rounded-md border border-line bg-raised/70 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-neon-violet/60";

type Errors = Partial<Record<"clubId" | "start" | "courtCount" | "price", string>>;

const NewSessionPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { data: clubs = [], isPending, isError } = useMyClubs();
  const create = useCreateSession();

  // DUMMY: defaults come from one set of mock settings; later, the chosen club's own settings
  const [v, setV] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return {
      date: toDateInput(tomorrow),
      time: "18:00",
      hours: String(mockClubSettings.sessionHours),
      courtCount: String(mockClubSettings.defaultCourts),
      price: String(mockClubSettings.pricePerSession),
      notes: "",
    };
  });
  const [pickedClub, setPickedClub] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  // chosen club, else ?club= from the sessions page, else the first club
  const clubId =
    pickedClub || (clubs.find((c) => c.clubId === params.get("club"))?.clubId ?? clubs[0]?.clubId ?? "");
  const club = clubs.find((c) => c.clubId === clubId);

  const set = (key: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setV((prev) => ({ ...prev, [key]: e.target.value }));

  // live preview of when the session runs
  const start = v.date && v.time ? new Date(`${v.date}T${v.time}`) : null;
  const startOk = !!start && !Number.isNaN(start.getTime());
  const end = startOk ? new Date(start.getTime() + Number(v.hours) * 3_600_000) : null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (create.isPending) return;

    const next: Errors = {};
    if (!clubId) next.clubId = "Choose a club.";

    if (!startOk) next.start = "Choose a date and start time.";
    else if (start!.getTime() < Date.now()) next.start = "Pick a start time in the future.";

    const courts = Number(v.courtCount);
    if (!Number.isInteger(courts) || courts < 1 || courts > 50) next.courtCount = "Enter a whole number from 1 to 50.";

    const price = Number(v.price);
    if (v.price.trim() === "" || !Number.isFinite(price) || price < 0 || price > 100000)
      next.price = "Enter a price from 0 to 100,000.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    create.mutate(
      {
        clubId,
        startsAt: start!.toISOString(),
        endsAt: end!.toISOString(),
        courtCount: courts,
        pricePerPlayer: price,
        notes: v.notes.trim() || undefined,
      },
      { onSuccess: () => navigate("/organiser/sessions/upcoming") }, // later: the new session's own page
    );
  }

  if (isPending) return <p className="px-4 py-2 text-sm text-ink-muted">Loading…</p>;
  if (isError) return <p className="px-4 py-2 text-sm">Couldn't load your clubs.</p>;

  if (clubs.length === 0)
    return (
      <div className="px-4 py-2">
        <div className="neon-card space-y-3 p-6 text-center">
          <p className="font-display text-lg font-semibold">Create a club first</p>
          <p className="text-sm text-ink-muted">Sessions belong to a club.</p>
          <Button asChild variant="outline" size="sm">
            <Link to="/organiser/club/new-club">Create new club</Link>
          </Button>
        </div>
      </div>
    );

  return (
    <div className="space-y-4 px-4 py-2">
      <header className="space-y-2">
        <Link to="/organiser/sessions" className="inline-flex items-center gap-1 text-sm text-ink-muted transition hover:text-foreground">
          <ArrowLeftIcon className="size-4" />
          Sessions
        </Link>
        <h1 className="font-display text-2xl font-bold">Schedule a session</h1>
      </header>

      <form onSubmit={handleSubmit} noValidate className="neon-card space-y-6 p-5 sm:p-6">
        {/* Club: a picker only when there's a choice */}
        {clubs.length > 1 ? (
          <Field id="session-club" label="Club" error={errors.clubId}>
            <select id="session-club" value={clubId} onChange={(e) => setPickedClub(e.target.value)} className={selectClass}>
              {clubs.map((c) => (
                <option key={c.clubId} value={c.clubId}>
                  {c.clubName}
                </option>
              ))}
            </select>
          </Field>
        ) : (
          <p className="text-sm text-ink-muted">
            Club: <span className="font-medium text-foreground">{club?.clubName}</span>
          </p>
        )}

        <div className="grid gap-6 sm:grid-cols-3">
          <Field id="session-date" label="Date">
            <Input id="session-date" type="date" min={toDateInput(new Date())} value={v.date} onChange={set("date")} className={inputClass} />
          </Field>
          <Field id="session-time" label="Start time">
            <Input id="session-time" type="time" value={v.time} onChange={set("time")} className={inputClass} />
          </Field>
          <Field id="session-hours" label="Length">
            <select id="session-hours" value={v.hours} onChange={set("hours")} className={selectClass}>
              {HOURS.map((h) => (
                <option key={h} value={h}>
                  {h} {h === 1 ? "hour" : "hours"}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {errors.start ? (
          <p role="alert" className="-mt-3 text-sm text-destructive">
            {errors.start}
          </p>
        ) : (
          end && (
            <p className="-mt-3 text-sm text-ink-muted">
              {dateFmt.format(start!)} · {timeFmt.format(start!)} – {timeFmt.format(end)}
            </p>
          )
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="session-courts" label="Courts" error={errors.courtCount}>
            <Input
              id="session-courts"
              type="number"
              inputMode="numeric"
              min={1}
              max={50}
              value={v.courtCount}
              onChange={set("courtCount")}
              aria-invalid={!!errors.courtCount}
              className={inputClass}
            />
          </Field>
          <Field id="session-price" label="Price per player (THB)" error={errors.price} hint="0 for a free session.">
            <Input
              id="session-price"
              type="number"
              inputMode="decimal"
              min={0}
              value={v.price}
              onChange={set("price")}
              aria-invalid={!!errors.price}
              className={inputClass}
            />
          </Field>
        </div>

        <Field id="session-notes" label="Notes for players (optional)" hint={`${v.notes.length}/500`}>
          <Textarea
            id="session-notes"
            value={v.notes}
            onChange={set("notes")}
            maxLength={500}
            rows={3}
            placeholder="Bring water. Parking is behind the hall."
            className="bg-raised/70"
          />
        </Field>

        {create.isError && (
          <p role="alert" className="text-sm text-destructive">
            Couldn't schedule the session. Try again.
          </p>
        )}

        <div className="flex justify-end gap-2">
          <Button asChild type="button" variant="ghost" disabled={create.isPending}>
            <Link to="/organiser/sessions">Cancel</Link>
          </Button>
          <Button
            type="submit"
            disabled={create.isPending}
            className="bg-linear-to-r from-neon-violet to-neon-magenta font-semibold text-primary-foreground shadow-neon-sm hover:shadow-neon"
          >
            {create.isPending ? "Scheduling…" : "Schedule session"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewSessionPage;