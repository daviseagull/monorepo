import moment from 'moment'
import 'moment/locale/en-ca'

export const dateUtils = {
  format(
    date: Period,
    format: LocalDateFormatEnum,
    inputFormat?: LocalDateFormatEnum
  ): string {
    return moment(date, inputFormat).format(format)
  },

  isValid(date: Period): boolean {
    return Number.isInteger(new Date(date).getTime())
  },

  isBefore(date: Period, comparable: Period) {
    if (!this.isValid(date) || !this.isValid(comparable))
      throw new Error('Invalid date format')
    return moment(date).isBefore(moment(comparable))
  },

  isBeforeOrSameDay(date: Period, comparable: Period) {
    if (!this.isValid(date) || !this.isValid(comparable))
      throw new Error('Invalid date format')
    return moment(date).isSameOrBefore(moment(comparable))
  },

  isAfter(date: Period, comparable: Period) {
    if (!this.isValid(date) || !this.isValid(comparable))
      throw new Error('Invalid date format')
    return moment(date).isAfter(moment(comparable))
  },
}

export type Period = Date | string | number

export type UnitPeriod =
  | 'year'
  | 'years'
  | 'month'
  | 'months'
  | 'week'
  | 'weeks'
  | 'day'
  | 'days'
  | 'hour'
  | 'hours'
  | 'minute'
  | 'minutes'
  | 'second'
  | 'seconds'
  | 'millisecond'
  | 'milliseconds'

export enum LocalDateFormatEnum {
  datetime = 'DD/MM/YYYY HH:mm',
  date = 'DD/MM/YYYY',
  invertedDate = 'YYYY-MM-DD',
  MonthAndYear = 'YYYY-MM',
  time = 'HH:mm',
  fullTime = 'HH:mm:ss',
  year = 'YYYY',
}
