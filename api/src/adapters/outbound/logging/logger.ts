import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  // never log credentials
  redact: ['req.headers.cookie', 'req.headers.authorization', 'res.headers["set-cookie"]'],
  transport: process.env.NODE_ENV === 'production' ? undefined : { target: 'pino-pretty' },
})