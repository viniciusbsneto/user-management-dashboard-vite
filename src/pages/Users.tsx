import { useState } from 'react'
import {
  Avatar,
  Button,
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
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

import { Pagination } from '../components'
import { getList } from '../api/users'

const rowsPerPageOptions = [6]

function UsersList() {
  const [page, setPage] = useState(1)
  const { data } = useQuery({
    queryKey: ['users', page],
    queryFn: () => getList(page),
  })
  const users = data?.data || []
  const navigate = useNavigate()

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
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
