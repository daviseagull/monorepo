import pino from 'pino'
import { parsedEnv } from './env.config'

export const logger = pino({
  transport: {
    level: parsedEnv.LOG_LEVEL || 'info',
    target: 'pino-pretty',
    options: {
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  },
})
