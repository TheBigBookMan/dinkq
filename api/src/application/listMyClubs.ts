import type { ClubRepository } from './ports/ClubRepository'
export const makeListMyClubs = (clubs: ClubRepository) => (userId: string) =>
  clubs.listForUser(userId)