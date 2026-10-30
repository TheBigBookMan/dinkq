import type { Pool } from 'pg'
import type { ClubRepository } from '../../../application/ports/ClubRepository'

export class PgClubRepository implements ClubRepository {
  constructor(private pool: Pool) {}

  async listForUser(userId: string) {
    // placeholder query; the club tables come in the next step
    const { rows } = await this.pool.query(
      `select id as "clubId", name as "clubName", 0 as "playerCount"
       from club where owner_id = $1`,
      [userId],
    )
    return rows
  }
}