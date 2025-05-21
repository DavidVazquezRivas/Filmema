import i18n from '@/translation/i18n'
import { PageLayout } from '@/components/pagelayout/PageLayout'
import { Box } from '@mui/material'
import { MovieMap } from './components/map/MovieMap'
import { LocationProvider } from './contexts/LocationContext'
import { useEffect, useState } from 'react'
import { getNearMovies } from './services/getNearMovies'
import { NearMovie } from './models/nearMovie'
import { FilterProvider } from './contexts/FilterContext'
import { NearMovieFilterPanel } from './components/filters/NearMovieFilterPanel'

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
      <FilterProvider>
        <PageLayout>
          <Box
            display="flex"
            flexDirection={{ xs: 'column-reverse', md: 'row' }}
            justifyContent={{ xs: 'center', md: 'space-between' }}
            gap={2}
          >
            <Box
              width={{ xs: '100%', md: '70%' }}
              height={600}
              borderRadius={3}
              overflow="hidden"
            >
              <MovieMap />
            </Box>
            <NearMovieFilterPanel movies={movies} />
          </Box>
        </PageLayout>
      </FilterProvider>
    </LocationProvider>
  )
}

export default Near
