import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router'

import { AuthProvider } from './contexts'
import AppLayout from './layouts/AppLayout'
import Routes from './routes'

function App() {
  const theme = createTheme()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <AppLayout>
            <Routes />
          </AppLayout>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
