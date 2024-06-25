import { z } from 'zod'

export type KudosDto = z.infer<typeof KudosDtoSchema>

export const KudosDtoSchema = z.object({
  cognitoId: z.string(),
  email: z.string().email().toLowerCase(),
  phone: z.string(),
  name: z.object({
    first: z
      .string()
      .transform(
        (data) => data.charAt(0).toUpperCase() + data.substring(1).toLowerCase()
      ),
    last: z
      .string()
      .transform(
        (data) => data.charAt(0).toUpperCase() + data.substring(1).toLowerCase()
      ),
  }),
})
