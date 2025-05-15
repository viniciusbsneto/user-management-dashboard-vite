import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { getOne, update } from '../api/users'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'

interface UpdateUserFormValues {
  name: string
  email: string
}

function UsersUpdate() {
  const { id } = useParams()
  const { data: user, isPending } = useQuery({
    queryKey: ['users', id],
    queryFn: () => getOne(Number(id)),
    enabled: Boolean(id),
  })

  const { register, handleSubmit, formState, setError } =
    useForm<UpdateUserFormValues>({
      defaultValues: {
        name: '',
        email: '',
      },
      values: {
        name: user?.first_name || '',
        email: user?.email || '',
      },
    })
  const { isSubmitting, errors } = formState
  const queryClient = useQueryClient()
  const { mutateAsync: updateUser } = useMutation({
    mutationFn: update,
    mutationKey: ['users'],
    onMutate: async newUser => {
      await queryClient.cancelQueries({ queryKey: ['users', newUser.id] })

      const previousUser = queryClient.getQueryData(['users', newUser.id])

      if (previousUser) {
        queryClient.setQueryData(['users', newUser.id], oldData => {
          if (!oldData) return oldData

          const updatedData = {
            ...oldData,
            name: newUser.name,
            email: newUser.email,
          }

          return updatedData
        })
      }

      return { previousUser }
    },
    onError: (_error, variables, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(['users', variables.id], context.previousUser)
      }
    },
    // I'm not invalidating the query here because the mutation does not affect the server since it's mocked. I'm updating the cache optimistically with data from the form.
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ['users'] })
    // },
  })
  const navigate = useNavigate()

  if (!id) {
    return null
  }

  const handleUpdateUser = handleSubmit(async ({ name, email }) => {
    try {
      await updateUser({ id: Number(id), name, email })
      navigate('/')
    } catch (error) {
      console.error(error)
      setError('root.serverError', {
        type: 'server',
        message: 'Failed to update user. Please try again.',
      })
    }
  })

  return (
    <Stack spacing={2}>
      <Typography component="h1" variant="h4">
        Update User
      </Typography>
      <Stack component="form" spacing={2} onSubmit={handleUpdateUser}>
        <TextField
          {...register('name')}
          label="Name"
          id="name"
          name="name"
          required
          disabled={isPending || isSubmitting}
        />
        <TextField
          {...register('email')}
          label="Email"
          id="email"
          name="email"
          type="email"
          required
          disabled={isPending || isSubmitting}
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
            Update
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default UsersUpdate
