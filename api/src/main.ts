import express from 'express';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './adapters/outbound/auth/auth';
import { clubRoutes } from './adapters/inbound/http/clubRoutes';
import { PgClubRepository } from './adapters/outbound/postgres/PgClubRepository';
import { pool } from './adapters/outbound/postgres/pool';
import { requireUser } from './requireUser';
import { makeClubUseCases } from './application/clubs';
import { httpLogger } from './adapters/inbound/http/httpLogger';
import { errorHandler, notFoundHandler } from './adapters/inbound/http/errorHandler';
import { logger } from './adapters/outbound/logging/logger';

const app = express();

app.use(httpLogger);
app.all('/api/auth/*splat', toNodeHandler(auth));
app.use(express.json());

const clubUseCases = makeClubUseCases(new PgClubRepository(pool));

app.use('/api/clubs', requireUser, clubRoutes(clubUseCases));

app.use(notFoundHandler);
app.use(errorHandler);

process.on('unhandledRejection', (err) => logger.fatal({ err }, 'unhandledRejection'));
process.on('uncaughtException', (err) => {
  logger.fatal({ err }, 'uncaughtException');
  process.exit(1);
});

app.listen(Number(process.env.PORT ?? 3000), () => logger.info('api up'));