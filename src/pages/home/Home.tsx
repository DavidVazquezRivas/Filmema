import { PageLayout } from '@/components/pagelayout/PageLayout'
import { Box } from '@mui/material'
import { Hero } from './components/sections/Hero/Hero'
import { useEffect, useState } from 'react'
import { HomeMovies } from './models/homeMovies'
import { getHomeMovies } from './services/getHomeMovies'

interface HomeState {
  movies: HomeMovies
  loading: boolean
}

export const Home = () => {
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
    // TODO: Handle loading state better
    return <h1>Loading...</h1>
  }

  return (
    <PageLayout>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={3}
      >
        <Hero movies={state.movies.hero} />
      </Box>
    </PageLayout>
  )
}
