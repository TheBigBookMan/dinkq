import { useEffect, useRef, useState } from 'react'
import { CircleHelpIcon } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '../../../components/ui/popover'

type Props = { name: string; email: string }

const ACCEPTED = ['image/png', 'image/jpeg', 'image/webp']
const MAX_BYTES = 2 * 1024 * 1024

// "?" button, mobile only. On sm+ the description is shown inline instead.
function Hint({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`About ${label}`}
          className="grid size-5 place-items-center rounded-full text-ink-muted outline-none transition hover:text-neon-violet-soft focus-visible:ring-2 focus-visible:ring-neon-violet/60 sm:hidden"
        >
          <CircleHelpIcon className="size-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 text-sm text-ink-muted">{children}</PopoverContent>
    </Popover>
  )
}

export function Profile({ name: initialName, email }: Props) {
  const [name, setName] = useState(initialName)
  const [photo, setPhoto] = useState<string | null>(null) // preview URL
  const [photoError, setPhotoError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  // frees the previous preview when it changes, and the last one on unmount
  useEffect(() => {
    return () => {
      if (photo) URL.revokeObjectURL(photo)
    }
  }, [photo])

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = '' // lets the same file be picked again
    if (!file) return
    if (!ACCEPTED.includes(file.type)) return setPhotoError('Use a PNG, JPG or WebP image.')
    if (file.size > MAX_BYTES) return setPhotoError('Image must be under 2 MB.')

    setPhotoError(null)
    setPhoto(URL.createObjectURL(file))
    // DUMMY: later, upload `file` to your API / storage here
  }

  const initial = (name.trim()[0] ?? '?').toUpperCase()

  return (
    <section aria-labelledby="profile-heading" className="neon-card p-5 sm:p-6">
      <h2 id="profile-heading" className="mb-4 font-display text-lg font-semibold">
        Profile
      </h2>

      <div className="divide-y divide-line">
        {/* Photo */}
        <div className="flex items-center gap-4 pb-4">
          {photo ? (
            <img src={photo} alt="Your profile photo" className="size-16 shrink-0 rounded-full border border-line object-cover" />
          ) : (
            <div
              aria-hidden="true"
              className="grid size-16 shrink-0 place-items-center rounded-full border border-neon-violet/50 bg-raised font-display text-2xl font-semibold text-neon-violet-soft shadow-neon-sm"
            >
              {initial}
            </div>
          )}

          <div className="min-w-0 space-y-2">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">Profile photo</p>
              <Hint label="profile photo">PNG, JPG or WebP, up to 2 MB. Shown next to your name.</Hint>
            </div>
            <p className="hidden text-sm text-ink-muted sm:block">PNG, JPG or WebP, up to 2 MB.</p>

            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
                {photo ? 'Change' : 'Upload photo'}
              </Button>
              {photo && (
                <Button type="button" variant="ghost" size="sm" onClick={() => setPhoto(null)}>
                  Remove
                </Button>
              )}
            </div>

            {photoError && (
              <p role="alert" className="text-sm text-destructive">
                {photoError}
              </p>
            )}

            <input ref={fileRef} type="file" accept={ACCEPTED.join(',')} onChange={handleFile} className="hidden" />
          </div>
        </div>

        {/* Display name */}
        <div className="flex items-center justify-between gap-4 py-4">
          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              <Label htmlFor="display-name">Display name</Label>
              <Hint label="display name">Shown to players on rosters and leaderboards.</Hint>
            </div>
            <p className="hidden text-sm text-ink-muted sm:block">Shown to players on rosters and leaderboards.</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Input
              id="display-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10 w-36 bg-raised/70 sm:w-44"
            />
            <Button size="sm" disabled={!name.trim() || name === initialName}>
              Save
            </Button>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center justify-between gap-4 pt-4">
          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">Email</p>
              <Hint label="email">Used for sign-in codes. Can't be changed yet.</Hint>
            </div>
            <p className="hidden text-sm text-ink-muted sm:block">Used for sign-in codes. Can't be changed yet.</p>
          </div>
          <span className="min-w-0 truncate text-sm text-ink-muted">{email}</span>
        </div>
      </div>
    </section>
  )
}