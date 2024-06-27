import { dateUtils, LocalDateFormatEnum } from '@monorepo/utils'

type LoggerParams = {
  endpoint?: string
  cause?: any
}

export const logger = {
  info(description: string, params: LoggerParams = {}) {
    const zonedTime = dateUtils.format(new Date(), LocalDateFormatEnum.datetime)
    const message = `[${zonedTime}] INFO: ${description}`
  },

  error(description: string, params: LoggerParams = {}) {
    const zonedTime = dateUtils.format(new Date(), LocalDateFormatEnum.datetime)
    const message = `[${zonedTime}] ERROR: ${description}`
    console.error(message, params)
  },
}
