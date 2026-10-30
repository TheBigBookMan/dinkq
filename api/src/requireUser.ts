import type { RequestHandler } from 'express'
import { fromNodeHeaders } from 'better-auth/node'
import { auth } from './auth'

export const requireUser: RequestHandler = async (req, res, next) => {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) })
  if (!session) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  res.locals.user = session.user // { id, email, name, … }
  next()
}

// usage: app.get('/api/clubs', requireUser, (req, res) => { const user = res.locals.user … })