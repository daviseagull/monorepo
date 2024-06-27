import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export async function UserHook(fastify: FastifyInstance) {
  fastify.decorateRequest('user', null)
  fastify.addHook(
    'preHandler',
    async (request: FastifyRequest, reply: FastifyReply) => {
      request.user = { name: 'Davi Seagull' }
    }
  )
}
