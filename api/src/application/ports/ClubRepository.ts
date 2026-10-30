import type { Club } from '../../domain/Club'
export interface ClubRepository {
  listForUser(userId: string): Promise<Club[]>
}