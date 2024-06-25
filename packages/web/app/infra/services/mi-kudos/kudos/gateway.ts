import { KudosDto } from '@monorepo/types'

export interface HttpKudosServiceGateway {
  findAll(): Promise<KudosDto>
}
