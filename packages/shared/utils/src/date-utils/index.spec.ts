import { dateUtils, LocalDateFormatEnum } from '.'

describe('adaptador de datas', () => {
  const adapter = dateUtils

  it('deve formatar a data para 20/01/2024', () => {
    const expectation = adapter.format('2024-01-20', LocalDateFormatEnum.date)
    expect(expectation).toBe('20/01/2024')
  })

  it('deve formatar a data para 20/01/2024 19:00', () => {
    const expectation = adapter.format(
      '2024-01-20T19:00:00',
      LocalDateFormatEnum.datetime
    )
    expect(expectation).toBe('20/01/2024 19:00')
  })

  it('deve formatar o texto 30/06/2024 para 2024-06-30', () => {
    const expectation = adapter.format(
      '30/06/2024',
      LocalDateFormatEnum.invertedDate,
      LocalDateFormatEnum.date
    )
    expect(expectation).toBe('2024-06-30')
  })

  it('deve formatar o texto 2024-06-24 15:30 para 15:30:00', () => {
    const expectation = adapter.format(
      '2024-06-24 15:30',
      LocalDateFormatEnum.fullTime
    )
    expect(expectation).toBe('15:30:00')
  })

  it('deve retornar verdadeiro ao validar se a data 15/01/2024 é antes de 20/01/2024', () => {
    const expectation = adapter.isBefore('2024-01-15', '2024-01-20')
    expect(expectation).toBeTruthy()
  })

  it('deve retornar falso ao validar se a data 20/01/2024 é antes de 15/01/2024', () => {
    const expectation = adapter.isBefore('2024-01-20', '2024-01-15')
    expect(expectation).toBeFalsy()
  })

  it('deve retornar verdadeiro ao validar se a data 20/01/2024 é antes ou igual a 20/01/2024', () => {
    const expectation = adapter.isBeforeOrSameDay('2024-01-20', '2024-01-20')
    expect(expectation).toBeTruthy()
  })

  it('deve retornar falso ao validar se a data 25/01/2024 é antes ou igual a 20/01/2024', () => {
    const expectation = adapter.isBeforeOrSameDay('2024-01-25', '2024-01-20')
    expect(expectation).toBeFalsy()
  })

  it('deve retornar verdadeiro ao validar se a data 25/01/2024 é depois de 24/01/2024', () => {
    const expectation = adapter.isAfter('2024-01-25', '2024-01-24')
    expect(expectation).toBeTruthy()
  })

  it('deve retornar falso ao validar se a data 20/01/2024 é depois de 21/01/2024', () => {
    const expectation = adapter.isAfter('2024-01-20', '2024-01-21')
    expect(expectation).toBeFalsy()
  })
})
