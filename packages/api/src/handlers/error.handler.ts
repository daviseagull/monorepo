import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { HttpError } from '../models/http-error'

export const errorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  if (error instanceof HttpError) {
    reply
      .status(error.statusCode)
      .send({ statusCode: error.statusCode, message: error.message })
    return
  }

  if (error.code === 'FST_ERR_VALIDATION') {
    reply.status(400).send({
      statusCode: 400,
      message: 'Bad Request',
      // @ts-ignore
      issues: error.issues,
    })
    return
  }

  reply.send(error)
}
