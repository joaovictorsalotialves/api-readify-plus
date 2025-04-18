import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { usersRoutes } from './http/routers/userRouters'
import { env } from './env'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

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

app.register(usersRoutes)

app.setErrorHandler((err, _, reply) => {
  if (err.validation && err.code === 'FST_ERR_VALIDATION') {
    return reply.status(400).send({ message: 'Validation error!' })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(err)
  } else {
    // TODO: Here we should log to on external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error!' })
})
