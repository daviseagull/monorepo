import { FastifyInstance } from 'fastify'
import { UserRoutes } from './users.routes'

export async function Routes(fastify: FastifyInstance) {
  fastify.register(UserRoutes, {
    prefix: '/v1/users',
  })
}
