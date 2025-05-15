import { useState } from 'react'
import {
  Avatar,
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { Delete } from '@mui/icons-material'

import { Pagination } from '../components'
import {
  getList,
  deleteUser as deleteUserApi,
  type GetListResponse,
} from '../api/users'

const rowsPerPageOptions = [6]

function UsersList() {
  const [page, setPage] = useState(1)
  const { data } = useQuery({
    queryKey: ['users', page],
    queryFn: () => getList(page),
  })
  const users = data?.data || []
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutateAsync: deleteUser } = useMutation({
    mutationKey: ['users'],
    mutationFn: deleteUserApi,
    onMutate: async id => {
      await queryClient.cancelQueries({ queryKey: ['users', 1] })

      const previousUsers = queryClient.getQueryData(['users', 1])

      if (previousUsers) {
        queryClient.setQueryData(['users', 1], (oldData: GetListResponse) => {
          if (!oldData) return oldData

          const updatedData = {
            ...oldData,
            data: oldData.data.filter(user => user.id !== id),
          }

          return updatedData
        })
      }

      return { previousUsers }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(['users', 1], context.previousUsers)
      }
    },
    // I'm not invalidating the query here because the mutation does not affect the server since it's mocked. I'm updating the cache optimistically with data from the form.
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ['users', 1] })
    // },
  })

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow
                key={user.id}
                onClick={() => navigate(`users/${user.id}`)}
                hover
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>
                  <Avatar
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                  />
                </TableCell>
                <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={async e => {
                      e.stopPropagation()
                      await deleteUser(user.id)
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={data?.total || 0}
        page={page}
        onPageChange={setPage}
        rowsPerPage={6}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    </>
  )
}

function Users() {
  const navigate = useNavigate()

  return (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography component="h1" variant="h4">
          Users
        </Typography>
        <Button onClick={() => navigate('users/create')}>Create</Button>
      </Stack>
      <UsersList />
    </Stack>
  )
}

export default Users
