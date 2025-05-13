import {
  Box,
  Button,
  Card as MuiCard,
  Link,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, useNavigate } from 'react-router'
import { signIn } from '../api/auth/sign-in'
import { useState } from 'react'
import type { AxiosError } from 'axios'

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

interface SignInFormValues {
  email: string
  password: string
}

function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register, handleSubmit, formState, setError } =
    useForm<SignInFormValues>({
      defaultValues: {
        email: '',
        password: '',
      },
    })
  const { isSubmitting, errors } = formState
  const navigate = useNavigate()

  const handleSignIn = handleSubmit(async values => {
    try {
      const { email, password } = values

      const { token } = await signIn({ email, password })

      localStorage.setItem('authToken', token)
      navigate('/')
    } catch (error) {
      console.error(error)

      const axiosError = error as AxiosError

      if (axiosError.response?.status === 400) {
        setError('root.serverError', {
          type: '400',
          message: 'Invalid email or password. Please try again.',
        })
      } else {
        setError('root.serverError', {
          type: 'server side',
          message: 'An error occurred. Please try again.',
        })
      }
    }
  })

  return (
    <Container>
      <Card>
        <Typography component="h1" variant="h4" sx={{ width: '100%' }}>
          Sign in
        </Typography>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          onSubmit={handleSignIn}
        >
          <TextField
            {...register('email')}
            required
            fullWidth
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={isSubmitting}
            error={Boolean(errors.root?.serverError.type === '400')}
          />
          <TextField
            {...register('password')}
            required
            fullWidth
            id="password"
            name="password"
            type="password"
            placeholder="••••••"
            autoComplete="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={isSubmitting}
            error={Boolean(errors.root?.serverError.type === '400')}
          />
          {errors.root?.serverError && (
            <Typography color="error" variant="body2" align="center">
              {errors.root.serverError.message}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            loading={isSubmitting}
          >
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
