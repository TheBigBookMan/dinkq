import { Router } from 'express'
import { makeListMyClubs } from '../../../application/listMyClubs'


export const clubRoutes = (deps: { listMyClubs: ReturnType<typeof makeListMyClubs> }) => {
  const r = Router()
  r.get('/', async (_req, res) => {
    res.json(await deps.listMyClubs(res.locals.userId))
  })
  return r
}