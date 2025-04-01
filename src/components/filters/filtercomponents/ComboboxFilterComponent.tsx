import { ComboboxFilter } from '@/models/filters'
import { SelectOption } from '@/models/selectOption'
import { Autocomplete, TextField } from '@mui/material'

interface ComboboxFilterProps {
  filter: ComboboxFilter
  value: SelectOption[]
  onChange: (value: SelectOption[]) => void
}

export const ComboboxFilterComponent: React.FC<ComboboxFilterProps> = ({
  filter,
  value = [],
  onChange,
}) => {
  return (
    <Autocomplete
      multiple
      filterSelectedOptions
      autoHighlight
      id="tags-outlined"
      options={filter.options}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField {...params} variant="standard" label={filter.title} />
      )}
      value={value ?? []}
      onChange={(_, newValue) => onChange(newValue)}
    />
  )
}
