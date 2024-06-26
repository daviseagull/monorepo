import cors from '@fastify/cors'
import formbody from '@fastify/formbody'
import multipart from '@fastify/multipart'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import Fastify from 'fastify'

const fastify = Fastify()

fastify.register(cors)
fastify.register(multipart)
fastify.register(formbody)

fastify.register(swagger)
fastify.register(swaggerUi, {
  routePrefix: '/docs',
})

fastify.get('/ping', async (request, reply) => {
  return { ping: 'pong' }
})

fastify.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})

fastify.ready((err) => {
  if (err) throw err
  fastify.swagger()
})
