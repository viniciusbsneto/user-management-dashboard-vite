import type { PropsWithChildren } from 'react'
import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'

import { useAuth } from '../hooks'
import { ToggleThemeButton } from './ToggleThemeButton'

function AppLayout({ children }: PropsWithChildren) {
  const { token, signOut } = useAuth()

  return (
    <Box component="main">
      <AppBar position="fixed">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap>
            Yet another user management app
          </Typography>
          <Stack direction="row" spacing={2}>
            <ToggleThemeButton />
            {token && (
              <Button color="inherit" onClick={signOut}>
                Logout
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container sx={{ p: 3 }}>{children}</Container>
    </Box>
  )
}

export default AppLayout
