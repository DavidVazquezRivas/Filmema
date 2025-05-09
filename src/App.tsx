import { useThemeContext } from '@/theme/ThemeContextProvider'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Home } from '@/pages/home/Home'
import { NotFound } from '@/pages/404/NotFound'
import { Discover } from '@/pages/discover/Discover'
import { useLoadGenres } from '@/hooks/genres/useLoadGenres'
import { DiscoverMode } from '@/models/discoverModes'
import { Detail } from './pages/detail/Detail'
import { useSelector } from 'react-redux'
import { PanelProvider } from './context/PanelContext'
import { Panel } from './components/panel/Panel'

function App() {
  const { theme } = useThemeContext()
  const loading = useLoadGenres()
  const version = useSelector((state: any) => state.language.version)

  if (loading) {
    return <div>Cargando ...</div> // TODO good loading component
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PanelProvider>
        <BrowserRouter>
          <Routes key={version}>
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
            <Route path="/movie/:id/:action?" element={<Detail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Panel />
      </PanelProvider>
    </ThemeProvider>
  )
}

export default App
