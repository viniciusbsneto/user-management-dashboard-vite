import { Navigate, Route, Routes as RouterRoutes } from 'react-router'

import { NotFound, SignIn, SignUp, Users } from './pages'
import { ProtectedRoute } from './components'
import { useAuth } from './hooks'

export default function Routes() {
  const { token } = useAuth()

  return (
    <RouterRoutes>
      <Route
        index
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sign-up"
        element={!token ? <SignUp /> : <Navigate to="/" />}
      />
      <Route
        path="/sign-in"
        element={!token ? <SignIn /> : <Navigate to="/" />}
      />
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  )
}
