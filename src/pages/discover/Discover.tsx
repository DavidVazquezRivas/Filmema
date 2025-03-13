import { PageLayout } from '@/components/pagelayout/PageLayout'
import { Movie } from '@/models/movie'
import { FullMovieCard } from './components/FullMovieCard'
import { Box } from '@mui/material'
import { DiscoverMode } from '@/models/discoverModes'
import { getMovies } from './services/getMovies'
import { useEffect, useState } from 'react'

export const Discover = () => {
  const [movies, setMovies] = useState<Movie[]>([])

  const fetchMovies = async () => {
    return await getMovies({ mode: DiscoverMode.discover })
  }

  useEffect(() => {
    const fetchData = async () => {
      const moviesData = await fetchMovies()
      setMovies(moviesData)
    }

    fetchData()
  }, [])

  const movieCards = movies.map((movie, index) => (
    <FullMovieCard key={movie.id} index={index + 1} movie={movie} />
  ))

  return (
    <PageLayout>
      <Box
        component="main"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
      >
        {movieCards}
      </Box>
    </PageLayout>
  )
}
