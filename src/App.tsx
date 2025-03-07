import { useThemeContext } from '@/theme/ThemeContextProvider'
import { ThemeModeToggle } from '@/components/ThemeModeToggle'
import { CssBaseline, ThemeProvider } from '@mui/material'

function App() {
  const { theme } = useThemeContext()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeModeToggle />
    </ThemeProvider>
  )
}

export default App
