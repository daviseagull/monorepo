import { HttpKudosServiceGateway } from './gateway'

export class HttpKudosService implements HttpKudosServiceGateway {
  findAll(): Promise<{}> {
    throw new Error('Method not implemented.')
  }
}
