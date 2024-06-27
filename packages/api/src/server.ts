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

const fastify = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    },
  },
})

// integration with zod
fastify.withTypeProvider<ZodTypeProvider>()
fastify.setValidatorCompiler(validatorCompiler)
fastify.setSerializerCompiler(serializerCompiler)

fastify.register(cors)
fastify.register(multipart)
fastify.register(formbody)

fastify.register(swagger, {
  ...swaggerConfig.getConfig(),
  transform: jsonSchemaTransform,
})

fastify.register(swaggerUi, {
  routePrefix: '/docs',
})

//hooks
// fastify.addHook(
//   'onResponse',
//   async (request: FastifyRequest, reply: FastifyReply) => {
//     fastify.log.info(`RequestId ${request.id} took ${reply.elapsedTime}`)
//   }
// )

//db connection
// fastify.register(dbConnector)

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
    fastify.log.error(err)
    process.exit(1)
  }
})
