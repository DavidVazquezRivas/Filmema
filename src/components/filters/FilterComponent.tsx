import { memo } from 'react'
import { FilterType } from '@/models/filters'
import {
  ComboboxFilter,
  FilterTypeEnum,
  NumberFilter,
  RangeFilter,
  RatingFilter,
} from '@/models/filters'

import { NumberFilterComponent } from './filtercomponents/NumberFilterComponent'
import { RangeFilterComponent } from './filtercomponents/RangeFilterComponent'
import { ComboboxFilterComponent } from './filtercomponents/ComboboxFilterComponent'
import { RatingFilterComponent } from './filtercomponents/RatingFilterComponent'

interface FilterComponentProps {
  filter: FilterType
  value: any
  onChange: (key: string, value: any) => void
}

const filterComponentMap: Record<
  FilterTypeEnum,
  React.FC<{ filter: FilterType; value: any; onChange: (value: any) => void }>
> = {
  [FilterTypeEnum.number]: ({ filter, value, onChange }) => (
    <NumberFilterComponent
      filter={filter as NumberFilter}
      value={value}
      onChange={onChange}
    />
  ),
  [FilterTypeEnum.range]: ({ filter, value, onChange }) => (
    <RangeFilterComponent
      filter={filter as RangeFilter}
      value={value}
      onChange={onChange}
    />
  ),
  [FilterTypeEnum.combobox]: ({ filter, value, onChange }) => (
    <ComboboxFilterComponent
      filter={filter as ComboboxFilter}
      value={value}
      onChange={onChange}
    />
  ),
  [FilterTypeEnum.rating]: ({ filter, value, onChange }) => (
    <RatingFilterComponent
      filter={filter as RatingFilter}
      value={value}
      onChange={onChange}
    />
  ),
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  filter,
  value,
  onChange,
}) => {
  const Component = filterComponentMap[filter.type]

  return (
    <Component
      filter={filter}
      value={value}
      onChange={(v) => onChange(filter.key, v)}
    />
  )
}

export const MemoizedFilterComponent = memo(FilterComponent)
