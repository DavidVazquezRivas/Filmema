import { RangeFilter } from '@/models/filters'
import { PrettoSlider } from '@/styled-components/PrettoSlider'
import { useState } from 'react'

interface RangeValue {
  min: number
  max: number
}

interface RangeFilterProps {
  filter: RangeFilter
  value: RangeValue
  onChange: (value: RangeValue) => void
}

export const RangeFilterComponent: React.FC<RangeFilterProps> = ({
  filter,
  value = {} as RangeValue,
  onChange,
}) => {
  const [innerValue, setInnerValue] = useState<number[]>([
    value?.min ?? filter.min,
    value?.max ?? filter.max,
  ])
  const handleChange = (_event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setInnerValue(newValue)
      onChange({
        min: newValue[0],
        max: newValue[1],
      })
    }
  }

  return (
    <PrettoSlider
      onChange={handleChange}
      value={innerValue}
      min={filter.min}
      max={filter.max}
      valueLabelDisplay="auto"
    />
  )
}
