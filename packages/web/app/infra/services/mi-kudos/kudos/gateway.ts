export interface HttpKudosServiceGateway {
  findAll(): Promise<KudosDto>
}

// TODO: MOVER PARA O PACKAGES
type KudosDto = {}
