import { RatingFilter } from '@/models/filters'
import { Rating } from '@mui/material'

interface RatingFilterProps {
  filter: RatingFilter
  value: number
  onChange: (value: number) => void
}

export const RatingFilterComponent: React.FC<RatingFilterProps> = ({
  filter,
  value = 0,
  onChange,
}) => {
  return (
    <Rating
      value={value}
      onChange={(_, newValue) => onChange(newValue as number)}
      name={filter.title}
      max={filter.max}
      precision={0.5}
      sx={{ '& .MuiRating-iconFilled': { color: 'primary.main' } }}
    />
  )
}
