import { dateUtils, LocalDateFormatEnum } from '@monorepo/utils'

type LoggerParams = {
  endpoint?: string
  cause?: any
}

export const logger = {
  /**
   * Logs an informational message with event details.
   *
   * @param {string} description - A description or message associated with the log.
   * @param {LoggerParams} [params={}] - Additional parameters to include in the log.
   * */
  info(description: string, params: LoggerParams = {}) {
    const zonedTime = dateUtils.format(new Date(), LocalDateFormatEnum.datetime)
    const message = `[${zonedTime}] INFO: ${description}`
    console.log(message, params)
  },

  /**
   * Logs an error message with event details.
   *
   * @param {string} description - A description or message associated with the error.
   * @param {LoggerParams} [params={}] - Additional parameters to include in the log and error report.
   * */
  error(description: string, params: LoggerParams = {}) {
    const zonedTime = dateUtils.format(new Date(), LocalDateFormatEnum.datetime)
    const message = `[${zonedTime}] ERROR: ${description}`
    console.error(message, params)
  },
}
