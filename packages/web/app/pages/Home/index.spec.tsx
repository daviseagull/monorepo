import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Home } from '.'
import { HttpCepServiceContext } from '../../context/services/cep/cep'
import { HttpCepServiceGateway } from '../../infra/services/cep/gateway'

describe('Ao acessar a tela inicial', () => {
  const httpCepServiceStub: HttpCepServiceGateway = {
    findBy: () =>
      Promise.resolve({
        cep: '01001-000',
        logradouro: 'Praça da Sé',
        complemento: 'lado ímpar',
        bairro: 'Sé',
        localidade: 'São Paulo',
        uf: 'SP',
        ibge: '3550308',
        gia: '1004',
        ddd: '11',
        siafi: '7107',
      }),
  }

  it('deve exibir informacoes do cep', async () => {
    render(
      <HttpCepServiceContext.Provider value={httpCepServiceStub}>
        <Home />
      </HttpCepServiceContext.Provider>
    )
    expect(await screen.findByText('CEP: 01001-000')).toBeInTheDocument()
  })

  it('deve exibir carregando enquanto nao for exibido os dados de CEP', async () => {
    render(
      <HttpCepServiceContext.Provider value={httpCepServiceStub}>
        <Home />
      </HttpCepServiceContext.Provider>
    )
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
    expect(screen.queryByText('CEP: 01001-000')).not.toBeInTheDocument()
  })
})
