import {
  Box,
  Button,
  Card as MuiCard,
  FormControl,
  FormLabel,
  Link,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router'

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}))

const Container = styled(Stack)(({ theme }) => ({
  height: '100vh',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}))

function SignIn() {
  return (
    <Container>
      <Card>
        <Typography component="h1" variant="h4" sx={{ width: '100%' }}>
          Sign in
        </Typography>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              required
              fullWidth
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              required
              fullWidth
              id="password"
              name="password"
              type="password"
              placeholder="••••••"
              autoComplete="new-password"
              variant="outlined"
            />
          </FormControl>
          <Button type="submit" fullWidth variant="contained">
            Sign in
          </Button>
        </Box>
        <Typography sx={{ textAlign: 'center' }}>
          Don't have an account yet?{' '}
          <Link
            component={RouterLink}
            to="/sign-up"
            variant="body2"
            sx={{ alignSelf: 'center' }}
          >
            Sign up
          </Link>
        </Typography>
      </Card>
    </Container>
  )
}

export default SignIn
