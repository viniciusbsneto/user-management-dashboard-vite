import { useState } from 'react'
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
import { useForm, type ErrorOption } from 'react-hook-form'
import { Link as RouterLink, useNavigate } from 'react-router'

import { signUp } from '../api/auth'

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

interface SignUpFormValues {
  name: string
  email: string
  password: string
  confirmPassword: string
}

function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { register, handleSubmit, formState, setError, clearErrors } =
    useForm<SignUpFormValues>({
      defaultValues: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      criteriaMode: 'all',
    })
  const { isSubmitting, errors } = formState
  const navigate = useNavigate()

  const handleSignUp = handleSubmit(async values => {
    try {
      clearErrors()
      const { name, email, password, confirmPassword } = values

      if (password !== confirmPassword) {
        const passwordMismatchError: ErrorOption = {
          type: 'custom',
          message: 'Passwords do not match. Please try again.',
        }

        setError('password', passwordMismatchError)
        setError('confirmPassword', passwordMismatchError)

        return
      }

      const { token } = await signUp({ name, email, password })

      localStorage.setItem('authToken', token)

      navigate('/')
    } catch (error) {
      console.error(error)

      setError('root.serverError', {
        type: 'server side',
        message: 'An error occurred. Please try again.',
      })
    }
  })

  return (
    <Container>
      <Card>
        <Typography component="h1" variant="h4" sx={{ width: '100%' }}>
          Sign up
        </Typography>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          onSubmit={handleSignUp}
        >
          <TextField
            {...register('name')}
            label="Name"
            required
            fullWidth
            id="name"
            name="name"
            placeholder="Your full name"
            autoComplete="name"
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={isSubmitting}
          />
          <TextField
            {...register('email')}
            label="Email"
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
          />
          <TextField
            {...register('password')}
            label="Password"
            required
            fullWidth
            id="password"
            name="password"
            type="password"
            placeholder="••••••"
            autoComplete="new-password"
            disabled={isSubmitting}
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={Boolean(errors.confirmPassword)}
          />
          <TextField
            {...register('confirmPassword')}
            label="Confirm password"
            required
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••"
            autoComplete="confirmPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            disabled={isSubmitting}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword?.message}
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
            Sign up
          </Button>
        </Box>
        <Typography sx={{ textAlign: 'center' }}>
          Already have an account?{' '}
          <Link
            component={RouterLink}
            to="/sign-in"
            variant="body2"
            sx={{ alignSelf: 'center' }}
          >
            Sign in
          </Link>
        </Typography>
      </Card>
    </Container>
  )
}

export default SignUp
