import { createReplyDtoSchema, KudosDtoSchema } from '@monorepo/types'
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Tags } from '../config/swagger/swagger-tags'

export async function UserRoutes(fastify: FastifyInstance) {
  fastify.get('/ping', async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.code(200).send({ ping: 'pong' })
  })

  fastify.post(
    '/test',
    {
      schema: {
        tags: [Tags.USER],
        body: KudosDtoSchema,
        response: { 200: createReplyDtoSchema(KudosDtoSchema) },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      reply.code(200).send({ hello: 'world' })
    }
  )
}
