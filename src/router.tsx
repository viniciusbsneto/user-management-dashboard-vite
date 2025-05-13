import { BrowserRouter, Route, Routes } from 'react-router'
import { NotFound, SignIn, SignUp, Users } from './pages'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
