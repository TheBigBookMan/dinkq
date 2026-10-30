import type { ClubRepository } from './ports/ClubRepository';
import type { NewClub } from '../domain/Club';
import { notFound } from './errors';

export const makeClubUseCases = (clubs: ClubRepository) => ({
  listMine: (userId: string) => clubs.listForUser(userId),
  getMine: async (userId: string, clubId: string) => {
    const club = await clubs.findForUser(userId, clubId);
    if (!club) throw notFound('Club');
    return club;
  },
  create: (userId: string, input: NewClub) => clubs.create(userId, input),
});
export type ClubUseCases = ReturnType<typeof makeClubUseCases>