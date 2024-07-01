import cors from '@fastify/cors'
import formbody from '@fastify/formbody'
import multipart from '@fastify/multipart'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import Fastify from 'fastify'
import {
  ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { logger } from './config/logger.config'
import { swaggerConfig } from './config/swagger.config'
import { UserRoutes } from './routes/users.routes'

declare module 'fastify' {
  export interface FastifyRequest {
    user: {
      name: string
    }
  }
  export interface FastifyInstance {
    signJwt: () => string
    verifyJwt: () => string
  }
}

const fastify = Fastify({ logger })

// integration with zod
fastify
  .withTypeProvider<ZodTypeProvider>()
  .setValidatorCompiler(validatorCompiler)
  .setSerializerCompiler(serializerCompiler)

// http config
fastify.register(cors).register(multipart).register(formbody)

// swagger config
fastify
  .register(swagger, {
    ...swaggerConfig.getConfig(),
    transform: jsonSchemaTransform,
  })
  .register(swaggerUi, {
    routePrefix: '/docs',
  })

//hooks
// fastify.addHook(
//   'onResponse',
//   async (request: FastifyRequest, reply: FastifyReply) => {
//     fastify.log.info(`RequestId ${request.id} took ${reply.elapsedTime}`)
//   }
// )

fastify.register(UserRoutes, {
  prefix: '/v1/users',
})

fastify.setErrorHandler((error, request, reply) => {
  if (error.code === 'FST_ERR_VALIDATION') {
    reply.status(400).send({
      statusCode: 400,
      error: 'Bad Request',
      // @ts-ignore
      issues: error.issues,
    })
    return
  }

  reply.send(error)
})

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.fatal(err)
    process.exit(1)
  }
})
