import { useState } from 'react'

export function useSessionViewModel(): SessionViewModel {
  const [session, setSession] = useState<Session | null>(null)

  async function signIn() {}

  async function signOut() {}

  return { signIn, signOut, session }
}

type Session = {
  accessToken: string
  name: string
  email: string
}

export type SessionViewModel = {
  signOut(): Promise<void>
  signIn(): Promise<void>
  session: Session | null
}
