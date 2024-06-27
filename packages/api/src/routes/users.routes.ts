import { KudosDtoSchema } from '@monorepo/types'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export async function UserRoutes(fastify: FastifyInstance) {
  fastify.get('/ping', async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.code(200).send({ ping: 'pong' })
  })

  fastify.post(
    '/test',
    {
      schema: {
        body: KudosDtoSchema,
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      reply.code(200).send({ hello: 'world' })
    }
  )
}
