import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { AuthProvider } from './contexts'
import AppLayout from './layouts/AppLayout'
import Routes from './routes'

const STALE_TIME_1_MINUTE = 1000 * 60 * 1

function App() {
  const theme = createTheme()
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: STALE_TIME_1_MINUTE } },
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <AppLayout>
              <Routes />
            </AppLayout>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
