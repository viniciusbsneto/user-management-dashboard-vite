import { createContext } from 'react'

interface SignInParams {
  email: string
  password: string
}

export interface AuthContextValue {
  token: string | null
  signIn: ({ email, password }: SignInParams) => Promise<void>
  signOut: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
