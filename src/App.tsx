import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import Router from './router'
import AppLayout from './layouts/AppLayout'

function App() {
  const theme = createTheme()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppLayout>
        <Router />
      </AppLayout>
    </ThemeProvider>
  )
}

export default App
