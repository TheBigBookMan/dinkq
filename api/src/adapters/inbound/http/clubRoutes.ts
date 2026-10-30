import { Router } from 'express'
import { z } from 'zod'
import type { ClubUseCases } from '../../../application/clubs'
import { parse } from './parse'

const newClubSchema = z.object({
  clubName: z.string().trim().min(1).max(80),
  clubIcon: z.string().optional(),
  description: z.string().max(500).optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().max(30).optional(),
});

export const clubRoutes = (uc: ClubUseCases) => {
  const r = Router();

  r.get('/', async (_req, res) => {
    res.json(await uc.listMine(res.locals.userId));
  });

  r.get('/:clubId', async (req, res) => {
    const clubId = parse(z.string().uuid(), req.params.clubId);
    res.json(await uc.getMine(res.locals.userId, clubId));
  });

  r.post('/', async (req, res) => {
    console.log(res.locals);
    const input = parse(newClubSchema, req.body);
    res.status(201).json(await uc.create(res.locals.user.id, input));
  });

  return r;
}