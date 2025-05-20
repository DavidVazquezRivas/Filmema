import React, { useState } from 'react'
import { Paper, InputBase, IconButton, PaperProps } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'

interface SearchBarProps extends PaperProps {
  placeholder?: string
  label?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  label,
  ...props
}) => {
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
      display="flex"
      alignItems="center"
      maxWidth={500}
      {...props}
      sx={{
        flexGrow: 1,
        maxWidth: 500,
        ...props.sx,
      }}
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
