import { useEffect, useState, type PropsWithChildren } from 'react'
import { useNavigate } from 'react-router'

import { AuthContext, type AuthContextValue } from './AuthContext'
import { signIn as signInApi } from '../api/auth/sign-in'

interface SignInParams {
  email: string
  password: string
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<AuthContextValue['token']>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('authToken')

    if (token) {
      setToken(token)
    }
  }, [])

  async function signIn({ email, password }: SignInParams): Promise<void> {
    const { token } = await signInApi({ email, password })

    localStorage.setItem('authToken', token)

    setToken(token)
  }

  function signOut() {
    localStorage.removeItem('authToken')

    setToken(null)

    navigate('/sign-in')
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
