import { useMutation, useQueryClient } from '@tanstack/react-query'

import { create } from '../api/users'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

function UsersCreate() {
  const { register, handleSubmit, formState, setError } = useForm({
    defaultValues: {
      name: '',
      email: '',
    },
  })
  const { isSubmitting, errors } = formState
  const queryClient = useQueryClient()
  const { mutateAsync: createUser } = useMutation({
    mutationFn: create,
    mutationKey: ['users'],
    onMutate: async newUser => {
      await queryClient.cancelQueries({ queryKey: ['users'] })

      const previousFirstPage = queryClient.getQueryData(['users', 1])

      if (previousFirstPage) {
        queryClient.setQueryData(['users', 1], oldData => {
          if (!oldData) return oldData

          const formattedNewUser = {
            first_name: newUser.name,
            email: newUser.email,
          }

          const updatedData = {
            ...oldData,
            data: [
              formattedNewUser,
              ...oldData.data.slice(0, oldData.data.length - 1),
            ],
            total: oldData.total + 1,
          }

          return updatedData
        })
      }

      return { previousFirstPage }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousFirstPage) {
        queryClient.setQueryData(['users', 1], context.previousFirstPage)
      }
    },
    // I'm not invalidating the query here because the mutation does not affect the server since it's mocked. I'm updating the cache optimistically with data from the form.
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ['users'] })
    // },
  })
  const navigate = useNavigate()

  const handleCreateUser = handleSubmit(async ({ name, email }) => {
    try {
      await createUser({ name, email })
      navigate('/')
    } catch (error) {
      console.error(error)
      setError('root.serverError', {
        type: 'server',
        message: 'Failed to create user. Please try again.',
      })
    }
  })

  return (
    <Stack spacing={2}>
      <Typography component="h1" variant="h4">
        Create User
      </Typography>
      <Stack component="form" spacing={2} onSubmit={handleCreateUser}>
        <TextField
          {...register('name')}
          label="Name"
          id="name"
          name="name"
          required
          disabled={isSubmitting}
        />
        <TextField
          {...register('email')}
          label="Email"
          id="email"
          name="email"
          type="email"
          required
          disabled={isSubmitting}
        />
        {errors.root?.serverError && (
          <Typography color="error">
            {errors.root.serverError.message}
          </Typography>
        )}
        <Stack direction="row" spacing={2}>
          <Button
            type="button"
            variant="contained"
            color="error"
            disabled={isSubmitting}
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default UsersCreate
