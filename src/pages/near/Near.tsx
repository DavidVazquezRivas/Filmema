import i18n from '@/translation/i18n'
import { PageLayout } from '@/components/pagelayout/PageLayout'
import { Box } from '@mui/material'
import { MovieMap } from './components/map/MovieMap'
import { LocationProvider } from './contexts/LocationContext'
import { useEffect, useState } from 'react'
import { getNearMovies } from './services/getNearMovies'
import { NearMovie } from './models/nearMovie'

export const Near = () => {
  const [movies, setMovies] = useState<NearMovie[]>([])

  useEffect(() => {
    const getMovies = async (language: string) => {
      const data = await getNearMovies(language)
      setMovies(data)
    }

    const language = i18n.resolvedLanguage ?? i18n.language
    getMovies(language)
  }, [i18n.resolvedLanguage])

  return (
    <LocationProvider>
      <PageLayout>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
          <Box
            width={{ xs: '100%', md: '70%' }}
            height={600}
            borderRadius={3}
            overflow="hidden"
          >
            <MovieMap movies={movies} />
          </Box>
          <Box flex={1} height={600} bgcolor="primary.main" borderRadius={3}>
            {/* Placeholder for right content */}
            Sidebar Content
          </Box>
        </Box>
      </PageLayout>
    </LocationProvider>
  )
}
