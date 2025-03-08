import React, { useState } from 'react'
import { Paper, InputBase, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface SearchBarProps {
  placeholder?: string
  label?: string
  onSearch: (value: string) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder,
  label,
}) => {
  const [value, setValue] = useState<string>('')

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (value === '') return
    if (e.key === 'Enter') {
      e.preventDefault()
      onSearch(value)
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (value === '') return
    onSearch(value)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <Paper
      component="form"
      sx={{ display: 'flex', alignItems: 'center', width: 300 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        inputProps={{ 'aria-label': label }}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <IconButton
        type="submit"
        sx={{ p: '10px' }}
        aria-label="search"
        onClick={handleClick}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}
