import { useThemeContext } from '@/theme/ThemeContextProvider'
import { ThemeModeToggle } from '@/components/ThemeModeToggle'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { LanguageSelector } from './components/LanguageSelector'

function App() {
  const { theme } = useThemeContext()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeModeToggle />
      <LanguageSelector />
    </ThemeProvider>
  )
}

export default App
