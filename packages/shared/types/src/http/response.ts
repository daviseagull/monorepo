import { z } from 'zod'
import { StatusCodes } from '../enums/status-codes.enum'

export type ReplyDto<T> = {
  status: StatusCodes
  message: String
  data: T
}

export function createReplyDtoSchema<Data extends z.ZodTypeAny>(
  dataSchema: Data
) {
  return z.object({
    status: z.nativeEnum(StatusCodes),
    message: z.string(),
    data: dataSchema,
  })
}
