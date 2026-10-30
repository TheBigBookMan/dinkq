-- Up Migration
CREATE TABLE club (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  icon TEXT,
  description TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX club_owner_idx ON club(owner_id);

-- Down Migration
DROP TABLE club;