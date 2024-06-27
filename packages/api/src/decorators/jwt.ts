import { FastifyInstance } from 'fastify'

export async function JwtDecorator(fastify: FastifyInstance) {
  fastify.decorate('signJwt', () => {
    return ' Signed'
  })

  fastify.decorate('verify', () => {
    return 'verified'
  })
}
