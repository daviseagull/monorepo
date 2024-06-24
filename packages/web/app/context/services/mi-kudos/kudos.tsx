import { ReactNode, createContext, useContext } from 'react'
import { HttpKudosService } from '../../../infra/services/mi-kudos/kudos'
import { HttpKudosServiceGateway } from '../../../infra/services/mi-kudos/kudos/gateway'

const httpKudosService = new HttpKudosService()

export const HttpKudosServiceContext =
  createContext<HttpKudosServiceGateway | null>(null)

type Props = {
  children: ReactNode
}

export const HttpKudosServiceProvider = ({ children }: Props) => {
  return (
    <HttpKudosServiceContext.Provider value={httpKudosService}>
      {children}
    </HttpKudosServiceContext.Provider>
  )
}

export function useHttpKudosService() {
  const context = useContext(HttpKudosServiceContext)
  if (context) return context
  throw new Error(
    "useHttpKudosService isn't encapsulated by HttpKudosServiceProvider"
  )
}

export function injectHttpKudosService<T extends Record<string, never>>(
  Component: (props: T) => JSX.Element
): (props: T) => JSX.Element {
  return (props: T) => (
    <HttpKudosServiceProvider>
      <Component {...props} />
    </HttpKudosServiceProvider>
  )
}
