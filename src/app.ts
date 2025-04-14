import fastify from 'fastify'
import { usersRoutes } from './http/routers/userRouters'

export const app = fastify()

app.register(usersRoutes)
