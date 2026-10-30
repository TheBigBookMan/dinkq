import { randomUUID } from 'node:crypto';
import pinoHttp from 'pino-http';
import { logger } from '../../outbound/logging/logger';

export const httpLogger = pinoHttp({
  logger,
  genReqId: (req, res) => {
    const id = (req.headers['x-request-id'] as string) ?? randomUUID();
    res.setHeader('x-request-id', id);
    return id;
  },
  customLogLevel: (_req, res, err) =>
    err || res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info',
});