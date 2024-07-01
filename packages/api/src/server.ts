import cors from '@fastify/cors'
import formbody from '@fastify/formbody'
import { fastifyHelmet } from '@fastify/helmet'
import multipart from '@fastify/multipart'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import Fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { parsedEnv } from './config/env.config'
import { logger } from './config/logger.config'
import { swaggerConfig } from './config/swagger/swagger.config'
import { errorHandler } from './handlers/error.handler'
import { UserRoutes } from './routes/users.routes'

declare module 'fastify' {
  export interface FastifyRequest {
    user: {
      cognitoId: string
      id: string
    }
  }
}

const fastify = Fastify({ logger })

// integration with zod
fastify
  .withTypeProvider<ZodTypeProvider>()
  .setValidatorCompiler(validatorCompiler)
  .setSerializerCompiler(serializerCompiler)

// http config
fastify
  .register(fastifyHelmet)
  .register(cors)
  .register(multipart)
  .register(formbody)

// swagger config
fastify
  .register(swagger, {
    ...swaggerConfig,
    transform: jsonSchemaTransform,
  })
  .register(swaggerUi, {
    routePrefix: '/docs',
  })

fastify.register(UserRoutes, {
  prefix: '/v1/users',
})

fastify.setErrorHandler(errorHandler)

const listeners = ['SIGINT', 'SIGTERM']
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await fastify.close()
    process.exit(0)
  })
})

fastify.listen({ port: parsedEnv.PORT }, function (err, address) {
  if (err) {
    fastify.log.fatal(err)
    process.exit(1)
  }
})
