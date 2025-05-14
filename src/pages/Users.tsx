import { useState } from 'react'
import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'

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
              <TableRow key={user.id}>
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
  return (
    <>
      <h1>Users</h1>
      <UsersList />
    </>
  )
}

export default Users
