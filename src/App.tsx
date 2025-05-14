import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { AuthProvider } from './contexts'
import AppLayout from './layouts/AppLayout'
import Routes from './routes'

function App() {
  const theme = createTheme()
  const queryClient = new QueryClient()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <AppLayout>
              <Routes />
            </AppLayout>
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
