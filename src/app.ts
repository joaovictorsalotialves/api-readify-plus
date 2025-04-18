import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { env } from './env'

import { usersRoutes } from './http/routers/users/userRouters'
import { authRoutes } from './http/routers/auth/authRouters'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Readify Plus',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '10m',
  },
})

app.register(authRoutes)
app.register(usersRoutes)

app.setErrorHandler((err, _, reply) => {
  if (err.validation && err.code === 'FST_ERR_VALIDATION') {
    return reply.status(400).send({ message: 'Validation error!' })
  }

  if (err.code === 'FST_JWT_AUTHORIZATION_TOKEN_EXPIRED') {
    return reply.status(401).send({ message: 'Token expired!' })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(err)
  } else {
    // TODO: Here we should log to on external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error!' })
})
