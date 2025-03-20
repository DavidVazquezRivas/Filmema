import { useThemeContext } from '@/theme/ThemeContextProvider'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Home } from '@/pages/home/Home'
import { NotFound } from '@/pages/404/NotFound'
import { Discover } from '@/pages/discover/Discover'
import { useLoadGenres } from '@/hooks/genres/useLoadGenres'
import { DiscoverMode } from '@/models/discoverModes'

function App() {
  const { theme } = useThemeContext()
  const loading = useLoadGenres()

  if (loading) {
    return <div>Cargando ...</div> // TODO good loading component
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/discover"
            element={<Discover mode={DiscoverMode.discover} />}
          />
          <Route
            path="/now-playing"
            element={<Discover mode={DiscoverMode.nowPlaying} />}
          />
          <Route
            path="/upcoming"
            element={<Discover mode={DiscoverMode.upcoming} />}
          />
          <Route
            path="/search/:query"
            element={<Discover mode={DiscoverMode.search} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
