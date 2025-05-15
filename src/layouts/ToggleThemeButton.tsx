import { IconButton, Tooltip } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'

import { useTheme } from '../hooks'

export const ToggleThemeButton = () => {
  const { mode, changeMode } = useTheme()

  const handleToggleTheme = (): void => {
    changeMode(mode === 'dark' ? 'light' : 'dark')
  }

  return (
    <Tooltip title="Toggle theme" enterDelay={300}>
      <IconButton color="inherit" onClick={handleToggleTheme}>
        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  )
}
