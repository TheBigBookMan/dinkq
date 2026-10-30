import type { Pool } from 'pg';
import type { ClubRepository } from '../../../application/ports/ClubRepository';
import type { Club, NewClub } from '../../../domain/Club';

const COLS = `
  id as "clubId", name as "clubName", icon as "clubIcon", description,
  contact_email as "contactEmail", contact_phone as "contactPhone",
  created_at as "createdAt", 0 as "playerCount"`;

export class PgClubRepository implements ClubRepository {
  constructor(private pool: Pool) {}

  async listForUser(userId: string) {
    const { rows } = await this.pool.query<Club>(
      `select ${COLS} from club where owner_id = $1 order by created_at`,
      [userId],
    );
    return rows;
  }

  async findForUser(userId: string, clubId: string) {
    const { rows } = await this.pool.query<Club>(
      `select ${COLS} from club where owner_id = $1 and id = $2`,
      [userId, clubId],
    )
    return rows[0] ?? null
  }

  async create(userId: string, c: NewClub) {
    const { rows } = await this.pool.query<Club>(
      `insert into club (owner_id, name, icon, description, contact_email, contact_phone)
       values ($1, $2, $3, $4, $5, $6)
       returning ${COLS}`,
      [userId, c.clubName, c.clubIcon ?? null, c.description ?? null, c.contactEmail ?? null, c.contactPhone ?? null],
    )
    return rows[0]
  }
}