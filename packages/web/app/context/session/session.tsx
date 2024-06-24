import { ReactNode, createContext, useContext } from 'react'
import { SessionViewModel, useSessionViewModel } from '.'

export const SessionViewModelContext = createContext<SessionViewModel | null>(
  null
)

type Props = {
  children: ReactNode
}

export const SessionViewModelProvider = ({ children }: Props) => {
  return (
    <SessionViewModelContext.Provider value={useSessionViewModel()}>
      {children}
    </SessionViewModelContext.Provider>
  )
}

export function useSessionViewModelContext() {
  const context = useContext(SessionViewModelContext)
  if (context) return context
  throw new Error(
    "useSessionViewModel isn't encapsulated by SessionViewModelProvider"
  )
}

export function injectSessionViewModel<T extends {}>(
  Component: (props: T) => JSX.Element
): (props: T) => JSX.Element {
  return (props: any) => (
    <SessionViewModelProvider>
      <Component {...props} />
    </SessionViewModelProvider>
  )
}
