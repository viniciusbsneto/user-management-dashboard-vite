import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material'
import { useMemo, useState, type PropsWithChildren } from 'react'

import { ThemeContext, type ThemeMode } from './ThemeContext'

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const storedMode = localStorage.getItem('themeMode')
    return (storedMode as ThemeMode) || 'light'
  })
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  )

  const changeMode = (newMode: ThemeMode) => {
    setMode(newMode)
    localStorage.setItem('themeMode', newMode)
  }

  return (
    <ThemeContext.Provider value={{ mode, changeMode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
