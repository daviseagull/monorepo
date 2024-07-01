import { FastifyInstance } from 'fastify'
import { authHook } from '../hooks/auth.hook'
import { UserRoutes } from './users.routes'

export async function Routes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', authHook)

  fastify.register(UserRoutes, {
    prefix: '/v1/users',
  })
}
