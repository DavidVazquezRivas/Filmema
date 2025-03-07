import { IconButton } from '@mui/material'
import { useThemeContext } from '@/theme/ThemeContextProvider'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { useTranslation } from 'react-i18next'

export const ThemeModeToggle = () => {
  const { mode, toggleColorMode } = useThemeContext()
  const { t } = useTranslation()

  const label =
    mode === 'dark' ? t('header.theme.lightLabel') : t('header.theme.darkLabel')
  const icon = mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />
  return (
    <IconButton onClick={toggleColorMode} color="inherit" aria-label={label}>
      {icon}
    </IconButton>
  )
}
