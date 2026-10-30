import { RequestHandler } from 'express'
import { unauthorized } from '../../../application/errors'
import { fromNodeHeaders } from 'better-auth/node'
import { auth } from '../../outbound/auth/auth'

export const requireUser: RequestHandler = async (req, res, next) => {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) })
  if (!session) throw unauthorized()
  res.locals.userId = session.user.id
  next()
}