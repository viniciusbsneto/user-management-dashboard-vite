import { TablePagination } from '@mui/material'

interface PaginationProps {
  page: number
  count: number
  onPageChange: (page: number) => void
  rowsPerPage: number
  rowsPerPageOptions: number[]
}

export function Pagination({
  count,
  page,
  onPageChange,
  rowsPerPage,
  rowsPerPageOptions,
}: PaginationProps) {
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    onPageChange(newPage + 1)
  }

  return (
    <TablePagination
      component="div"
      count={count}
      page={page - 1}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={rowsPerPageOptions}
    />
  )
}
