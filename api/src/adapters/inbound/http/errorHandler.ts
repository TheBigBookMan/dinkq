import type { ErrorRequestHandler, RequestHandler } from 'express'
import { AppError, type ErrorCode } from '../../../application/errors'

const STATUS: Record<ErrorCode, number> = {
  VALIDATION: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
}

const send = (res: any, status: number, code: string, message: string, requestId: unknown, details?: unknown) =>
  res.status(status).json({ error: { code, message, details, requestId } })

export const notFoundHandler: RequestHandler = (req, res) => {
  send(res, 404, 'NOT_FOUND', 'Route not found', req.id)
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err)

  if (err instanceof AppError) {
    return send(res, STATUS[err.code], err.code, err.message, req.id, err.details)
  }
  // malformed JSON body
  if (err?.type === 'entity.parse.failed') {
    return send(res, 400, 'VALIDATION', 'Invalid JSON', req.id)
  }
  // Postgres unique violation
  if (err?.code === '23505') {
    return send(res, 409, 'CONFLICT', 'That already exists', req.id)
  }

  req.log.error({ err }, 'unhandled error')
  send(res, 500, 'INTERNAL', 'Something went wrong', req.id)
}