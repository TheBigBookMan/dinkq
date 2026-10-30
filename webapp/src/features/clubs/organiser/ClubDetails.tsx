import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CalendarIcon,
  ExternalLinkIcon,
  LayoutGridIcon,
  MailIcon,
  MapPinIcon,
  PencilIcon,
  PhoneIcon,
  UsersIcon,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useClub } from "../hooks";
import ClubDetailsForm from "./ClubDetailsForm";

const dateFmt = new Intl.DateTimeFormat(undefined, { day: "numeric", month: "long", year: "numeric" });

function Detail({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPinIcon;
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-raised/70">
        <Icon className="size-4 text-neon-violet-soft" />
      </span>
      <div className="min-w-0 space-y-0.5">
        <dt className="text-xs uppercase tracking-wider text-ink-muted">{label}</dt>
        <dd className="text-sm">{children || <span className="text-ink-muted">Not set</span>}</dd>
      </div>
    </div>
  );
}

const linkClass = "text-neon-cyan underline-offset-4 hover:underline";

const ClubDetails = () => {
  const { clubId } = useParams();
  const club = useClub(clubId); // same cache entry the layout already loaded
  // const { data: club } = useClub(clubId); // same cache entry the layout already loaded
  const [editing, setEditing] = useState(false);

  if (!club) return null; // ClubLayout handles loading and not-found; this only satisfies TypeScript

  if (editing) {
    return (
      <ClubDetailsForm
        club={club}
        onCancel={() => setEditing(false)}
        onSave={async (values) => {
          console.log(values); // DUMMY: later, call your useUpdateClub mutation
          await new Promise((r) => setTimeout(r, 600));
          setEditing(false);
        }}
      />
    );
  }

  const cityCountry = [club.city, club.country].filter(Boolean).join(", ");
  const hasLocation = Boolean(club.address || cityCountry);

  // coordinates are exact; otherwise fall back to a text search on the address
  const hasCoords = Number.isFinite(club.latitude) && Number.isFinite(club.longitude);
  const mapsQuery = hasCoords
    ? `${club.latitude},${club.longitude}`
    : [club.address, club.city, club.country].filter(Boolean).join(", ");
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;

  const created = new Date(club.createdAt);

  return (
    <div className="space-y-4">
      {/* Identity */}
      <section aria-labelledby="club-name" className="neon-card flex items-start gap-4 p-5 sm:p-6">
        {club.clubIcon ? (
          <img src={club.clubIcon} alt="" className="size-16 shrink-0 rounded-2xl border border-line object-cover" />
        ) : (
          <div
            aria-hidden="true"
            className="grid size-16 shrink-0 place-items-center rounded-2xl border border-neon-violet/50 bg-raised font-display text-2xl font-semibold text-neon-violet-soft shadow-neon-sm"
          >
            {club.clubName[0]?.toUpperCase()}
          </div>
        )}

        <div className="min-w-0 flex-1 space-y-1">
          <h2 id="club-name" className="truncate font-display text-xl font-semibold">
            {club.clubName}
          </h2>
          {!Number.isNaN(created.getTime()) && (
            <p className="text-sm text-ink-muted">Created {dateFmt.format(created)}</p>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setEditing(true)}
          className="shrink-0 border-line bg-raised/70 hover:border-neon-violet/70"
        >
          <PencilIcon />
          Edit
        </Button>
      </section>

      {/* About */}
      <section aria-labelledby="about-heading" className="neon-card space-y-2 p-5 sm:p-6">
        <h2 id="about-heading" className="font-display text-lg font-semibold">
          About
        </h2>
        <p className="text-sm text-ink-muted">{club.description || "No description yet."}</p>
      </section>

      {/* Details */}
      <section aria-labelledby="info-heading" className="neon-card p-5 sm:p-6">
        <h2 id="info-heading" className="mb-4 font-display text-lg font-semibold">
          Details
        </h2>

        <dl className="grid gap-5 sm:grid-cols-2">
          <Detail icon={MapPinIcon} label="Location">
            {hasLocation && (
              <div className="space-y-1">
                {club.address && <p>{club.address}</p>}
                {cityCountry && <p className="text-ink-muted">{cityCountry}</p>}
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 ${linkClass}`}>
                  Open in Maps
                  <ExternalLinkIcon className="size-3.5" />
                </a>
              </div>
            )}
          </Detail>

          <Detail icon={LayoutGridIcon} label="Courts">
            {club.courtCount ? `${club.courtCount} ${club.courtCount === 1 ? "court" : "courts"}` : null}
          </Detail>

          <Detail icon={CalendarIcon} label="Regular sessions">
            {club.schedule}
          </Detail>

          <Detail icon={UsersIcon} label="Players">
            <Link to={`/organiser/club/${club.clubId}/roster`} className={linkClass}>
              {club.playerCount} {club.playerCount === 1 ? "player" : "players"}
            </Link>
          </Detail>

          <Detail icon={MailIcon} label="Email">
            {club.contactEmail && (
              <a href={`mailto:${club.contactEmail}`} className={`break-all ${linkClass}`}>
                {club.contactEmail}
              </a>
            )}
          </Detail>

          <Detail icon={PhoneIcon} label="Phone">
            {club.contactPhone && (
              <a href={`tel:${club.contactPhone.replace(/[^\d+]/g, "")}`} className={linkClass}>
                {club.contactPhone}
              </a>
            )}
          </Detail>
        </dl>
      </section>
    </div>
  );
};

export default ClubDetails;