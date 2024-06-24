import { useState } from 'react'
import { Cep } from '../../../infra/services/cep/dtos/cep'
import { HttpCepServiceGateway } from '../../../infra/services/cep/gateway'

export function useCepViewModel({ httpCepService }: Params): CepViewModel {
  const [cep, setCep] = useState<Cep | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const findBy = async (number: string) => {
    setIsLoading(true)

    const responseData = await httpCepService.findBy(number)
    setCep(responseData)

    setIsLoading(false)
  }

  return { cep, isLoading, findBy }
}

type Params = {
  httpCepService: HttpCepServiceGateway
}

type CepViewModel = {
  isLoading: boolean
  findBy: (number: string) => Promise<void>
  cep: Cep | null
}
