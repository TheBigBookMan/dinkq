import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { useCreateClub } from '../../features/clubs/hooks';
import { useEffect, useRef, useState } from 'react';

const ACCEPTED = ['image/png', 'image/jpeg', 'image/webp'];
const MAX_BYTES = 2 * 1024 * 1024;

type NewClub = {
  photo: string | null;
  photoError: string | null;
  name: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
}

const NewClubPage = () => {
  const navigate = useNavigate();
  const createClub = useCreateClub();
  const [newClub, setNewClub] = useState<NewClub>({
    photo: null,
    photoError: null,
    name: '',
    description: '',
    contactEmail: '',
    contactPhone: ''
  });
  const fileRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const optional = (key: string) => String(f.get(key) ?? '').trim() || undefined;

    // TODO the imageURL will be the S3 URL returned need to do
    createClub.mutate(
      {
        clubName: String(f.get('clubName') ?? '').trim(),
        clubIcon: '',
        description: optional('description'),
        contactEmail: optional('contactEmail'),
        contactPhone: optional('contactPhone'),
      },
      { onSuccess: (club) => navigate(`/organiser/club/${club.clubId}`) },
    );
  };

  useEffect(() => {
    return () => {
      if (newClub.photo) URL.revokeObjectURL(newClub.photo);
    }
  }, [newClub.photo])

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!ACCEPTED.includes(file.type)) return setNewClub({...newClub, photoError: 'Use a PNG, JPG or WebP image.'});
    if (file.size > MAX_BYTES) return setNewClub({...newClub, photoError: 'Image must be under 2 MB.'});

    setNewClub({...newClub, photoError: null});
    setNewClub({...newClub, photo: URL.createObjectURL(file)});
    // DUMMY: later, upload `file` to your API / storage here
  }

  return (
    <div className="mx-auto w-full max-w-lg space-y-4 px-2">
      <h1 className="font-display text-2xl font-bold text-white">Create a club</h1>

      <form onSubmit={onSubmit} className="neon-card space-y-4 p-5">
        <div className="divide-y divide-line">
            {/* Photo */}
            <div className="flex items-center gap-4 pb-4">
              {newClub.photo ? (
                <img src={newClub.photo} alt="Your profile photo" className="size-16 shrink-0 rounded-full border border-line object-cover" />
              ) : (
                <div
                  aria-hidden="true"
                  className="grid size-16 shrink-0 place-items-center rounded-full border border-neon-violet/50 bg-raised font-display text-2xl font-semibold text-neon-violet-soft shadow-neon-sm"
                >
                  DQ
                </div>
              )}
    
              <div className="min-w-0 space-y-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">Profile photo</p>
                </div>
                <p className="hidden text-sm text-ink-muted sm:block">PNG, JPG or WebP, up to 2 MB.</p>
    
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
                    {newClub.photo ? 'Change' : 'Upload photo'}
                  </Button>
                  {newClub.photo && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => setNewClub({...newClub, photo: null})}>
                      Remove
                    </Button>
                  )}
                </div>
    
                {newClub.photoError && (
                  <p role="alert" className="text-sm text-destructive">
                    {newClub.photoError}
                  </p>
                )}
    
                <input ref={fileRef} type="file" accept={ACCEPTED.join(',')} onChange={handleFile} className="hidden" />
              </div>
            </div>
          </div>

        <div className="space-y-2">
          <Label htmlFor="clubName">Club name</Label>
          <Input
            onChange={(e) => setNewClub({...newClub, name: e.target.value})} 
            id="clubName" 
            name="clubName" 
            required 
            maxLength={80} 
            placeholder="The Beans" 
            autoFocus 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            onChange={(e) => setNewClub({...newClub, description: e.target.value})}
            id="description"
            name="description"
            maxLength={500}
            rows={3}
            placeholder="Friendly open play, all levels welcome"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Contact email</Label>
            <Input
              onChange={(e) => setNewClub({...newClub, contactEmail: e.target.value})}
              id="contactEmail" 
              name="contactEmail" 
              type="email" 
              placeholder="club@email.com" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Contact phone</Label>
            <Input
              onChange={(e) => setNewClub({...newClub, contactPhone: e.target.value})}
              id="contactPhone" 
              name="contactPhone" 
              type="tel" 
              placeholder="+66 …" 
            />
          </div>
        </div>

        {createClub.isError && (
          <p role="alert" className="text-sm text-neon-magenta">
            {createClub.error.message}
          </p>
        )}

        <div className="flex gap-2 pt-2">
          <Button type="button" variant="outline" onClick={() => navigate(-1)} disabled={createClub.isPending}>
            Cancel
          </Button>
          <Button type="submit" className="flex-1" disabled={createClub.isPending}>
            {createClub.isPending ? 'Creating…' : 'Create club'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default NewClubPage;