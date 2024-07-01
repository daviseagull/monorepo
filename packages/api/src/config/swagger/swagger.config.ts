import { FastifyDynamicSwaggerOptions } from '@fastify/swagger'
import { description, name, version } from '../../../package.json'
import { SwaggerTags } from './swagger-tags'

export const swaggerConfig: FastifyDynamicSwaggerOptions = {
  openapi: {
    info: {
      title: name,
      description,
      version,
    },
    tags: SwaggerTags,
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
}
