import { useThemeContext } from '@/theme/ThemeContextProvider'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Home } from '@/pages/home/Home'
import { NotFound } from '@/pages/404/NotFound'
import { Discover } from '@/pages/discover/Discover'
import { useLoadGenres } from '@/hooks/genres/useLoadGenres'

function App() {
  const { theme } = useThemeContext()
  useLoadGenres()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
