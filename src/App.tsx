import { CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { AuthProvider, ThemeProvider } from './contexts'
import AppLayout from './layouts/AppLayout'
import Routes from './routes'

const STALE_TIME_1_MINUTE = 1000 * 60 * 1

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: STALE_TIME_1_MINUTE } },
})

function App() {
  return (
    <ThemeProvider>
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
