import type { RequestHandler } from 'express'
import { fromNodeHeaders } from 'better-auth/node'
import { auth } from '../../outbound/auth/auth'

export const requireUser: RequestHandler = async (req, res, next) => {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) })
  if (!session) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  res.locals.userId = session.user.id
  next()
}