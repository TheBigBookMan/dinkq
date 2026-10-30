import express from 'express'
import { toNodeHandler } from 'better-auth/node'
import { makeListMyClubs } from './application/listMyClubs'
import { auth } from './adapters/outbound/auth/auth'
import { clubRoutes } from './adapters/inbound/http/clubRoutes'
import { PgClubRepository } from './adapters/outbound/postgres/PgClubRepository'
import { pool } from './adapters/outbound/postgres/pool'
import { requireUser } from './requireUser'

const app = express()

app.all('/api/auth/*splat', toNodeHandler(auth)) // BEFORE express.json()
app.use(express.json())

const listMyClubs = makeListMyClubs(new PgClubRepository(pool))
app.use('/api/clubs', requireUser, clubRoutes({ listMyClubs }))

app.listen(Number(process.env.PORT ?? 3000), () => console.log('api up'))