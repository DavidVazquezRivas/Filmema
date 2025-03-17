import React, { useState } from 'react'
import { Paper, InputBase, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'

interface SearchBarProps {
  placeholder?: string
  label?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder, label }) => {
  const [value, setValue] = useState<string>('')
  const navigate = useNavigate()

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (value === '') return
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch(value)
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (value === '') return
    handleSearch(value)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleSearch = (query: string) => {
    navigate(`/search/${query}`)
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
