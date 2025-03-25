import { NumberFilter } from '@/models/filters'
import { PrettoSlider } from '@/styled-components/PrettoSlider'

interface NumberFilterProps {
  filter: NumberFilter
  value: number
  onChange: (value: number) => void
}

export const NumberFilterComponent: React.FC<NumberFilterProps> = ({
  filter,
  value = 0,
  onChange,
}) => {
  return (
    <PrettoSlider
      value={value}
      onChange={(_, newValue) => onChange(newValue as number)}
      min={filter.min}
      max={filter.max}
      aria-label={filter.title}
      valueLabelDisplay="auto"
    />
  )
}
