import { BrowserRouter, Route, Routes } from 'react-router'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

import { NotFound, SignIn, SignUp, Users } from './pages'

function App() {
  const theme = createTheme()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
