import { useEffect, useRef, useState } from "react";
import type { Club } from "../type";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";

export type ClubEdit = Pick<
  Club,
  "clubName" | "description" | "address" | "city" | "country" | "courtCount" | "schedule" | "contactEmail" | "contactPhone"
> & {
  logoFile?: File | null; // undefined = unchanged, File = new logo, null = remove it
};

type Props = {
  club: Club;
  onSave: (values: ClubEdit) => Promise<void>;
  onCancel: () => void;
};

const ACCEPTED = ["image/png", "image/jpeg", "image/webp"];
const MAX_BYTES = 2 * 1024 * 1024;

function toStrings(club: Club) {
  return {
    clubName: club.clubName,
    description: club.description ?? "",
    address: club.address ?? "",
    city: club.city ?? "",
    country: club.country ?? "",
    courtCount: club.courtCount?.toString() ?? "",
    schedule: club.schedule ?? "",
    contactEmail: club.contactEmail,
    contactPhone: club.contactPhone,
  };
}
type Values = ReturnType<typeof toStrings>;
type Errors = Partial<Record<keyof Values | "logo" | "form", string>>;

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : (
        hint && <p className="text-xs text-ink-muted">{hint}</p>
      )}
    </div>
  );
}

const ClubDetailsForm = ({ club, onSave, onCancel }: Props) => {
  const [initial] = useState(() => toStrings(club));
  const [v, setV] = useState<Values>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);

  const [logoChange, setLogoChange] = useState<File | null | undefined>(undefined);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // preview of a newly picked logo; freed when it changes or on unmount
  useEffect(() => {
    if (!(logoChange instanceof File)) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(logoChange);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [logoChange]);

  // an empty clubIcon is falsy, so the initial-letter fallback still shows
  const logoSrc = logoChange === null ? undefined : (preview ?? club.clubIcon);
  const dirty = logoChange !== undefined || (Object.keys(v) as (keyof Values)[]).some((k) => v[k] !== initial[k]);

  const set =
    (key: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setV((prev) => ({ ...prev, [key]: e.target.value }));

  function pickLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // lets the same file be picked again
    if (!file) return;
    if (!ACCEPTED.includes(file.type)) return setErrors((p) => ({ ...p, logo: "Use a PNG, JPG or WebP image." }));
    if (file.size > MAX_BYTES) return setErrors((p) => ({ ...p, logo: "Image must be under 2 MB." }));
    setErrors((p) => ({ ...p, logo: undefined }));
    setLogoChange(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;

    const name = v.clubName.trim();
    const email = v.contactEmail.trim();
    const phone = v.contactPhone.trim();
    const courts = v.courtCount.trim() === "" ? undefined : Number(v.courtCount);

    const next: Errors = {};
    if (!name) next.clubName = "Enter a club name.";
    else if (name.length > 60) next.clubName = "Keep the name under 60 characters.";
    if (courts !== undefined && (!Number.isInteger(courts) || courts < 1 || courts > 50))
      next.courtCount = "Enter a whole number from 1 to 50.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.contactEmail = "Enter a valid email address.";
    if (phone && !/^\+?[0-9 ()-]{6,20}$/.test(phone)) next.contactPhone = "Enter a valid phone number.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSaving(true);
    try {
      await onSave({
        clubName: name,
        description: v.description.trim() || undefined,
        address: v.address.trim() || undefined,
        city: v.city.trim() || undefined,
        country: v.country.trim() || undefined,
        courtCount: courts,
        schedule: v.schedule.trim() || undefined,
        contactEmail: email, // required strings in Club, so "" when empty
        contactPhone: phone,
        logoFile: logoChange,
      });
      // on success the parent closes the form, which unmounts this component
    } catch {
      setErrors({ form: "Couldn't save your changes. Try again." });
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="neon-card space-y-6 p-5 sm:p-6">
      <h2 className="font-display text-xl font-semibold">Edit club details</h2>

      {/* Logo */}
      <div className="flex items-center gap-4">
        {logoSrc ? (
          <img src={logoSrc} alt="Club logo" className="size-16 shrink-0 rounded-2xl border border-line object-cover" />
        ) : (
          <div
            aria-hidden="true"
            className="grid size-16 shrink-0 place-items-center rounded-2xl border border-neon-violet/50 bg-raised font-display text-2xl font-semibold text-neon-violet-soft shadow-neon-sm"
          >
            {(v.clubName.trim()[0] ?? "?").toUpperCase()}
          </div>
        )}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
              {logoSrc ? "Change logo" : "Upload logo"}
            </Button>
            {logoSrc && (
              <Button type="button" variant="ghost" size="sm" onClick={() => setLogoChange(null)}>
                Remove
              </Button>
            )}
          </div>
          <p className="text-xs text-ink-muted">PNG, JPG or WebP, up to 2 MB.</p>
          {errors.logo && (
            <p role="alert" className="text-sm text-destructive">
              {errors.logo}
            </p>
          )}
          <input ref={fileRef} type="file" accept={ACCEPTED.join(",")} onChange={pickLogo} className="hidden" />
        </div>
      </div>

      <Field id="club-name" label="Club name" error={errors.clubName}>
        <Input
          id="club-name"
          value={v.clubName}
          onChange={set("clubName")}
          maxLength={60}
          aria-invalid={!!errors.clubName}
          className="h-11 bg-raised/70"
        />
      </Field>

      <Field id="club-description" label="Description" hint={`${v.description.length}/500`}>
        <Textarea
          id="club-description"
          value={v.description}
          onChange={set("description")}
          maxLength={500}
          rows={4}
          className="bg-raised/70"
        />
      </Field>

      <Field id="club-address" label="Address">
        <Input
          id="club-address"
          value={v.address}
          onChange={set("address")}
          autoComplete="street-address"
          className="h-11 bg-raised/70"
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="club-city" label="City">
          <Input id="club-city" value={v.city} onChange={set("city")} className="h-11 bg-raised/70" />
        </Field>
        <Field id="club-country" label="Country">
          <Input id="club-country" value={v.country} onChange={set("country")} className="h-11 bg-raised/70" />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="club-courts" label="Courts" error={errors.courtCount}>
          <Input
            id="club-courts"
            type="number"
            inputMode="numeric"
            min={1}
            max={50}
            value={v.courtCount}
            onChange={set("courtCount")}
            aria-invalid={!!errors.courtCount}
            className="h-11 bg-raised/70"
          />
        </Field>
        <Field id="club-schedule" label="Regular sessions" hint="e.g. Tue & Thu 18:00–21:00">
          <Input id="club-schedule" value={v.schedule} onChange={set("schedule")} className="h-11 bg-raised/70" />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="club-email" label="Contact email" error={errors.contactEmail}>
          <Input
            id="club-email"
            type="email"
            inputMode="email"
            value={v.contactEmail}
            onChange={set("contactEmail")}
            aria-invalid={!!errors.contactEmail}
            className="h-11 bg-raised/70"
          />
        </Field>
        <Field id="club-phone" label="Contact phone" error={errors.contactPhone}>
          <Input
            id="club-phone"
            type="tel"
            inputMode="tel"
            value={v.contactPhone}
            onChange={set("contactPhone")}
            aria-invalid={!!errors.contactPhone}
            className="h-11 bg-raised/70"
          />
        </Field>
      </div>

      {errors.form && (
        <p role="alert" className="text-sm text-destructive">
          {errors.form}
        </p>
      )}

      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={saving}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={saving || !dirty}
          className="bg-linear-to-r from-neon-violet to-neon-magenta font-semibold text-primary-foreground shadow-neon-sm hover:shadow-neon"
        >
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}

export default ClubDetailsForm;