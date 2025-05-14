import type { PropsWithChildren } from 'react'
import { Navigate } from 'react-router'

import { useAuth } from '../hooks'

export function ProtectedRoute({ children }: PropsWithChildren) {
  const { token } = useAuth()

  if (!token) {
    return <Navigate to="/sign-in" />
  }

  return children
}
