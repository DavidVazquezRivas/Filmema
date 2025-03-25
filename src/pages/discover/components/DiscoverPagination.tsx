import { Box, Pagination } from '@mui/material'

interface DiscoverPaginationProps {
  page: number
  totalPages: number
  setPage: (page: number) => void
}

export const DiscoverPagination: React.FC<DiscoverPaginationProps> = ({
  page,
  totalPages,
  setPage,
}) => {
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  return (
    <Box display="flex" justifyContent="right" width="100%" padding={2}>
      <Pagination
        page={page}
        count={totalPages}
        onChange={handleChange}
        shape="rounded"
      ></Pagination>
    </Box>
  )
}
