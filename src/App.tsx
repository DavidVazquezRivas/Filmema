import { useThemeContext } from '@/theme/ThemeContextProvider'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useLoadGenres } from '@/hooks/genres/useLoadGenres'
import { DiscoverMode } from '@/models/discoverModes'
import { useSelector } from 'react-redux'
import { PanelProvider } from './context/PanelContext'
import { Panel } from './components/panel/Panel'
import { lazy, Suspense, useEffect } from 'react'
import { LoadingInterceptor } from './interceptors/loading.interceptor'
import LoadingSpinner from './components/spinner/Spinner'

const Home = lazy(() => import('@/pages/home/Home'))
const Discover = lazy(() => import('@/pages/discover/Discover'))
const Detail = lazy(() => import('@/pages/detail/Detail'))
const Near = lazy(() => import('@/pages/near/Near'))
const NotFound = lazy(() => import('@/pages/404/NotFound'))

function App() {
  const { theme } = useThemeContext()
  const version = useSelector((state: any) => state.language.version)

  useEffect(() => {
    LoadingInterceptor()
  }, [])

  const loading = useLoadGenres()

  if (loading)
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoadingSpinner />
      </ThemeProvider>
    )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoadingSpinner />
      <Suspense fallback={<LoadingSpinner />}>
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
              <Route path="/near" element={<Near />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Panel />
          </BrowserRouter>
        </PanelProvider>
      </Suspense>
    </ThemeProvider>
  )
}

export default App
