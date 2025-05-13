import type { PropsWithChildren } from 'react'
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material'

import { signOut } from '../utils/auth'

function AppLayout({ children }: PropsWithChildren) {
  return (
    <Box component="main">
      <AppBar position="fixed">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap>
            Yet another user management app
          </Typography>
          <Button color="inherit" onClick={signOut}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container sx={{ p: 3 }}>{children}</Container>
    </Box>
  )
}

export default AppLayout
