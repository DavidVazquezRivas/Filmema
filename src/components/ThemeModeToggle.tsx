import { IconButton } from '@mui/material'
import { useThemeContext } from '@/theme/ThemeContextProvider'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

export const ThemeModeToggle = () => {
  const { mode, toggleColorMode } = useThemeContext()

  return (
    <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
      {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  )
}
