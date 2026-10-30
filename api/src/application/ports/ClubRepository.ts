import type { Club, NewClub } from '../../domain/Club';

export interface ClubRepository {
  listForUser(userId: string): Promise<Club[]>;
  findForUser(userId: string, clubId: string): Promise<Club | null>;
  create(userId: string, input: NewClub): Promise<Club>;
}