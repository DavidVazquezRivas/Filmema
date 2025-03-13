import { useGetGenres } from '@/hooks/genres/useGetGenres'
import { Chip, ChipProps } from '@mui/material'

interface GenreChipProps extends ChipProps {
  genreId: number
}

export const GenreChip: React.FC<GenreChipProps> = ({ genreId, ...props }) => {
  const genre = useGetGenres()[genreId]
  return <Chip {...props} key={genreId} label={genre} />
}
