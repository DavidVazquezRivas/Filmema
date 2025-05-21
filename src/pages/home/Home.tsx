import { PageLayout } from '@/components/pagelayout/PageLayout'
import { Box, Button } from '@mui/material'
import { Hero } from './components/sections/Hero/Hero'
import { useEffect, useState } from 'react'
import { HomeMovies } from './models/homeMovies'
import { getHomeMovies } from './services/getHomeMovies'
import { GenericSection } from './components/sections/Generic/GenericSection'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

interface HomeState {
  movies: HomeMovies
  loading: boolean
}

export const Home = () => {
  const { t } = useTranslation()
  const [state, setState] = useState<HomeState>({
    movies: {} as HomeMovies,
    loading: true,
  })

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getHomeMovies()
      setState({ movies: data, loading: false })
    }

    fetchMovies()
  }, [])

  if (state.loading) {
    return <PageLayout />
  }

  return (
    <PageLayout>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={10}
      >
        <Hero movies={state.movies.hero} />
        <GenericSection
          title={t('home.discover.title')}
          subtitle={t('home.discover.subtitle')}
          movies={state.movies.discover}
          href="/discover"
        />
        <GenericSection
          title={t('home.upcoming.title')}
          subtitle={t('home.upcoming.subtitle')}
          descriptions={formatFromTo(new Date())}
          movies={state.movies.upcoming}
          href="/upcoming"
        />
        <GenericSection
          title={t('home.nowPlaying.title')}
          subtitle={t('home.nowPlaying.subtitle')}
          descriptions={formatFromTo(
            new Date(new Date().setMonth(new Date().getMonth() - 3)),
            new Date()
          )}
          movies={state.movies.nowPlaying}
          href="/now-playing"
        />
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        width={'100%'}
        justifyContent="center"
        p={2}
        mt={5}
      >
        <Button
          variant="contained"
          component={Link}
          to="/near"
          aria-label={t('home.nearYou.subtitle')}
          sx={{ fontWeight: 'bold' }}
        >
          {t('home.nearYou.subtitle')}
        </Button>
      </Box>
    </PageLayout>
  )
}

const formatFromTo = (from: Date, to?: Date) => {
  return [
    `From: ${from.toLocaleDateString('es-ES')}`,
    to ? `To: ${to.toLocaleDateString('es-ES')}` : '',
  ]
}
